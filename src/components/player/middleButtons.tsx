import { EpsodiesProps } from '@/src/interfaces/anime';
import { openScreenPlayer } from '@/src/utils/screen';
import { AVPlaybackStatusSuccess, Video } from 'expo-av';
import { View} from 'react-native';

import PlayButton from './playButton';
import { NextEpButton,BackEpButton } from './nextBackButton';
import { LeftFowardButton,RigthFowardButton } from './avancedPlayer';

export default function MiddleButtons({status,video,nextEp,backId,progressPlay}:{
                                  status:AVPlaybackStatusSuccess|undefined,video:Video|undefined,
                                  nextEp:EpsodiesProps|undefined,backId:string|undefined,
                                  progressPlay:any}) {
  
    function nextEpScreen(){
        if(nextEp && nextEp.index_id && video){
          video.pauseAsync()
          openScreenPlayer(nextEp.video_id,nextEp.index_id.toString(),backId)
        }
      }
  
      
    function pauseOrPlayVideo(){
        if (status && video && status.isPlaying ){video.pauseAsync()}else if (video) {video.playAsync()}
      }
  
    
 return (
   
    
  <View className='flex-row'>
      <LeftFowardButton progressPlay={progressPlay}></LeftFowardButton>
      <BackEpButton nextEp={nextEp} ></BackEpButton>
      <PlayButton status={status} pauseOrPlayVideo={pauseOrPlayVideo}></PlayButton>
      <NextEpButton nextEp={nextEp}  nextEpScreen={nextEpScreen}></NextEpButton>
      <RigthFowardButton progressPlay={progressPlay}></RigthFowardButton>
    </View>
  );
}