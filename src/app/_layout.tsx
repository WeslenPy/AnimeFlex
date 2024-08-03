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


const DATABASE_NAME="anime.db"

const expoDB = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDB);



export default function Layout() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
     
  },[]);
  
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

 

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false,statusBarTranslucent:true }} />
        <Stack.Screen name="(viewer)" options={{ headerShown: false,statusBarTranslucent:true }} />
        <Stack.Screen name="anime/[id]" options={{ headerShown: false,statusBarTranslucent:true  }} />
        <Stack.Screen  name="play/[id]" options={{ headerShown: false,statusBarTranslucent:true,statusBarHidden:true}} />
      </Stack>
    </SQLiteProvider>
  );
}
