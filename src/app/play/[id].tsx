
import { SessionManager } from '@/src/api/animetv/session';
import { URLProps } from '@/src/interfaces/anime';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {  View, Button } from 'react-native';
import response from "../../api/animetv/response";
import { Video, ResizeMode } from 'expo-av';

export default async function Player() {
    const {id} = useLocalSearchParams();

    const video = useRef(null);
    const [status, setStatus] = useState({});

    let url_anime = "";

    const manager = new response.ResponseManager();

    async function getVideo(id:any){
      let session = new SessionManager()
      let url = session.router_ep(id)
      let data = await session.get(url)
      data = manager.parse(data);

      url_anime = data.urls[0]
        

    }

    await getVideo(id);



 return (
    <View className='w-full h-full bg-black'>
      <Video
      style={{width:400,height:400,backgroundColor:"red"}}
        ref={video}
        source={{
          uri: url_anime,
        }}
        useNativeControls
        shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      
    </View>
  );
}
