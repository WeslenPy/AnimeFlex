
export interface AnimeProps{
    id:string;
    video_id:string;
    category_name:string;
    category_image:string;
    title:string
  
  }
  
export interface CategoryProps{
    icon:React.JSX.Element;
    name:string;
    category:string
  
  }
  

  
export interface EpsodiesProps{
    video_id:string;
    category_id:string;
    title:string;
  
  }
   
export interface URLProps {
    urls:[]
    sinop:string
    video_id:string;
    category_id:string;
    title:string;
  
  
  }
