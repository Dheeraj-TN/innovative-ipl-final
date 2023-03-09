import React, { useRef, useState } from "react";
import "./SignUpScreen.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";
function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const usnRef = useRef(null);
  const branchRef = useRef(null);
  const rePasswordRef = useRef(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  const [usn, setUSN] = useState("");
  const [branch, setBranch] = useState("");
  const mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const register = async (e) => {
    e.preventDefault();

    var resName = 0;
    for (var i = 0; i < name.length; i++) {
      if (name.charAt(i) >= "0" && name.charAt(i) <= "9") {
        resName = 1;
        break;
      }
    }
    if (!name || !email || !password || !rePassword || !usn || !branch) {
      setErrorMsg("Fill all fields");
      return;
    } else if (resName !== 0) {
      setErrorMsg("Invalid name");
      resName = 0;
      return;
    } else if (!email.match(mailformat)) {
      setErrorMsg("Invalid email id");
      return;
    } else if (password !== rePassword) {
      setErrorMsg("Password is not matching");
      return;
    } else if (!password.match(passwordformat)) {
      setErrorMsg(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(async (userCred) => {
        const userName = userCred.user;
        await updateProfile(userName, {
          displayName: name,
        });
        console.log(userCred);
        if (userCred) {
          try {
            await addDoc(collection(db, "users"), {
              name: name,
              email: email,
              flag: false,
              branch: branch,
              usn: usn,
            });
            // console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          toast.success("Successfully Registered");
          navigate("/");
          auth.signOut();
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="signUpScreen">
      <div className="signUpScreen__form">
        <form>
          <h1>Sign Up</h1>
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            ref={usnRef}
            placeholder="USN"
            onChange={(e) => setUSN(e.target.value)}
          />
          <input
            type="text"
            ref={branchRef}
            placeholder="Branch"
            onChange={(e) => setBranch(e.target.value)}
          />
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            ref={rePasswordRef}
            placeholder="Re-enter Password"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <b>{ErrorMsg}</b>
          <button type="submit" onClick={register}>
            Sign Up
          </button>
          <h4>
            <span className="span1">Already a memeber of Innovative ? </span>
            <Link to="/login">
              <span className="signIn__link">Sign In</span>
            </Link>
          </h4>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUpScreen;
