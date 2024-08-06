import { View,Image,Text,StyleSheet } from 'react-native';
import StatusBarPadding from '@/src/components/header/statusbar';
import { ScrollView } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';



export function Sep(){
  return (
    
    <View
    style={{
      borderBottomColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }}
  />
  )
}

export default function Profile() {
 return (
   <View className='bg-black flex-1'>
    <StatusBarPadding></StatusBarPadding>
    <ScrollView>
      <View className='h-60 ' style={{backgroundColor:"#db6c1d"}}>
        <View className='flex-col justify-center items-center mt-5'>
          <Image source={require("@/src/assets/images/icon.png")} className='w-32 h-32'></Image>
          <View>
            <Text className='text-white font-bold font-serif text-xl'>Anime Flex</Text>

          </View>

        </View>

      </View>

      <View style={styles.circle}>
        {/* <Text className='text-white' style={styles.font}>Configurações</Text> */}
      </View>

      <View className='flex-col  p-4'>
        <View>
          <Text className='text-slate-400 text-xl mb-1'> Player</Text>
          <View className='mx-4'>
            <View className='flex-row justify-between  items-center'>
              <Text className='text-white text-lg'>Iniciar video sempre expandido</Text>
              <Switch />
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='text-white text-lg'>Iniciar video sempre expandido</Text>
              <Switch  />
            </View>

            <Sep></Sep>
            
          </View>

        </View>

      </View>

    </ScrollView>


   </View>
  );
}


const styles= StyleSheet.create({
  circle:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    backgroundColor:"#222D31",
    borderWidth:20,
    borderColor:"black",
    borderRadius:200,
    padding:30,
    marginTop:-45
  },
  font:{
    fontSize:20
  }
})