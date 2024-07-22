import { View,Pressable,Text, TouchableOpacity, Touchable } from 'react-native';
import { EpsodiesProps } from "../../interfaces/anime";
import {openScreenPlayer} from '@/src/utils/screen';
import { Feather } from '@expo/vector-icons';





export default function Epsodie({ep}:{ep:EpsodiesProps}) {
    
    return (
        <Pressable className='w-full flex flex-row  bg-slate-600 rounded-md p-4 items-center justify-between'  onPress={() => {console.log(ep.video_id);openScreenPlayer(ep.video_id);}}>
            <View className='mx-5 w-80'>
                <Text className='text-white mt-2'>{ep.title}</Text>
            </View>
            <View>
                <Feather name="play-circle" size={25} color="orange" />
            </View>
       </Pressable>
  );
}