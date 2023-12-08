import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link ,Navigate } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./singup/Singup";
import Landingpage from "./landingPage/Landingpage";
import Postview from "./Postpage/Postview";
import Form from "./form/Form";
import Userdata from "./Userdata";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


  const ProtectedRoute = ({ element, token }) => {
    return token ? (
      element
    ) : (
      <Navigate to="/" replace state={{ from: window.location.pathname }} />
    );
  };

const App = () => {
  const [token, setToken] = useState(null);

  
  return (
    <Router>
      <div>
        <Routes>
       


          <Route
            path="/Landingpage"
            element={<ProtectedRoute element={<Landingpage />} token={token} />}
          />
          <Route
            path="/postview"
            element={<ProtectedRoute element={<Postview />} token={token} />}
          />
           <Route
            path="/form"
            element={<ProtectedRoute element={<Form />} token={token} />}
          />
         

          {/* Authentication Routes */}
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Userdata" element={<Userdata />} />
             <Route path="/PrivateRoute" element={<PrivateRoute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
