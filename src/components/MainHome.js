import React from "react";
import "./MainHome.css";
import MessageSender from "./MessageSender";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import Feed from "./Feed";
import Login from "./Login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
function MainHome() {
  const user = useSelector(selectUser);
  return !user ? (
    <Login />
  ) : (
    <div className="mainHome">
      {/* <Navbar /> */}
      <div className="mainHome__body">
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </div>
  );
}

export default MainHome;
