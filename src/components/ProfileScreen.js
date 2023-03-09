import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "./firebase";
import { signOut } from "firebase/auth";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import "./ProfileScreen.css";
import Login from "./Login";
function ProfileScreen() {
  const user = useSelector(selectUser);
  console.log("hello i am :" + user);

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const userRef = collection(db, "users");

  useEffect(() => {
    const q = query(userRef, where("email", "==", user.email));
    const details = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setData(items);
    });
    return () => {
      details();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="profileScreen">
      <div className="details">
        <AccountCircle className="icon" />
        <span>
          <h3>EmailId: </h3>
          <p>{user.email}</p>
        </span>
        {data.map((index) => {
          return (
            <div className="db__details">
              <span>
                <h3>User name : </h3>
                <p>{index.name}</p>
              </span>
              <span>
                <h3>Branch : </h3>
                <p>{index.branch}</p>
              </span>
              <span>
                <h3>USN : </h3>
                <p>{index.usn}</p>
              </span>
            </div>
          );
        })}
        <p
          style={{
            fontWeight: "550",
          }}
        >
          Other Social media paltforms
        </p>
        <div className="icons">
          <InstagramIcon className="social__icons" />
          <FacebookIcon className="social__icons" />
          <GoogleIcon className="social__icons" />
          <MailOutlineIcon className="social__icons" />
          <TwitterIcon className="social__icons" />
        </div>

        <button
          type="submit"
          onClick={() => {
            auth.signOut();
            sessionStorage.removeItem("userName");
            navigate("/login");
            toast.warning("User logged out");
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;
