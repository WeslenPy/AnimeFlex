import { FlatProps } from '@/src/interfaces/components';
import { View,FlatList,Text, ActivityIndicator } from 'react-native';
import { Card } from '../card';

import { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { AnimeProps} from '@/src/interfaces/anime';
import Preview from '../preview';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Flat({config}:{config:FlatProps}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheet,setSheet]  = useState<AnimeProps>()

  return (
    <GestureHandlerRootView>


    <View className='flex-1'>

        <View className='text-xl mb-5 mt-5'><Text className='text-slate-100'>{config.title}</Text></View>

        <FlatList ListEmptyComponent={ <ActivityIndicator size={50} color="orange" />} contentContainerStyle={{gap:16}} showsHorizontalScrollIndicator={false} 
                  showsVerticalScrollIndicator={false} horizontal={true} 
                  data={config.variavel} renderItem={({item})=><Card reference={bottomSheetRef} setState={setSheet}  anime={item}></Card >}/>


          <Preview reference={bottomSheetRef} anime={sheet}></Preview>


    </View>
    </GestureHandlerRootView>

  );
}