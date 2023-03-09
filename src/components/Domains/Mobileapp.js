import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import DomainSidebar from "./DomainSidebar";
import db from "../firebase";
import { query, where } from "firebase/firestore";
import moment from "moment";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import "./Iot.css";
import Video from "./Video";
function Mobileapp() {
  const [app, setApp] = useState([]);
  const appRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(
      appRef,
      where("donain", "==", "Mobile Application"),

      orderBy("timeStamp", "desc")
    );
    const appVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });
      // setApp(
      //   snaphot.docs.map((doc) => ({
      //     id: doc.id,
      //     data: doc.data(),
      //   }))
      // );
      setApp(items);
    });
    return () => {
      appVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="iot">
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Mobile Application Development</h2>
        <div className="video__page">
          {app &&
            app.map((video) => {
              return (
                <Video
                  key={video.id}
                  link={video.link}
                  videos={video.videos}
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

export default Mobileapp;
