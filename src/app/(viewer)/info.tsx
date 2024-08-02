import { Text, View,FlatList,ActivityIndicator } from "react-native";
import { useEffect,useState } from 'react';

import { Header } from "@/src/components/header";
import Box from "@/src/components/box";
import { AnimeProps } from "@/src/interfaces/anime";
import {SessionManager} from "@/src/controller/api/animetv/session";

import { useLocalSearchParams } from "expo-router";

export default function Info() {

  const {category} = useLocalSearchParams<{category:string}>()

  const [search,setSearch] = useState<AnimeProps[]>([]);
  const [loading,setLoading] = useState(false);


  async function getSearch(search:string){

      if(search){
        setLoading(true)
        let session = new SessionManager()
        let url = session.router_search(search)
        const data = await session.get(url)
        setSearch(data);

      }else{

        setSearch([])
      }
      setLoading(false)


    }



  useEffect(()=>{

    async function getCategory(){

      if(category){
        setLoading(true)

        let session = new SessionManager()
        let url = session.router_category(category)
        const data = await session.get(url)
        setSearch(data);
        setLoading(false)

  
      }else{
        setSearch([])
        setLoading(false)

      }
    }


    getCategory()

  },[])


  

  return (
    <View className="bg-black h-full w-full">
      <View  className="w-full p-4">
          
        <Header config={{focus:true,set:getSearch,focused:()=>{}}}></Header>

      </View>

      {loading?
      <View className='items-center justify-center  p-10'>
        <ActivityIndicator size={50} color="orange" />
      </View>:
      <FlatList  contentContainerStyle={{gap:16,backgroundColor:"#0000"}} showsHorizontalScrollIndicator={false} 
      showsVerticalScrollIndicator={true} horizontal={false} data={search} renderItem={({item})=><Box anime={item}></Box>}/>
    }
      


    </View>

  );
};
