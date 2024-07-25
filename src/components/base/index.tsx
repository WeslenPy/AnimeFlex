import { View,Pressable,Text,StyleSheet } from 'react-native';
import { CategoryProps } from '@/src/interfaces/anime';


export default function CategoryCard({category}:{category:CategoryProps}) {
 return (
    <View >
        <Pressable className=' rounded-md m-4 p-6' onPress={()=>{}} style={styles.color}>
            <View className='justify-center items-center'>

                <View className=''>{category.icon}</View>
                <View className='mt-3' ><Text className='text-white'>{category.name.toUpperCase()}</Text></View>
            </View>

        </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
    color:{
        backgroundColor:"#222B32"
    }
})