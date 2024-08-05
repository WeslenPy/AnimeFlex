import { router } from "expo-router";

export default function openScreenAnime(anime_id:string|number){


    return router.navigate(`/anime/${anime_id}`)

}

export function openScreenPlayer(video_id:string|number|null,current_index:string,page:any,push=false){
    if (video_id){
        const  uri= `/play/${video_id}?current=${current_index}&back_id=${page}`
        return router.push(uri)
    }

}

export function openScreenInfo(category:string=""){
    return router.navigate(`/info?category=${category}`)

}
export function openScreenPreview(anime_id:string|number=""){
    return router.navigate(`/preview?id=${anime_id}`)

}
