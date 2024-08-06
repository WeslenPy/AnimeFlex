import { View,Pressable,Text,ImageBackground,ActivityIndicator,StyleSheet, TouchableOpacity } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { Feather, Octicons } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState,useEffect } from 'react';
import { SessionManager } from '@/src/controller/api/animetv/session';
import response from "@/src/controller/api/animetv/response";
import AnimeStorage from '@/src/controller/storage/manager';
import { AnimeQuery } from '@/src/controller/storage/database';


export default function Epsodie({ep,page}:{ep:EpsodiesProps,page:any}) {

    const storage = new AnimeStorage()
    const storageDatabase = new AnimeQuery()

    const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0);
    const manager = new response.ResponseManager();
    
    function getRandomInt(min:number, max:number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
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
            let data = await session.get(url)
            data = manager.parse(data);



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
                            <TouchableOpacity>
                                <Octicons name="download" size={26} color="white" />
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
                <View className=' bg-red-500 rounded-md mt-1' style={{width:`${progress}%`,padding:progress>0?3:0,borderTopLeftRadius:0,borderBottomLeftRadius:0}}></View>

        </Pressable>

  );
}


const styles = StyleSheet.create({
    color:{
        backgroundColor:"#222B32"
    }
})