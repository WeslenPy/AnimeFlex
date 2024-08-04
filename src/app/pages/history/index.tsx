import { ActivityIndicator, View ,Text, FlatList, RefreshControl} from 'react-native';
import { AnimeProps } from '@/src/interfaces/anime';
import { useCallback, useEffect, useState } from 'react';
import {BoxHistory} from '@/src/components/box';
import { AnimeQuery } from '@/src/controller/storage/database';



export default function History() {
  const [history,setHistory] = useState<AnimeProps[]>([]);
  const [loading,setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const storage = new AnimeQuery()

  async function getHistory(){
    // const result = await storage.getFullHistory()
    // if (result){

    //   const formattedAnime= await storage.formatResult(result)
    //   setHistory(formattedAnime)
      
    // }
    
    setRefreshing(false);
    setLoading(false)

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