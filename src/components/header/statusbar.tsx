import { View } from 'react-native';
import Constants from "expo-constants";


const statusBar = Constants.statusBarHeight;

export default function StatusBar() {
 return (
   <View style={{marginTop:statusBar+10}}/>
  );
}