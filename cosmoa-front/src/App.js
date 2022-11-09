import { useState } from 'react';
import './App.css';
import AppRouter from './AppRouter';

function App() {

  // const [user, setUser] = useState('');
  // const authenticated = user != null;

  // const login = ({ email, password }) => setUser(signIn({ email, password }));
  // const logout = () => setUser(null);


  // function loginHandler() {
  //   isLogin = true;
  // }

  // function setUserInfo() {

  // }

  // function logoutHandler() {
  //   isLogin = false;
  // }

return (<>
    <div className="App" >
      <AppRouter />
    </div>
    </>);
}

export default App;
