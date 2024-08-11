import { View,Pressable,Text,ImageBackground,ActivityIndicator,StyleSheet } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { Feather,} from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState,useEffect, useRef } from 'react';
import { SessionManager } from '@/src/controller/api/animetv/session';
import response from "@/src/controller/api/animetv/response";
import AnimeStorage from '@/src/controller/storage/manager';
import { AnimeQuery } from '@/src/controller/storage/database';
import { DownloadFile } from '@/src/interfaces/download';
import { URLProps } from '../../interfaces/anime';
import DownloadManager from '@/src/controller/storage/download';
import { DownloadResumable } from 'expo-file-system';

import DownloadOptions from '../download';

export default function Epsodie({ep,page}:{ep:EpsodiesProps,page:any}) {

    const storage = new AnimeStorage()
    const storageDatabase = new AnimeQuery()
    const storageDownload = new DownloadManager()

    const [image, setImage] = useState("");
    const [file, setFile] = useState<DownloadFile>();

    const [downloading, setDownloading] = useState(false);
    const [finish, setFinish] = useState(false);
    const downloadRef = useRef<DownloadResumable>();

    const [progress, setProgress] = useState(0);
    const [progressDownload, setProgressDownload] = useState(0);
    const [resumed, setResumed] = useState(false);

    const [pause, setPause] = useState(false);

    const manager = new response.ResponseManager();
    
    function getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }


    async function startDownload(){
        if(file){
            setDownloading(true)
            setPause(false)

            await storageDatabase.addDownload(file)
            await storageDownload.createDownload(file,downloadRef,setProgressDownload)
        
        }

    }

    async function pauseDownload(){
        if (downloadRef.current){
            console.log(downloadRef.current)
            if (!pause){
                setPause(true)
                await storageDatabase.updateStatusDownload(true,parseInt(ep.video_id))
                await downloadRef.current.pauseAsync()
            }
        }
    }
         
    async function resumeDownload(){

        if(resumed){
            return await getDownloadResumed()
        }

        if (downloadRef.current){
            console.log(downloadRef.current)

            if (pause){
                setPause(false)
                setDownloading(true)
                await storageDatabase.updateStatusDownload(false,parseInt(ep.video_id))
                await downloadRef.current.resumeAsync()
            }
        }
    }

    async function getDownloadResumed(){
        const response = await  storageDownload.resumeFromDatabase(parseInt(ep.video_id),downloadRef,setProgressDownload)
        if (response){
            if (pause && downloadRef.current){
                setResumed(false)
                setPause(false)
                setDownloading(true)
                await storageDatabase.updateStatusDownload(false,parseInt(ep.video_id))
                await downloadRef.current.resumeAsync()
            }
        }
    }

    useEffect(() => {

        async function getProgress(){
            const result = await storage.getProgress(ep.video_id)
            if (result){
                setProgress(result.progress==null?0:result.progress)
            }
  
        }


        async function getURL(id:any){

            let session = new SessionManager()
            let url = session.router_ep(id)
            let data:URLProps = await session.get(url)
            data = manager.parse(data);


            let file:DownloadFile = {
                url:data.urls[data.urls.length-1],
                video_id:parseInt(data.video_id),
                anime_id:parseInt(data.category_id),
                title:data.title
            }

            setFile(file)

            let find = await storageDatabase.getThumb(parseInt(ep.video_id))

            if(find && find.length>0){
                setImage(find[0].uri);

            }else{
                const { uri } = await VideoThumbnails.getThumbnailAsync(data.urls[data.urls.length-1], {time: getRandomInt(15000,50000)});
                storageDatabase.addThumb(parseInt(ep.video_id),uri)
                setImage(uri);

            }
          


        }

        getProgress()
        getURL(ep.video_id);

      },[]);

      
      useEffect(()=>{

        async function getDownload() {

            const data = await storageDatabase.getDownloadAny(parseInt(ep.video_id))
            if (data && data.length>0){
                const row = data[0]
                
                setPause(row.pause)
                
                setProgressDownload(parseInt(row.progress))
                setDownloading(true)
                setResumed(true)
                setFinish(row.complete)
                await storageDatabase.updateStatusDownload(row.pause,parseInt(ep.video_id))
                console.log("resumed",row)

            }
            
        }

        getDownload()


      },[])
  
    return (
            <Pressable className=' flex rounded-md justify-start mx-1' style={styles.color} onPress={() => {openScreenPlayer(ep.video_id,ep.index_id.toString(),page,true);}}>
                <View className='flex-row '>
                    <View className='flex-col  mr-2 p-1 mt-1 rounded-lg'>
                        <View className='h-32 w-32 rounded-lg relative mx-1' style={{backgroundColor:"rgba(255,255,255,0.1)"}}>
                            <View className='rounded-md'>
                                {image && <ImageBackground source={{ uri: image }} progressiveRenderingEnabled={true}  className='w-32 h-32 rounded-lg justify-center items-center overflow-hidden'>
                                                <Feather name="play-circle"  size={35} color="orange" />
                                          </ImageBackground>}

                                <View className='absolute  left-10 '>
                                    {image?  <></>: <ActivityIndicator className='bottom-32' size="large" color="orange" />}

                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex-row items-center justify-between flex-1 mr-4'>
                        <Text className='text-white  w-44 ' numberOfLines={3} lineBreakMode='clip'>{ep.title}</Text>
                        <View className='flex-row h-full items-center p-2'>

                           <DownloadOptions startDownload={startDownload} pause={pause} progress={progressDownload} finish={finish}
                                            resumeDownload={resumeDownload} pauseDownload={pauseDownload} downloading={downloading} ></DownloadOptions>

                        </View>
                    </View>

                </View>
                {progressDownload && progressDownload<100? (
                    <View className=' bg-orange-500 rounded-xl mt-3 justify-center items-center' 
                                style={{width:`${progressDownload}%`,padding:progressDownload>0?3:0,borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
                    
                    </View>

                ):(
                    <View className=' bg-red-500 rounded-md mt-1' style={{width:`${progress}%`,padding:progress>0?3:0,borderTopLeftRadius:0,borderBottomLeftRadius:0}}></View>

                )}

        </Pressable>

  );
}


const styles = StyleSheet.create({
    color:{
        backgroundColor:"#222B32"
    }
})