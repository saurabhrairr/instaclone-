import camera from "../assest/camera.jpg";
import insta from "../assest/logo.png";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Form.css";
import FileBase64 from "react-file-base64";


const Form = () => {
  const [posts, setPosts] = useState({});
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [postss, setPostss] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();




  const handlePosts = () => {
    if (!isImageSelected) {
      // Show an error message or handle validation here
      console.log("Please select an image.");
      return;
    }

    axios({
      url: "http://localhost:3082/post",
      method: "POST",
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
        navigate("/Postview");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageSelect = ({ base64 }) => {
    setPosts({ ...posts, postimage: base64 });
    setIsImageSelected(true);
  };

  return (
    <>
      <div className="container">
        <header>
          <div className="nav">
            <img src={insta} alt="logoimage" />
            <img id="lobo" src={camera} alt="camera-image" />
          </div>
        </header>
        <hr />
      
        <form>
          <div className="secondcontainer">
            <div className="fileupload">
              <FileBase64
                type="file"
                multiple={false}
                onDone={handleImageSelect}
              />
            </div>
            <div className="details">
              <span>
                <input
                  type="text"
                  id="author"
                  placeholder="Author"
                  onChange={(e) =>
                    setPosts({ ...posts, name: e.target.value })
                  }
                  required
                />
              </span>
              <span>
                <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  onChange={(e) =>
                    setPosts({ ...posts, location: e.target.value })
                  }
                  required
                />
              </span>
            </div>
            <div className="descripation">
              <input
                type="text"
                id="description"
                placeholder="Description"
                onChange={(e) =>
                  setPosts({ ...posts, descripation: e.target.value })
                }
                required
              />
            </div>
            <div className="submit">
              <button type="button" id="button2" onClick={handlePosts}>
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




