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

  return (<>
    <BrowserRouter>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<Main />} />

            <Route path="main" element={<Main />} />

            <Route path="Mypage" element={<Mypage />} />
            <Route path="SelectTheme" element={<SelectTheme />} />
            <Route path="registerType" element={<RegisterType />} />
            <Route path="registerCourse" element={<RegisterCourse />} />
            <Route path="registerPlace" element={<RegisterPlace />} />
            <Route path="addplace" element={<AddPlace />} />

            <Route path="courselist" element={<CourseList />} />
            <Route path="coursedetail/:id" element={<CourseDetail />} />
            <Route path="placedetail/:id" element={<PlaceDetail />} />
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
          <Route path="admin" element={<Report />}/>
        </Routes>
        <br />
        <br />
      </div>
    </BrowserRouter>
  </>);
}




export default AppRouter;
