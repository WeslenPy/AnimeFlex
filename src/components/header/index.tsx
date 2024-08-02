import { View,Pressable,TextInput,Text } from 'react-native';
import { useState } from 'react';
import {Ionicons} from "@expo/vector-icons";
import { HeaderProps } from '@/src/interfaces/components';
import StatusBarPadding from "@/src/components/header/statusbar";

export function Header({config}:{config:HeaderProps}) {
    const [search,onChangeSearch] = useState(''); 

    return (
        <View >
            <StatusBarPadding></StatusBarPadding>
            <View className='w-full flex flex-row justify-between bg-slate-700 rounded-full mt-2'>
                <TextInput  className="w-80 text-slate-300 ml-4"
                            placeholder="Pesquise aqui..."  
                            placeholderTextColor="white"
                            onChangeText={(text)=>{onChangeSearch(text);config.set(text)}}
                            onFocus={()=>{config.focused()}}
                            autoFocus={config.focus}
                            value={search}></TextInput>

                <Pressable className='p-2 ' onPress={()=>{config.focused()}}>
                    <Ionicons name="search"  size={28} color="white" />
                </Pressable>
            </View>
            <View className='flex-col w-full  justify-center items-center mt-3 mb-2'>
                <Text className="text-orange-400" >Desenvolvedor: @WeslenPy</Text>
            </View>

        </View>
    );
};