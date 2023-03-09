import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import DomainSidebar from "./DomainSidebar";
import db from "../firebase";
import Video from "./Video";
import "./Physics.css";
import moment from "moment";
function Physics() {
  const [physics, setPhysics] = useState([]);
  const phyRef = collection(db, "Domains");
  useEffect(() => {
    const q = query(phyRef, where("domain", "==", "Physics"));
    const physicsVideos = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });
      setPhysics(items);
    });
    return () => {
      physicsVideos();
    };

    //eslint-disable-next-line
  }, []);

  return (
    <div className="physics">
      <DomainSidebar />
      <div className="domain__videoPage">
        <h2>Physics</h2>
        <div className="video__page">
          {physics &&
            physics.map((video) => {
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
                  shortDesc={video.shortDesc}
                />
              );
            })}

          {/* {physics.map((video) => {
            return (
              <Video
                title={video.title}
                link={video.link}
                image={video.image}
                channelName={video.channelName}
                views={video.views}
              />
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Physics;
