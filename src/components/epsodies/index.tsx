import { View,Pressable,Text,ImageBackground,ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { AntDesign, Feather, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
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

export default function Epsodie({ep,page}:{ep:EpsodiesProps,page:any}) {

    const storage = new AnimeStorage()
    const storageDatabase = new AnimeQuery()
    const storageDownload = new DownloadManager()

    const [image, setImage] = useState("");
    const [file, setFile] = useState<DownloadFile>();

    const [downloading, setDownloading] = useState(false);
    const downloadRef = useRef<DownloadResumable>();

    const [progress, setProgress] = useState(0);
    const [progressDownload, setProgressDownload] = useState(0);

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

        if (downloadRef.current){

            if (pause){
                await storageDatabase.updateStatusDownload(false,parseInt(ep.video_id))
                await downloadRef.current.resumeAsync()
                setPause(false)
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

        async function getDownload(){
            const response = await  storageDownload.resumeFromDatabase(parseInt(ep.video_id),downloadRef,setProgressDownload)
            if (response){
                setProgressDownload(parseInt(response.progress))
                setDownloading(true)
                setPause(response.pause)
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
                        <Text className='text-white  w-44 mr-10 '>{ep.title}</Text>
                        <View className='flex-row h-full items-end mb-4'>
                        {progress <100 ?
                            !downloading ? (
                                <TouchableOpacity onPress={startDownload}>
                                    <View className='p-4 rounded-xl' style={{backgroundColor:"rgba(255,255,255,.1)"}}>
                                           {progress>=100?(
                                               <MaterialIcons name="file-download-done" size={26} color="white" />

                                           ):(
                                               <Octicons name={"download"} size={26} color="white" />

                                           )}
                                           
                                    </View>

                                </TouchableOpacity>
                                ):(
                                <TouchableOpacity onPress={()=>{if(!pause){pauseDownload()}else{resumeDownload()}}}>
                                    <View className='p-4 rounded-xl' style={{backgroundColor:"rgba(255,255,255,.1)"}}>
                                        {pause?(
                                            <MaterialIcons name="downloading" size={26} color="white" />
                                            ):
                                            (
                                            <FontAwesome name="close" size={26} color="red" />
                                        )}
                                    </View>
                                </TouchableOpacity>
                                  
                                
                                )
                            :(
                                <TouchableOpacity >
                                <View className='p-4 rounded-xl' style={{backgroundColor:"rgba(255,255,255,.1)"}}>
                                    <MaterialIcons name="file-download-done" size={26} color="white" />
                                        
                                </View>

                                </TouchableOpacity>
                            )}

                          
                           

                        </View>
                    </View>

                </View>
                {progressDownload && progressDownload<100? (
                    <View className=' bg-green-500 rounded-xl mt-3 justify-center items-center' style={{width:`${progressDownload}%`,padding:progressDownload<6?6:0,borderTopLeftRadius:0,borderBottomLeftRadius:0}}>
                        {progressDownload>6 && (
                            <Text className='text-amber-300 text-sm'>{progressDownload}%</Text>
                        )}
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