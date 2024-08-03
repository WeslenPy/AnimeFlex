import { TouchableOpacity, View,StyleSheet } from 'react-native';
import { LeftFowardButton,RigthFowardButton } from './avancedPlayer';



export default function HideButtons({setState,progressPlay}:{setState:any,progressPlay:any}) {
 return (
    <View className='flex-row h-full w-full'>
        <TouchableOpacity style={styles.buttonFull} onPress={()=>{setState(true)}}>
          <View className='flex-row w-full h-full justify-between'>
            <LeftFowardButton progressPlay={progressPlay}></LeftFowardButton>
            <View className='w-52'></View>
            <RigthFowardButton progressPlay={progressPlay}></RigthFowardButton>
          </View>

        </TouchableOpacity>
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