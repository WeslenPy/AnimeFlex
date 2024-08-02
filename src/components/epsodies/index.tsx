import { View,Pressable,Text,Image,ActivityIndicator,StyleSheet } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { Feather } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState,useEffect } from 'react';
import { SessionManager } from '@/src/controller/api/animetv/session';
import response from "@/src/controller/api/animetv/response";
import AnimeStorage from '@/src/controller/storage/manager';


export default function Epsodie({ep,page}:{ep:EpsodiesProps,page:any}) {

    const storage = new AnimeStorage()

    const [image, setImage] = useState("");
    const [progress, setProgress] = useState(0);
    const manager = new response.ResponseManager();
    
    useEffect(() => {

        async function getProgress(){
            const result = await storage.getProgress(ep.video_id)
            if (result){
                console.log(result)
                setProgress(result.progress==null?0:result.progress)
            }
  
        }


        async function getURL(id:any){

          let session = new SessionManager()
          let url = session.router_ep(id)
          let data = await session.get(url)
          data = manager.parse(data);

          
          const { uri } = await VideoThumbnails.getThumbnailAsync(data.urls[data.urls.length-1], {time: 15000});
          setImage(uri);

         

        }

        getProgress()
        getURL(ep.video_id);

      },[]);
  
    return (
            <Pressable className=' flex rounded-md justify-start' style={styles.color} onPress={() => {openScreenPlayer(ep.video_id,ep.index_id.toString(),page);}}>
                <View className='flex-row '>
                    <View className='flex-col  mr-2 p-1 mt-1 '>
                        <View className='h-32 w-32 bg-slate-400 rounded-md relative'>
                            <View className=''>
                                {image && <Image source={{ uri: image }} progressiveRenderingEnabled={true} className='w-32 h-32 rounded-md' />}

                                <View className='absolute  left-10 '>
                        
                                    {image?<View className='bottom-28'><Feather name="play-circle"  size={35} color="orange" /></View>  : <ActivityIndicator className='bottom-28' size="large" color="orange" />}

                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex-row items-center justify-between flex-1 mr-5'>
                        <Text className='text-white  w-44 mr-10 '>{ep.title}</Text>
                        <Feather name="play-circle"  size={30} color="orange" />
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