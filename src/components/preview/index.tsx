import React, { useCallback, useEffect, useMemo, useState,} from 'react';
import { View, Text, StyleSheet,Image, Pressable, ActivityIndicator, TextLayoutEventData, NativeSyntheticEvent } from 'react-native';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { AnimeProps, InfoProps } from '@/src/interfaces/anime';
import { Portal } from 'react-native-paper';
import manager from "@/src/controller/api/animetv/urls";
import {SessionManager} from "@/src/controller/api/animetv/session";
import { AntDesign, Feather } from '@expo/vector-icons';
import openScreenAnime, { openScreenPlayer } from '@/src/utils/screen';

function InfoAnime({info}:{info:InfoProps}){
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);

  const readMore = 5
  const maxReadMore = 12

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const onTextLayout = (event:NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = event.nativeEvent;
    if (lines.length >= readMore && !isExpanded) {
      setShowSeeMore(true);
    } 
  };

  useEffect(()=>{setIsExpanded(false);setShowSeeMore(false)},[info])

  return (
    <View className='flex-col mt-6 p-3 rounded-lg w-full' style={{backgroundColor:"rgba(255,255,255,0.1)"}}>
      <Text className=' text-white text-3xl mb-4'>Sinopse</Text>
      <Text className='text-white text-lg' numberOfLines={isExpanded?maxReadMore:readMore} ellipsizeMode="tail" onTextLayout={onTextLayout} > {info.category_description}</Text>
      {showSeeMore && (
        <View className='flex-row justify-center items-center'>
          <TouchableOpacity onPress={toggleExpanded}>
            <View className='px-4 pt-2 pb-2 rounded-lg mt-4 mb-2'  style={{backgroundColor:"rgba(255,255,255,0.2)"}}>
              <Text className='text-white '>
                {isExpanded ? 'Ver menos' : 'Ver mais'}
              </Text>

            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}




export default function Preview({reference,anime}:{reference:any,anime:AnimeProps|undefined}) {

  function getTitle(){
    if (anime){
      if(anime.category_name){return anime.category_name}
      if (anime.title){return anime.title}
    }
  }

  const snapPoints = useMemo(()=>["30%","40%","60%","70%","80%","90%","100%","150%"],[])
  const [info,setInfo] = useState<InfoProps>();
  const [failed,setFaild] = useState(false);

  let url = new manager.URLManager()
  const session = new SessionManager()

  const title = getTitle()

  async function getInfo(){
    if (anime){
      try{
        let url_info = session.router_info(anime.id)
        const data_info = await session.get(url_info)
        setInfo(data_info[0]);

        setFaild(false)
        if (!data_info){
          setFaild(true)

        }

      }
      catch(error){
        setFaild(true)
      }

    }

  }


  function screenManager(){
    if (anime && anime.id){
      openScreenAnime(anime.id)}
    else if (anime?.video_id){
      openScreenPlayer(anime.video_id,"","")}
  }
  
  useEffect(()=>{
      getInfo();
  
  },[anime])

  return (
      <Portal>
          <BottomSheet
            ref={reference}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor:"#24252A"}}>
                  <BottomSheetView style={styles.contentContainer}>
                    <View className='flex-row justify-end items-end w-full '>
                      <Pressable className='p-2 mx-3 rounded-full' style={{backgroundColor:"rgba(255,255,255,0.1)"}} onPress={()=>{reference.current.close()}}>
                        <AntDesign name="close" size={24} color="red" />
                      </Pressable>
                    </View>
                    <View className='flex-col justify-center items-center  p-5 pt-0 w-full'>
                        <View className='flex-col justify-center items-center'>
                            <Image className='rounded-full h-40 w-40 mb-5' progressiveRenderingEnabled={true} 
                               source={{uri:url.router_image(anime ?anime.category_image:"")}} />
                            <Text className='text-white font-bold text-2xl mt-2'>{title}</Text>
                        </View>
                        {info &&
                           <InfoAnime info={info}></InfoAnime>
                        }

                        {!info && !failed &&
                           <View className='flex-col w-full items-center justify-center mt-5'>
                             <ActivityIndicator size={50} color="white" />
                          </View>
                        }

                        <View className='flex-row  w-full mt-10 justify-center items-center'>
                          <TouchableOpacity onPress={()=>{}} style={{marginTop:20}} onPressOut={screenManager}>
                            <View className='bg-orange-400 p-4 rounded-lg w-52 flex-row items-center justify-evenly'>
                              <Text className='text-xl text-white'>Assistir</Text>
                              <AntDesign name="arrowright" size={25} color="white" />
                              
                            </View>
                          </TouchableOpacity> 

                        </View>

                    </View>
                  </BottomSheetView>
          </BottomSheet>

      </Portal>

  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});