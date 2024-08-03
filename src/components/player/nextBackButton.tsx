

import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View,StyleSheet } from 'react-native';

export  function NextEpButton({nextEp,nextEpScreen}:{nextEp:EpsodiesProps|undefined,nextEpScreen:Function}) {
 return (
    <TouchableOpacity style={[styles.buttonStep,styles.forwardRigth,{opacity:nextEp?1:0.4}]}  
                        activeOpacity={0.6} onPressOut={()=>{nextEp && nextEp?nextEpScreen():null}}>
        <View className='rounded-full  p-4'  style={styles.opacity}>
            <AntDesign name="stepforward" size={25} color="white"  />
        </View> 
    </TouchableOpacity>
    
  );
}

export  function BackEpButton({nextEp}:{nextEp:EpsodiesProps|undefined}) {
 return (
    <TouchableOpacity style={[styles.buttonStep,styles.forwardLeft,{opacity:nextEp?1:0.4}]} activeOpacity={0.6}>
    <View className='rounded-full p-4' style={styles.opacity}>
        <AntDesign name="stepbackward" size={25} color="white" />
    </View>
    </TouchableOpacity>
   
  );
}




const styles = StyleSheet.create({ 
    opacity:{
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    buttonStep:{
      justifyContent:"center",
      height:"100%",
  
    },
    forwardLeft:{
      alignItems:"flex-end"
    }, 
    forwardRigth:{
      alignItems:"flex-start"
    },
   
  })