import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../Navbar/AdminNavbar";

function AdminUploadedImages() {
  const [images, setImages] = useState([]);



  const getImageInfo = () => {
    fetch("http://localhost:5133/api/TripImage", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const imageData = await response.json();
        setImages(imageData);
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      fetch(`http://localhost:5007/api/TripImage/${imageId}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          toast.success("Image Deleted Successfully");
          // Remove the deleted image from the images array
          setImages(images.filter((image) => image.imageId !== imageId));
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });
    }
  };

  useEffect(() => {
    getImageInfo();
  }, []);

  const filteredImages = images.filter((image) => image.categoryId === 2);
  console.log(filteredImages);

  return (
    <div>
        <div>
            <AdminNavbar/>
        </div>
        <div style={{marginTop:"8rem"}}>

        </div>
      <div className="card-body" style={{width:"80%",margin:"auto"}}>
        <h4 className="card-title" style={{textAlign:"center"}}>
          Recent Images <span>| Today</span>
        </h4>
        <table className="table datatable">
          <thead>
            <tr>
              <th scope="col">Image ID</th>
              <th scope="col">Category ID</th>
              <th scope="col">Image Name</th>
              <th scope="col">Image Link</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredImages.map((image) => (
              <tr key={image.imageId}>
                <th scope="row">
                  <a href={`#${image.imageId}`}>{image.imageId}</a>
                </th>
                <td>{image.categoryId}</td>
                <td>{image.imageName}</td>
                <td>
                  <a href={image.imageUrl} target="_blank" rel="noreferrer">
                    {image.imageUrl}
                  </a>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUploadedImages;