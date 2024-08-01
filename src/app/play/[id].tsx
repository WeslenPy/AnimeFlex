
import { SessionManager } from '@/src/api/animetv/session';
import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams,useGlobalSearchParams } from 'expo-router';
import { useEffect, useRef, useState,useCallback } from 'react';
import {  View, Text, ActivityIndicator,StyleSheet,TouchableOpacity ,Animated} from 'react-native';
import response from "../../api/animetv/response";
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

export default function Player() {
    useKeepAwake();
    const {id,current, back_id}= useLocalSearchParams<{ id: string,current: string,back_id:string}>();


    const [videoUrl, setVideoUrl] = useState<URLProps>();
    const nextEp = useRef<EpsodiesProps>();


    const [loading, setLoading] = useState(true);
    const [buttons, setButtons] = useState(false);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess>();

    const video = useRef<any>();
    const [currentIcon,setCurrentIcon] = useState<any>(  <FontAwesome5 name="compress-arrows-alt" size={30} color="white" />)

    const rotationLeft = useRef(new Animated.Value(0)).current;
    const rotationRight = useRef(new Animated.Value(0)).current;

    const rotateButton = (direction:string) => {
      const rotation = direction === 'left' ? rotationLeft : rotationRight;
      const toValue = 1
  
      Animated.timing(rotation, {
        toValue,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(rotation, {
          toValue: 0,
          duration: 500,
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


    useEffect(() => {

      if (buttons && status && status.isLoaded==true && status.isPlaying==true) {
        let timer = setTimeout(() => {
          setButtons(false);
        }, 5000); 

        return () => clearTimeout(timer); 
      }


    }, [buttons]);

    


    async function onChangeScreen(){
        let result  = await ScreenOrientation.getOrientationLockAsync()

      if(result == 2){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        return  setCurrentIcon(
          <FontAwesome5 name="compress-arrows-alt" size={30} color="white" />
          )
        }else{
          ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
          return setCurrentIcon(
            <Foundation name="arrows-out" size={30} color="white" />
          )
      }
    }


    const onFullscreenChange = useCallback(async(event:VideoFullscreenUpdateEvent)=>{
      await onChangeScreen();
    },[])
    
    const setPausedCallback = useCallback(async(event:any)=>{
      if (event.didJustFinish==true && nextEp.current && nextEp.current.index_id){
        openScreenPlayer(nextEp.current.video_id,nextEp.current.index_id.toString(),back_id)
    }
      setStatus(event)
    },[])
    
    const onReadScreenChange = useCallback((event:any)=>{
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        return  setCurrentIcon(
          <FontAwesome5 name="compress-arrows-alt" size={30} color="white" />
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
        }
    }

  }


    function backRouter(){
      deactivateKeepAwake()
      if (back_id){
        openScreenAnime(back_id)

      }else{router.back()}
    }


    useEffect(() => {
      async function getURL(id:any){
        let session = new SessionManager()

        let url = session.router_ep(id)
        let data = await session.get(url)
        
        
        let url_cat_id = session.router_cat_id(data[0].category_id)

        let data_cat:EpsodiesProps[] = await session.get(url_cat_id)
        
        data = manager.parse(data);

        data_cat  =data_cat.reverse()

        let currentIndex = parseInt(current)
        if (currentIndex <data_cat.length-1 ){

          data_cat[currentIndex+1].index_id=currentIndex+1
          nextEp.current = data_cat[currentIndex+1]
            
        }

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
              <View  className='flex-row h-full w-full first-letter items-center p-2 justify-between'>

                <View  style={styles.buttonBorder}>

                  <TouchableOpacity onPress={backRouter}>
                      <AntDesign name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                {status && status.isLoaded==true ?
                <>

                <TouchableOpacity style={[styles.button,styles.forwardLeft]} activeOpacity={0.2} onPressOut={()=>{progressPlay(-10);rotateButton("left")}} >
                  <Animated.View style={{ transform: [{ scaleX: -1 },{rotate:rotationInterpolateLeft}],}} >
                    <Ionicons name="reload" size={80} color="white"  />

                  </Animated.View>
                </TouchableOpacity>

              
                
                <TouchableOpacity style={[styles.button,styles.play]} onPressOut={pauseOrPlayVideo}> 
                  <Feather name={!status || !status.isPlaying? 'play': "pause"} color={"white"} size={80}></Feather>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,styles.forwardRigth]} onPressOut={()=>{progressPlay(10);rotateButton("rigth")}}>
                  <Animated.View style={{transform:[{rotate:rotationInterpolateRigth}]}}>
                    <Ionicons name="reload" size={80} color="white" />

                  </Animated.View>

                </TouchableOpacity>

                </>:
                <View className='mb-4'>
                  <ActivityIndicator size={50} color="orange" />
                </View>
                }

                <View  style={styles.buttonBorder} >
                  <TouchableOpacity onPressOut={onChangeScreen} >
                    {currentIcon}

                  </TouchableOpacity>

                </View>

              </View>
                <View className=' w-full p-4 bottom-28 flex-row '>
                  <Text className='text-white'>{formatTime(status?status.positionMillis:0)}</Text>

                  <Slider minimumValue={0} maximumValue={status?status.durationMillis:0} value={status?status.positionMillis:0} 
                        style={{flex:1}} thumbTintColor={"red"} minimumTrackTintColor='red' maximumTrackTintColor='#24221d'
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