import { View,Image,Pressable,Text } from 'react-native';
import { AnimeProps } from "../../interfaces/anime";
import openScreenAnime from '@/src/utils/screen';
import manager from "../../api/animetv/urls";


export default function Box({anime}:{anime:AnimeProps}) {
    let url = new manager.URLManager()
    
    return (
        <Pressable className='w-full flex flex-row m-6 mb-0 mt-0'  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-md'>
                <Image className='w-32 h-40 rounded-lg' source={{uri:url.router_image(anime.category_image)}} />
            </View>
            <View className='mx-5'>
                <Text className='text-white w-44  mt-2'>{anime.category_name}</Text>
            </View>
       </Pressable>
  );
}