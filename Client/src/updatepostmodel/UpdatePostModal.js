import React, { useState } from "react";
import axios from "axios";

const UpdatePostModal = ({ postId, onClose, onUpdate }) => {
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
      url: `http://localhost:3082/updatePost/${postId}`,
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
    <div>
      <h2>Edit Post</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={updatedData.name}
        onChange={handleInputChange}
        required
      />
       <label>location:</label>
      <input
        type="text"
        name="location"
        value={updatedData.location}
        onChange={handleInputChange}
        required
      />
        <label>descripation:</label>
      <input
        type="text"
        name="descripation"
        value={updatedData.descripation}
        onChange={handleInputChange}
        required
      />
 
      <button onClick={handleUpdate}>Update Post</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
export default UpdatePostModal;