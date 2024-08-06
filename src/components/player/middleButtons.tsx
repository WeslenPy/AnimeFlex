import { EpsodiesProps } from '@/src/interfaces/anime';
import { openScreenPlayer } from '@/src/utils/screen';
import { AVPlaybackStatusSuccess, Video } from 'expo-av';
import { View} from 'react-native';

import PlayButton from './playButton';
import { NextEpButton,BackEpButton } from './nextBackButton';
import { LeftFowardButton,RigthFowardButton } from './avancedPlayer';


export default function MiddleButtons({status,video,nextEp,backId,progressPlay,setState,buttons,setIndicator}:{
                                  status:AVPlaybackStatusSuccess|undefined,video:Video|undefined,
                                  nextEp:EpsodiesProps|undefined,backId:string|undefined,
                                  progressPlay:any,setState:any,buttons:boolean,setIndicator:any}) {
  
    function nextEpScreen(backEp=false){

      if (nextEp && video){
        let video_id = nextEp.video_id
        let index_id = nextEp.index_id

        if(backEp ===true ){
            video_id = nextEp.back_ep? nextEp.back_ep.toString() :""
            index_id = nextEp.back_id? nextEp.back_id :0
        }

        video.pauseAsync()
        openScreenPlayer(video_id,index_id.toString(),backId)


     }
      }

  
      
    function pauseOrPlayVideo(){
        if (status && video && status.isPlaying ){video.pauseAsync()}else if (video) {video.playAsync()}
      }
  
    
 return (
   
    
  <View className='flex-row '>
      <LeftFowardButton buttons={buttons} setState={setState} progressPlay={progressPlay} ></LeftFowardButton>
      <BackEpButton nextEpScreen={nextEpScreen} nextEp={nextEp} ></BackEpButton>
      <PlayButton status={status} pauseOrPlayVideo={pauseOrPlayVideo}></PlayButton>
      <NextEpButton nextEp={nextEp}  nextEpScreen={nextEpScreen}></NextEpButton>
      <RigthFowardButton video={video} buttons={buttons} setState={setState} progressPlay={progressPlay} setIndicator={setIndicator}></RigthFowardButton>

    </View>
  );
}