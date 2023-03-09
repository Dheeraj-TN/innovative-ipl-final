import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import firebase, { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const DisplayPdf = () => {
  const [url, setURL] = useState("");
  const filename = sessionStorage.getItem("pdfName");
  useEffect(() => {
    const storageRef = ref(storage, "files/Dheeraj TN.pdf"); // replace 'example.pdf' with your PDF file name
    getDownloadURL(storageRef).then((url) => {
      setURL(url);
    });
  }, []);
  const DownloadEvidence = () => {
    const files = ref(storage, `files/Dheeraj TN 3.pdf/`);
    getDownloadURL(files).then((url) => {
      window.open(url, "_blank");
    });
  };

  return (
    <div>
      <button onClick={DownloadEvidence} className="">
        Click here view the project file/code
      </button>
      {/* {url ? (
        <Document file={url}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
     */}
    </div>
  );
};

export default DisplayPdf;
