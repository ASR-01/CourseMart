import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Courses from "./components/Courses/Courses";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Contact from "./components/Contact/Contact";
import Request from "./components/Request/Request";
import About from "./components/About/About";
import NotFound from "./components/Notfound/NotFound";
import PaymentFail from "./components/Payments/PaymentFail";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import Subscribe from "./components/Payments/Subscribe";
import Profile from "./components/Profile/Profile";
import ChangePassword from "./components/Profile/ChangePassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import SideBar from "./components/Admin/SideBar";
import CreateCourses from "./components/Admin/CreateCourse/CreateCourses";
import AdminCourses from "./components/Admin/Courses/AdminCourses";
import Users from "./components/Admin/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getMyProfile } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";

const App = () => {
  //   window.addEventListener("contextmenu" ,(e)=>{
  // e.preventDefault()

  //   })

  const { isAuthenticated, user, message, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/course/:id"} element={<CoursePage />} />

          {/* Auth */}
          <Route
            path={"/login"}
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect="/profile"
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/register"}
            element={
              <ProtectedRoute isAuthenticated={!isAuthenticated}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path={"/forgotPassword"} element={<ForgotPassword />} />
          <Route path={"/resetPassword/:token"} element={<ResetPassword />} />
          {/* Contact Us */}
          <Route path={"/contact"} element={<Contact />} />
          {/* Request */}
          <Route path={"/request"} element={<Request />} />
          {/* About */}
          <Route path={"/about"} element={<About />} />
          {/* Payment Pages */}
          <Route path={"*"} element={<NotFound />} />
          <Route path={"/paymentFail"} element={<PaymentFail />} />
          <Route path={"/paymentSuccess"} element={<PaymentSuccess />} />
          <Route path={"/subscribe"} element={<Subscribe />} />
          {/* User Profile */}
          <Route
            path={"/profile"}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path={"/changePassword"} element={<ChangePassword />} />
          <Route path={"/updateProfile"} element={<UpdateProfile />} />

          {/* Admin DashBoard */}
          <Route path={"/admin/dashboard"} element={<DashBoard />} />
          <Route path={"/admin/createCourse"} element={<CreateCourses />} />
          <Route path={"/admin/adminCourses"} element={<AdminCourses />} />
          <Route path={"/admin/users"} element={<Users />} />
          <Route path={"/sideBar"} element={<SideBar />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;
