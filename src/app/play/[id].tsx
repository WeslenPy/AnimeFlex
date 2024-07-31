
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, Button, ActivityIndicator,StyleSheet,TouchableOpacity } from 'react-native';
import response from "../../api/animetv/response";
import { Video, ResizeMode, VideoState,VideoFullscreenUpdateEvent,AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '@/src/components/header/statusbar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';

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
    <View className='w-full h-full bg-black '>
    

      <View className='relative h-full'>
        <Video
          style={styles.container}
          ref={video}
          source={{
            uri: videoUrl.urls[videoUrl.urls.length - 1],
          }}
          onLoad={onReadScreenChange}
          useNativeControls={true}
          shouldPlay={true}
          resizeMode={ResizeMode.STRETCH}
          isLooping={false}
          onFullscreenUpdate={onFullscreenChange}
          >
          </Video>
          <View className='absolute flex h-full w-full '>

         

            <View  className='flex-row h-full w-full justify-center items-center p-2'>

              <View  style={styles.buttonBorder}>

                <TouchableOpacity>
                    <AntDesign name="arrowleft" size={30} color="white" />
                  </TouchableOpacity>
              </View>
            

              <TouchableOpacity style={[styles.button,styles.forwardLeft]}>
                <View style={styles.icon}>
                <Ionicons name="reload" size={80} color="white"  />

                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,styles.play]}> 
                <Feather name='play' color={"white"} size={80}></Feather>

              </TouchableOpacity>
              <TouchableOpacity style={[styles.button,styles.forwardRigth]}>
                <Ionicons name="reload" size={80} color="white" />

              </TouchableOpacity>

              <View  style={styles.buttonBorder}>
                <TouchableOpacity>
                    <Foundation name="arrows-out" size={30} color="white" />

                </TouchableOpacity>

              </View>
              
            </View>
          </View>

      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    elevation:1,

  },
  button:{
    flex:1,
    justifyContent:"center",
    height:"100%"
  },
  buttonBorder:{
    alignItems:"center",
    height:"100%",
    padding:10
  },
  play:{
    alignItems:"center"
  }, 
  forwardLeft:{
    alignItems:"flex-end"
  }, 
  forwardRigth:{
    alignItems:"flex-start"
  },
  icon:{
    transform: [{ scaleX: -1 }],
  }
})