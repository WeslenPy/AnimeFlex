import { Text, View,ScrollView } from "react-native";
import { Header } from "../../components/header/index";
import { Slider } from "../../components/slider/index";
import { openScreenInfo } from "@/src/utils/screen";
import { PaperProvider } from "react-native-paper";
import { SQLiteProvider } from "expo-sqlite";


export default function Index() {

  return (
    <SQLiteProvider databaseName={"anime.db"}>

      <PaperProvider>
        <View  className="w-full p-4 bg-black h-full"  >

          <Header config={{focus:false,set:()=>{},focused:openScreenInfo}}/>
          <ScrollView style={{flex:1}}
                      showsVerticalScrollIndicator={false} >

              <Slider/>

            </ScrollView>

        </View>
      </PaperProvider>

    </SQLiteProvider>
  );
};
