import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import ProjectCard from "./ProjectCard";
function DisplayProject() {
  // console.log(ProjectTitle);
  const [proj, setProj] = useState([]);
  // const [ProjectTitle, setProjectTitle] = useState("");
  const displayRef = collection(db, "projects");

  useEffect(() => {
    const t = sessionStorage.getItem("ProjTitle");
    const q = query(displayRef, where("title", "==", t));
    const Projects = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProj(items);
    });
    return () => {
      Projects();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      {proj &&
        proj.map((item) => {
          return <ProjectCard key={item.index} project={item} />;
        })}
      display the card component
    </div>
  );
}

export default DisplayProject;
