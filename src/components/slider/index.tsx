import { View,Text} from 'react-native';
import { useEffect,useState } from 'react';
import {SessionManager} from "../../api/animetv/session";
import { AnimeProps } from "../../interfaces/anime";
import Flat from '../flat';

function shuffleArray(array:[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function Slider() {




    const [recommend,setRecommend] = useState<AnimeProps[]>([]);
    const [populares,setPopulares] = useState<AnimeProps[]>([]);
    const [romance,setRomance] = useState<AnimeProps[]>([]);

    const session = new SessionManager()

    useEffect(()=>{

      async function getData(url:string){
        let data = await session.get(url)
        return shuffleArray(data.slice());

      }


        async function getRecommend(){
          let url_recommend = session.router_latest()
          let url_popular = session.router_popular()
          let url_romance = session.router_category("ROMANCE")

          let data_popular = await getData(url_popular)
          let data_recommend = await getData(url_recommend)
          let data_romance = await getData(url_romance)

          setPopulares(data_popular);
          setRecommend(data_recommend);
          setRomance(data_romance);

        }

        getRecommend();
    },[])


 return (
    <View className='w-full mt-4 m-4  mb-5'>
        <Flat config={{title:"NOVOS EPISODIOS",variavel:recommend}}></Flat>
        <Flat config={{title:"ANIMES POPULARES",variavel:populares}}></Flat>
        <Flat config={{title:"ANIMES SOBRE ROMANCE",variavel:romance}}></Flat>

        <View className='w-full justify-center items-center mt-5 mb-5'>
          <Text className='text-gray-50'>Você chegou ao fim da lista.</Text>
        </View>
   
    </View>
  );
}

