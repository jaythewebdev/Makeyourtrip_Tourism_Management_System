import React, { useState } from "react";
import { useEffect } from "react";
// import { toast } from "react-toastify";
import upload from "../images/Image upload-bro.png"
import AdminNavbar from "../Navbar/AdminNavbar";
import GalleryTable from "../GalleryImageTable/GalleryTable";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
// import type { UploadFile } from "antd/es/upload/interface";

const AdminGallery = () => {


  // const handleFileSelect = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     uploadToGoogleDrive(file);
  //   }
  // };

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (files) => {
    const file = files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadToDrive = () => {
    if (uploadedFile) {
      uploadToGoogleDrive(uploadedFile);
    }
  };

  const [imageData, setImageData] = useState({
    categoryId: 2,
    imageName: "",
    imageUrl: "",
  });

  useEffect(() => {
    // This will be called whenever imageData changes
    if (imageData.imageName !== "" && imageData.imageUrl !== "") {
      addImageToDatabase();
    }
});

  const uploadToGoogleDrive = (file) => {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: ["1e9ef7-WXM3_eUWurEO316ZNZUs6WszzW"],
    };

    const accessToken ="ya29.a0AfB_byCS3FYL_CEHN1De2ZfnqDGaBzIrilW3yxX-nBoOKql1EppeAn-tQxZ5EytCzzpGCV0GWJdwxFT61YNSCyer8bqFoJexMq35JwbIFf6BeWzu27Dw95oxjVqQOoj7R6ZdNDkgSUJSpBAD-5vq2VFBG6zpJ7caCgYKAb8SARASFQHsvYlseJnxJ9gfNjr6SaF5UjK3AA0166"
    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: form,
      }
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        var myData = await response.json();
        console.log(myData);
        setImageData({
          ...imageData,
          imageName: myData.name,
          imageUrl: "https://drive.google.com/uc?export=view&id=" + myData.id,
        });
        // toast.success("Image Uploaded Successfully");
        if (imageData.imageName !== "" && imageData.imageUrl !== "") {
          addImageToDatabase();
        }
        // addImageToDatabase();
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const addImageToDatabase = () => {
    console.log(imageData);
    fetch("http://localhost:5133/api/TripImage", {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ ...imageData, imageData: {} }),
    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(myData);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };


  return (
    <div className="uploadform">
      {/*  */}
      <div style={{marginBottom:"6rem"}}>
        <AdminNavbar/>
      </div>
      <div style={{width:"70%",margin:"auto"}}>
        <h2 style={{textAlign:"center"}}>Upload Images</h2>
        <div class="mb-4 d-flex justify-content-center">
          <img
            // src="https://img.freepik.com/free-vector/image-folder-concept-illustration_114360-114.jpg?t=st=1690899307~exp=1690899907~hmac=45429e0900f781183964138c40d47bc7a9f459fae200cf613015091c6d51c2a3"
            src={upload}
            alt="example placeholder"
            style={{ width: 350 }}
          />
        </div>
        <div class="d-flex justify-content-center">
<div className="uploadform">
      <Upload
          customRequest={({ file }) => handleFileSelect([file])}
          listType="picture"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>
      <br />
      {/* {imageData.imageUrl && (
        <div className="d-flex justify-content-center">
          <img
            src={imageData.imageUrl}
            alt={imageData.imageName}
            style={{ maxWidth: "100%", marginTop: "20px" }}
          />
        </div>
      )} */}
      <Button onClick={handleUploadToDrive} type="primary">
       Upload Selected Image
          </Button>
    </div>
        </div>
        <div style={{marginTop:"3rem"}}>
            {/* <GalleryTable/> */}
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default AdminGallery;