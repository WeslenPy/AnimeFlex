import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View,Text } from 'react-native';
import { deactivateKeepAwake } from 'expo-keep-awake';
import { router } from "expo-router";
import openScreenAnime from '@/src/utils/screen';
import { URLProps } from '@/src/interfaces/anime';

export default function TopButtons({backId,videoURL}:{backId:string|undefined,videoURL:URLProps|undefined,}) {


function backRouter(){
    deactivateKeepAwake()
    if (backId){
        openScreenAnime(backId)

    }else{router.back()}
    }

    function moreOptions(){
    
    }

 return (
    <View  className='flex-col w-full justify-between p-2'>
        <View className='flex-row justify-between w-full p-3'>

        <View className='flex-row items-center '>

            <TouchableOpacity onPress={backRouter}>
                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity> 
            <View className='mx-5 ' style={{width:"70%"}}>
                <Text className='text-white text-2xl font-bold  '  numberOfLines={1} ellipsizeMode="tail"  >{videoURL?videoURL.title.toUpperCase():""}</Text>
            </View>
        </View>

        <TouchableOpacity onPress={moreOptions}>
            <MaterialIcons name="more-vert" size={30} color="white" />
        </TouchableOpacity>

        </View>
    </View>
  );
}