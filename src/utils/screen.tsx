import { router } from "expo-router";


export default function openScreenAnime(anime_id:string){

    return router.navigate(`/anime/${anime_id}`)

}

export function openScreenPlayer(video_id:string){
    return router.navigate(`/play/${video_id}`)

}

export function openScreenInfo(){
    return router.navigate("/info")

}
