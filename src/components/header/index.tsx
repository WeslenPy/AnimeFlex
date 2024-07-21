import { View,Pressable,Text,TextInput } from 'react-native';
import { useState,useEffect } from 'react';
import {Ionicons, Feather} from "@expo/vector-icons";

export function Header() {
    const [search,onChangeSearch] = useState(''); 

    return (
        <View className='w-full flex flex-row justify-end bg-slate-700 rounded-full mt-2'>
            <TextInput  className="w-96 text-slate-300 -mx-4 "
                        placeholder="Pesquise aqui..."  
                        placeholderTextColor="white"
                        onChangeText={onChangeSearch}
                        value={search}></TextInput>


            <Pressable className='p-2'>
                <Ionicons name="search" className='mx-2' size={28} color="white"/>
            </Pressable>
        </View>
    );
};