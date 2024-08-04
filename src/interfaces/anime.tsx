
export interface AnimeProps{
    id:string|number;
    video_id:string|null|number;
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
    back_ep?:number|string
    category_id:string;
    video_id:string;
    title:string;
    index_id:number
  
  }
     

export interface InfoProps{
    category_description:string;
    category_name:string;
    category_image:string;
    category_genres:string;
    count:string;
    ano:string;
    off:string;
    id:string;
  
  }
   
export interface URLProps {
    urls:[]
    sinop:string
    video_id:string;
    category_id:string;
    title:string;
  
  
  }
