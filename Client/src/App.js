import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./singup/Singup";
import Landingpage from "./landingPage/Landingpage";
import Postview from "./Postpage/Postview";
import Form from "./form/Form";
import Userdata from "./Userdata";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Protected from "./protected-route/protected";
import Commenttest from "./Commenttest";

const App = () => {
  // Load token from localStorage on component mount
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Save token to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const handleLogout = () => {
    // Clear token from state and localStorage
    setToken(null);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Landingpage" element={<Landingpage />} />
          <Route path="/Postview" element={<Protected><Postview/></Protected>}></Route>
          <Route path="/form" element={<Form />} />
          <Route path="/Commenttest" element={<Commenttest />} />
          {/* Authentication Routes */}
          <Route
            path="/"
            element={<Login setToken={setToken} handleLogout={handleLogout} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Userdata" element={<Userdata />} />
          <Route path="/PrivateRoute" element={<PrivateRoute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;