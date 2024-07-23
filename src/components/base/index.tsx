import { View,Pressable,Text } from 'react-native';
import { CategoryProps } from '@/src/interfaces/anime';


export default function CategoryCard({category}:{category:CategoryProps}) {
 return (
    <View className='columns-6'>
        <Pressable className='bg-slate-400 rounded-md m-4' onPress={()=>{}}>
            <View className='justify-center items-center p-2'>

                <View className=''>{category.icon}</View>
                <View className='' ><Text className='text-white'>{category.name.toUpperCase()}</Text></View>
            </View>

        </Pressable>
    </View>
  );
}