import React, { useState } from "react";
import "./Post.css";
import { Avatar, inputAdornmentClasses } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "./firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { color } from "@mui/system";
import { async } from "@firebase/util";
import { auth } from "./firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
function Post({ key, profilePic, image, user, timeStamp, message }) {
  user = useSelector(selectUser);
  const [count, setCount] = useState(0);
  //const [countt, setCount] = useState("");
  const userRef = collection(db, "posts");
  const incCount = () => {
    setCount(count + 1);
  };
  const decCount = () => {
    setCount(count - 1);
  };

  const delData = async (e) => {
    e.preventDefault();
    const docRef = await deleteDoc(userRef, {
      profilePic,
      image,
      user,
      timeStamp,
      message,
    });
    console.log(docRef.id);
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topinfo">
          <h3>{user.email}</h3>
          {/* <p>I am timestam</p> */}
          <p>{new Date(timeStamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="post__option">
          <DeleteIcon onClick={delData()} style={{ color: "gray" }} />
        </div>
      </div>
      <div className="post__bottom">
        <p>{message}</p>
      </div>
      <div className="post__image">
        <img src={image} alt="" />
      </div>
      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon onClick={incCount} />
          <p>{count}</p>
        </div>
        <div className="post__option">
          <ThumbDownIcon onClick={decCount} />
          <p>Dislike</p>
        </div>
        <div className="post__option">
          <ChatBubbleIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
}

export default Post;
