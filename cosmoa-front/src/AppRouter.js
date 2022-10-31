import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@material-ui/core/Box";

import Header from "./components/head/Header";
import Footer from "./components/footer/Footer";
import Main from "./page/main/Main";
import Login from "./page/login/Login";
import RegisterPlace from "./page/register/RegisterPlace";
import RegisterCourse from "./page/register/RegisterCourse";
import RegisterType from "./page/register/RegisterType";


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
    );
  }

export default AppRouter;
