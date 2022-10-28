import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@material-ui/core/Box";

import Header from "./components/head/Header";
import Footer from "./components/footer/Footer";
import Main from "./page/main/Main";
import Login from "./page/login/Login";


class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Box mt={5}>
          <Header />
        </Box>
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <div>
          <Box mt={5}>
            <Footer />
          </Box>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
