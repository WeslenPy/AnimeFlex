import{useState} from 'react';
import { TouchableOpacity, View, useWindowDimensions,Text ,StyleSheet} from 'react-native';
import { TabView, SceneMap, SceneRendererProps, NavigationState, Route } from 'react-native-tab-view';
import StatusBarPadding from '@/src/components/header/statusbar';
import Fav from '@/src/app/pages/fav';
import Offline from '@/src/app/pages/offline';
import History from '@/src/app/pages/history';
import {  Fontisto } from '@expo/vector-icons';


const renderScene = SceneMap({
  favorites: Fav,
  history: History,
  offline: Offline,
});




export default function FavoriteTab() {

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'favorites', title: 'Favorites',icon:"favorite" },
    { key: 'history', title: 'History',icon:"history" },
    { key: 'offline', title: 'Offline',icon:"cloud-down" },
  ]);


  function renderTabBar(props:SceneRendererProps & {navigationState:NavigationState<Route>} ){

    return (
      <View className='flex flex-row justify-between bg-black  w-full items-center h-20' style={styles.container}>
        {props.navigationState.routes.map((route, i) => {

          let opacity = index==i?1:0.6
          let color = index==i?"orange":"white"


          return (

            <TouchableOpacity style={styles.tab} key={i} onPress={() => setIndex(i)}>

              <View className='flex-row gap-3 ' style={{opacity:opacity}}>
                {route.icon ?
                  <Fontisto name={route.icon} size={24} color={color} />
                  :<></>
                }
                <Text className='text-white'>{route.title}</Text>
              </View>
              {index == i?
              <View className='flex-1 bg-orange-400 w-full mt-2 rounded-md'></View>:<></>
              }
            </TouchableOpacity>
          );
        })}

      </View>
    );
  };


  return (
    
    <View className='flex-1 bg-black'>
      <View className='mb-3 mt-4'>
        <StatusBarPadding></StatusBarPadding>

        <Text className='text-2xl mx-3 text-white'>Minhas Listas</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />

    </View>

  );
}



const styles = StyleSheet.create({
  tab :{
    flex:1,
    padding:16,
    paddingBottom:13,
    alignItems:"center"
  },
  container:{
    borderBottomColor:"rgba(36, 36, 36,0.5)",
    borderBottomWidth:5
  }
})