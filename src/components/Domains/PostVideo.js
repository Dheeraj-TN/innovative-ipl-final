import React, { useEffect, useState } from "react";
import db from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { storage } from "../firebase";
import img from "./uploadPic.png";
import { useNavigate } from "react-router-dom";
import "./PostVideo.css";
import UploadPdf from "./UploadPdf";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import UploadFiles from "../../Upload/UploadFiles";
function PostVideo() {
  const user = useSelector(selectUser);
  const naviagte = useNavigate();
  const [name, setName] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [channelImage, setImage] = useState("");
  const [domain, setDomain] = useState("");
  const [videoViews, setVideoViews] = useState("");
  const [channelName, setChannelName] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [codes, setCodes] = useState([]);
  const [reports, setReports] = useState([]);
  const [branch, setBranch] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [desc, setDesc] = useState("");
  const [firstName, setFirstName] = useState("");
  const [sessionUser, setSessionUser] = useState([]);
  const [filename, setFilename] = useState("");
  const [succeeded, setSucceded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [short, setShort] = useState("");
  const [sem, setSem] = useState("");
  const [usn, setUSN] = useState("");
  const handleChange = (res) => {
    setSem(res);
  };
  const handleChangeBranch = (res) => {
    setBranch(res);
  };
  const handleChangeDomain = (res) => {
    setDomain(res);
  };
  const handleImageChange = async (files) => {
    setImages([]);
    for (var i = 0; i < files.length; i++) {
      const newImage = files[i];
      setImages((arr) => [...arr, newImage]);
    }
  };
  const handleVideoChange = async (files) => {
    setVideos([]);
    for (var i = 0; i < files.length; i++) {
      const newVideo = files[i];
      setVideos((arr) => [...arr, newVideo]);
    }
  };
  const handleCodeChange = async (files) => {
    setCodes([]);
    for (var i = 0; i < files.length; i++) {
      const newCode = files[i];
      setCodes((arr) => [...arr, newCode]);
    }
  };
  const handleReportChange = async (files) => {
    setReports([]);
    for (var i = 0; i < files.length; i++) {
      const newReport = files[i];
      setReports((arr) => [...arr, newReport]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Wait !!!!!");
    toast.warning("Wait till upload");
    const imageURL = [];
    const imageName = [];
    for (var i = 0; i < images.length; i++) {
      const imgRef = ref(storage, `${videoTitle}/images/${images[i].name}`);
      await uploadBytes(imgRef, images[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          imageURL.push(url);
        });
      });

      imageName.push(images[i].name);
    }
    toast.success("Image uploaded");

    const videosURL = [];
    const videoName = [];
    for (i = 0; i < videos.length; i++) {
      const videoRef = ref(storage, `${videoTitle}/videos/${videos[i].name}`);
      await uploadBytes(videoRef, videos[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          videosURL.push(url);
        });
      });

      videoName.push(videos[i].name);
    }
    toast.success("Video Uplaoded");

    const codesURL = [];
    const codeName = [];
    for (i = 0; i < codes.length; i++) {
      const codeRef = ref(storage, `${videoTitle}/code/${codes[i].name}`);
      await uploadBytes(codeRef, codes[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          codesURL.push(url);
        });
      });

      codeName.push(codes[i].name);
    }
    toast.success("Code file uploaded");
    const reportURL = [];
    const reportName = [];
    for (i = 0; i < reports.length; i++) {
      const reportRef = ref(storage, `${videoTitle}/report/${reports[i].name}`);
      await uploadBytes(reportRef, reports[i]).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          reportURL.push(url);
        });
      });
      reportName.push(reports[i].name);
    }
    toast.success("Report uploaded");
    console.log(reportURL);
    const userRef = collection(db, "projects");
    await addDoc(userRef, {
      // name: user.displayName,
      user: sessionUser.name,
      email: user.email,
      branch: branch,
      domain: domain,
      title: videoTitle,
      usn: sessionUser.usn,
      link: videoURL,
      sem: sem,
      image: channelImage,
      channelName: channelName,
      desc: desc,
      shortDesc: short,
      images: imageURL,
      flag: false,
      videos: videosURL,
      code: codesURL,
      codeName: codeName,
      reportName: reportName,
      report: reportURL,
    });
    setDisabled(true);
    toast.success("All files uploaded :) ");
    naviagte("/");
    console.log("domain : " + domain);
    setDomain("");
    setVideoTitle("");
    setImage("");
    setVideoURL("");
    setChannelName("");
    setVideoViews("");
  };
  useEffect(() => {
    const usn = () => {
      setSessionUser(JSON.parse(sessionStorage.getItem("userName")));
    };
    return () => {
      usn();
    };
  }, []);

  sessionStorage.setItem("pdfName", filename);
  return (
    <div className="postVideo">
      {/* upload page */}
      <div className="upload__image">
        <img src={img} alt="" />
        <div className="upload__files">
          <p>
            Drop your video link here{" "}
            <input
              type="text"
              onChange={(e) => setVideoURL(e.target.value)}
              placeholder="url"
            />
          </p>
          <p>
            Drop your image here
            <input
              type="text"
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="url"
            />
          </p>
          <br></br>
          <span>
            <label>Images : </label>{" "}
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(e.target.files)}
            />
          </span>
          <span>
            <label>Videos : </label>{" "}
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

          <button onClick={handleSubmit} className="sub">
            Upload
          </button>
        </div>
        {/* <p>Want to upload other project details ? Drop your files here</p> */}
        {/* <UploadFiles /> */}
      </div>
      <div className="upload__details">
        <form>
          <br />
          <p>
            Title of Project
            <input
              type="text"
              name="Title of the video"
              placeholder="Title of the video"
              value={videoTitle || ""}
              onChange={(e) => setVideoTitle(e.target.value)}
              // value={videoTitle}
            />
            <br />
          </p>
          <p>
            Branch
            {/* <select onChange={(e) => handleChangeBranch(e.target.value)}>
              <option>ISE</option>
              <td></td>
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              <option>ME</option>
            </select> */}
            <input
              type="text"
              placeholder="Branch"
              onChange={(e) => setBranch(e.target.value)}
            />
          </p>
          <br />
          <p>
            Domain
            <input
              type="text"
              placeholder="domain"
              value={domain || ""}
              onChange={(e) => {
                setDomain(e.target.value);
              }}
            />
          </p>
          <br />
          <p>
            Semester
            <select onChange={(e) => handleChange(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>8</option>
            </select>
          </p>
          <br />

          {/* <select
              name={domain}
              value={domain}
              onChange={(e) => handleChangeDomain(e.target.value)}
            >
              <option value="Iot">Iot</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Ece">Ece</option>
              <option value="Eee">Eee</option>
              <option value="Wt">Wt</option>
              <option>MOBILE APPLICATION DEVELOPEMENT</option>
            </select> */}

          <br />
          <p>
            Channel name
            <input
              type="text"
              name="Channel name"
              placeholder="Channel name"
              value={channelName || ""}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <br />
          </p>
          <p>
            Channel image
            <input
              type="text"
              name="Channel image"
              placeholder="Channel image (optional)"
              onChange={(e) => setImage(e.target.value)}
            />
          </p>
          <br />
          <p>
            Short Description
            <input
              type="text"
              placeholder="one line description"
              onChange={(e) => setShort(e.target.value)}
            />
          </p>
          <br />
          <p>
            Description of the project
            <textarea
              aria-rowspan="2"
              placeholder="description"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </p>
          <br />

          <br />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PostVideo;
