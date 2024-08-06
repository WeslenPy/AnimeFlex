import { EpsodiesProps, InfoProps } from '@/src/interfaces/anime';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, RefreshControl, StyleProp, View } from 'react-native';



export default function FlatPaginated({styling,renderItem,perPage,data,refreshCallBack,eventListener,horizontal,empty,timingPage,renderTop,
                                }:{styling?:StyleProp<any>,renderItem:ListRenderItem<any>,horizontal:boolean,timingPage?:number,renderTop?:ReactElement,
                                    perPage?:number,data:any,refreshCallBack?:Function,eventListener?:any,empty?:ReactElement}) {

    const [paginated,setPaginated] = useState<EpsodiesProps[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = perPage || 4;

    useEffect(() => {
        loadMoreData();
      }, [page]);


    useEffect(() => {
        setPaginated(data.slice(0, ITEMS_PER_PAGE));
      }, [data]);

    
  const loadMoreData = () => {
    if (loading) return;
        setLoading(true);

        let timeouted = setTimeout(() => {

        if(data.length>0){
            const startIndex = paginated.length;
            let endIndex = Math.min(startIndex + ITEMS_PER_PAGE, data.length);

            const newDisplayedData = data.slice(startIndex, endIndex);
            setPaginated(prevData => [...prevData, ...newDisplayedData]);

            
        }
    
        setLoading(false);

        },timingPage||1500)

    return ()=>clearTimeout(timeouted);
    
    };

    
    const renderFooter = () => {
        if (!loading && paginated.length >= data.length) {return null}
    
        return (
          <View className='p-5'>
            <ActivityIndicator size="large" color="orange" />
          </View>
        );
      };


    const onRefresh = useCallback(() => {
        if (refreshCallBack){refreshCallBack()};  
      }, []);
    
      
  const handleLoadMore = () => {
    if (!loading && paginated.length < data.length) {
      setPage(prevPage => prevPage + 1);
    }
  };
    
 return (
    <FlatList ListEmptyComponent={empty?empty:<></>} onEndReachedThreshold={0.1} ListFooterComponent={renderFooter} ListHeaderComponent={renderTop}
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }  onEndReached={handleLoadMore} 
            keyExtractor={(item,key)=>{return key.toString()}}
            contentContainerStyle={styling}  onScroll={eventListener}
            showsHorizontalScrollIndicator={true} showsVerticalScrollIndicator={true} horizontal={horizontal} 
            data={paginated} scrollEventThrottle={16} 
            renderItem={renderItem}/>
  );
}