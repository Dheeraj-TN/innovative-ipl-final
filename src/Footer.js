import React, { useEffect, useState } from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { addDoc, collection } from "firebase/firestore";
import db from "./components/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
function Footer() {
  const [msg, setMsg] = useState("");
  const user = useSelector(selectUser);
  const [submitted, setSubmitted] = useState(false);
  const feedbackRef = collection(db, "enquiries");
  const [username, setUsername] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(feedbackRef, {
      user: username.name,
      email: user.email,
      message: msg,
      time: new Date(),
    });
    setMsg("");
    setSubmitted(true);
  };
  useEffect(() => {
    setUsername(JSON.parse(sessionStorage.getItem("userName")));
  }, []);

  return (
    <div className="footer">
      <div className="top">
        <div className="patr1">
          <h2>INNOVATIVE</h2>
          <p>
            A website where projects can be shared which outreaches people and
            exposes them to build projects
          </p>
          <p>
            A website where projects can be shared which outreaches people and
            exposes them to build projects
          </p>
          <p>
            A website where projects can be shared which outreaches people and
            exposes them to build projects
          </p>
        </div>
        <div className="part2">
          <h2>About us</h2>
          <p>How it works</p>
          <p>Testinominals</p>
          <p>Carrers</p>
          <p>Teams of service</p>
        </div>
        <div className="part3">
          <h2>Useful Links</h2>
          <p>Your Account</p>
          <p>Become an affilate</p>
          <p>Help</p>
        </div>
        <div className="part4">
          <h2>Contact Us</h2>
          <p>Contact</p>
          <p>Support</p>
          <p>Sponshorships</p>
        </div>
      </div>
      <div className="social__media">
        <InstagramIcon className="app__icons" />
        <TwitterIcon className="app__icons" />
        <GoogleIcon className="app__icons" />
        <MailOutlineIcon className="app__icons" />
        <FacebookIcon className="app__icons" />
      </div>
      <div className="quiries">
        <h3>Drop your feedbacks or quiries here</h3>
        <textarea
          aria-rowspan="4"
          placeholder="type here...."
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={submitted}>
          {submitted ? "Submitted response" : "Submit"}
        </button>
      </div>
      <div className="bottom">
        <span>
          <p className="copyright">© 2023 Copyright</p>
          <p>Inovative Unviel your ideas</p>
        </span>
      </div>
    </div>
  );
}

export default Footer;
