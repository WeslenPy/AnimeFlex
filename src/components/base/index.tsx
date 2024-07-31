import { View,TouchableOpacity,Text,StyleSheet } from 'react-native';
import { CategoryProps } from '@/src/interfaces/anime';


export default function CategoryCard({category}:{category:CategoryProps}) {
 return (
    <View className='w-52'>
        <TouchableOpacity onPress={()=>{}}>
            <View className=' w-52 rounded-md p-6'  style={styles.color}>
                <View className='justify-center items-center'>

                    <View className=''>{category.icon}</View>
                    <View className='mt-3' ><Text className='text-white'>{category.name.toUpperCase()}</Text></View>
                </View>

            </View>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    color:{
        backgroundColor:"#222B32"
    },
    container:{
        width:"50%"
    }
})