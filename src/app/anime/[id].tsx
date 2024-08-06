import { View,Text,ScrollView,Pressable,Animated,StyleSheet,TouchableOpacity, StyleProp} from 'react-native';
import React, { useEffect,useState,useRef } from 'react';
import {useLocalSearchParams } from 'expo-router';
import {SessionManager} from "@/src/controller/api/animetv/session";
import { AnimeProps, EpsodiesProps, InfoProps } from "../../interfaces/anime";
import Epsodie from '@/src/components/epsodies';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Feather, AntDesign, Octicons, Ionicons } from '@expo/vector-icons';
import { openScreenPlayer, }  from '@/src/utils/screen';
import StatusBarPadding from "@/src/components/header/statusbar";
import manager from "@/src/controller/api/animetv/urls";
import FlatPaginated from '@/src/components/flat/paginated';
import { AnimeQuery } from '@/src/controller/storage/database';
import OrdenateSheet from '@/src/components/sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { PaperProvider } from 'react-native-paper';



const H_MAX_HEIGHT= 210;

export function Ordenation({style,epsodies,setData}:{style:StyleProp<any>,epsodies:any,setData:any}){
  const bottomSheetRef = useRef<BottomSheet>(null);


  function showSheetOrdenate(){
    
    if (bottomSheetRef.current){
      const preview:BottomSheetMethods = bottomSheetRef.current
      preview.snapToIndex(0)
  }
  }


  return (
        <View className='flex-row justify-between w-full mt-5 p-2 rounded-lg' style={[style, { backgroundColor:"#222B32"}]}>
          <TouchableOpacity onPressOut={showSheetOrdenate}>
            <View className='mx-2'>
              <Ionicons name="filter-sharp" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className='flex-row justify-center items-center gap-3 mx-2'>
              <Text className='text-white text-lg font-bold'> SINC. TODOS</Text>
              <Octicons name="download" size={24} color="white" />
            </View>
          </TouchableOpacity>

          <OrdenateSheet setData={setData} reference={bottomSheetRef} data={epsodies} ></OrdenateSheet>

      </View>
  )
}



export default function Anime() {

  const {id} = useLocalSearchParams<{id:string}>();

  const storage = new AnimeQuery()
  
  const [epsodies,setEpsodies] = useState<EpsodiesProps[]>([]);
  const [info,setInfo] = useState<InfoProps>();
  const [star,setStar] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });  
  
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToFront = () => {
    Animated.timing(flipAnim, {
      toValue: 180,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  
const flipToBack = () => {
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  
  var H_MIN_HEIGHT= useRef(80).current;
  const H_SCROLL_DISTANCE= H_MAX_HEIGHT-H_MIN_HEIGHT;


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

    setEpsodies(data_cat);
  }

  function getAnime(){
    if (info){
      let anime:AnimeProps = {category_image:info.category_image,
                              category_name:info.category_name,
                              id:info.id,video_id:"0",}
        return anime
    }
  }

  async function addHistory(){
    let anime = getAnime()
    if (anime){
      await storage.addHistory(anime)
    }
}

  async function getInfo(){
    let url_info = session.router_info(id)
    const data_info:InfoProps[] = await session.get(url_info)
    setInfo(data_info[0]);
  }
  

  useEffect(()=>{
    try{
  
      getEpsodies();
      getInfo();

    }catch(erro){
    }
  
  },[])

 

  async function getFavorite(){
    let anime = getAnime()
    if (anime){
      let find = await storage.getFavorite(anime)
      if (find && find.length>0){
        setStar(true)
      }else{
        setStar(false)
      }

    }

  }

  

  function addFavorite(){
    let anime = getAnime()
    if (anime && !star){
      flipToFront()
      storage.addFavorite(anime)
      setStar(true)
      
    }else if (anime){
      flipToBack()
      setStar(false)
      storage.removeFavorite(anime)
    }


  }



  useEffect(()=>{
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    addHistory()
    getFavorite()

  },[info])


  return (
    <PaperProvider>
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
            <ScrollView className='bg-black' >
              <Text className='text-white text-xl '>{info.category_description}</Text>

            </ScrollView>:<></>
            }
            
          </View>
          :<></>

        }
      </Animated.View>



        <View style={{marginBottom:100}}>
          
          <FlatPaginated refreshCallBack={getEpsodies} styling={styles.flat} perPage={4} horizontal={false} timingPage={1000}
                        data={epsodies}  renderTop={<Ordenation setData={setEpsodies} epsodies={epsodies} style={{marginTop:H_MAX_HEIGHT+20}}></Ordenation>}
                        eventListener={Animated.event([ {nativeEvent:{contentOffset:{y:scrollOffSetY}}},],{useNativeDriver:false})}
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
          
          <Pressable className='w-16 bg-orange-400 rounded-md p-2' onPress={addFavorite}>
            <Animated.View className='flex-row justify-center items-center align-middle' style={{ transform: [{ rotateY: !star? frontInterpolate:backInterpolate }] }} >
              <AntDesign name={star?"star":"staro"} size={30} color={star?"yellow":"white"} />
            </Animated.View>
          </Pressable>

        </View>
      </View>
       
    </View>

</PaperProvider>
);
}



const styles = StyleSheet.create({
  flat:{
    gap:16,
    backgroundColor:"black",
    marginLeft:10,
    marginRight:10,
  }
})