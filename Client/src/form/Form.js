import camera from "../assest/camera.jpg";
import insta from "../assest/logo.png";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Form.css";
import FileBase64 from "react-file-base64";
import Swal from 'sweetalert2';

const Form = () => {
  const [posts, setPosts] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(false);
  const navigate = useNavigate();



  const handlePosts = () => {
    if (!isImageSelected || !posts.name || !posts.location || !posts.descripation) {
      // Show an error message or handle validation here
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields and select an image.',
      });
      return;
    }

    axios({
      url: 'https://fullstackserver1.onrender.com/post',
      method: 'POST',
      headers: {},
      data: {
        name: posts.name,
        location: posts.location,
        postimage: posts.postimage,
        descripation: posts.descripation,
        date: new Date().toLocaleDateString(),
        comments: [],
      },
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your post has been successfully submitted.',
        });
        navigate('/Postview');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later.',
        });
      });
  };
  const handleImageSelect = ({ base64 }) => {
    setPosts({ ...posts, postimage: base64 });
    setIsImageSelected(true);
  };

  return (
    <>
      <div className="container5">
        <header>
          <div className="nav">
            <img src={insta} alt="logoimage" />
            <img id="lobo" src={camera} alt="camera-image" />
          </div>
        </header>
        <hr />
      
        <form>
        <div className="secondcontainer">
          <div className="fileupload mb-3">
            <FileBase64 type="file" multiple={false} onDone={handleImageSelect} />
          </div>
          <div className="details mb-3">
            <span>
              <input
                type="text"
                id="author"
                placeholder="Author"
                className="form-control"
                onChange={(e) => setPosts({ ...posts, name: e.target.value })}
                required
              />
            </span>
            <span>
              <input
                type="text"
                id="location"
                placeholder="Location"
                className="form-control"
                onChange={(e) => setPosts({ ...posts, location: e.target.value })}
                required
              />
            </span>
          </div>
          <div className="descripation mb-3">
            <input
              type="text"
              id="description"
              placeholder="Description"
              className="form-control"
              onChange={(e) => setPosts({ ...posts, descripation: e.target.value })}
              required
            />
          </div>
          <div className="submit">
            <button type="button" className="btn btn-primary" id="button2" onClick={handlePosts}>
              Post
            </button>
          </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default Form;




