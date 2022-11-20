import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import Splash from "./components/Splash";

function App() {
  const [time,setTime] = useState(<Splash />);
  const location = useLocation();

  // useEffect(()=>{
  //   if(location.pathname==="/"){
  //     setTimeout(function() {
  //       setTime(<AppRouter />)
  //     }, 3000)}
  //   else if(location.pathname==="/signin"){
  //     setTimeout(function() {
  //       setTime(<AppRouter />)
  //     }, 3000)
  //   }
  //   else{setTime(<AppRouter />)}
  // },[])

  return (
    <>
      <div className="App">
        
      {time}
      
      {
        setTimeout(function() {
          setTime(<AppRouter />)
        }, 3000)
      }

      </div>
    </>
  );
}

export default App;
