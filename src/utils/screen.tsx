import { router } from "expo-router";

export default function openScreenAnime(anime_id:string|number){


    return router.navigate(`/anime/${anime_id}`)

}

export function openScreenPlayer(video_id:string|number|null,current_index:string,page:any){
    if (video_id){
        return router.push(`/play/${video_id}?current=${current_index}&back_id=${page}`)
    }

}

export function openScreenInfo(category:string=""){
    return router.navigate(`/info?category=${category}`)

}
export function openScreenPreview(anime_id:string|number=""){
    return router.navigate(`/preview?id=${anime_id}`)

}
