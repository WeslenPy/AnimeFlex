import { View,Pressable,Text,Image,ActivityIndicator,StyleSheet } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { Feather } from '@expo/vector-icons';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState,useEffect } from 'react';
import { SessionManager } from '@/src/api/animetv/session';
import response from "../../api/animetv/response";


export default function Epsodie({ep,page}:{ep:EpsodiesProps,page:any}) {

    const [image, setImage] = useState("");
    const manager = new response.ResponseManager();
    
    useEffect(() => {
        async function getURL(id:any){
          let session = new SessionManager()
          let url = session.router_ep(id)
          let data = await session.get(url)
          data = manager.parse(data);
  
          const { uri } = await VideoThumbnails.getThumbnailAsync(data.urls[data.urls.length - 1], {time: 15000});
          setImage(uri);
        }

        getURL(ep.video_id);
      },[]);
  
    return (
        <Pressable className='w-full flex flex-row rounded-md items-center justify-start' style={styles.color} onPress={() => {openScreenPlayer(ep.video_id,ep.index_id.toString(),page);}}>
            <View className='flex-col mr-2 p-1'>
                <View className='h-32 w-32 bg-slate-400 rounded-md relative'>
                    <View className=''>
                        {image && <Image source={{ uri: image }} progressiveRenderingEnabled={true} className='w-32 h-32 rounded-md' />}

                        <View className='absolute  left-10 '>
                
                            {image?<View className='bottom-28'><Feather name="play-circle"  size={35} color="orange" /></View>  : <ActivityIndicator className='bottom-28' size="large" color="orange" />}

                        </View>
                    </View>
                </View>
            </View>
            <View className='flex-row items-center'>
                <Text className='text-white  w-44 mr-10 '>{ep.title}</Text>
                <Feather name="play-circle" className='' size={25} color="orange" />
            </View>
       </Pressable>
  );
}


const styles = StyleSheet.create({
    color:{
        backgroundColor:"#222B32"
    }
})