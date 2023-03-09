import React, { useEffect, useState } from "react";
import "./Video.css";
import ReactPlayer from "react-player";
import { Avatar } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Link } from "react-router-dom";
import DisplayPdf from "./DisplayPdf";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import {
  collection,
  onSnapshot,
  Query,
  query,
  where,
} from "firebase/firestore";

function Video({
  id,
  link,
  videos,
  shortDesc,
  title,
  channelName,
  image,
  views,
  timeStamp,
}) {
  const [count, setCount] = useState(0);
  const [project, setProject] = useState([]);
  const [clickT, setClickT] = useState("");
  const navigate = useNavigate();
  const projRef = collection(db, "projects");
  const like = () => {
    setCount(count + 1);
  };
  const dislike = () => {
    setCount(count - 1);
  };
  const handleSubmit = async () => {
    sessionStorage.setItem("ProjTitle", `${title}`);
    navigate("/displayCard");
  };
  const myFunction = () => {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  };
  useEffect(() => {
    const q = query(projRef);
    console.log("Porjects here : " + q);
  });
  return (
    <div className="video">
      {/* <ReactPlayer url={link} width="350px" height="200px" /> */}
      <video width="350px" height="200px" controls>
        <source src={videos} type="video/mp4" />
      </video>
      {/* <ReactPlayer url={link} width="350px" height="200px" /> */}
      {/* <ReactPlayer url={notURL} width="350px" height="200px" /> */}
      <div className="video__info">
        <Avatar className="channel__logo" alt={channelName} src={image} />

        <div className="video__text">
          <h4>{title}</h4>
          <p>{channelName}</p>
          <p>
            {views} · {timeStamp}
          </p>
          <div className="likeDislike">
            <div className="icons">
              <ThumbUpOffAltIcon onClick={like} />
              <p>{count}</p>
            </div>
            <div className="icons">
              <ThumbDownAltIcon className="Dislike" onClick={dislike} />
            </div>
          </div>
          <hr />
          <p style={{ color: "white" }}>{shortDesc}</p>
          <br />
          <p onClick={handleSubmit} className="full__project">
            Click here to view full project
          </p>

          <br></br>

          {/* <p onClick={myFunction} id="myBtn">
            Read more
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Video;
