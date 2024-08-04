


import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function GestureTap({setState,buttons}:{setState:any,buttons:boolean,}) {

    const handleSingleTapStart = () => {
      setState(!buttons)
    };
      
    const singleTap = Gesture.Tap()
      .maxDuration(250)
      .onStart(handleSingleTapStart);

 return (
    <GestureDetector  gesture={singleTap}>
        <View className='absolute top-0 left-0 right-0 w-full h-full ' style={{zIndex:-1}}></View>
    </GestureDetector>

  );
}