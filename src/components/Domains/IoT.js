import React, { useEffect, useState } from "react";
import "./DomainVideoPage.css";
import DomainSidebar from "./DomainSidebar";
import DomainVideoPage from "./DomainVideoPage";
import db from "../firebase";
import { getDocs, query, where } from "firebase/firestore";
import moment from "moment";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import "./Iot.css";
import Video from "./Video";
function IoT() {
  const [Iot, setIot] = useState([]);
  const iotRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(
      iotRef,
      where("domain", "==", "Iot")
      // where("flag", "==", "true")
      // orderBy("timeStamp", "desc")
    );
    const IotVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });

      setIot(items);
    });
    return () => {
      IotVideos();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="iot">
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Iot</h2>
        <div className="video__page">
          {Iot &&
            Iot.map((video) => {
              return (
                <Video
                  key={video.id}
                  link={video.link}
                  videos={video.videos}
                  title={video.title}
                  image={video.image}
                  channelName={video.channelName}
                  shortDesc={video.shortDesc}
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

export default IoT;
