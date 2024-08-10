import { ActivityIndicator, View ,Text, FlatList, RefreshControl} from 'react-native';
import { AnimeProps } from '@/src/interfaces/anime';
import { useCallback, useEffect, useState } from 'react';
import {BoxHistory} from '@/src/components/box';
import { AnimeQuery } from '@/src/controller/storage/database';



export default function Offline() {

  const [offline,setOffline] = useState<AnimeProps[]>([]);
  const [loading,setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const storage = new AnimeQuery()

  async function getOffline(){
    const result = await storage.getFullDownloadByAnime()
    if (result){

      const formattedAnime= await storage.formatResult(result)
      setOffline(formattedAnime)
      
    }
    
    setRefreshing(false);
    setLoading(false)

  }

  useEffect(()=>{
    getOffline()
  },[])


  const onRefresh = useCallback(() => {
    getOffline();  
    
  }, []);

 return (
   <View className='flex-1 bg-black mt-5'>

  {loading?
        <View className='items-center justify-center  p-10'>
          <ActivityIndicator size={50} color="orange" />
        </View>
      :<>
      
      <FlatList  
          ListFooterComponent={<View className='mb-10'></View>}
          refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{gap:16,marginBottom:50}} 
          showsHorizontalScrollIndicator={false} keyExtractor={(item,index)=>{return index.toString()}}  
          showsVerticalScrollIndicator={true} horizontal={false} 
          data={offline} renderItem={({item})=><BoxHistory anime={item} state={offline} setState={setOffline} remove={false}></BoxHistory>}/>

       
      </>}

   </View>
  );
}