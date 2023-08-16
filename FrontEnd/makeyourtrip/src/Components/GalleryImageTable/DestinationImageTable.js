import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DestinationImageTable() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImageInfo();
  }, []);

  const getImageInfo = () => {
    fetch("http://localhost:5133/api/TripImage", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),

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
          Authorization: "Bearer " + localStorage.getItem("token"),

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

  const filteredImages = images.filter((image) => image.categoryId === 3);
console.log(filteredImages);

  return (
    <div>
      <div className="card-body">
        <h4 className="card-title" style={{textAlign:"center",marginBottom:"1.5rem"}}>
          Recent Images <span>| Today</span>
        </h4>
        <table className="table datatable">
          <thead>
            <tr>
              <th scope="col">Image ID</th>
              <th scope="col">Category ID</th>
              <th scope="col">Image Name</th>
              <th scope="col">Image Link</th>
              <th scope="col">Actions</th>
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
                <td>
                  <div className="dropdown">
                    <button
                      className="btn btn-link dropdown-toggle"
                      type="button"
                      id={`dropdownMenuButton-${image.imageId}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${image.imageId}`}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleDeleteImage(image.imageId)}
                        >
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DestinationImageTable;