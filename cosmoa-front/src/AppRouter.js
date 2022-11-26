import React from "react";

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

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
import PlaceDetail from "./page/showContents/PlaceDetail";
import Report from "./page/admin/Report";
import ChangeInfo from "./page/user/ChangeInfo";
import CourseScrap from "./page/user/CourseScrap";
import PlaceScrap from "./page/user/PlaceScrap";
import PostedPlace from "./page/user/PostedPlace";
import PostedCourse from "./page/user/PostedCourse";
import PopularPlace from "./page/showContents/PopularPlace";



function BasicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function UserLayout() {
  return <Outlet />;
}

function AppRouter(props) {
  {
    if (window.location.pathname === "/") {
      setTimeout(function () {
        window.location.href = "/main";
      }, 1500);
    }
  }
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Splash />} />
            </Route>
            <Route path="/" element={<BasicLayout />}>
              <Route path="main" element={<Main />} />

              <Route path="Mypage" element={<Mypage />} />
              <Route path="ChangeInfo" element={<ChangeInfo />} />
              <Route path="CourseScrap" element={<CourseScrap />} />
              <Route path="PlaceScrap" element={<PlaceScrap />} />
              <Route path="PostedPlace" element={<PostedPlace />} />
              <Route path="PostedCourse" element={<PostedCourse />} />



              <Route path="SelectTheme" element={<SelectTheme />} />
              <Route path="registerType" element={<RegisterType />} />
              <Route path="registerCourse" element={<RegisterCourse />} />
              <Route path="registerPlace" element={<RegisterPlace />} />
              <Route path="addplace" element={<AddPlace />} />

              <Route path="courselist" element={<CourseList />} />
              <Route path="coursedetail/:id" element={<CourseDetail />} />
              <Route path="placedetail/:id" element={<PlaceDetail />} />
              <Route path="popularplace" element={<PopularPlace />} />
            </Route>
            <Route path="/signin" element={<UserLayout />}>
              <Route index element={<SignIn />} />
            </Route>
            <Route path="/signup" element={<UserLayout />}>
              <Route index element={<SignUp />} />
            </Route>
            <Route path="/splash" element={<UserLayout />}>
              <Route index element={<Splash />} />
            </Route>
            <Route path="admin" element={<Report />} />
          </Routes>
        </div>
        <br />
        <br />
      </BrowserRouter>
    </>
  );
}




export default AppRouter;
