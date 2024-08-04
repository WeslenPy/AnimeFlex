

import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated,View } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import { useSharedValue, withTiming } from 'react-native-reanimated';


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




export  function LeftFowardButton({progressPlay,setState,buttons}:{progressPlay:any,setState:any,buttons:boolean}) {

    const [leftFoward, setLeftFoward] = useState(false);
    const rotationLeft = useRef(new Animated.Value(0)).current;

        
    const rotationInterpolateLeft = rotationLeft.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const handleDoubleTapStart = async () => {
      await progressPlay(10);
      rotateButton(rotationLeft,setLeftFoward)
  };
  const handleSingleTapStart = () => {
    setState(!buttons)
  };
  
 
  const singleTap = Gesture.Tap()
  .maxDuration(250)
  .onStart(handleSingleTapStart);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(handleDoubleTapStart);

    return (
      <GestureDetector  gesture={Gesture.Exclusive(doubleTap, singleTap)}>
          <TouchableRipple rippleColor="rgba(255, 255, 255, .2)" style={styles.button} onPress={()=>{}} >
            <Animated.View style={{ transform: [{ scaleX: -1 },{rotate:rotationInterpolateLeft}],opacity:leftFoward?1:0}} >
                <Ionicons name="reload" size={80} color="white"  />

            </Animated.View>
        </TouchableRipple>
      </GestureDetector>
    );
}

export  function RigthFowardButton({progressPlay,setState,buttons,video,setIndicator
                }:{progressPlay:any,setState:any,buttons:boolean,video:Video|undefined,setIndicator:any}) {


    const [rightFoward, setRightFoward] = useState(false);
    const rotationRight = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef<NodeJS.Timeout | null>();

    const rotationInterpolateRigth = rotationRight.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const handleDoubleTapStart = async () => {
      await progressPlay(10);

        rotateButton(rotationRight,setRightFoward)
    };    
    
    const handleLongTapStart = () => {
      setIndicator(true)
      intervalRef.current = setInterval(async ()=>{
          await progressPlay(10,true,false);
      },500)

    };


   const handleLongTapEnd = () => {
      setIndicator(false)
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      video?.playAsync()
    };

    const handleSingleTapStart = () => {
      setState(!buttons)
    };
    
   
    const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(handleSingleTapStart);

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(handleDoubleTapStart);


  
  const longTap = Gesture.LongPress()
    .minDuration(250)
    .onStart(handleLongTapStart)
    .onFinalize(handleLongTapEnd)


return (
  <GestureDetector  gesture={Gesture.Exclusive(doubleTap, singleTap,longTap)}>
      <TouchableRipple rippleColor="rgba(255, 255, 255, .2)" style={[styles.button]} onPress={()=>{}} >
          <Animated.View style={{ transform: [{rotate:rotationInterpolateRigth}],opacity:rightFoward?1:0}} >
              <Ionicons name="reload" size={80} color="white"  />
          </Animated.View>
      </TouchableRipple>
    </GestureDetector>
  );
}



const styles = StyleSheet.create({
    button:{
      flex:1,
      justifyContent:"center",
      height:"100%",
      alignItems:"center",
    

    },
   
  })