import React, { useEffect, useState } from "react";
import axios from "axios";
import camera from "../assest/camera.jpg";
import insta from "../assest/logo.png";
import { useNavigate } from "react-router-dom";
import "./postview.css";
import paperplan from "../assest/2symbole.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import UpdatePostModal from "../updatepostmodel/UpdatePostModal";

const MySwal = withReactContent(Swal);

const Postview = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const [data, setdata] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const formpage = () => {
    navigate("/Form");
  };

  console.log(currentUser);
  useEffect(() => {
    axios({
      url: "http://localhost:3082/post",
      method: "GET",
    }).then((itemdata) => {
      setPosts(itemdata.data.item.reverse());
      console.log(itemdata.data);
    });
  }, []);

  const cdate = new Date().toLocaleDateString();

  const handleUpdateClick = (postId) => {
    setSelectedPostId(postId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedPostId(null);
    setShowUpdateModal(false);
  };

  const handleDeletePost = (postId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log("Delete button clicked"); // Add this console log for debugging
      if (result.isConfirmed) {
        axios({
          url: `http://localhost:3082/deletePost/${postId}`,
          method: "DELETE",
        })
          .then((res) => {
            console.log(res);
            // Refresh posts after deleting a post
            axios({
              url: "http://localhost:3082/post",
              method: "GET",
            }).then((itemdata) => {
              setPosts(itemdata.data.item.reverse());
            });
          })
          .catch((err) => {
            console.log(err);
          });
        MySwal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  const handleLogout = () => {
    navigate("/");
  };






  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error("User unauthorized. Please log in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3082/addComment/${postId}`,
        { text: newCommentText },
        
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
      setNewCommentText("");
    } catch (error) {
      console.error('Adding comment failed', error);
    }
  };
  return (
    <div className="container1">
      <div></div>
      <div>
        {data.map((users, i) => {
          return;
        })}
      </div>
      <header>
        <div className="nav">
          <img src={insta} alt="logoimage" />
          <img id="lobo" onClick={formpage} src={camera} alt="camera-image" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <hr />

      {posts.map((item, i) => {
        return (
          <div className="Post" key={i}>
            <div className="user-information">
              <b className="name">{item.name}</b>
              <p>{item.location}</p>
            </div>

            <div className="dots">
              <p onClick={() => handleUpdateClick(item._id)}  style={{ cursor: 'pointer' }} >Edit</p>
              <p onClick={() => handleDeletePost(item._id)}  style={{ cursor: 'pointer' }} >
                &#8226;&#8226;&#8226;
              </p>
            </div>

            <div className="user-image">
              <img src={item.postimage} alt="images"></img>
            </div>

            <div className="data">
              <span>
                <img
                  src="https://icon-library.com/images/instagram-heart-icon/instagram-heart-icon-17.jpg"
                  alt=" currently no detail"
                  className="heart-img"
                />
              </span>
              <span>
                <img
                  src={paperplan}
                  alt=" currently no detail"
                  className="paper-plane"
                  
                />
              </span>
              <span className="date">{cdate}</span>
              <p className="likes">100 likes</p>
            </div>
            <footer className="footer">
              <p> {item.descripation}</p>



              <div className="comment-section">
                <div className="comment-box">
                  {(item.comments || []).map((comment, index) => (
                    <div key={index} className="single-comment">
                      <p className="comment-text">
                        <span className="comment-username">{comment.username}</span>
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Add Comment Input */}
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                  <button onClick={() => handleCommentSubmit(item._id)}>
                    Add Comment
                  </button>
                </div>
              </div>
            </footer>
          </div>
        );
      })}

      {showUpdateModal && (
        <UpdatePostModal
          postId={selectedPostId}
          onClose={handleCloseUpdateModal}
          onUpdate={() => {
            axios({
              url: "http://localhost:3082/post",
              method: "GET",
            }).then((itemdata) => {
              setPosts(itemdata.data.item.reverse());
            });
          }}
        />
      )}
    </div>
  );
};

export default Postview;
