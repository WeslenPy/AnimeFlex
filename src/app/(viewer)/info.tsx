import { Text, View,ScrollView } from "react-native";
import Constants from "expo-constants";

const statusBar = Constants.statusBarHeight;


export default function Info() {
  return (
    <ScrollView style={{flex:1}} className="bg-black " 
                showsVerticalScrollIndicator={false} >

      <View  className="w-full p-4"
            style={{marginTop:statusBar+8}}>

      </View>
    </ScrollView>
  );
};
