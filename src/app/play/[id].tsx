
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, Button, ActivityIndicator,StyleSheet } from 'react-native';
import response from "../../api/animetv/response";
import { Video, ResizeMode, VideoState,VideoFullscreenUpdateEvent,AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function Player() {
    const {id} = useLocalSearchParams();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const [loading, setLoading] = useState(true);

    const video = useRef<VideoState>();

    const manager = new response.ResponseManager();


    const onFullscreenChange = useCallback((event:VideoFullscreenUpdateEvent)=>{
      if(event.fullscreenUpdate == 3){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      }else{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
    },[])
    
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    },[])    
    


    useEffect(() => {
      async function getURL(id:any){
        let session = new SessionManager()
        let url = session.router_ep(id)
        let data = await session.get(url)
        data = manager.parse(data);

        setVideoUrl(data);
        setLoading(false)
      }
  
      getURL(id);
    },[]);

  if (loading) {
      return (
        <View className='w-full h-full justify-center items-center'>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }

 return (
    <View className='w-full h-full bg-black'>

      <Video
        style={styles.container}
        ref={video}
        source={{
          uri: videoUrl.urls[videoUrl.urls.length - 1],
        }}
        onLoad={onReadScreenChange}
        useNativeControls={true}
        shouldPlay={true}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onFullscreenUpdate={onFullscreenChange}
        
        />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    elevation:1,

  }
})