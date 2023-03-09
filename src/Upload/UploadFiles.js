import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../components/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import db from "../components/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UploadFile.css";
import { Upload } from "@mui/icons-material";
import { selectUser } from "../features/userSlice";
import { useSelect } from "@mui/base";

function UploadFiles() {
  //   const user = useSelect(selectUser);
  //   const [name, setName] = useState("");
  const [domain, setDonain] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [codes, setCodes] = useState([]);
  const [reports, setReports] = useState([]);
  const [succeeded, setSucceded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);

  const demoRef = collection(db, "projects");
  const [display, setDisplay] = useState([]);
  const name = sessionStorage.getItem("projTitle");
  const handleImageChange = async (files) => {
    for (var i = 0; i < files.length; i++) {
      const newImage = files[i];
      setImages((arr) => [...arr, newImage]);
    }
  };
  const handleVideoChange = async (files) => {
    for (var i = 0; i < files.length; i++) {
      const newVideo = files[i];
      setVideos((arr) => [...arr, newVideo]);
    }
  };
  const handleCodeChange = async (files) => {
    for (var i = 0; i < files.length; i++) {
      const newCode = files[i];
      setCodes((arr) => [...arr, newCode]);
    }
  };
  const handleReportChange = async (files) => {
    for (var i = 0; i < files.length; i++) {
      const newReport = files[i];
      setReports((arr) => [...arr, newReport]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Wait !!!!!");
    const imageURL = [];
    for (var i = 0; i < images.length; i++) {
      const imgRef = ref(storage, `${name}/images/${images[i].name}`);
      await uploadBytes(imgRef, images[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          imageURL.push(url);
        });
        toast.success("Image uploaded");
      });
    }

    const videoURL = [];
    for (i = 0; i < videos.length; i++) {
      const videoRef = ref(storage, `${name}/videos/${videos[i].name}`);
      await uploadBytes(videoRef, videos[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          videoURL.push(url);
        });
        toast.success("Video Uplaoded");
      });
    }

    const codesURL = [];
    for (i = 0; i < codes.length; i++) {
      const codeRef = ref(storage, `${name}/code/${codes[i].name}`);
      await uploadBytes(codeRef, codes[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          codesURL.push(url);
        });
        toast.success("Code file uploaded");
      });
    }

    const reportURL = [];
    for (i = 0; i < reports.length; i++) {
      const reportRef = ref(storage, `${name}/report/${reports[i].name}`);
      await uploadBytes(reportRef, reports[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          reportURL.push(url);
        });
        toast.success("Report uploaded");
      });
    }

    await addDoc(demoRef, {
      title: name,
      user: "atri",
      usn: "1BG21ISYYY",
      branch: "ISE",
      sem: 3,
      domain: "WebTech",
      images: imageURL,
      videos: videoURL,
      flag: false,
      code: codesURL,
      report: reportURL,
      desc: "testing all the files if it gets uploaded",
    });
    console.log("Uploaded");
    setSucceded(true);
    setError(null);
    setProcessing(false);
  };
  return (
    <div className="uploadFile">
      {/* <p>
        Title of the project :{" "}
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setName(e.target.value)}
        />
      </p> */}
      <span>
        <label>Images : </label>{" "}
        <input
          type="file"
          multiple
          onChange={(e) => handleImageChange(e.target.files)}
        />
      </span>
      <span>
        <label>videos : </label>{" "}
        <input
          type="file"
          multiple
          onChange={(e) => handleVideoChange(e.target.files)}
        />
      </span>
      <span>
        <label>Codes : </label>{" "}
        <input
          type="file"
          multiple
          onChange={(e) => handleCodeChange(e.target.files)}
        />
      </span>
      <span>
        <label>Report files : </label>{" "}
        <input
          type="file"
          multiple
          onChange={(e) => handleReportChange(e.target.files)}
        />
      </span>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UploadFiles;
