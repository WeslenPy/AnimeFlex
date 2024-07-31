import { Text, View,FlatList,ScrollView } from "react-native";
import { useEffect,useState } from 'react';

import { Header } from "@/src/components/header";
import Box from "@/src/components/box";
import { AnimeProps } from "@/src/interfaces/anime";
import {SessionManager} from "../../api/animetv/session";


import StatusBar from "@/src/components/header/statusbar";

export default function Info() {


  const [search,setSearch] = useState<AnimeProps[]>([]);


  async function getSearch(search:string){

      if(search){
        let session = new SessionManager()
        let url = session.router_search(search)
        const data = await session.get(url)
        setSearch(data);

      }else{
        setSearch([])
      }

    }


  return (
    <View className="bg-black h-full">
      <StatusBar></StatusBar>

      <View  className="w-full p-4">
          
        <Header config={{focus:true,set:getSearch,focused:()=>{}}}></Header>

      </View>
      
      <FlatList  contentContainerStyle={{gap:16,flex:1,backgroundColor:"#0000"}} showsHorizontalScrollIndicator={false} 
      showsVerticalScrollIndicator={false} horizontal={false} data={search} renderItem={({item})=><Box anime={item}></Box>}/>


    </View>

  );
};
