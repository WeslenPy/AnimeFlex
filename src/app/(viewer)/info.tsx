import { Text, View,FlatList,ScrollView } from "react-native";
import { useEffect,useState } from 'react';

import Constants from "expo-constants";
import { Header } from "@/src/components/header";
import Box from "@/src/components/box";
import { AnimeProps } from "@/src/interfaces/anime";
import {SessionManager} from "../../api/animetv/session";

const statusBar = Constants.statusBarHeight;


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

      <View  className="w-full p-4"
            style={{marginTop:statusBar+8}}>
          
        <Header config={{focus:true,set:getSearch,focused:()=>{}}}></Header>

      </View>
      
      <FlatList  contentContainerStyle={{gap:16,flex:1,backgroundColor:"#0000"}} showsHorizontalScrollIndicator={false} 
      showsVerticalScrollIndicator={false} horizontal={false} data={search} renderItem={({item})=><Box anime={item}></Box>}/>


    </View>

  );
};
