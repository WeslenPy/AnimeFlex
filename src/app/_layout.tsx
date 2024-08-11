import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from "@/drizzle/migrations";
import { Stack } from 'expo-router/stack';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { AnimeQuery } from '../controller/storage/database';
import DownloadManager from '../controller/storage/download';
import {useEffect} from "react";
import "../styles/global.css";

export default function Layout() {


  const context = new AnimeQuery()

  const { success, error } = useMigrations(context.db, migrations);

  const config ={
    headerShown: false,
    statusBarTranslucent:true 
  }

  // useDrizzleStudio(context.expoDB);

  
 
  useEffect(()=>{
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  },[])

  return (
    
    <GestureHandlerRootView style={{ flex: 1,backgroundColor:"black" }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={config} />
          <Stack.Screen name="(viewer)" options={config} />
          <Stack.Screen name="anime/[id]" options={config} />
          <Stack.Screen  name="play/[id]" options={{ ...config,statusBarHidden:true}} />
        </Stack>
    </GestureHandlerRootView>

  );
}
