import { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import ProgressBar from "@ramonak/react-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UploadPdf() {
  // State to store uploaded file
  const [myFile, setMyFile] = useState(null); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const successUpload = () => toast.success("Uploaded Successfully");
  const handleUpload = () => {
    setPercent(25);
    if (!myFile) {
      alert("Please upload an image first!");
    }
    setPercent(50);
    const storageRef = ref(storage, `files/${myFile.name}`);
    uploadBytes(storageRef, myFile).then(() => {
      console.log("Uploaded a blob or file!");
      successUpload();
      setPercent(100);
    });
    // const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const percent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     ); // update progress
    //     setPercent(percent);
    //   },
    //   (err) => console.log(err),
    //   () => {
    //     // download url
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       console.log(url);
    //     });
    //   }
    // );
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setMyFile(e.target.files[0]);
        }}
        // accept="/image/*"
      />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
      <ProgressBar completed={percent} />
      <ToastContainer position="top-center" />
    </div>
  );
}
export default UploadPdf;
