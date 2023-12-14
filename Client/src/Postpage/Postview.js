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
import facebook from "../assest/facebook.png";
import whatsapp_icon from "../assest/whatsapp_icon.png";
import twitter_social_icon from "../assest/twitter_social_icon.png";
import share from "../assest/share.png";
import edit from "../assest/edit.png";
import deletepost from "../assest/delete.png";



import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Modal from "react-modal";

const MySwal = withReactContent(Swal);

const Postview = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const [data, setdata] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shareUrl = window.location.href; // URL to share
  const title = "Check out this post";

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
    // Clear token from local storage
    localStorage.removeItem("token");
    setLikedPosts([]);
    // Navigate to the home route
    navigate("/");
  };
  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem("jwtToken");
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
      console.error("Adding comment failed", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("User unauthorized. Please log in.");
        return;
      }

      // Check if the user has already liked the post
      if (likedPosts.includes(postId)) {
        console.log("User has already liked this post");
        return;
      }

      const response = await axios.post(
        `http://localhost:3082/likePost/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update the likedPosts state to mark this post as liked
      setLikedPosts([...likedPosts, postId]);

      // Update the posts with the new like information
      const updatedPosts = posts.map((post) =>
        post._id === postId ? response.data : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Liking post failed", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container1">
      <div></div>
      <div>
        {data.map((users, i) => {
          return;
        })}
      </div>
      <header className="header-container">
  <div className="nav">
    <img className="logo" src={insta} alt="logoimage" />
    <img
      id="lobo"
      className="camera-icon"
      onClick={formpage}
      src={camera}
      alt="camera-image"
    />
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  </div>
</header>


      {posts.map((item, i) => {
        return (
          <div className="Post" key={i}>
            <div className="user-information">
              <b className="name">{item.name}</b>
              <p>{item.location}</p>
            </div>

            <div className="dots">
              <img
              src={edit}
              alt=" currently no detail"
              className="paper-plane"
              style={{ cursor: "pointer" }}
                onClick={() => handleUpdateClick(item._id)}
              >
             
              </img>
              <img
                src={deletepost}
                alt=" currently no detail"
                className="paper-plane"
                onClick={() => handleDeletePost(item._id)}
                style={{ cursor: "pointer" }}
              >
            
              </img>
            </div>

            <div className="user-image">
              <img src={item.postimage} alt="images"></img>
            </div>

            <div className="data">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`heart-img ${
                    likedPosts.includes(item._id) ? "liked" : ""
                  }`}
                  onClick={() => handleLikePost(item._id)}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.25 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C16.09 2.81 17.76 2 19.5 2 22.58 2 25 4.42 25 7.5c0 3.75-3.4 6.75-8.55 12.54L12 21.35z" />
                </svg>
              </span>
              <span onClick={openModal}>
                <img
                  src={share}
                  alt=" currently no detail"
                  className="paper-plane"
                  style={{ cursor: "pointer" }}
                />
              </span>

              <span className="date">{cdate}</span>
              <p className="likes">{item.likes.length} likes</p>
            </div>
            <footer className="footer">
              <p> {item.descripation}</p>
              <div className="comment-section">
                <div className="comment-box">
                  {(item.comments || []).map((comment, index) => (
                    <div key={index} className="single-comment">
                      <p className="comment-text">
                        <span className="comment-email">
                          {comment.email.split('@')[0]}{' '}
                        </span>
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

<Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color behind the modal
    },
    content: {
      width: '300px', 
      height: '300px', 
      margin: 'auto', 
      marginTop: '100px', 
      borderRadius: '8px', 
      outline: 'none',
      padding: '20px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
  }}
>
  <div>
    <FacebookShareButton url={shareUrl} quote={title}>
      <img
        src={facebook}/* Replace with the actual path */
        alt="Facebooka"
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
    </FacebookShareButton>

    <TwitterShareButton url={shareUrl} title={title}>
      <img
        src={twitter_social_icon}
        alt="Twitter"
        style={{ width: '30px', height: '30px', marginRight: '10px' }}
      />
    </TwitterShareButton>

    <WhatsappShareButton url={shareUrl} title={title}>
      <img
        src={ whatsapp_icon}
        alt="WhatsApp"
        style={{ width: '30px', height: '30px' }}
      />
    </WhatsappShareButton>
  </div>
  {/* Add other social media share buttons here */}
  <button onClick={closeModal}>Close</button>
</Modal>




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
