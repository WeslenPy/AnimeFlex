import { ActivityIndicator, View ,Text, FlatList, RefreshControl} from 'react-native';
import { AnimeProps } from '@/src/interfaces/anime';
import { useCallback, useEffect, useState } from 'react';
import {BoxHistory} from '@/src/components/box';
import { AnimeQuery } from '@/src/controller/storage/database';

import HeaderList from '@/src/components/flat/header';


export default function Fav() {
  const [fav,setFav] = useState<AnimeProps[]>([]);
  const [loading,setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const storage = new AnimeQuery()

  async function getFav(){
    const result = await storage.getFullFavorites()
    if (result){

      const formattedAnime= await storage.formatResult(result)
      setFav(formattedAnime)
      
    }
    
    setRefreshing(false);
    setLoading(false)

  }

  useEffect(()=>{
    getFav()
  },[])


  const onRefresh = useCallback(() => {
    getFav();  
    
  }, []);

 return (
   <View className='flex-1 bg-black mt-5'>

  {loading?
        <View className='items-center justify-center  p-10'>
          <ActivityIndicator size={50} color="orange" />
        </View>
      :<>
      
      <FlatList  
          ListHeaderComponent={<HeaderList quantity={fav.length}></HeaderList>}
          ListFooterComponent={<View className='mb-10'></View>}
          refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{gap:5,marginBottom:50}} 
          showsHorizontalScrollIndicator={false} keyExtractor={(item,index)=>{return index.toString()}}  
        showsVerticalScrollIndicator={true} horizontal={false} data={fav} 
        renderItem={({item})=><BoxHistory anime={item} state={fav} setState={setFav} remove={true}></BoxHistory>}/>

       
      </>}

   </View>
  );
}