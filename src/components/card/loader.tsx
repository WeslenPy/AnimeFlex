import { View,Pressable,ActivityIndicator} from 'react-native';


export function CardLoader() {

    return (
       <Pressable className='flex flex-col items-center' >
            <View className='bg-slate-400 rounded-md w-44 h-80'>
                <ActivityIndicator size="large" color="orange" />
            </View>
       </Pressable>
    );
};