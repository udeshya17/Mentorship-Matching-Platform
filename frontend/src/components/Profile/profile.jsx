import { useState, useEffect } from "react";
import coverPhoto from "../../assets/profile-ph.jpg";
import axios from "axios";

const Profile = () => {
  return (
    <div
      className="container-fluid d-flex flex-column flex-lg-row align-items-center"
      style={{ minHeight: "100vh", paddingTop: "60px" }}
    >
      {/* Left Section: Profile Picture */}
      <div className="text-center text-lg-start p-3" style={{ flex: 1 }}>
        <img
          src={coverPhoto}
          alt="Profile"
          className="img-fluid"
          style={{ width: "100%", maxWidth: "500px", height: "auto", borderRadius: "10px" }}
        />
      </div>

      {/* Right Section: Profile Details */}
      <div className="p-3" style={{ flex: 2, maxWidth: "600px" }}>
        <h1 className="mb-4">Profile Summary</h1>

        <div className="mb-3">
          <h3>Role : </h3>
          <p>#</p>
        </div>

        <div className="mb-3">
          <h3>Skills : </h3>
          <p>#</p>
        </div>

        <div className="mb-3">
          <h3>Interests : </h3>
          <p>#</p>
        </div>

        <div className="mb-3">
          <h3>Bio : </h3>
          <p>#</p>
        </div>

        <button className="btn btn-primary">Edit Changes</button>
      </div>
    </div>
  );
};

export default Profile;