import { View,FlatList,Text,ScrollView,Pressable } from 'react-native';
import { useEffect,useState } from 'react';

import {useLocalSearchParams } from 'expo-router';
import {SessionManager} from "../../api/animetv/session";
import { EpsodiesProps, InfoProps } from "../../interfaces/anime";
import Epsodie from '@/src/components/epsodies';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather } from '@expo/vector-icons';
import { openScreenPlayer } from '@/src/utils/screen';
import StatusBar from "@/src/components/header/statusbar";


export default function Anime() {
  const {id} = useLocalSearchParams();

  const [epsodies,setEpsodies] = useState<EpsodiesProps[]>([]);
  const [info,setInfo] = useState<InfoProps>();


  useEffect(()=>{
    try{
      async function getEpsodiesAndInfo(){
        let session = new SessionManager()
        let url_cat = session.router_cat_id(id)
        let url_info = session.router_info(id)


        const data_cat = await session.get(url_cat)
        const data_info = await session.get(url_info)

        setEpsodies(data_cat.reverse());
        setInfo(data_info[0]);
  
      }
  
      getEpsodiesAndInfo();

    }catch(erro){
    }
  
  },[])

  useEffect(()=>{
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);

  })



  return (
    <View className="bg-black w-full relative h-full mb-10"  >
      <StatusBar></StatusBar>
      

      <View className='mt-5 text-white p-5'>
        {info ?
          <View className='flex flex-col'>
            <Text className='text-white text-3xl mb-2'>{info.category_name}</Text>
            <Text className='text-white mb-2'>•<Text className='text-green-600'> Série </Text>• | Ano {info.ano} </Text>
            <ScrollView className='h-32'>
              <Text className='text-white text-xl mb-4'>{info.category_description}</Text>

            </ScrollView>
            
          </View>


          :<></>

        }
      </View>

      
      <View className='mb-96'>
          <FlatList  contentContainerStyle={{gap:16,backgroundColor:"black",marginLeft:10,marginRight:10}} 
                        showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} horizontal={false} 
                        data={epsodies} renderItem={({item})=><Epsodie ep={item}></Epsodie>}/>


      </View>

        
      <View className='absolute bottom-10 left-0 right-0 z-50'>
        <View className='justify-between items-center p-5 mb-4'>
          <Pressable className='w-full bg-orange-400 rounded-md p-2' onPress={()=>{epsodies? openScreenPlayer(epsodies[0].video_id):null;}}>
            <View className='flex-row justify-center items-center align-middle'>
              <Feather name="play" size={30} color="black" />
              <Text className='text-xl font-bold'>COMEÇAR A ASSISTIR E1</Text>
            </View>
          </Pressable>

        </View>
      </View>
       
    </View>

  );
}