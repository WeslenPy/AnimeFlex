

import { AntDesign } from '@expo/vector-icons';
import { AVPlaybackStatusSuccess } from 'expo-av';
import { TouchableOpacity, View,StyleSheet } from 'react-native';

export default function PlayButton({pauseOrPlayVideo,status}:{pauseOrPlayVideo:any,status:AVPlaybackStatusSuccess|undefined}) {
 return (
  
    <TouchableOpacity style={[styles.button,styles.play]} activeOpacity={0.6} onPressOut={pauseOrPlayVideo}> 
        <View className='rounded-full p-4 justify-center items-center'  style={styles.opacity}>
            <AntDesign name={!status || !status.isPlaying? 'caretright': "pause"} color={"white"} size={60} />

        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    opacity:{
        backgroundColor:"rgba(0,0,0,0.4)"
      },
    button:{
      flex:1,
      justifyContent:"center",
      height:"100%",
      alignItems:"center"
    },
   
    play:{
      alignItems:"center"
    }, 
    
  })