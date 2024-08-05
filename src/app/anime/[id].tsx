import { View,FlatList,Text,ScrollView,Pressable,Animated, RefreshControl, ActivityIndicator,Image} from 'react-native';
import React, { useEffect,useState,useRef, useCallback } from 'react';

import {useLocalSearchParams } from 'expo-router';
import {SessionManager} from "@/src/controller/api/animetv/session";
import { EpsodiesProps, InfoProps } from "../../interfaces/anime";
import Epsodie from '@/src/components/epsodies';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather, Fontisto,AntDesign } from '@expo/vector-icons';
import { openScreenPlayer, }  from '@/src/utils/screen';
import StatusBarPadding from "@/src/components/header/statusbar";
import manager from "@/src/controller/api/animetv/urls";


export default function Anime() {

  const {id} = useLocalSearchParams<{id:string}>();

  const [epsodies,setEpsodies] = useState<EpsodiesProps[]>([]);
  const [paginated,setPaginated] = useState<EpsodiesProps[]>([]);
  const [info,setInfo] = useState<InfoProps>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const H_MAX_HEIGHT= 210;
  var H_MIN_HEIGHT= useRef(80).current;
  const H_SCROLL_DISTANCE= H_MAX_HEIGHT-H_MIN_HEIGHT;


  const ITEMS_PER_PAGE = 4;
  
  const scrollOffSetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffSetY.interpolate({
    inputRange:[0,H_SCROLL_DISTANCE],
    outputRange:[H_MAX_HEIGHT,H_MIN_HEIGHT],
    extrapolate:"clamp",
  })

  let url = new manager.URLManager()
  const session = new SessionManager()

  async function getEpsodies(){
    let url_cat = session.router_cat_id(id)
    let data_cat:EpsodiesProps[] = await session.get(url_cat)
    data_cat  = data_cat.reverse()

    data_cat.forEach((item:EpsodiesProps,index:number)=>{
        data_cat[index].index_id=index
        if (index>0 && index <=data_cat.length){
          data_cat[index].back_ep=data_cat[index-1].video_id
          data_cat[index].back_id=index-1
        }


    })


    setPaginated(data_cat.slice(0, ITEMS_PER_PAGE));
    setEpsodies(data_cat);
  }


 

  async function getInfo(){
    let url_info = session.router_info(id)
    const data_info:InfoProps[] = await session.get(url_info)
    setInfo(data_info[0]);


  }
  
  const onRefresh = useCallback(() => {
    getEpsodies();  
  }, []);


  useEffect(()=>{
    try{
  
      getEpsodies();
      getInfo();

    }catch(erro){
    }
  
  },[])

  useEffect(()=>{
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);

  })

    useEffect(() => {
      loadMoreData();
    }, [page]);

  const loadMoreData = () => {
      if (loading) return;
      setLoading(true);

      let timeouted = setTimeout(() => {

        if(epsodies.length>0){
          const startIndex = paginated.length;
          let endIndex = Math.min(startIndex + ITEMS_PER_PAGE, epsodies.length);

          const newDisplayedData = epsodies.slice(startIndex, endIndex);
          setPaginated(prevData => [...prevData, ...newDisplayedData]);

          
        }
    
        setLoading(false);

    },1500)

    return ()=>clearTimeout(timeouted);
    
  };

  
  const renderFooter = () => {
    if (!loading && paginated.length >= epsodies.length) {return null}

    return (
      <View className='p-5'>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading && paginated.length < epsodies.length) {
      setPage(prevPage => prevPage + 1);
    }
  };



  return (
    <View className="bg-black w-full relative h-full"  >
      <StatusBarPadding></StatusBarPadding>
     

      <Animated.View className='mt-5 text-white p-5  absolute z-50 top-5 left-0 right-0 bg-black overflow-hidden' style={{height:headerScrollHeight}}>
        {info ?
          <View className='flex flex-col'>
             {/* <View className=' h-48 w-full justify-center items-center' >
                <Image source={{uri:url.router_image(info.category_image)}}  className='h-44 w-44 rounded-full bg-white ' resizeMode={"stretch"}/>
            </View> */}

            <Text className='text-white text-3xl mb-2' onLayout={(event)=>{let { height } = event.nativeEvent.layout;H_MIN_HEIGHT=height+10}}>{info.category_name}</Text>
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
          <FlatList ListEmptyComponent={<></>} onEndReachedThreshold={0.1} ListFooterComponent={renderFooter}
                     refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  onEndReached={handleLoadMore} 
                        contentContainerStyle={{gap:16,backgroundColor:"black",marginLeft:10,marginRight:10,paddingTop:H_MAX_HEIGHT}} 
                        showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} horizontal={false} 
                        data={paginated} scrollEventThrottle={16} onScroll={Animated.event([
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
        <View className='justify-between items-center p-5 flex-row gap-2 mb-1'>
          <Pressable className='flex-1 bg-orange-400 rounded-md p-2' onPress={()=>{epsodies? openScreenPlayer(epsodies[0].video_id,epsodies[0].index_id.toString(),id):null;}}>
            <View className='flex-row justify-center items-center align-middle'>
              <Feather name="play" size={30} color="white" />
              <Text className='text-xl font-bold text-white'>COMEÇAR A ASSISTIR E1</Text>
            </View>
          </Pressable> 
          
          <Pressable className='w-16 bg-orange-400 rounded-md p-2' onPress={()=>{epsodies? openScreenPlayer(epsodies[0].video_id,epsodies[0].index_id.toString(),id):null;}}>
            <View className='flex-row justify-center items-center align-middle'>
              <AntDesign name="staro" size={30} color="white" />
            </View>
          </Pressable>

        </View>
      </View>
       
    </View>

  );
}