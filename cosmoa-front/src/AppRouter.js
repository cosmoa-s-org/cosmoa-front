import React from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Box from "@material-ui/core/Box";

import Header from "./components/head/Header";
import Footer from "./components/footer/Footer";
import Main from "./page/main/Main";
import SelectTheme from "./page/showContents/SelectTheme";
import RegisterPlace from "./page/Register/RegisterPlace";
import RegisterCourse from "./page/Register/RegisterCourse";
import RegisterType from "./page/Register/RegisterType";
import Mypage from "./page/user/Mypage";
import SignIn from "./page/user/SignIn";
import SignUp from "./page/user/SignUp";


function AppRouter (props) {
  let isAuthorized = sessionStorage.getItem("isAuthorized");
  
    return (<>
          <BrowserRouter>
       {/* {!isAuthorized ? <Navigate to="/signin" /> : <Navigate to="/" />}
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Main />} />
      </Routes> */}

        {/* <Box mt={5}> */}
          <Header />
        {/* </Box> */}
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            
            <Route path="/main" element={<Main />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/SelectTheme" element={<SelectTheme />} />
            <Route path="/registertype" element={<RegisterType />} />
            <Route path="/registercourse" element={<RegisterCourse />} />
            <Route path="/registerplace" element={<RegisterPlace />} />
          </Routes>
        </div>
        <div>
          {/* <Box mt={5}> */}
            <Footer />
          {/* </Box> */}
        </div>
      </BrowserRouter>
      </>);
  }

export default AppRouter;
