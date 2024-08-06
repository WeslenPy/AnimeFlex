import React, {  useMemo, useState,} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Portal } from 'react-native-paper';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function OrdenateSheet({reference,data,setData}:{reference:any,data:any,setData:any}) {

  const snapPoints = useMemo(()=>["30%","50%"],[])

  function revert(){
    setData(data.reverse())
    console.log(data[0])
  }

  return (
      <Portal>
          <BottomSheet
            ref={reference}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            handleIndicatorStyle={{backgroundColor:"white"}}
            backgroundStyle={{backgroundColor:"#24252A"}}>
                  <BottomSheetView style={styles.contentContainer}>
                   <View className='flex-col gap-5 w-full items-center justify-center p-5'>
                      <View className='w-full mb-2 flex-row  items-center justify-center '>
                        <Text  className='text-white text-lg'>Ordernar por:</Text>
                      </View>
                      <TouchableOpacity onPressOut={revert}>
                        <View className='w-80 bg-amber-400 p-3 rounded-lg flex-row justify-center items-center gap-10'>
                          <Text className='text-black'>Crescente</Text>
                          <AntDesign name="arrowup" size={24} color="white" />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPressOut={revert}>
                        <View className='w-80 bg-orange-700 p-3 rounded-lg flex-row justify-center items-center  gap-7'>
                          <Text  className='text-white'>Decrescente</Text>
                          <AntDesign name="arrowdown" size={24} color="white" />

                        </View>
                      </TouchableOpacity>

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