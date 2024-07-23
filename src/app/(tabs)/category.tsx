import { View,ScrollView } from 'react-native';
import Blank from '@/src/components/blank';
import { Header } from '@/src/components/header';
import CategoryCard from '@/src/components/base';
import data_category from '@/src/components/base/data';
import { openScreenInfo } from "@/src/utils/screen";
import { CategoryProps } from '@/src/interfaces/anime';
import { useState,useEffect } from 'react';
import Constants from "expo-constants";


const statusBar = Constants.statusBarHeight;

export default function CategoryAnime() {
  const categorys:any[] = []

  data_category.forEach(category=>{
    categorys.push(<CategoryCard category={category}></CategoryCard>)
  })
  
 return (
    
    <View className='w-full h-full bg-black ' style={{marginTop:statusBar+8}}>
      <Header config={{focus:false,set:()=>{},focused:openScreenInfo}}/>

      <ScrollView className='flex mb-10'> 
          {categorys}
      </ScrollView>

    </View>
  );
}