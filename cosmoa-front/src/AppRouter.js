import React from "react";

import { BrowserRouter, Route, Routes, Navigate, useParams, Outlet } from "react-router-dom";
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
import CourseList from "./page/showContents/CourseList";
import AddPlace from "./page/Register/AddPlace";
import CourseDetail from "./page/showContents/CourseDetail";
import Splash from "./components/Splash";

function BasicLayout() {
  return (<>
    <Header />
    <Outlet />
    <Footer />
  </>)
}

function UserLayout() {
  return <Outlet />
}


function AppRouter(props) {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  return (<>
    <BrowserRouter>
      {/* {!isAuthorized ? <Navigate to="/signin" /> : <Navigate to="/" />}
      <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Main />} />
      </Routes> */}

      <div>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Main />} />

            <Route path="main" element={<Main />} />

            <Route path="/splash" element={<Splash />} />

            <Route path="Mypage" element={<Mypage />} />
            <Route path="SelectTheme" element={<SelectTheme />} />
            <Route path="registerType" element={<RegisterType />} />
            <Route path="registerCourse" element={<RegisterCourse />} />
            <Route path="registerPlace" element={<RegisterPlace />} />
            <Route path="addplace" element={<AddPlace />} />

            <Route path="courselist" element={<CourseList />} />
            <Route path="coursedetail/:id" element={<CourseDetail />} />

          </Route>
          <Route path="/signin" element={<UserLayout />}>
            <Route index element={<SignIn />} />
          </Route>
          <Route path="/signup" element={<UserLayout />}>
            <Route index element={<SignUp />} />
          </Route>

        </Routes>
      </div>

    </BrowserRouter>
  </>);
}

export default AppRouter;
