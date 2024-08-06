import { View,Pressable,Text,Image,Animated } from 'react-native';
import manager from "@/src/controller/api/animetv/urls";
import { AnimeProps } from "@/src/interfaces/anime";
import openScreenAnime, { openScreenPlayer, openScreenPreview } from '@/src/utils/screen';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { AnimeQuery } from '@/src/controller/storage/database';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useCallback, } from 'react';
import { useRef, useState } from 'react';




function uppingHeart(interpolate:any,setShowButton:any){
    const toValue = 1

    setShowButton(true)

    Animated.timing(interpolate, {
      toValue,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(interpolate, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }).start();

      setShowButton(false)

    });
  };

export function Card({anime,setState,reference}:{anime:AnimeProps,setState:any,reference:any}) {
    const storage = new AnimeQuery()

    const [showHeart,setShowHeart] = useState(false)

    const uppingRef = useRef(new Animated.Value(0)).current;
    
    const uppingInterpolate = uppingRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -100],
    });



    function showPreview(){
        setState(anime)
        if (reference.current){
            const preview:BottomSheetMethods = reference.current
            preview.snapToIndex(0)
        }
    }




    function handleDoubleTapStart(){
        storage.addFavorite(anime)
        uppingHeart(uppingRef,setShowHeart)

    }

    function handleSingleTapStart(){
        if(anime.id){ openScreenAnime(anime.id)}
        else{ openScreenPlayer(anime.video_id,"","")}

    }

   function handleLongTapStart(){
        showPreview()
    }

 
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

    let url = new manager.URLManager()


    return (

      <GestureDetector   gesture={Gesture.Exclusive(doubleTap, singleTap,longTap)}>
            <View className='flex flex-col items-center relative justify-center' >
                                                                    
                <View className=' rounded-md' style={{backgroundColor:"rgba(255,255,255,0.3)"}}>
                    <Image className='w-44 h-80 rounded-md' progressiveRenderingEnabled={true}  source={{uri:url.router_image(anime.category_image)}} />
                </View>
                <Text className='text-white w-44  mt-2' numberOfLines={2} ellipsizeMode="tail" >{anime.category_name || anime.title}</Text>


                <Animated.View style={{top:"35%",zIndex:10,transform:[{translateY:uppingInterpolate}]}} className='absolute '>
                    {showHeart && (
                        <AntDesign name='heart' size={60} style={{color:"red"}}></AntDesign>

                    )}
                </Animated.View>

            </View>
        </GestureDetector>
    );
};