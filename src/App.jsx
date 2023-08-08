import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Courses from "./components/Courses/Courses";
import CoursePage from "./components/CoursePage/CoursePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
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
import AdminCourses from './components/Admin/AdminCourses/AdminCourses'
import { Users } from "./components/Admin/Users/Users";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getMyProfile } from "./redux/actions/user";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/layouts/Loader";
import { CreateCourse } from "./components/Admin/CreateCourse/CreateCourse";
import ForgetPassword from "./components/Auth/Forgotpassword";
import Sidebar from "./components/Admin/Sidebar";
import DashboardAdmin from "./components/Admin/Dashboard/Dashboard";

const App = () => {
  //   window.addEventListener("contextmenu" ,(e)=>{
  // e.preventDefault()

  //   })

  const { isAuthenticated, user, message, error, loading } = useSelector(
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
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/courses"} element={<Courses />} />
              <Route path={"/course/:id"} element={<ProtectedRoute
              
              
              isAuthenticated ={isAuthenticated}
              
              
              >
                <CoursePage user={user}/>
              </ProtectedRoute>} />

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
              <Route
                path={"/forgotPassword"}
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ForgetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/resetPassword/:token"}
                element={
                  <ProtectedRoute     isAuthenticated={!isAuthenticated}
                  redirect="/profile">
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              {/* Contact Us */}
              <Route path={"/contact"} element={<Contact />} />
              {/* Request */}
              <Route path={"/request"} element={<Request />} />
              {/* About */}
              <Route path={"/about"} element={<About />} />
              {/* Payment Pages */}
              <Route path={"*"} element={<NotFound />} />
              <Route path={"/paymentFail"} element={<PaymentFail />} />
              <Route path={"/paymentsuccess"} element={<PaymentSuccess />} />
              <Route
                path={"/subscribe"}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe  user={user }/>
                  </ProtectedRoute>
                }
              />
              {/* User Profile */}
              <Route
                path={"/profile"}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/changePassword"}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/updateProfile"}
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                }
              />

              {/* Admin DashBoard */}
              <Route
                path={"/admin/dashboard"}
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    admin={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <DashboardAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/admin/createCourse"}
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    admin={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/admin/courses"}
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    admin={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path={"/admin/users"}
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    admin={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route path={"/sideBar"} element={<Sidebar />} />
            </Routes>
            <Footer />
            <Toaster />
          </>
        )}
      </Router>
    </>
  );
};

export default App;
