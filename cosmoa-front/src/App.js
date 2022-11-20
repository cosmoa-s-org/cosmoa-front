import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import AppRouter from "./AppRouter";
import Splash from "./components/Splash";

function App() {
  const [time,setTime] = useState(<Splash />);

  return (
    <>
      <div className="App">
        
      {time}
      
      {
        setTimeout(function() {
          setTime(<AppRouter />)
        }, 1000)
      }

      </div>
    </>
  );
}

export default App;
