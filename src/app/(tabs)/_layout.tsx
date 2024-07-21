import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {

  const config = {
    headerTintColor:"#24252A",
    tabBarActiveTintColor:"#FB772B",
    tabBarActiveBackgroundColor:"#24252A",
    headerShown:false,
  }


  const options = {
    tabBarHideOnKeyboard:true,
    headerTintColor:config.headerTintColor,
    tabBarActiveTintColor:config.tabBarActiveTintColor,
    tabBarActiveBackgroundColor:config.tabBarActiveBackgroundColor,
    tabBarInactiveBackgroundColor:config.tabBarActiveBackgroundColor,
    headerShown:config.headerShown,
  }


  return (
    <Tabs screenOptions={{}} >
      <Tabs.Screen name="index" 
      
            options={{
              ...options,
              title:"Home",
              tabBarIcon:({focused,color,size})=>{
                return  <Ionicons name="home-outline" size={size} color={color}/>
              }
      }}/>   

    <Tabs.Screen name="favorites" 
            options={{
              ...options,
              title:"Favoritos",
              tabBarIcon:({focused,color,size})=>{
                return  <Ionicons name="bookmark-outline" size={size} color={color}/>
              }

              }}/>
    
    <Tabs.Screen name="category" 
            options={{
              ...options,
              title:"Categorias",
              tabBarIcon:({focused,color,size})=>{
                return  <Ionicons name="grid-outline" size={size} color={color}/>
              }

    }}/>

    <Tabs.Screen name="profile" 
            options={{
              ...options,
              title:"Perfil",
              tabBarIcon:({focused,color,size})=>{
                return  <Ionicons name="heart-circle-outline" size={size} color={color}/>

              }
    }}/>



    </Tabs>

  );
}
