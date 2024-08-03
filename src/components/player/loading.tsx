import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
 return (
    <View className='flex-row w-full items-center justify-center'>
        <ActivityIndicator size={50} color="orange" />
    </View>
  );
}