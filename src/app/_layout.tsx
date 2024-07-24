import { Stack } from 'expo-router/stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import "../styles/global.css";

export default function Layout() {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
     
  },[]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(viewer)" options={{ headerShown: false }} />
      <Stack.Screen name="anime/[id]" options={{ headerShown: false  }} />
      <Stack.Screen  name="play/[id]" options={{ headerShown: false}} />
    </Stack>
  );
}
