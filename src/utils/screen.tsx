import { useRouter,router } from "expo-router";


export default function openScreenAnime(anime_id:any){

    return router.navigate(`/anime/${anime_id}`)

}

export function openScreenPlayer(video_id:string,current_index:string,page:any){
    return router.push(`/play/${video_id}?current=${current_index}&back_id=${page}`)

}

export function openScreenInfo(category:string=""){
    return router.navigate(`/info?category=${category}`)

}
