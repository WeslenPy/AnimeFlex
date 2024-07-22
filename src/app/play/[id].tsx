
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import {  View, Button } from 'react-native';
import response from "../../api/animetv/response";




export default function Player() {
    const {id} = useLocalSearchParams();

    const [video,setVideo] = useState<URLProps[]>([]);

    const manager = new response.ResponseManager();

   //  useEffect(()=>{
   //      async function getVideo(id:any){
   //          let session = new SessionManager()
   //          let url = session.router_ep(id)
   //          let data = await session.get(url)
   //          data = manager.parse(data);

   //          setVideo(data);

   //      }

   //      getVideo(id);
   //  })


    console.log(video)


    const videoRef = useRef(null);
    const [status, setStatus] = useState<AVPlaybackStatus>();


 return (
    <View className='w-full h-full bg-black'>
         <Video
            className='w-full h-full'
            ref={videoRef}
            source={{
               uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
             }}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
         <View>

            <Button
               title={status.isPlaying ? 'Pause' : 'Play'}
               onPress={() =>
                  status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
               }/>

         </View>
            
      
    </View>
  );
}