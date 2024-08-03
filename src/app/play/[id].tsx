
import { SessionManager } from '@/src/controller/api/animetv/session';
import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, Text, ActivityIndicator,StyleSheet,TouchableOpacity ,Animated } from 'react-native';
import response from "@/src/controller/api/animetv/response";
import { Video, ResizeMode, VideoFullscreenUpdateEvent,AVPlaybackStatusSuccess } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from "expo-router";
import Slider from '@react-native-community/slider';
import { useKeepAwake,deactivateKeepAwake } from 'expo-keep-awake';
import {StatusBar} from 'expo-status-bar';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { openScreenPlayer } from '@/src/utils/screen';
import openScreenAnime from '@/src/utils/screen';
import Fontisto from '@expo/vector-icons/Fontisto';
import AnimeStorage from '@/src/controller/storage/manager';


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
    const [currentIcon,setCurrentIcon] = useState<any>( <FontAwesome5 name="expand" size={20} color="white" />)

    const rotationLeft = useRef(new Animated.Value(0)).current;
    const rotationRight = useRef(new Animated.Value(0)).current;

    const rotateButton = (direction:string) => {
      const rotation = direction === 'left' ? rotationLeft : rotationRight;
      const toValue = 1
  
      Animated.timing(rotation, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(rotation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };
  
  
  const rotationInterpolateLeft = rotationLeft.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
    
  const rotationInterpolateRigth = rotationRight.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });
  


    const manager = new response.ResponseManager();


    // useEffect(() => {
    //   if (buttons ) {//&& status && status.isLoaded==true && status.isPlaying==true
    //     let timer = setTimeout(async () => {
    //       setButtons(false);
    //       if (id && status){ await storage.setProgress(status.positionMillis,status.durationMillis,id)}

    //     }, 5000); 

    //     return () => {clearTimeout(timer);};  
    //   }

    // }, [buttons]);   
    
    useEffect(() => {

      let interval = setInterval(async () => {
          if (id && status){ await storage.setProgress(status.positionMillis,status.durationMillis,id)}
        }, 1000)

      return () => clearInterval(interval);  

      },[status])


    


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


    const onFullscreenChange = useCallback(async(event:VideoFullscreenUpdateEvent)=>{
      await onChangeScreen();
    },[])
    
    const setPausedCallback = useCallback(async(event:any)=>{
      if (event.didJustFinish==true){
        nextEpScreen()
      }
      
      setStatus(event)

    },[])
    
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        return  setCurrentIcon(
          <FontAwesome5 name="expand" size={20} color="white" />
          )
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
          video.current.playAsync()

          let timer = setTimeout(() => {
            setButtons(false);
          }, 1000); 
  
          return () => clearTimeout(timer); 
        }
    }

  }

    function nextEpScreen(){
      if(nextEp.current && nextEp.current.index_id){
        video.current.pauseAsync()
        openScreenPlayer(nextEp.current.video_id,nextEp.current.index_id.toString(),back_id)
      }
    }


    function backRouter(){
      deactivateKeepAwake()
      if (back_id){
        openScreenAnime(back_id)

      }else{router.back()}
    }


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
            nextEp.current = data_cat[currentIndex+1]
              
          }
        }

        setVideoUrl(data);
        setLoading(false)
      }
  
      getURL(id);
    },[]);



  const formatTime = (milliseconds:any) => {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
    
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');

      let mount = ""

      if (formattedHours !="00"){mount+=`${formattedHours}`}


      mount+=`${formattedHours!="00"?":":""}${formattedMinutes}`
      mount+=`:${formattedSeconds}`

      return mount!="0000"?mount.replace("::",":"):"00:00"
    
    };
    

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
          <View className='absolute flex h-full w-full  '>


            {buttons==true? 
            <View>
              <View  className='flex-col h-full w-full justify-between p-2'>

                <View className='flex-row justify-between w-full p-3'>

                    <TouchableOpacity onPress={backRouter}>
                        <AntDesign name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>


                    <View className='flex-row'>

                      {nextEp && nextEp.current?
                        <View className='mx-5'>
                          <TouchableOpacity onPressOut={nextEpScreen} >
                            <Fontisto name="step-forward" size={28} color="white" />
                          </TouchableOpacity>

                        </View>
                      :<></>}


                  </View>
                  
                </View>

                {status && status.isLoaded==true ?

                <View className='flex-row'>

                  <TouchableOpacity style={[styles.button]} activeOpacity={0.6}  onPressOut={()=>{progressPlay(-10);rotateButton("left")}} >
                    <Animated.View style={{ transform: [{ scaleX: -1 },{rotate:rotationInterpolateLeft}],opacity:0}} >
                      <Ionicons name="reload" size={80} color="white"  />

                    </Animated.View>
                  </TouchableOpacity>

                   <TouchableOpacity style={[styles.buttonStep,styles.forwardLeft]} activeOpacity={0.6}>
                    <View className='rounded-full p-4' style={styles.opacity}>
                      <AntDesign name="stepbackward" size={25} color="white" />
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.button,styles.play]} activeOpacity={0.6} onPressOut={pauseOrPlayVideo}> 
                    <View className='rounded-full p-4 justify-center items-center'  style={styles.opacity}>
                      <AntDesign name={!status || !status.isPlaying? 'caretright': "pause"} color={"white"} size={60} />

                    </View>

                  </TouchableOpacity>

                  
                  <TouchableOpacity style={[styles.buttonStep,styles.forwardRigth]}  activeOpacity={0.6} >
                    <View className='rounded-full  p-4'  style={styles.opacity}>
                      <AntDesign name="stepforward" size={25} color="white"  />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button]} onPressOut={()=>{progressPlay(10);rotateButton("rigth")}}>
                    <Animated.View style={{transform:[{rotate:rotationInterpolateRigth}],opacity:0}} >
                      <Ionicons name="reload" size={80} color="white" />

                    </Animated.View>

                  </TouchableOpacity>
                </View>:
                <View className='flex-row w-full items-center justify-center'>
                  <ActivityIndicator size={50} color="orange" />
                </View>
                }


                <View className='flex-col  w-full p-2 gap-2'>
                  <View className='justify-end items-end'>
                    <TouchableOpacity  onPressOut={onChangeScreen} >
                          {currentIcon}
                        </TouchableOpacity>
                  </View>
                  <View className='flex-row'>
                      <Text className='text-white'>{formatTime(status?status.positionMillis:0)}</Text>

                      <Slider minimumValue={0} maximumValue={status?status.durationMillis:0} value={status?status.positionMillis:0} 
                            style={{flex:1}} thumbTintColor={"red"} minimumTrackTintColor='red' maximumTrackTintColor='#24221d'
                            onValueChange={(x)=>{video.current.setPositionAsync(x);}}></Slider>

                      <Text className='text-white'>{formatTime(status?status.durationMillis:0)}</Text>
                    
                  </View>
                  </View>
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