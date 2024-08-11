
import { FontAwesome, MaterialIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity, View,StyleSheet,ActivityIndicator } from 'react-native';
import React from 'react';

export default function DownloadOptions({startDownload,resumeDownload,pauseDownload,pause,progress,downloading,finish}:{
                                            startDownload:any,resumeDownload:any,pauseDownload:any,finish:boolean,
                                            pause:boolean,progress:number,downloading:boolean,
                                            }) {
    

    if (finish){
        return (
            <View className='p-4 rounded-xl' style={{backgroundColor:"rgba(255,255,255,.1)"}}>
                <MaterialIcons name="file-download-done" size={26} color="white" />
                
            </View>
        )
    }

                                                
    if (!downloading){
        return (
            <TouchableOpacity onPress={startDownload}>
                <View className='p-4  rounded-xl' style={styles.icon}>
                    <SimpleLineIcons name="cloud-download" size={24} color="white" />
                </View>
            </TouchableOpacity>
        )
    }


    if (downloading && progress>=100){
        return (
            <View className='p-4 rounded-xl' style={{backgroundColor:"rgba(255,255,255,.1)"}}>
                <MaterialIcons name="file-download-done" size={26} color="white" />
                
            </View>
        )
    }
    
    if (pause){
        return (
            <TouchableOpacity onPress={resumeDownload}>
                <View className='p-4  rounded-xl' style={styles.icon}>
                    <MaterialIcons name="downloading" size={26} color="white" />
                </View>
            </TouchableOpacity>
        )
    }

    if (!pause && downloading){
        return (
            <TouchableOpacity onPress={pauseDownload}>
                <View className='p-4  rounded-xl' style={styles.icon}>
                    <FontAwesome name="close" size={26} color="red" />

                </View>
            </TouchableOpacity>
        )
    }





                                                

    return (
        <View>
            <ActivityIndicator size={'large'} color={"white"}></ActivityIndicator>
                                
        </View>
    );
}


const styles = StyleSheet.create({

    icon:{
        backgroundColor:"rgba(255,255,255,.1)"
    }
})