

import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';



function rotateButton(rotation:any,setShowButton:any){
    const toValue = 1

    setShowButton(true)

    Animated.timing(rotation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(rotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setShowButton(false)

    });
  };





export  function LeftFowardButton({progressPlay}:{progressPlay:any}) {

    const [leftFoward, setLeftFoward] = useState(false);
    const rotationLeft = useRef(new Animated.Value(0)).current;

        
    const rotationInterpolateLeft = rotationLeft.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    return (
        <TouchableOpacity style={[styles.button]} activeOpacity={0.6}  onPressOut={()=>{progressPlay(-10);rotateButton(rotationLeft,setLeftFoward)}} >
            <Animated.View style={{ transform: [{ scaleX: -1 },{rotate:rotationInterpolateLeft}],opacity:leftFoward?1:0}} >
                <Ionicons name="reload" size={80} color="white"  />

            </Animated.View>
        </TouchableOpacity>
    );
}

export  function RigthFowardButton({progressPlay}:{progressPlay:any}) {

    const [rightFoward, setRightFoward] = useState(false);
    const rotationRight = useRef(new Animated.Value(0)).current;

    const rotationInterpolateRigth = rotationRight.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });
    

return (
    <TouchableOpacity style={[styles.button]} activeOpacity={0.6}  onPressOut={()=>{progressPlay(10);rotateButton(rotationRight,setRightFoward)}} >
        <Animated.View style={{ transform: [{rotate:rotationInterpolateRigth}],opacity:rightFoward?1:0}} >
            <Ionicons name="reload" size={80} color="white"  />

        </Animated.View>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    button:{
      flex:1,
      justifyContent:"center",
      height:"100%",
      alignItems:"center"
    },
   
  })