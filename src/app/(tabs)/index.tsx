import { Text, View,ScrollView } from "react-native";
import { Header } from "../../components/header/index";
import { Slider } from "../../components/slider/index";
import Constants from "expo-constants";
import { openScreenInfo } from "@/src/utils/screen";

const statusBar = Constants.statusBarHeight;


export default function Index() {
  return (
    <ScrollView style={{flex:1}} className="bg-black " 
                showsVerticalScrollIndicator={false} >

      <View  className="w-full p-4"
            style={{marginTop:statusBar+8}}>

        <Header config={{focus:false,set:()=>{},focused:openScreenInfo}}/>
        <Slider/>

      </View>
    </ScrollView>
  );
};
