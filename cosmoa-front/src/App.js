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
        
      {/* {time} */}
      <AppRouter />
      
        {/* <div style={{display : "none"}}>
          {
            setTimeout(function() {
              setTime(<AppRouter />)
            }, 1000)
          }
        </div> */}
      </div>
    </>
  );
}

export default App;
