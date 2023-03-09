import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import DomainSidebar from "./DomainSidebar";
import db from "../firebase";
import { query, where } from "firebase/firestore";
import moment from "moment";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import "./Iot.css";
import Video from "./Video";
function Eee() {
  const [eee, setEee] = useState([]);
  const EeeRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(
      EeeRef,
      where("domain", "==", "Electrical")

      // orderBy("timeStamp", "desc")
    );
    const EeeVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });
      // setEee(
      //   snaphot.docs.map((doc) => ({
      //     id: doc.id,
      //     data: doc.data(),
      //   }))
      // );
      setEee(items);
    });
    return () => {
      EeeVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="eee" style={{ display: "flex" }}>
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Electrical</h2>
        <div className="video__page">
          {eee &&
            eee.map((video) => {
              return (
                <Video
                  key={video.id}
                  link={video.link}
                  title={video.title}
                  videos={video.videos}
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

export default Eee;
