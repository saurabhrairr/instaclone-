import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import icon from "../assest/icon.jpg";
import "./landingpage.css";

const Landingpage = () => {
  const [userName, setUserName] = useState("");
  const [entered, setEntered] = useState(false);

  const handleRoute = () => {
    if (userName.trim() !== "") {
      setEntered(true);
    } else {
      // Replace the alert with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter your name before proceeding.',
      });
    }
  };

  return (
    <>
      <div className="main">
        <img className="landinpageimg"  src={icon} alt="10xteamenterimage" />
        <div className="second">
          <ul>
            <p>Welcome !</p>
            {!entered ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    marginRight: '10px',
                  }}
                />
                <button onClick={handleRoute}>Enter</button>
              </>
            ) : (
              <Link to={{ pathname: "/Postview", state: { userName } }}>
                <button>Continue to PostView</button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Landingpage;
