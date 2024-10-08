

import { AntDesign } from '@expo/vector-icons';
import { AVPlaybackStatusSuccess } from 'expo-av';
import { TouchableOpacity, View,StyleSheet } from 'react-native';

export default function PlayButton({pauseOrPlayVideo,status}:{pauseOrPlayVideo:any,status:AVPlaybackStatusSuccess|undefined}) {
 return (
  
    <View style={[styles.play,styles.button]} >
      <TouchableOpacity activeOpacity={0.6} onPressOut={pauseOrPlayVideo} style={{marginLeft:50, marginRight:50}}> 
          <View className='rounded-full p-4 justify-center items-center '  style={styles.opacity}>
              <AntDesign name={!status || !status.isPlaying? 'caretright': "pause"} color={"white"} size={40} />

          </View>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    opacity:{
        backgroundColor:"rgba(0,0,0,0.4)"
      },
    button:{
      justifyContent:"center",
      alignItems:"center"
    },
   
    play:{
      alignItems:"center",
      justifyContent:"center",
      // backgroundColor:"black",


    }, 
    
  })