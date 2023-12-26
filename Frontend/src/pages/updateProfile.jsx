import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";

const backendUrl = "http://localhost:3000/api/v1";

const UpdateProfileNavbar = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/updateProfile" style={{ marginLeft: "20px" }}>
          Update Profile
        </Navbar.Brand>
        {/* ... (rest of the Navbar content) */}
      </Navbar>
    </>
  );
};

const UpdateProfile = () => {
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const response = await axios.put(
        `${backendUrl}/users/`,
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          withCredentials: true,
        }
      );
      

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div>
      {/* Use the new UpdateProfileNavbar component */}
      <UpdateProfileNavbar />

      {/* Content for UpdateProfile page */}
      <div className="main-content">
        <h1>Welcome to the Update Profile Page</h1>

        {/* Form for username and password */}
        <form onSubmit={handleUpdate}>
          <div className="profile-container">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>

          <div className="profile-container">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>

          {/* Submit button */}
          <button type="submit">
            Submit
          </button>
        </form>

        {/* Add any other content specific to the UpdateProfile page */}
      </div>
    </div>
  );
};

export default UpdateProfile;