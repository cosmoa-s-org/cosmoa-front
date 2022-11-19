import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppRouter from './AppRouter';
import Splash from './components/Splash';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <div className="App" >
      {/* {
      setTimeout(function() {
      return (<>
        <Splash />
      </>)
      }, 5000)
    } */}
      <AppRouter />
    </div>
  </>
);

