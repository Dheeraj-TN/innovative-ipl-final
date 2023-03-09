import { collection, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { query, onSnapshot, where } from "firebase/firestore";
import Video from "./Video";
import DomainSidebar from "./DomainSidebar";
import moment from "moment";
function Chemistry() {
  const [chem, setChem] = useState([]);
  const chemRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(
      chemRef,
      where("domain", "==", "Chemistry"),
      orderBy("timeStamp", "desc")
    );
    const chemVideos = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setChem(items);
    });
    return () => {
      chemVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div
      className="chemistry"
      style={{
        display: "flex",
      }}
    >
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Chemistry</h2>
        <div className="video__page">
          {chem &&
            chem.map((video) => {
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
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Chemistry;
