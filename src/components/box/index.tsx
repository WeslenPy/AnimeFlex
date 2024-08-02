import { View,Image,Pressable,Text,TouchableOpacity } from 'react-native';
import { AnimeProps } from "@/src/interfaces/anime";
import openScreenAnime from '@/src/utils/screen';
import manager from "@/src/controller/api/animetv/urls";
import { Feather } from '@expo/vector-icons';
import AnimeStorage from '@/src/controller/storage/manager';

export default function Box({anime}:{anime:AnimeProps}) {
    let url = new manager.URLManager()
    
    return (
        <Pressable className='w-full flex flex-row m-6 mb-0 mt-0'  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-md'>
                <Image className='w-32 h-40 rounded-lg' onProgress={(event)=>{}}  source={{uri:url.router_image(anime.category_image)}}   />
            </View>
            <View className='mx-5'>
                <Text className='text-white w-44  mt-2'>{anime.category_name}</Text>
            </View>
       </Pressable>
  );
}



export function BoxHistory({anime,state,setState}:{anime:AnimeProps,state:any,setState:any}) {
    let url = new manager.URLManager()
    const storage = new AnimeStorage()


    const removeItem = () => {
        const removedItem = state.filter((item:AnimeProps) => JSON.stringify(item) !== JSON.stringify(anime));
        setState(removedItem);
      };


    return (
        <Pressable className='flex-row p-2 m-2 rounded-lg mb-1'
             style={{backgroundColor:"rgba(255,255,255,0.2)"}}  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-md'>
                <Image  className='w-32 h-40 rounded-lg' 
                        onProgress={(event)=>{}}  
                        source={{uri:url.router_image(anime.category_image)}}   />

            </View>
            <View className='mx-2 flex-row justify-between flex-1'>
                <View className='mx-2'>
                    <Text className='text-white w-48  mt-2'>{anime.category_name}</Text>
                </View>
                <View className='mt-1'>
                    <TouchableOpacity onPress={()=>{storage.delete(anime);removeItem()}}>
                        <Feather name="trash" size={24} color="red" />

                    </TouchableOpacity>
                </View>
            </View>
       </Pressable>
  );
}