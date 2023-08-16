import React, { useState } from "react";
import { useEffect } from "react";
// import { toast } from "react-toastify";
import upload from "../images/Image upload-bro.png"
import AdminNavbar from "../Navbar/AdminNavbar";
import GalleryTable from "../GalleryImageTable/GalleryTable";
import DestinationImageTable from "../GalleryImageTable/DestinationImageTable";
import AgentNavbar from "../Navbar/AgentNavbar";

const AgentImageUpload = () => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadToGoogleDrive(file);
    }
  };

  const [imageData, setImageData] = useState({
    categoryId: 3,
    imageName: "",
    imageUrl: "",
  });

  useEffect(() => {
    // This will be called whenever imageData changes
    if (imageData.imageName !== "" && imageData.imageUrl !== "") {
      addImageToDatabase();
    }
  }, [imageData]);

  const uploadToGoogleDrive = (file) => {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: ["1e9ef7-WXM3_eUWurEO316ZNZUs6WszzW"],
    };

    const accessToken ="ya29.a0AfB_byADDwcgQ-zk7-9CuE0uwYTeSzZ9o0eGXGG93Y2H3zwyBcMQ5fGWOKup_5hMlwfrp4RfRvtlP1t8lHu1hz-sa-WYeb3Mt6Rqk6K5f3iPZBfFC6imJcReX5KcGbX4L58iXR-Be5ViVznCEAE74QUX8Ezn56oaCgYKAWUSARASFQHsvYlsR7KGyK7giaE3FMLidEPklA0166"
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
        <AgentNavbar/>
      </div>
      <div style={{width:"70%",margin:"auto"}}>
        <h2 style={{textAlign:"center"}}>Upload Destinatioon Images</h2>
        <p style={{textAlign:"center"}}>Have the filename same as your destination</p>
        <div class="mb-4 d-flex justify-content-center">
          <img
            // src="https://img.freepik.com/free-vector/image-folder-concept-illustration_114360-114.jpg?t=st=1690899307~exp=1690899907~hmac=45429e0900f781183964138c40d47bc7a9f459fae200cf613015091c6d51c2a3"
            src={upload}
            alt="example placeholder"
            style={{ width: 350 }}
          />
        </div>
        <div class="d-flex justify-content-center">
          <div class="btn btn-primary btn-rounded">
            <label class="form-label text-white m-1" for="customFile1">
              Choose file
            </label>
            <input
              type="file"
              class="form-control d-none"
              id="customFile1"
              onChange={handleFileSelect}
            />
          </div>
        </div>
        <hr></hr>
        <div style={{marginTop:"3rem"}}>
            <DestinationImageTable/>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default AgentImageUpload;