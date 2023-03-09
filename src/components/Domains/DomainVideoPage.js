import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import Video from "./Video";
import db from "../firebase";
import { getDocs, query } from "firebase/firestore";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
function DomainVideoPage() {
  const [videos, setVideos] = useState([]);
  const videoRef = collection(db, "HomeVideos");
  useEffect(() => {
    const q = query(videoRef, orderBy("timeStamp", "desc"));
    onSnapshot(q, (snaphot) => {
      setVideos(
        snaphot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="domain__videoPage">
      <h2>All</h2>
      <div className="video__page">
        {/* <Video
          link="https://youtu.be/LlhmzVL5bm8"
          title="Internet of Things (IoT) | What is IoT | How it Works | IoT Explained | Edureka"
          image="https://yt3.ggpht.com/OtB--dcR_oNUZUaUsuyk2ShT5nFYjEcj9Yxx50-Nner03vXKt4IWXtP--JrnSGQbwRSHYuVb38g=s88-c-k-c0x00ffffff-no-rj"
          channelName="eduReka"
          views="2.1M views"
          timeStamp="3 days ago"
        />  */}
        {videos.map((video) => {
          return (
            <Video
              key={video.data.id}
              link={video.data.link}
              title={video.data.title}
              image={video.data.image}
              channelName={video.data.channelName}
              views={video.data.views}
              timeStamp={video.data.timeStamp}
              desc={video.data.desc}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DomainVideoPage;
