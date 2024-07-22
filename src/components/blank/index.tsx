import { View,Image,Pressable,Text } from 'react-native';


export default function Blank() {
    
    return (
        <Pressable className='w-full h-full bg-slate-600 items-center justify-center'  >
            <View>
                <Text className='text-white'>Não foi implementado</Text>
            </View>
       </Pressable>
  );
}