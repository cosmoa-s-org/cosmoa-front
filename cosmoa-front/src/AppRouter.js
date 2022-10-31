import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@material-ui/core/Box";

import Header from "./components/head/Header";
import Footer from "./components/footer/Footer";
import Main from "./page/main/Main";
import Login from "./page/login/Login";
import SelectTheme from "./page/showContents/SelectTheme";
import RegisterPlace from "./page/Register/RegisterPlace";
import RegisterCourse from "./page/Register/RegisterCourse";
import RegisterType from "./page/Register/RegisterType";
import Mypage from "./page/user/Mypage";


function AppRouter (props) {
    return (
      <BrowserRouter>
        {/* <Box mt={5}> */}
          <Header />
        {/* </Box> */}
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />

            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/SelectTheme" element={<SelectTheme />} />
            <Route path="/registerType" element={<RegisterType />} />
            <Route path="/registerCourse" element={<RegisterCourse />} />
            <Route path="/registerPlace" element={<RegisterPlace />} />
          </Routes>
        </div>
        <div>
          {/* <Box mt={5}> */}
            <Footer />
          {/* </Box> */}
        </div>
      </BrowserRouter>
    );
  }

export default AppRouter;
