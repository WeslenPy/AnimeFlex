

export function currentTime(){
  return Date.now()
}

export function formatTime(milliseconds:number){
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    let mount = ""

    if (formattedHours !="00"){mount+=`${formattedHours}`}


    mount+=`${formattedHours!="00"?":":""}${formattedMinutes}`
    mount+=`:${formattedSeconds}`

    return mount!="0000"?mount.replace("::",":"):"00:00"
  
  };