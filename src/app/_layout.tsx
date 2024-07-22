import { Stack } from 'expo-router/stack';
import "../styles/global.css";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(viewer)" options={{ headerShown: false }} />
      <Stack.Screen name="anime/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="play/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
