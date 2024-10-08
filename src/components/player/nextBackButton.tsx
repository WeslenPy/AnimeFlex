

import { EpsodiesProps, URLProps } from '@/src/interfaces/anime';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View,StyleSheet } from 'react-native';

export  function NextEpButton({nextEp,nextEpScreen}:{nextEp:EpsodiesProps|undefined,nextEpScreen:Function}) {
 return (
  <View style={styles.buttonStep}>
    <TouchableOpacity style={[styles.forwardRigth,{opacity:nextEp?1:0.4}]}  
                        activeOpacity={0.6} onPressOut={()=>{nextEp && nextEp?nextEpScreen():null}}>
        <View className='rounded-full  p-4'  style={styles.opacity}>
            <AntDesign name="stepforward" size={18} color="white"  />
        </View> 
    </TouchableOpacity>
  </View>
    
  );
}

export  function BackEpButton({nextEp,nextEpScreen}:{nextEp:EpsodiesProps|undefined,nextEpScreen:Function}) {
 return (
  <View style={styles.buttonStep}>
      <TouchableOpacity style={[styles.forwardLeft,{opacity:nextEp?.back_ep?1:0.4}]} 
                      activeOpacity={0.6} onPressOut={()=>{nextEp && nextEp.back_ep?nextEpScreen(true):null}}>
      <View className='rounded-full p-4' style={styles.opacity}>
          <AntDesign name="stepbackward" size={18} color="white" />
      </View>
      </TouchableOpacity>
  </View>
   
  );
}




const styles = StyleSheet.create({ 
    opacity:{
        backgroundColor:"rgba(0,0,0,0.4)"
    },
    buttonStep:{
      justifyContent:"center",
      // backgroundColor:"red",
  
    },
    forwardLeft:{
      alignItems:"flex-end"
    }, 
    forwardRigth:{
      alignItems:"flex-start"
    },
   
  })