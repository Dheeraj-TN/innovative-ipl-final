import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import DomainSidebar from "./DomainSidebar";

import db from "../firebase";
import { query } from "firebase/firestore";
import moment from "moment";
import { collection, onSnapshot, orderBy, where } from "firebase/firestore";
import "./Iot.css";
import Video from "./Video";
function IoT() {
  const [ece, setEce] = useState([]);
  const eceRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(eceRef, where("domain", "==", "Electronics"));
    const EceVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });

      setEce(items);
    });
    return () => {
      EceVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="iot">
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Electronics</h2>
        <div className="video__page">
          {ece &&
            ece.map((video, index) => {
              return (
                <Video
                  key={index}
                  link={video.link}
                  video={video.videos}
                  title={video.title}
                  image={video.image}
                  channelName={video.channelName}
                  views={video.views}
                  timeStamp={moment
                    .unix(video.created)
                    .format("MMMM Do YYYY,h:mma")}
                  desc={video.desc}
                  shortDesc={video.shortDesc}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default IoT;
