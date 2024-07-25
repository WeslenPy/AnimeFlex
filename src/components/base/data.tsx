import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { CategoryProps } from '@/src/interfaces/anime';



const styles = {
    size:30,
    color:"white"
}



const data_category:CategoryProps[] = [
    {
        icon:<Fontisto name="map" size={styles.size} color={styles.color} />,
        name:"Aventura",
        category:"Aventura",
    },

    {
        icon:<FontAwesome5 name="fire" size={styles.size} color={styles.color} />,
        name:"Ação",
        category:"Acao",
    },

    {
        icon:<FontAwesome6 name="face-grin-squint-tears" size={styles.size} color={styles.color} />,
        name:"Comédia",
        category:"Comedia",
    },


    {
        icon:<MaterialCommunityIcons name="heart-broken-outline" size={styles.size} color={styles.color} />,
        name:"Drama",
        category:"Drama",
    },


    {
        icon:<MaterialIcons name="translate" size={styles.size} color={styles.color} />,
        name:"Dublado",
        category:"Dublado",
    },


    {
        icon:<MaterialIcons name="18-up-rating" size={styles.size} color={styles.color} />,
        name:"Ecchi",
        category:"Ecchi",
    },



    {
        icon:<Feather name="book-open" size={styles.size} color={styles.color} />,
        name:"Escolar",
        category:"Escolar",
    },



    {
        icon:<MaterialIcons name="sports-football" size={styles.size} color={styles.color} />,
        name:"Esporte",
        category:"Esporte",
    },



    {
        icon:<MaterialIcons name="sports-football" size={styles.size} color={styles.color} />,
        name:"Fantasia",
        category:"Fantasia",
    },



   {
        icon:<Feather name="film" size={styles.size} color={styles.color} />,
        name:"Filme",
        category:"Filme",
    },



   {
        icon:<Octicons name="stop" size={styles.size} color={styles.color} />,
        name:"Harem",
        category:"Harem",
    },


   {
        icon:<MaterialCommunityIcons name="gamepad-round-outline" size={styles.size} color={styles.color} />,
        name:"Jogo",
        category:"Jogo",
    },

   {
        icon:<Ionicons name="time-outline" size={styles.size} color={styles.color} />,
        name:"Histórico",
        category:"Historico",
    },

   {
        icon:<Ionicons name="female-outline" size={styles.size} color={styles.color} />,
        name:"Josei",
        category:"Josei",
    },

   {
        icon:<FontAwesome5 name="superpowers" size={styles.size} color={styles.color} />,
        name:"Magia",
        category:"Magia",
    },

   {
        icon:<MaterialCommunityIcons name="screw-machine-flat-top" size={styles.size} color={styles.color} />,
        name:"Mecha",
        category:"Mecha",
    },

   {
        icon:<MaterialCommunityIcons name="pistol" size={styles.size} color={styles.color} />,
        name:"Militar",
        category:"Militar",
    },

   {
        icon:<MaterialCommunityIcons name="star-shooting-outline" size={styles.size} color={styles.color} />,
        name:"Mistério",
        category:"Misterio",
    },

   {
        icon:<Ionicons name="egg-outline" size={styles.size} color={styles.color} />,
        name:"OVA",
        category:"OVA",
    },


   {
        icon:<FontAwesome5 name="fire-alt" size={styles.size} color={styles.color} />,
        name:"Poderes",
        category:"Poderes",
    },


   {
        icon:<FontAwesome6 name="staff-snake" size={styles.size} color={styles.color} />,
        name:"Psicológico",
        category:"Psicologico",
    },


   {
        icon:<MaterialCommunityIcons name="heart-circle-outline" size={styles.size} color={styles.color} />,
        name:"Romance",
        category:"Romance",
    },


   {
        icon:<MaterialCommunityIcons name="sword" size={styles.size} color={styles.color} />,
        name:"Samurai",
        category:"Samurai",
    },


   {
        icon:<MaterialIcons name="science" size={styles.size} color={styles.color} />,
        name:"Ficção Científica",
        category:"Sci-Fi",
    },


   {
        icon:<FontAwesome5 name="kiss-beam" size={styles.size} color={styles.color} />,
        name:"Seinen",
        category:"Seinen",
    },

   {
        icon:<Feather name="smartphone" size={styles.size} color={styles.color} />,
        name:"Shoujo",
        category:"Shoujo",
    },

   {
        icon:<FontAwesome name="hand-rock-o" size={styles.size} color={styles.color} />,
        name:"Shounen",
        category:"Shounen",
    },

   {
        icon:<FontAwesome5 name="calendar-alt" size={styles.size} color={styles.color} />,
        name:"Slice of Life",
        category:"Slice of Life",
    },

   {
        icon:<FontAwesome6 name="star-of-david" size={styles.size} color={styles.color} />,
        name:"Sobrenatural",
        category:"Sobrenatural",
    },

  {
        icon:<MaterialIcons name="headset-off" size={styles.size} color={styles.color} />,
        name:"Suspense",
        category:"Suspense",
    },

  {
        icon:<Fontisto name="blood-drop" size={styles.size} color={styles.color} />,
        name:"Terror",
        category:"Terror",
    },


]

export default data_category;