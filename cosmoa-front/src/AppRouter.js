import React from "react";
import App from "./App";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Grid, Link } from "@material-ui/core";

import Main from "./Main";

function Header() {
  // 화면 아래 고정적으로 출력할 footer (copyright())
  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item>
          홍길동님 내정보 /
          {/* <Link href="/login">로그아웃</Link> */}
        </Grid>
        <i class="fa-solid fa-bars"></i>
      </Grid>
    </>
  );
}

function Footer() {
  // 화면 아래 고정적으로 출력할 footer (copyright())
  return null;
}

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
