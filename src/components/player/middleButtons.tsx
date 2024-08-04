import { EpsodiesProps } from '@/src/interfaces/anime';
import { openScreenPlayer } from '@/src/utils/screen';
import { AVPlaybackStatusSuccess, Video } from 'expo-av';
import { View} from 'react-native';

import PlayButton from './playButton';
import { NextEpButton,BackEpButton } from './nextBackButton';
import { LeftFowardButton,RigthFowardButton } from './avancedPlayer';
import GestureTap from './gestureTap';


export default function MiddleButtons({status,video,nextEp,backId,progressPlay,setState,buttons}:{
                                  status:AVPlaybackStatusSuccess|undefined,video:Video|undefined,
                                  nextEp:EpsodiesProps|undefined,backId:string|undefined,
                                  progressPlay:any,setState:any,buttons:boolean}) {
  
    function nextEpScreen(video_id:number|string){
      if(!video_id){
          if(nextEp && nextEp.video_id){
            video_id = nextEp.video_id
          
          }
        }

        if (video_id && video && nextEp){
            video.pauseAsync()
            openScreenPlayer(video_id,nextEp.index_id.toString(),backId)

        }
      }
  
      
    function pauseOrPlayVideo(){
        if (status && video && status.isPlaying ){video.pauseAsync()}else if (video) {video.playAsync()}
      }
  
    
 return (
   
    
  <View className='flex-row relative'>
      <LeftFowardButton buttons={buttons} setState={setState} progressPlay={progressPlay}></LeftFowardButton>
      <BackEpButton nextEpScreen={nextEpScreen} nextEp={nextEp} ></BackEpButton>
      <PlayButton status={status} pauseOrPlayVideo={pauseOrPlayVideo}></PlayButton>
      <NextEpButton nextEp={nextEp}  nextEpScreen={nextEpScreen}></NextEpButton>
      <RigthFowardButton video={video} buttons={buttons} setState={setState} progressPlay={progressPlay}></RigthFowardButton>

      <GestureTap setState={setState} buttons={buttons}></GestureTap>
    </View>
  );
}