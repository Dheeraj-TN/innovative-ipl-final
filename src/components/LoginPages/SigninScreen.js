import React, { useEffect, useRef, useState } from "react";
import "./SignInScreen.css";
import { json, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../firebase";
function SigninScreen() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState([]);
  const usnRef = collection(db, "users");
  const [userCred, setUserCred] = useState("");
  // const register = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(
  //     auth,
  //     emailRef.current.value,
  //     passwordRef.current.value
  //   )
  //     .then((user) => {
  //       console.log(user);
  //       if (user) {
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  const login = (e) => {
    if (!email || !password) {
      toast.warning("Fill in the feilds");
    }

    e.preventDefault();
    console.log(email);
    const goAhead = verify.filter(
      (item) => item.email === email && item.flag === true
    );
    const refUser = goAhead[0];
    sessionStorage.setItem("userName", JSON.stringify(refUser));
    console.log(goAhead);
    if (goAhead.length > 0) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((user) => {
          console.log(user);

          if (user) {
            setUserCred(user);
            toast.success("Succesfully logggd in");
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error("Invalid email / password");
          // alert(error.message);
        });
    } else {
      toast.warning("Please wait to be verified");
    }
    // if (userCred) {
    //   sessionStorage.setItem("user", JSON.stringify(refUser));
    // }
  };

  useEffect(() => {
    const q = query(usnRef);
    const getData = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
      setVerify(items);
      console.log(verify);
    });

    return () => {
      getData();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="signInScreen">
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          Sign In
        </button>
      </form>
      <h4>
        <span className="span1">New to Innovative ? </span>
        <Link to="/register">
          <span className="signUp__link">Sign Up now</span>
        </Link>
      </h4>
    </div>
  );
}

export default SigninScreen;
