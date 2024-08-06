import { View,Pressable,Text,Image } from 'react-native';
import manager from "@/src/controller/api/animetv/urls";
import { AnimeProps } from "@/src/interfaces/anime";
import openScreenAnime, { openScreenPlayer, openScreenPreview } from '@/src/utils/screen';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { AnimeQuery } from '@/src/controller/storage/database';



export function Card({anime,setState,reference}:{anime:AnimeProps,setState:any,reference:any}) {

    function showPreview(){
        setState(anime)
        if (reference.current){
            const preview:BottomSheetMethods = reference.current
            preview.snapToIndex(0)
        }
    }


    async function addHistory(){
        const storage = new AnimeQuery()
        await storage.addHistory(anime)
    }


    let url = new manager.URLManager()
    return (

        <Pressable className='flex flex-col items-center' onLongPress={showPreview}  
                                                            onPress={() => {addHistory();anime.id?openScreenAnime(anime.id):openScreenPlayer(anime.video_id,"","")}}>
                                                                
                <View className=' rounded-md' style={{backgroundColor:"rgba(255,255,255,0.3)"}}>
                    <Image className='w-44 h-80 rounded-md' progressiveRenderingEnabled={true}  source={{uri:url.router_image(anime.category_image)}} />
                </View>
                <Text className='text-white w-44  mt-2' numberOfLines={2} ellipsizeMode="tail" >{anime.category_name || anime.title}</Text>

        </Pressable>
    );
};