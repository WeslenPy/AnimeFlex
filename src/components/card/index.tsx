import { View,Pressable,Text,Image } from 'react-native';
import {Ionicons, Feather} from "@expo/vector-icons";
import { PopularProps } from '../slider';
import manager from "../../api/animetv/urls";
import { router } from "expo-router";



function openScreen(anime_id:number){
    return router.replace(`/view/${anime_id}`)

}

export function Card({anime}:{anime:PopularProps}) {

    let url = new manager.URLManager()

    return (
       <Pressable className='flex flex-col items-center'  onPress={() => {openScreen(anime.id);}}>
            <View >
                <Image className='w-44 h-80 rounded-lg' source={{uri:url.router_image(anime.category_image)}} />
            </View>
            <Text className='text-white w-44 text-wrap mt-2'>{anime.category_name}</Text>
       </Pressable>
    );
};