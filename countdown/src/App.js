import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [timeCount, setTimeCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [val,setVal]=useState(false);

  const handleChange=(e)=>{
    if(e.key==='Enter'){
      let input=parseInt(e.target.value);
      if(Number.isInteger(input)){
        if(currentTime>0){
          clearInterval(intervalId);
        }
          setTimeCount(input);
      }
        else{
          setTimeCount(0);
        }
      e.target.value="";
    }
    setVal(false);
  }

  useEffect(()=>{
    if(timeCount>0){
      setCurrentTime(timeCount);
      const id=setInterval(() =>{
        setCurrentTime((prev)=>prev-1)
      },1000);
      setIntervalId(id);
    }else{
      setCurrentTime(0);
      setIntervalId(null);
    }
   },[timeCount])

   useEffect(()=>{
    if(intervalId!=null && currentTime===0){
      setVal(true);
      clearInterval(intervalId);
    }
   },[intervalId,currentTime])
  return (
    <div>
      <h1>Countdown in seconds</h1>
      <input type="text" id="timeCount" onKeyDown={handleChange} placeholder="Enter time ...."/>
      <div id="current-time">
        <h2>{currentTime}</h2>
        </div>
      {val && <div><h3 style={{color:"red"}}>Time's UP</h3></div>}
    </div>
  );
}

export default App;
