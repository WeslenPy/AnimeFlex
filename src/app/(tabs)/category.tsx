import { View,ScrollView } from 'react-native';
import { Header } from '@/src/components/header';
import CategoryCard from '@/src/components/base';
import data_category from '@/src/components/base/data';
import { openScreenInfo } from "@/src/utils/screen";

export default function CategoryAnime() {
  const categorys:any[] = []

  data_category.forEach((category,index)=>{
    categorys.push(<CategoryCard  key={index} category={category}></CategoryCard>)
  })
  
 return (
    
    <View className='w-full h-full bg-black ' >
      <View className='p-4 pb-0'><Header config={{focus:false,set:()=>{},focused:openScreenInfo}}/></View> 

      <ScrollView className=' mt-5'> 
          <View className='flex flex-row flex-wrap justify-center items-center gap-5 mb-10'>
              {categorys}
          </View>
      </ScrollView>

    </View>
  );
}