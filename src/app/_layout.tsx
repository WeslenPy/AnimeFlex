import { Stack,Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import "../styles/global.css";

export default function RootLayout() {

  const config = {
    headerTintColor:"#24252A",
    tabBarActiveTintColor:"#FB772B",
    tabBarActiveBackgroundColor:"#24252A",
    headerShown:false,
  }


  return (
    <Tabs >
      <Tabs.Screen name="index" 
            options={{
              headerTintColor:config.headerTintColor,
              tabBarActiveTintColor:config.tabBarActiveTintColor,
              tabBarActiveBackgroundColor:config.tabBarActiveBackgroundColor,
              tabBarInactiveBackgroundColor:config.tabBarActiveBackgroundColor,
              headerShown:config.headerShown,
              title:"Home",
              tabBarIcon:({focused,color,size})=>{

             
                return  <Ionicons name="home-outline" size={size} color={color}/>
               

              }
      }}/>   

    <Tabs.Screen name="favorites" 
            options={{
              headerTintColor:config.headerTintColor,
              tabBarActiveTintColor:config.tabBarActiveTintColor,
              tabBarActiveBackgroundColor:config.tabBarActiveBackgroundColor,
              tabBarInactiveBackgroundColor:config.tabBarActiveBackgroundColor,
              headerShown:config.headerShown,
              title:"Favoritos",
              tabBarIcon:({focused,color,size})=>{


                return  <Ionicons name="bookmark-outline" size={size} color={color}/>

              }

              }}/>
    
    <Tabs.Screen name="category" 
            options={{
              headerTintColor:config.headerTintColor,
              tabBarActiveTintColor:config.tabBarActiveTintColor,
              tabBarActiveBackgroundColor:config.tabBarActiveBackgroundColor,
              tabBarInactiveBackgroundColor:config.tabBarActiveBackgroundColor,
              headerShown:config.headerShown,
              title:"Categorias",
              tabBarIcon:({focused,color,size})=>{


                return  <Ionicons name="grid-outline" size={size} color={color}/>
               

              }

    }}/>

    <Tabs.Screen name="profile" 
            options={{
              headerTintColor:config.headerTintColor,
              tabBarActiveTintColor:config.tabBarActiveTintColor,
              tabBarActiveBackgroundColor:config.tabBarActiveBackgroundColor,
              tabBarInactiveBackgroundColor:config.tabBarActiveBackgroundColor,
              headerShown:config.headerShown,
              title:"Perfil",
              tabBarIcon:({focused,color,size})=>{

                return  <Ionicons name="heart-circle-outline" size={size} color={color}/>

              }
    }}/>



    </Tabs>

  );
}
