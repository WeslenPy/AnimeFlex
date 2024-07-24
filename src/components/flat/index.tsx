import { FlatProps } from '@/src/interfaces/components';
import { View,FlatList,Text } from 'react-native';
import { Card } from '../card';
import { CardLoader } from '../card/loader';

export default function Flat({config}:{config:FlatProps}) {


  const initialLoader = []

  for(let i=0;i<=10;i++){
    initialLoader.push(<CardLoader></CardLoader>)

  }

  if (!config.variavel){
    return (
       <View>
   
           <View className='text-xl mb-5 mt-5'><Text className='text-slate-100'>{config.title}</Text></View>
   
           <FlatList contentContainerStyle={{gap:16}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} data={initialLoader} renderItem={({item})=>item}/>
   
       </View>
   
     );

  }

  return (
    <View>

        <View className='text-xl mb-5 mt-5'><Text className='text-slate-100'>{config.title}</Text></View>

        <FlatList contentContainerStyle={{gap:16}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} data={config.variavel} renderItem={({item})=><Card anime={item}></Card >}/>

    </View>

  );
}