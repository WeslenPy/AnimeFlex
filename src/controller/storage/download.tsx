import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as FileSystem from 'expo-file-system';
import { AnimeQuery } from './database';
import {DownloadProgressData} from "expo-file-system"

export default class DownloadManager{

    DOWNLOAD_TASK = 'download-files-anime';
    FOLDERNAME = 'AnimeFlex'; 
    FOLDERURI = `${FileSystem.documentDirectory}${this.FOLDERNAME}/`;
    storage:AnimeQuery;
  
    constructor(){
        this.storage = new AnimeQuery()
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


    getProgress(downloadProgress:DownloadProgressData,video_id:number){
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        this.storage.updateProgressDownload(progress,video_id)

        console.log(progress)

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
                    const fileUri = `${this.FOLDERURI}${this.getURIByName(downloadRow.title)}`;

                    await this.storage.updateURIDownload(fileUri,downloadRow.video_id)

            
                    const downloadResumable = FileSystem.createDownloadResumable(
                        downloadRow.url,
                        fileUri,
                        {},
                        (downloadProgress)=>{this.getProgress(downloadProgress,downloadRow.video_id)},
                    );

                    const downloaded = await downloadResumable.downloadAsync();
                    if (downloaded){
                        await this.storage.updateCompleteDownload(true,downloadRow.video_id)
                        await this.storage.updateProgressDownload(100,downloadRow.video_id)
                        console.log(`Arquivo baixado: ${downloaded.uri}`);
                    }
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


