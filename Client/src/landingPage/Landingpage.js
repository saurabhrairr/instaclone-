import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assest/icon.jpg";
import "./landingpage.css";

const Landingpage = () => {
  const [userName, setUserName] = useState("");
  const [entered, setEntered] = useState(false);

  const handleRoute = () => {
    if (userName.trim() !== "") {
      setEntered(true);
    } else {
      alert("Please enter your name before proceeding.");
    }
  };

  return (
    <>
      <div className="main">
    
        <img src={icon} alt="10xteamenterimage" />
        <div className="second">
          <ul>
            <p>10x Team 04</p>
            {!entered ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
