import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UpdatePostModal.css";

const UpdatePostModal = ({ onClose, postId, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
    location: "",
    likes: 0,
    postimage: "",
    descripation: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    axios({
      url: `https://fullstackserver1.onrender.com/updatePost/${postId}`,
      method: "PUT",
      data: updatedData,
    })
      .then((res) => {
        console.log(res);
        onUpdate(); // Refresh posts after updating a post
        onClose(); // Close the modal
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      style={{
        content: {
          width: "320px", // Set the width of the modal
          height: "320px", // Set the height of the modal
          margin: "auto", // Center the modal horizontally
          marginTop: "100px", // Adjust top margin to center vertically
          borderRadius: "8px", // Optional: Add border-radius for rounded corners
          outline: "none", // Remove default focus style
          padding: "20px", // Optional: Add padding to the modal content
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(245, 40, 145, 0.93)",
        },
      }}
      isOpen={true} // You may need to manage this state based on your requirements
      onRequestClose={onClose}
      className="modal-dialog modal-dialog-centered" // Center the modal
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Post</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            value={updatedData.location}
            onChange={handleInputChange}
            className="form-control"
            required
          />
          <label className="form-label">Description:</label>
          <input
            type="text"
            name="descripation"
            value={updatedData.descripation}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary me-4"
            onClick={handleUpdate}
          >
            Update Post
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePostModal;
