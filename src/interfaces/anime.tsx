
export interface AnimeProps{
    id:string;
    category_name:string;
    category_image:string;
  
  }
  

  
export interface EpsodiesProps{
    video_id:string;
    category_id:string;
    title:string;
  
  }
   
export interface URLProps extends EpsodiesProps{
    urls:string[]
    sinop:string
  
  }
