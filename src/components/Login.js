import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SigninScreen from "./LoginPages/SigninScreen";
import SignUpScreen from "./LoginPages/SignUpScreen";
function Login() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      toast.warning("Fill in the email field");
      // alert("Fill in the email field");
    } else {
      setSignIn(true);
    }
  };
  return (
    <div className="loginScreen">
      {/* <div className="loginScreen__bg">
        <Link to="/">
          <img
            className="loginScreen__logo"
            src="https://w7.pngwing.com/pngs/451/218/png-transparent-idea-art-computer-icons-creativity-innovation-icon-design-intellectual-text-hand-logo.png"
            alt=""
          />
        </Link>
        <button className="loginScreen__button" onClick={() => setSignIn(true)}>
          Sign In
        </button>
      </div> */}
      <div className="loginScreen__gradient" />
      <div className="loginScreen__body">
        {signIn ? (
          <SigninScreen />
        ) : (
          <>
            <h1>Lets build together from here</h1>
            <h3>Complete paltform to share , upscale and build projects</h3>
            <div className="loginScreen__input">
              <form>
                <input
                  type="email"
                  placeholder="Email address.."
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="loginScreen__getStarted"
                  onClick={handleSubmit}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
