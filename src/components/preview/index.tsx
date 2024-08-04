import React, { useCallback, useMemo, useRef,useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { AnimeProps } from '@/src/interfaces/anime';
import { Portal, PaperProvider } from 'react-native-paper';

export default function Preview({reference,animeId}:{reference:any,animeId:number|string}) {
  const [info,setInfo] = useState<AnimeProps>()

  const snapPoints = useMemo(()=>["30%","80%"],[])


  return (
      <Portal>
        <View className='flex-1'>
          <BottomSheet
            ref={reference}
            index={-1}
            enablePanDownToClose={true}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor:"#fff"}}>
                  <BottomSheetView style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                  </BottomSheetView>
          </BottomSheet>

        </View>
      </Portal>

  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});