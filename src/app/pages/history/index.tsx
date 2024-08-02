import { ActivityIndicator, View ,Text, FlatList, RefreshControl} from 'react-native';
import AnimeStorage from '@/src/controller/storage/manager';
import { AnimeProps } from '@/src/interfaces/anime';
import { useCallback, useEffect, useState } from 'react';
import {BoxHistory} from '@/src/components/box';

export default function History() {
  const [history,setHistory] = useState<AnimeProps[]>([]);
  const [loading,setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const storage = new AnimeStorage()

  async function getHistory(){
    const result = await storage.get("history")
    setHistory(result.history)
    setLoading(false)
    setRefreshing(false);

  }

  useEffect(()=>{
    getHistory()
  },[])


  const onRefresh = useCallback(() => {
    getHistory();  
    
  }, []);

 return (
   <View className='flex-1 bg-black mt-5'>

  {loading?
        <View className='items-center justify-center  p-10'>
          <ActivityIndicator size={50} color="orange" />
        </View>
      :<>
      
      <FlatList  
          refreshControl={  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={{gap:16,marginBottom:50}} 
          showsHorizontalScrollIndicator={false} keyExtractor={(item,index)=>{return index.toString()}}  
        showsVerticalScrollIndicator={true} horizontal={false} data={history} renderItem={({item})=><BoxHistory anime={item} state={history} setState={setHistory}></BoxHistory>}/>

       
      </>}

   </View>
  );
}