

import { AntDesign, Ionicons } from '@expo/vector-icons';
import { View,Text } from 'react-native';

export default function HeaderList({quantity}:{quantity:number}) {
 return (

   <View className='w-full p-2'>
        <View className='p-4 rounded-lg flex-row justify-between items-center gap-2 ' style={{backgroundColor:"rgba(255,255,255,0.2)"}}>
            <Ionicons name="heart-half-outline" size={24} color="orange" />
            <Text className='text-white text-2xl'>{quantity}</Text>
            <AntDesign name="hearto" size={24} color="red" />
        </View>
    
   </View>
  );
}