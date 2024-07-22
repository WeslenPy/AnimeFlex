import { View,FlatList } from 'react-native';
import { useEffect,useState } from 'react';

import {useLocalSearchParams } from 'expo-router';
import {SessionManager} from "../../api/animetv/session";
import { EpsodiesProps } from "../../interfaces/anime";
import Epsodie from '@/src/components/epsodies';
import Constants from "expo-constants";

const statusBar = Constants.statusBarHeight;

export default function Anime() {
  const {id} = useLocalSearchParams();

  const [epsodies,setEpsodies] = useState<EpsodiesProps[]>([]);


  useEffect(()=>{
      async function getEpsodies(){
        let session = new SessionManager()
        let url = session.router_cat_id(id)
        const data = await session.get(url)
        console.log(url)
        setEpsodies(data.reverse());

      }

      getEpsodies();
  },[])



  return (
    <View className="bg-black h-full w-full mb-5"  style={{marginTop:statusBar+8}}>


      <View className='mt-5'></View>

      <FlatList  contentContainerStyle={{gap:16,backgroundColor:"#0000",marginLeft:10,marginRight:10}} showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} horizontal={false} data={epsodies} renderItem={({item})=><Epsodie ep={item}></Epsodie>}/>


    </View>

  );
}