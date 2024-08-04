import { View } from 'react-native';
import BottomButtons from '@/src/components/player/bottomButtons';
import TopButtons from '@/src/components/player/topButtons';
import MiddleButtons from '@/src/components/player/middleButtons';
import Loading from '@/src/components/player/loading';
import HideButtons from './hideButtons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AVPlaybackStatusSuccess, Video } from 'expo-av';
import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import GestureTap from './gestureTap';


export default function Frame(
    {
        status,video,buttons,
        setState,nextEp,backId,videoURL,
        currentIcon,onChangeScreen
    }:{
        status:AVPlaybackStatusSuccess|undefined,
        video:Video|undefined,buttons:boolean,
        setState:any,nextEp:EpsodiesProps|undefined,
        backId:string|undefined,videoURL:URLProps|undefined,
        currentIcon:any,onChangeScreen:any

}) {


    

  function progressPlay(milles:number,convert=true){
    
    if (video && status) {
      if (status.isLoaded && status.durationMillis) {
        milles = convert?(milles*1000):milles

        let newPosition = status.positionMillis + milles; // 10 segundos em milissegundos
        if (newPosition >= status.durationMillis) {
            newPosition = status.durationMillis; 
        }

        video.setPositionAsync(newPosition);
        video.playAsync()

        let timer = setTimeout(() => {
            setState(false);
        }, 1000); 

        return () => clearTimeout(timer); 
      }
  }}


 return (
    <SafeAreaView style={{flex:1}}>

    <View className='flex h-full w-full relative ' 
           style={{backgroundColor:buttons? "rgba(0,0,0,0.7)":"rgba(0,0,0,0)"}}>

            {buttons ?
            <View className='flex-col justify-between h-full'>

                <TopButtons backId={backId} videoURL={videoURL}></TopButtons>

                {status && status.isLoaded==true ?

                <MiddleButtons backId={backId} status={status}  setState={setState}
                                nextEp={nextEp} video={video}  buttons={buttons} 
                                progressPlay={progressPlay}></MiddleButtons>

                : <Loading></Loading>}

                <BottomButtons currentIcon={currentIcon} 
                                onChangeScreen={onChangeScreen} 
                                status={status} video={video}></BottomButtons>

            </View>
            :
                <HideButtons video={video} buttons={buttons}
                           progressPlay={progressPlay} setState={setState}></HideButtons>
            }

              
      <GestureTap setState={setState} buttons={buttons}></GestureTap>
    </View>

    </SafeAreaView>

  );
}