import { Text, View,ScrollView } from "react-native";
import { Header } from "../../components/header/index";
import { Slider } from "../../components/slider/index";
import Constants from "expo-constants";
import { openScreenInfo } from "@/src/utils/screen";


const statusBar = Constants.statusBarHeight;


export default function Index() {


  return (
    <View  className="w-full p-4 bg-black h-full" style={{marginTop:statusBar+8}}>
      <Header config={{focus:false,set:()=>{},focused:openScreenInfo}}/>
      <ScrollView style={{flex:1}}
                  showsVerticalScrollIndicator={false} >

          <Slider/>

        </ScrollView>
    </View>
  );
};
