import React, { useEffect } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./Post.js";
import Home from "./Home.js";
import HeroSection from "./HeroSection.js";
import MainHome from "./components/MainHome.js";
import Login from "./components/Login.js";
import "./App.css";
import SignUpScreen from "./components/LoginPages/SignUpScreen.js";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice.js";
import { auth } from "./components/firebase.js";
import IoT from "./components/Domains/IoT.js";
import Ece from "./components/Domains/Ece";
import ProfileScreen from "./components/ProfileScreen.js";
import DomainsPage from "./components/Domains/DomainsPage.js";
import Physics from "./components/Domains/Physics.js";
import PostVideo from "./components/Domains/PostVideo.js";
import Chemistry from "./components/Domains/Chemistry.js";
import Eee from "./components/Domains/Eee.js";
import Wt from "./components/Domains/Wt.js";
import Mobileapp from "./components/Domains/Mobileapp.js";
import UploadPage from "./components/Domains/UploadPage.js";
import Projects from "./components/Domains/Projects.js";
import DisplayProject from "./components/Domains/DisplayProject.js";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/hero" element={<HeroSection />} />
          <Route exact path="/post" element={<Post />}></Route>
          <Route exact path="/home" element={<MainHome />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<SignUpScreen />}></Route>
          <Route exact path="/profile" element={<ProfileScreen />}></Route>
          <Route exact path="/domain" element={<DomainsPage />}></Route>
          <Route exact path="/iot" element={<IoT />}></Route>
          <Route exact path="/physics" element={<Physics />}></Route>
          <Route exact path="/postVideo" element={<PostVideo />}></Route>
          <Route exact path="/chemistry" element={<Chemistry />}></Route>
          <Route exact path="/ece" element={<Ece />}></Route>
          <Route exact path="/eee" element={<Eee />}></Route>
          <Route exact path="/web" element={<Wt />} />
          <Route exact path="/mobileApp" element={<Mobileapp />} />
          <Route exact path="/projectCard" element={<Projects />} />
          <Route exact path="/displayCard" element={<DisplayProject />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
