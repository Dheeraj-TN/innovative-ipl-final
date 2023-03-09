import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import DomainSidebar from "./DomainSidebar";

import db from "../firebase";
import { query } from "firebase/firestore";
import moment from "moment";
import { collection, onSnapshot, orderBy, where } from "firebase/firestore";
import "./Iot.css";
import Video from "./Video";
function Wt() {
  const [wt, setWt] = useState([]);
  const wtRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(
      wtRef,
      where("domain", "==", "Web Technology"),

      orderBy("timeStamp", "desc")
    );
    const wtVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });
      // setWt(
      //   snaphot.docs.map((doc) => ({
      //     id: doc.id,
      //     data: doc.data(),
      //   }))
      // );
      setWt(items);
    });
    return () => {
      wtVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="iot" style={{ textDecoration: "none" }}>
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Web Application Development</h2>
        <div className="video__page">
          {wt &&
            wt.map((video, index) => {
              return (
                <Video
                  id={video.index}
                  // key={video.id}
                  link={video.link}
                  videos={video.videosL}
                  title={video.title}
                  image={video.image}
                  channelName={video.channelName}
                  views={video.views}
                  timeStamp={moment
                    .unix(video.created)
                    .format("MMMM Do YYYY,h:mma")}
                  desc={video.desc}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Wt;
