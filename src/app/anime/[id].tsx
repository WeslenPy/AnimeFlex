import { View,FlatList,Text,ScrollView,Pressable,Animated } from 'react-native';
import { useEffect,useState,useRef } from 'react';

import {useLocalSearchParams } from 'expo-router';
import {SessionManager} from "../../api/animetv/session";
import { EpsodiesProps, InfoProps } from "../../interfaces/anime";
import Epsodie from '@/src/components/epsodies';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather } from '@expo/vector-icons';
import { openScreenPlayer, }  from '@/src/utils/screen';
import StatusBar from "@/src/components/header/statusbar";


export default function Anime() {
  const H_MAX_HEIGHT= 300;
  const H_MIN_HEIGHT= 60;
  const H_SCROLL_DISTANCE= H_MAX_HEIGHT-H_MIN_HEIGHT;

  const scrollOffSetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffSetY.interpolate({
    inputRange:[0,H_SCROLL_DISTANCE],
    outputRange:[H_MAX_HEIGHT,H_MIN_HEIGHT],
    extrapolate:"clamp",
  })

  const {id} = useLocalSearchParams<{id:string}>();

  const [epsodies,setEpsodies] = useState<EpsodiesProps[]>([]);
  const [info,setInfo] = useState<InfoProps>();


  

  useEffect(()=>{
    try{
      async function getEpsodiesAndInfo(){
        let session = new SessionManager()
        let url_cat = session.router_cat_id(id)
        let url_info = session.router_info(id)


        let data_cat:EpsodiesProps[] = await session.get(url_cat)
        const data_info = await session.get(url_info)

        data_cat  = data_cat.reverse()

        data_cat.forEach((item:EpsodiesProps,index:number)=>{
            data_cat[index].index_id=index
            data_cat[index].index_id=index
        })



        setEpsodies(data_cat);
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
    <View className="bg-black w-full relative h-full"  >
      <StatusBar></StatusBar>
      

      <Animated.View className='mt-5 text-white p-5  absolute z-50 top-5 left-0 right-0 bg-black overflow-hidden' style={{height:headerScrollHeight}}>
        {info ?
          <View className='flex flex-col'>
            <Text className='text-white text-3xl mb-2'>{info.category_name}</Text>
            <Text className='text-white mb-2'>•<Text className='text-green-600'> Série </Text>• | Ano {info.ano} </Text>

            {info.category_description.length>0?
            <ScrollView className='h-60'>
              <Text className='text-white text-xl mb-4'>{info.category_description}</Text>

            </ScrollView>:<></>
            }
            
          </View>
          :<></>

        }
      </Animated.View>

      
      <View style={{marginBottom:120}}>
          <FlatList  contentContainerStyle={{gap:16,backgroundColor:"black",marginLeft:10,marginRight:10,paddingTop:H_MAX_HEIGHT}} 
                        showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} horizontal={false} 
                        data={epsodies} scrollEventThrottle={16} onScroll={Animated.event([
                          {nativeEvent:{
                            contentOffset:
                            {y:scrollOffSetY}
                            }
                          },
                        ],{useNativeDriver:false}
                        )}
                        renderItem={({item})=><Epsodie ep={item} page={id}></Epsodie>}/>


      </View>

        
      <View className='absolute bottom-0 left-0 right-0 z-50'>
        <View className='justify-between items-center p-5'>
          <Pressable className='w-full bg-orange-400 rounded-md p-2' onPress={()=>{epsodies? openScreenPlayer(epsodies[0].video_id,epsodies[0].index_id.toString(),id):null;}}>
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