
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {  View, Button } from 'react-native';
import response from "../../api/animetv/response";

import Video, {VideoRef} from 'react-native-video';

export default function Player() {
    const {id} = useLocalSearchParams();
    const videoRef = useRef<VideoRef>(null);

    const manager = new response.ResponseManager();

   //      async function getVideo(id:any){
   //          let session = new SessionManager()
   //          let url = session.router_ep(id)
   //          let data = await session.get(url)
   //          data = manager.parse(data);

   //          setVideo(data);

   //      }

   //      getVideo(id);



 return (
    <View className='w-full h-full bg-black'>
         <Video
            className='w-80 h-44 bg-slate-300'
            ref={videoRef}
            resizeMode="contain"
            source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',}}
            controls={true}
        />
      
    </View>
  );
}
