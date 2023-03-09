import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../firebase";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects() {
  const ProjTitle = sessionStorage.getItem("projTitle");
  const [unverifiedProjects, setUnverifiedProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [searchData, setSearchData] = useState("");
  const projectRef = collection(db, "projects");

  const verify = async (index) => {
    const id = unverifiedProjects[index].id;
    updateDoc(doc(db, "dummy_projects_list", id), {
      flag: true,
    })
      .then(
        toast.success(unverifiedProjects[index].title + " verified", {
          autoClose: 750,
          pauseOnHover: false,
          closeOnClick: true,
        })
      )
      .catch((err) => console.log(err));
  };

  const deleteProject = async (index) => {
    const id = unverifiedProjects[index].id;
    deleteDoc(doc(db, "dummy_projects_list", id))
      .then(
        toast.success(unverifiedProjects[index].title + " deleted", {
          autoClose: 750,
          pauseOnHover: false,
          closeOnClick: true,
        })
      )
      .catch((err) => console.log(err));
  };

  const filterData = (e) => {
    e.preventDefault();
    const search = e.target.value;
    const data = unverifiedProjects.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayProjects(data);
    setSearchData(search);
  };

  useEffect(() => {
    const q = query(projectRef, where("flag", "==", false));
    const Fetchdata = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((item) => {
        data.push({ ...item.data(), id: item.id });
      });
      setUnverifiedProjects(data);
      setDisplayProjects(data);
    });
    return () => {
      Fetchdata();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="project_main_body">
      <div className="project_body_container">
        <div className="container_body">
          {displayProjects.length > 0 ? (
            displayProjects.map((project, index) => (
              <div className="project_card">
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <h3>No Projects Available</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
