import { View,Text,StyleSheet,FlatList } from 'react-native';
import { useEffect,useState } from 'react';
import { Card } from '../card';
import {SessionManager} from "../../api/animetv/session";
import { AnimeProps } from "../../interfaces/anime";



export function Slider() {
    const [recommend,setRecommend] = useState<AnimeProps[]>([]);


    useEffect(()=>{
        async function getRecommend(){
          let session = new SessionManager()
          let url = session.router_popular()
          const data = await session.get(url)
          console.log(url)
          setRecommend(data);

        }

        getRecommend();
    },[])


 return (
    <View className='w-full mt-4 m-4  '>
        <View className='text-xl mb-5 mt-5'><Text className='text-slate-100'>RECOMENDAÇÕES PARA VOCÊ</Text></View>

        <FlatList contentContainerStyle={{gap:16}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={true} data={recommend} renderItem={({item})=><Card anime={item}></Card>}/>


    </View>
  );
}

