
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, Text, ActivityIndicator,StyleSheet,TouchableOpacity } from 'react-native';
import response from "../../api/animetv/response";
import { Video, ResizeMode, VideoState,VideoFullscreenUpdateEvent,AVPlaybackStatus,AVPlaybackStatusSuccess } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from "expo-router";
import Slider from '@react-native-community/slider';


export default function Player() {
    const {id} = useLocalSearchParams();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState(false);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess>();

    const video = useRef<any>();

    const manager = new response.ResponseManager();


    useEffect(() => {
      if (buttons) {
        let timer = setTimeout(() => {
          setButtons(false);
        }, 5000); //5s

        return () => clearTimeout(timer); 
      }
    }, [buttons]);


    const getCurrentState = useCallback(async()=>{
       return  await ScreenOrientation.getOrientationLockAsync()
    },[])


    async function onChangeScreen(){
        let result  = await ScreenOrientation.getOrientationLockAsync()

      if(result == 2){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      }else{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
      }
    }


    const onFullscreenChange = useCallback(async(event:VideoFullscreenUpdateEvent)=>{
      await onChangeScreen();
    },[])
    
    const setPausedCallback = useCallback(async(event:any)=>{
      setStatus(event)
    },[])
    
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    },[])    
    

    function pauseOrPlayVideo(){
      if (status && video && status.isPlaying ){video.current.pauseAsync()}else {video.current.playAsync()}
    }


    function progressPlay(milles:number,convert=true){
      if (video.current && status) {
        if (status.isLoaded) {
          milles = convert?(milles*1000):milles
          let newPosition = status.positionMillis + milles; // 10 segundos em milissegundos
          if (newPosition > video.current.durationMillis) {
            let newPosition = status.durationMillis; // Evita avançar além da duração do vídeo
          }
          video.current.setPositionAsync(newPosition);
        }
    }
  }

    function backRouter(){
      router.back()
    }


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



  const formatTime = (milliseconds:number) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
    
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      let mount = ""

      if (formattedHours !="00"){mount+=`${formattedHours}:`}


      mount+=`${formattedHours!="00"?":":""}${formattedMinutes}`
      mount+=`:${formattedMinutes!="00"?":":""}${formattedSeconds}`

      return mount?mount:"00:00"
    
    };
    

  if (loading) {
      return (
        <View className='w-full h-full justify-center items-center'>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }

 return (
    <View className='w-full h-full bg-black '   style={[styles.container]}>
    

      <View className='relative h-full'>
        <Video
          style={[StyleSheet.absoluteFillObject]}
          ref={video}
          source={{
            uri: videoUrl.urls[videoUrl.urls.length - 1],
          }}
          onLoad={onReadScreenChange}
          useNativeControls={false}
          shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          onFullscreenUpdate={onFullscreenChange}
          onPlaybackStatusUpdate={setPausedCallback}
          >
          </Video>
          <View className='absolute flex h-full w-full  '>


            {buttons==true? 
            <View>
              <View  className='flex-row h-full w-full justify-center items-center p-2'>

                <View  style={styles.buttonBorder}>

                  <TouchableOpacity onPress={backRouter}>
                      <AntDesign name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>
                </View>
              

                <TouchableOpacity style={[styles.button,styles.forwardLeft]} onPressOut={()=>{progressPlay(-10)}}>
                  <View style={styles.icon}>
                  <Ionicons name="reload" size={80} color="white"  />

                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.play]} onPress={pauseOrPlayVideo}> 
                  <Feather name={!status || !status.isPlaying? 'play': "pause"} color={"white"} size={80}></Feather>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.forwardRigth]} onPressOut={()=>{progressPlay(10)}}>
                  <Ionicons name="reload" size={80} color="white" />

                </TouchableOpacity>

                <View  style={styles.buttonBorder} >
                  <TouchableOpacity onPress={onChangeScreen} >
                      <Foundation name="arrows-out" size={30} color="white" />

                  </TouchableOpacity>

                </View>

              </View>
                <View className=' w-full p-4 bottom-28 flex-row '>
                  <Text className='text-white'>{formatTime(status?status.positionMillis:0)}</Text>

                  <Slider minimumValue={0} maximumValue={status?status.durationMillis:0} value={status?status.positionMillis:0} 
                        style={{flex:1}} thumbTintColor={"red"} minimumTrackTintColor='red'
                        onValueChange={(x)=>{video.current.setPositionAsync(x);}}></Slider>

                  <Text className='text-white'>{formatTime(status?status.durationMillis:0)}</Text>
                  
                </View>
              </View>
                :<View className='flex-row h-full w-full'><TouchableOpacity style={styles.buttonFull} onPress={()=>{setButtons(true)}}></TouchableOpacity></View>
              }
              
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
  buttonFull:{
    flex:1,
    width:"100%",
    height:"100%",

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