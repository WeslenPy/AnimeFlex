
import { SessionManager } from '@/src/controller/api/animetv/session';
import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, ActivityIndicator,StyleSheet} from 'react-native';
import response from "@/src/controller/api/animetv/response";
import { Video, ResizeMode, VideoFullscreenUpdateEvent,AVPlaybackStatusSuccess } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

import { useKeepAwake } from 'expo-keep-awake';
import {StatusBar} from 'expo-status-bar';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { openScreenPlayer } from '@/src/utils/screen';
import AnimeStorage from '@/src/controller/storage/manager';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Frame from '@/src/components/player/frame';

export default function Player() {
    useKeepAwake();

    const storage = new AnimeStorage()
    const {id,current, back_id}= useLocalSearchParams<{ id: string,current: string,back_id:string}>();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const nextEp = useRef<EpsodiesProps>();


    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState(true);


    const [status,setStatus] = useState<AVPlaybackStatusSuccess>();

    const video = useRef<any>();
  
    const manager = new response.ResponseManager();
    const [currentIcon,setCurrentIcon] = useState<any>( <FontAwesome5 name="expand" size={20} color="white" />)

   

    useEffect(() => {
      if (buttons ) {//&& status && status.isLoaded==true && status.isPlaying==true
        let timer = setTimeout(async () => {
          setButtons(false);
          if (id && status){ await storage.setProgress(status.positionMillis,status.durationMillis,id)}

        }, 5000); 

        return () => {clearTimeout(timer);};  
      }

    }, [buttons]);   
    
    useEffect(() => {

      let interval = setInterval(async () => {
          if (id && status){ await storage.setProgress(status.positionMillis,status.durationMillis,id)}
        }, 1000)

      return () => clearInterval(interval);  

      },[status])
    


    const onFullscreenChange = useCallback(async(event:VideoFullscreenUpdateEvent)=>{
      await onChangeScreen();
    },[])
    
    const setPausedCallback = useCallback(async(event:any)=>{
      if (event.didJustFinish==true){
        nextEpScreen()
      }
      
      setStatus(event)

    },[])

    async function onChangeScreen(){
      let result  = await ScreenOrientation.getOrientationLockAsync()

      if(result == 2){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        return  setCurrentIcon(
          <FontAwesome5 name="expand" size={20} color="white" />
          )
        }else{
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
          return setCurrentIcon(
            <FontAwesome5 name="expand" size={20} color="white" />
          )
      }
    }
      
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        return  setCurrentIcon(
          <FontAwesome5 name="expand" size={20} color="white" />
          )
    },[])    
    

    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)

      async function getURL(id:any){
        let session = new SessionManager()

        let url = session.router_ep(id)
        let data = await session.get(url)
        
        
        let url_cat_id = session.router_cat_id(data[0].category_id)

        let data_cat:EpsodiesProps[] = await session.get(url_cat_id)
        
        data = manager.parse(data);

        data_cat  =data_cat.reverse()

        if(current){
          let currentIndex = parseInt(current)
          if (currentIndex <data_cat.length-1 ){
  
            data_cat[currentIndex+1].index_id=currentIndex+1
            nextEp.current= data_cat[currentIndex+1]
              
          }
        }

        setVideoUrl(data);
        setLoading(false)
      }
  
      getURL(id);
    },[]);


    function nextEpScreen(){
      if(nextEp.current && nextEp.current.index_id && video.current){
        video.current.pauseAsync()
        openScreenPlayer(nextEp.current.video_id,nextEp.current.index_id.toString(),back_id)
      }
    }


    

  if (loading ) {
      return (
        <View className='w-full h-full justify-center items-center bg-black'>
          <ActivityIndicator size={50} color="orange" />
        </View>
      );
    }
 return (
      <View className='w-full h-full bg-black '   style={[styles.container]}>
      
        <StatusBar translucent={true} hidden={true}/>

        <View className='relative h-full'>
          <Video
            style={[StyleSheet.absoluteFillObject]}
            ref={video}
            source={{
              uri: videoUrl?videoUrl.urls[videoUrl.urls.length - 1]:"",
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

            <Frame
              backId={back_id} 
              status={status} 
              setState={setButtons}
              nextEp={nextEp.current} 
              video={video.current} 
              buttons={buttons}
              videoURL={videoUrl}
              currentIcon={currentIcon}
              onChangeScreen={onChangeScreen}
              ></Frame>
          

        </View>
        
      </View>
  );
}


const styles = StyleSheet.create({
  opacity:{
    backgroundColor:"rgba(0,0,0,0.4)"
  },
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
    height:"100%",
    alignItems:"center"
  },
  buttonStep:{
    justifyContent:"center",
    height:"100%",

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
  },
  bording:{
    borderRadius:10,
    backgroundColor:"#ffff"
  }
})