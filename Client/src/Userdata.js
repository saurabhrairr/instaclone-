import { useState, useEffect } from "react";

function Fetch() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3082/users")
      .then((result) => result.json())
      .then((responseData) => {
        // Assuming responseData has a 'users' property containing the array
        setdata(responseData.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error, set appropriate state, or log a message
      });
  }, []);
  return (
    <div>
      {data.map((users, i) => {
        return <p> {users.username}</p>;
      })}
    </div>
  );
}

export default Fetch;
