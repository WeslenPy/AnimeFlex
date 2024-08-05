import { TouchableOpacity, View,Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { formatTime } from '@/src/utils/time';

import { AVPlaybackStatusSuccess,  Video } from 'expo-av';

export default function BottomButtons(
                  {status,video,currentIcon,onChangeScreen}:{
                  status:AVPlaybackStatusSuccess|undefined,video:Video|undefined,
                  currentIcon:any,onChangeScreen:any
               }) {
    

 return (
   
    <View className='flex-col  gap-2'>
        <View className='justify-end items-end mx-3'>
            <TouchableOpacity  onPressOut={onChangeScreen} >
                {currentIcon}
            </TouchableOpacity>
        </View>
        <View className='flex-row mb-5 mx-3 ml-3'>
            <Text className='text-white'>{formatTime(status?status.positionMillis:0)}</Text>

            <Slider minimumValue={0} maximumValue={status?status.durationMillis:0}
                     value={status?status.positionMillis:0} style={{flex:1}}
                     thumbTintColor={"red"} minimumTrackTintColor='red' maximumTrackTintColor='#24221d'
                      onValueChange={(x)=>{video?video.setPositionAsync(x):null;}}></Slider>

            <Text className='text-white'>{formatTime(status&& status.durationMillis?status.durationMillis:0)}</Text>
        
        </View>
    </View>
  );
}