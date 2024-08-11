
import { SessionManager } from '@/src/controller/api/animetv/session';
import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef,useMemo, useState,useCallback } from 'react';
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
import Info from '@/src/components/player/info';
import { PaperProvider } from 'react-native-paper';
import { AnimeQuery } from '@/src/controller/storage/database';

export default function Player() {
    useKeepAwake();


    const storage = new AnimeStorage()
    const storageDatabase = new AnimeQuery()
    const {id,current, back_id}= useLocalSearchParams<{ id: string,current: string,back_id:string}>();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const nextEp = useRef<EpsodiesProps>();


    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState(true);
    const [source, setSource] = useState("");
    const [lastPosition, setLastPosition] = useState(0);

    const [isFullScreen, setFullScreen] = useState(false);


    const [status,setStatus] = useState<AVPlaybackStatusSuccess>();

    const video = useRef<any>();
  
    const manager = new response.ResponseManager();
    const [currentIcon,setCurrentIcon] = useState<any>( <FontAwesome5 name="expand" size={20} color="white" />)

   

    useEffect(() => {
      if (buttons && status && status.isLoaded==true && status.isPlaying==true) {//
        let timer = setTimeout(async () => {
          setButtons(false);
          if (id && status){ await storage.setProgress(status.positionMillis,status.durationMillis,id)}

        }, 8000); 

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
        setFullScreen(true)

        return  setCurrentIcon(
          <FontAwesome5 name="expand" size={20} color="white" />
          )
        }else{
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
          setFullScreen(false)

          return setCurrentIcon(
            <FontAwesome5 name="expand" size={20} color="white" />
          )
      }
    }
      
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        setFullScreen(true)
        return  setCurrentIcon(
          <FontAwesome5 name="expand" size={20} color="white" />
          )
    },[])    
    

    useEffect(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      setFullScreen(true)

      async function getLastPosition(){
        const progress = await storage.getProgress(id)
        if (progress){
          setLastPosition(progress.positionActual)

        }

      }

      async function getThumb(video_id:number){
        let find  = await storageDatabase.getThumb(video_id)
        if (find && find.length>0){
          setSource(find[0].uri)
        }
      }

      async function getFile(){

        const result = await storageDatabase.getDownload(parseInt(id),true)

        if(result && result.length>0){
          const row = result[0]

          if (row.uri){
            const data:URLProps= {
              urls:[row.uri],
              sinop:"",
              video_id:row.video_id.toString(),
              category_id:row.anime_id.toString(),
              title:row.title,
            }

            return data

          }
        }
        return false

      }

      async function getURL(id:any){
  
        let session = new SessionManager()

        let data:URLProps|boolean = await getFile()
        if (!data){
          let url = session.router_ep(id)
          let result = await session.get(url)
          data = manager.parse(result);
          console.log(data)


        }

        if (data){

          let url_cat_id = session.router_cat_id(data.category_id)
  
          let data_cat:EpsodiesProps[] = await session.get(url_cat_id)
          
  
          data_cat  =data_cat.reverse()
  
          if(current){
            let currentIndex = parseInt(current)
            if (currentIndex <data_cat.length-1 ){
  
              let newIndex = currentIndex+1
    
              data_cat[newIndex].index_id=newIndex
  
              if (currentIndex>0 && currentIndex <=data_cat.length){
                data_cat[newIndex].back_ep=data_cat[currentIndex-1].video_id
                data_cat[newIndex].back_id=currentIndex-1
              }
              nextEp.current= data_cat[newIndex]
            }

          }

          setVideoUrl(data);
          setLoading(false)


        }
        
     
      }
      
      getLastPosition()
      getThumb(parseInt(id))
      getURL(id);

      
    },[]);


    function nextEpScreen(){
      if(nextEp.current && nextEp.current.index_id && video.current){
        video.current.pauseAsync()
        video.current.stopAsync()
        // video.current.unloadAsync()
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
  <PaperProvider>

    <GestureHandlerRootView>
        <View className='w-full h-full bg-black '   style={[styles.container,]}>
        
          <StatusBar translucent={true} hidden={true}/>

          <View className='relative ' style={isFullScreen?styles.landscape:styles.portrait}>
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
              volume={1.0}
              shouldCorrectPitch={true}
              posterSource={{uri:source}}
              usePoster={true}
              positionMillis={lastPosition? lastPosition:0}

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
          {!isFullScreen &&
          <Info ></Info>
          }
          
        </View>
      </GestureHandlerRootView>
    </PaperProvider>

  );
}


const styles = StyleSheet.create({
  portrait:{
    height:"30%",

  },
  landscape:{
    height:"100%"
  },

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