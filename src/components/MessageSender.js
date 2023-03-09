import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import "./MessageSender.css";
import { Videocam } from "@mui/icons-material";
import { PhotoLibrary } from "@mui/icons-material";
import ForumIcon from "@mui/icons-material/Forum";
import db from "./firebase";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

function MessageSender() {
  const user = localStorage.getItem("name");
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const userRef = collection(db, "posts");
  const handleSubmit = async (e) => {
    //databse stuff
    e.preventDefault();
    const docRef = await addDoc(userRef, {
      message: input,
      timeStamp: serverTimestamp(),
      //   profilePic: user.photoURL,
      username: user,
      image: imageUrl,
    });
    console.log(docRef.id);
    setInput("");
    setImageUrl("");
  };
  return (
    <div className="msgSender">
      <div className="msgSender__top">
        <Avatar />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="msgSender__input"
            placeholder="Whats on ur mind,user?"
          />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="imageURL (optional)"
          />
          <Button onClick={handleSubmit}>Upload</Button>
        </form>
      </div>
      <div className="msgSender__bottom">
        <div className="msgSender__options">
          <Videocam style={{ color: "red" }} />
          <h3>Video</h3>
        </div>
        <div className="msgSender__options">
          <PhotoLibrary style={{ color: "green" }} />
          <h3>Images</h3>
        </div>
        <div className="msgSender__options">
          <ForumIcon style={{ color: "gray" }} />
          <h3>Comments</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageSender;
