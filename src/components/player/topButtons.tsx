import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View,Text,StyleSheet } from 'react-native';
import { deactivateKeepAwake } from 'expo-keep-awake';
import { router } from "expo-router";
import openScreenAnime from '@/src/utils/screen';
import { URLProps } from '@/src/interfaces/anime';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';



export function IndicatorAvanced({indicator}:{indicator:boolean}){

    if (!indicator){return null}

    return (
        <View className='p-2 rounded-full' style={{backgroundColor:"rgba(0,0,0,0.8)"}}>
            <View className='flex-row justify-center items-center'>
                <Text className='text-white text-lg mx-4'>2x </Text>
                <AntDesign name={'caretright'} color={"white"} size={10} />
                <AntDesign name={'caretright'} color={"white"} size={10} />
            </View>
        </View>
    )
}

function  ActionsPlayer({bottomSheetRef}:{bottomSheetRef:any}){
    const snapPoints = useMemo(()=>["30%","80%"],[])

    return (
        <Portal >
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose={true}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheet}>
                    <BottomSheetView style={styles.contentContainer}>
                    <ScrollView className='w-full p-5'>
                        <TouchableOpacity >
                            <View className='rounded-lg bg-red-700 p-4 justify-center items-center'>
                                <Text className='text-white'>Bloquear ações</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                    </BottomSheetView>
            </BottomSheet>
        </Portal>
    )
}


export default function TopButtons({backId,videoURL,indicator
                                    }:{backId:string|undefined,
                                        videoURL:URLProps|undefined,
                                        indicator:boolean}) {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [expanded,setExpanded] = useState(false)

    function backRouter(){
        deactivateKeepAwake()
        if (backId){
            openScreenAnime(backId)

        }else{router.back()}
        }

    function moreOptions(){
        if (bottomSheetRef.current){
            if (expanded){
                bottomSheetRef.current.close()
                setExpanded(false)
            }
            else{
                bottomSheetRef.current.expand()
                setExpanded(true)
            }
        }

    }

 return (

    <View  className='flex-col justify-between p-2'>
        <View className='flex-row justify-between  p-3'>

            <View className='flex-row items-center '>

                <TouchableOpacity onPress={backRouter}>
                    <AntDesign name="arrowleft" size={30} color="white" />
                </TouchableOpacity> 
                <View className='mx-5 ' style={{width:"70%"}}>
                    <Text className='text-white text-2xl font-bold  '  numberOfLines={1} ellipsizeMode="tail"  >{videoURL?videoURL.title.toUpperCase():""}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={moreOptions} >
                <MaterialIcons name="more-vert" size={30} color="white" />
            </TouchableOpacity>

           {expanded && <ActionsPlayer bottomSheetRef={bottomSheetRef}></ActionsPlayer>}
        </View>

        <View className='flex-row items-center justify-center'>
            <IndicatorAvanced  indicator={indicator}></IndicatorAvanced>

        </View>
       

    </View>

  );
}



const styles = StyleSheet.create({
    contentContainer: {
      alignItems: 'center',
    },
    bottomSheet:{
    }
  });