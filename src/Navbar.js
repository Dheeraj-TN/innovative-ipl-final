import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { json, Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
function Navbar() {
  const user = useSelector(selectUser);
  console.log("username : " + user);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [username, setUsername] = useState([]);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  useEffect(() => {
    const getName = () => {
      setUsername(JSON.parse(sessionStorage.getItem("userName")));
    };
    return () => {
      getName();
    };
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/hero" className="navbar-logo" onClick={closeMobileMenu}>
            Innovative
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/domain"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Domain
              </Link>
            </li>
            <li
              className="nav-item"
              onClick={() => console.log(user.displayName)}
            >
              <Link to="/list" className="nav-links" onClick={closeMobileMenu}>
                List
              </Link>
            </li>

            <li>
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                {!user ? "SignIn" : user.email}
              </Link>
            </li>
          </ul>
          <Link to="/postVideo">
            {button && (
              <Button buttonStyle="btn--outline">Post Your Video</Button>
            )}
          </Link>
        </div>
        <Link to="/profile">
          <AccountCircleIcon
            className="profile__logo"
            style={{ fontSize: 40, color: "white" }}
          />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
