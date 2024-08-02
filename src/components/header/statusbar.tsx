import { View } from 'react-native';
import Constants from "expo-constants";


const statusBar = Constants.statusBarHeight;

export default function StatusBarPadding() {
 return (
   <View style={{marginTop:statusBar+10,opacity:1,backgroundColor:"rgba(255,255,255,0.1)"}} />
  );
}