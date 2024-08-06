import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SQLiteProvider } from 'expo-sqlite';
import migrations from "@/drizzle/migrations";
import { Stack } from 'expo-router/stack';
import "../styles/global.css";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

import { AnimeQuery } from '../controller/storage/database';


export default function Layout() {

  const context = new AnimeQuery()
  const { success, error } = useMigrations(context.db, migrations);

  console.log(success)

  const config ={
    headerShown: false,
    statusBarTranslucent:true 
  }

  useDrizzleStudio(context.expoDB);

  return (
    
    <SQLiteProvider databaseName={context.DATABASE_NAME}>
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
