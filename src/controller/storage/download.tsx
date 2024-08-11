import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as FileSystem from 'expo-file-system';
import { AnimeQuery } from './database';
import {DownloadProgressData} from "expo-file-system"
import { DownloadFile } from '@/src/interfaces/download';

export default class DownloadManager{

    DOWNLOAD_TASK = 'download-files-anime';
    FOLDERNAME = 'AnimeFlex'; 
    FOLDERURI = `${FileSystem.documentDirectory}${this.FOLDERNAME}/`;
    storage:AnimeQuery;
  
    constructor(){
        this.storage = new AnimeQuery()

        this.ensureDirExists(this.FOLDERURI)
    }



    async startDownload(){

    }

    async getFilesToDownload(){
        return await this.storage.getFullDownload(false,false)
    }

    getURIByName(name:string):string{
        let cleanName=  name.replace(/[^a-zA-Z0-9 ]/g, '');
        cleanName = cleanName.replace(/\s+/g, '_') + ".mp4"
        return cleanName.trim()

    }

    stopDownload(video_id:number){

    }

    async ensureDirExists(folder:string) {
        const dirInfo = await FileSystem.getInfoAsync(folder);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
        }
    }

    getProgress(downloadProgress:DownloadProgressData,video_id:number,setState?:any){
        const progress = Math.round(( downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite) * 100)
        this.storage.updateProgressDownload(progress,video_id)

        console.log(progress)
        if (setState){
            setState(progress)
        }

        if (progress>=100){
            this.storage.updateCompleteDownload(true,video_id)
        }

        return 

    }

    async resumeFromDatabase(video_id:number,reference:any,setState?:any){

        try {
            
            const data = await this.storage.getDownloadAny(video_id)

            if(data && data.length>0){
                const row = data[0]
                if (row.uri){
    
                    const downloadResumable = await this.createResumable(row.url,row.uri,row.video_id,setState)
                    reference.current=downloadResumable;
    
                    return row
                }
            }
        return false

        } catch ( error) {
            console.log(error)
            return false

            
        }

      
    }

    async createResumable(url:string,uri:string,video_id:number,setState:any){


        const downloadResumable = FileSystem.createDownloadResumable(
            url,
            uri,
            {
                headers:{
                    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
                },
                cache:false,
            },
            (downloadProgress)=>{this.getProgress(downloadProgress,video_id,setState)},
        );

        return downloadResumable

    }

    async checkDownload(downloadResumable:FileSystem.DownloadResumable,video_id:number){        
        try {
            const downloaded = await downloadResumable.downloadAsync();

            if (downloaded){
                console.log(downloaded)
                if(downloaded.status==200){
                    await this.storage.updateCompleteDownload(true,video_id)
                    await this.storage.updateStatusDownload(false,video_id)
                    await this.storage.updateProgressDownload(100,video_id)

                    return true
                }

            }

            return false

        } catch ( error) {
            console.log(error)
            return false
        }

    }

    async createDownload(file:DownloadFile,reference?:any,setState?:any){
        try {

            const dirFileURI = `${this.FOLDERURI}${file.anime_id}`;
            const fileURI = `${dirFileURI}/${file.video_id}_${this.getURIByName(file.title)}`;

            await this.ensureDirExists(dirFileURI)
            await this.storage.updateURIDownload(fileURI,file.video_id)

            const downloadResumable = await this.createResumable(file.url,fileURI,file.video_id,setState)

            await this.storage.updateDataDownload(downloadResumable.savable(),file.video_id)

            reference.current = downloadResumable

            return  await this.checkDownload(downloadResumable,file.video_id);
            
        } catch ( error) {
            console.log(error)
            return false
        }

    }


    createTask(){

        TaskManager.defineTask(this.DOWNLOAD_TASK, async () => {
            try {
                console.log('Iniciando tarefa de download em segundo plano...');
                
                const filesToDownload = await this.getFilesToDownload();
            
                if (filesToDownload.length === 0) {
                    console.log('Nenhum arquivo para baixar.');
                    return BackgroundFetch.BackgroundFetchResult.NoData;
                }
            
                for (let i = 0; i < filesToDownload.length; i++) {
                    const downloadRow = filesToDownload[i];
                    await this.createDownload(downloadRow)
                   
                }
            
                console.log('Todos os arquivos foram baixados.');
                return BackgroundFetch.BackgroundFetchResult.NewData;

            } catch (error) {

                console.error('Erro durante o download dos arquivos:', error);

                return BackgroundFetch.BackgroundFetchResult.Failed;
            }
        });

    }


    async registerTask(){
    
        const task =  await BackgroundFetch.registerTaskAsync(this.DOWNLOAD_TASK, {
            minimumInterval: 15 * 60, // 15 minutos
            stopOnTerminate: false,
            startOnBoot: true,
        });

        console.log(task)
        return task

    }
   

}


