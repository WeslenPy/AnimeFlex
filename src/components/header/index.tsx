import { View,Pressable,TextInput } from 'react-native';
import { useState } from 'react';
import {Ionicons} from "@expo/vector-icons";
import { HeaderProps } from '@/src/interfaces/components';

export function Header({config}:{config:HeaderProps}) {
    const [search,onChangeSearch] = useState(''); 

    return (
        <View className='w-full flex flex-row justify-end bg-slate-700 rounded-full mt-2'>
            <TextInput  className="w-96 text-slate-300 -mx-4 "
                        placeholder="Pesquise aqui..."  
                        placeholderTextColor="white"
                        onChangeText={(text)=>{onChangeSearch(text);config.set(text)}}
                        onFocus={()=>{config.focused()}}
                        autoFocus={config.focus}
                        value={search}></TextInput>


            <Pressable className='p-2' onPress={()=>{config.focused()}}>
                <Ionicons name="search" className='mx-2' size={28} color="white" />
            </Pressable>
        </View>
    );
};