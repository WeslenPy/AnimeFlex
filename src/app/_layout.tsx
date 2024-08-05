import * as ScreenOrientation from 'expo-screen-orientation';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SQLiteProvider } from 'expo-sqlite';
import migrations from "@/drizzle/migrations";
import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import "../styles/global.css";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { View,Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const DATABASE_NAME="anime.db"

const expoDB = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDB);



export default function Layout() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
     
  },[]);
  
  const { success, error } = useMigrations(db, migrations);

  const config ={
    headerShown: false,
    statusBarTranslucent:true 
  }

  return (
    
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={config} />
            <Stack.Screen name="(viewer)" options={config} />
            <Stack.Screen name="anime/[id]" options={config} />
            <Stack.Screen  name="play/[id]" options={{ ...config,statusBarHidden:true}} />
          </Stack>
      </GestureHandlerRootView>


    </SQLiteProvider>
  );
}
