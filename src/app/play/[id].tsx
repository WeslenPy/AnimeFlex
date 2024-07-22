
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {  View, Button, ActivityIndicator,StyleSheet } from 'react-native';
import response from "../../api/animetv/response";
import { Video, ResizeMode, VideoState } from 'expo-av';

export default function Player() {
    const {id} = useLocalSearchParams();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const [loading, setLoading] = useState(true);

    const video = useRef<VideoState>();

    const manager = new response.ResponseManager();

    useEffect(() => {

     
      async function getURL(id:any){
        let session = new SessionManager()
        let url = session.router_ep(id)
        let data = await session.get(url)
        data = manager.parse(data);

        console.log(data)
        setVideoUrl(data);
        setLoading(false)
      }
  
      getURL(id);
    },[]);

  if (loading) {
      return (
        <View className='w-full h-full justify-center items-center'>
          <ActivityIndicator size="large" color="#0000" />
        </View>
      );
    }

 return (
    <View className='w-full h-full bg-black'>

      <Video
        style={{width:400,height:400}}
        ref={video}
        source={{
          uri: videoUrl.urls[0],
        }}
        useNativeControls={true}
        shouldPlay={true}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onReadyForDisplay={(item)=>{item.naturalSize.orientation="landscape"}}
        
        />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container:{

  }
})