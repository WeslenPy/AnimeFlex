
import { SessionManager } from '@/src/api/animetv/session';
import { useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import {  View, Button } from 'react-native';



async function getURL(id:any){
    let session = new SessionManager()
    let url = session.router_ep(id)
    const data= await session.get(url)
    return data.urls[0];
}

export default async function Player() {

    const {id} = useLocalSearchParams();

    let url = await getURL(id);

    const ref = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const player = useVideoPlayer(url, player => {
        player.loop = false;
        player.play();
    });

    useEffect(() => {
    const subscription = player.addListener('playingChange', isPlaying => {
        setIsPlaying(isPlaying);
    });

    return () => {
        subscription.remove();
    };}, [player]);

 return (
    <View className='w-full h-full bg-black'>
        <VideoView
            ref={ref}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
        />

        <View >
            <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={() => {
                if (isPlaying) {player.pause();}
                else {player.play(); }

                setIsPlaying(!isPlaying);
            }}
            />
        </View>

      
    </View>
  );
}
