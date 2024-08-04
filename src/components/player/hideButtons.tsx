import {  View,StyleSheet } from 'react-native';
import { LeftFowardButton,RigthFowardButton } from './avancedPlayer';
import { Video } from 'expo-av';


export default function HideButtons({setState,progressPlay,buttons,video}:{setState:any,progressPlay:any,buttons:boolean,video:Video|undefined}) {


 return (
      <View className='flex-row' >
        <View  style={styles.buttonFull}>
          <View className='flex-row w-full h-full justify-between '>
            <LeftFowardButton buttons={buttons} setState={setState} progressPlay={progressPlay}></LeftFowardButton>
            <RigthFowardButton video={video} buttons={buttons}  setState={setState} progressPlay={progressPlay}></RigthFowardButton>
          </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({

  buttonFull:{
    flex:1,
    width:"100%",
    height:"100%",

  },
 
})