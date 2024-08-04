import { FlatProps } from '@/src/interfaces/components';
import { View,FlatList,Text, ActivityIndicator } from 'react-native';
import { Card } from '../card';

export default function Flat({config}:{config:FlatProps}) {

  return (
    <View className='flex-1'>

        <View className='text-xl mb-5 mt-5'><Text className='text-slate-100'>{config.title}</Text></View>

        <FlatList ListEmptyComponent={ <ActivityIndicator size={50} color="orange" />} contentContainerStyle={{gap:16}} showsHorizontalScrollIndicator={false} 
                  showsVerticalScrollIndicator={false} horizontal={true} 
                  data={config.variavel} renderItem={({item})=><Card  anime={item}></Card >}/>


    </View>

  );
}