import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token") || ""; // Use the consistent key

  return (
    <>
      {token.length ? (
        children
      ) : (
        <Navigate to="/" replace state={{ from: window.location.pathname }} />
      )}
    </>
  );
};

export default Protected;