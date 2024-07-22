import { View,Pressable,Text,Image } from 'react-native';
import manager from "../../api/animetv/urls";
import { AnimeProps } from "../../interfaces/anime";
import openScreenAnime from '@/src/utils/screen';


export function Card({anime}:{anime:AnimeProps}) {

    let url = new manager.URLManager()

    return (
       <Pressable className='flex flex-col items-center'  onPress={() => {openScreenAnime(anime.id);}}>
            <View className='bg-slate-400 rounded-md'>
                <Image className='w-44 h-80 rounded-md' progressiveRenderingEnabled={true}  source={{uri:url.router_image(anime.category_image)}} />
            </View>
            <Text className='text-white w-44 text-wrap mt-2'>{anime.category_name}</Text>
       </Pressable>
    );
};