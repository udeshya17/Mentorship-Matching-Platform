import { useState, useEffect } from "react";
import coverPhoto from "../../assets/profile-ph.jpg";
import ProfileModal from "../Modal/profileModal";
import axios from "axios";
import { config } from "../../App";

const Profile = () => {
  // State for profile details
  const [profileDetails, setProfileDetails] = useState({
    role: "",
    skills: [],
    interests: [],
    bio: "",
  });

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handle opening the modal
  const handleShow = () => setShowModal(true);

  // Handle closing the modal
  const handleClose = () => setShowModal(false);

  // Handle saving profile details from the modal
  const handleSave = (updatedDetails) => {
    setProfileDetails(updatedDetails); 
    handleClose(); // Close the modal
  };

  // Fetch profile data from the backend when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(`${config.endpoint}/api/profile/${userId}`);
        setProfileDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array ensures this runs only once on mount

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
          <h3>Role :</h3>
          <p>{profileDetails.role}</p>
        </div>

        <div className="mb-3">
          <h3>Skills :</h3>
          <p>{profileDetails.skills.join(", ")}</p> {/* Display skills as comma-separated string */}
        </div>

        <div className="mb-3">
          <h3>Interests :</h3>
          <p>{profileDetails.interests.join(", ")}</p> {/* Display interests as comma-separated string */}
        </div>

        <div className="mb-3">
          <h3>Bio :</h3>
          <p>{profileDetails.bio}</p>
        </div>

        {/* Edit Changes Button */}
        <button className="btn btn-primary" onClick={handleShow}>
          Edit Changes
        </button>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        showModal={showModal}
        handleClose={handleClose}
        profileDetails={profileDetails}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Profile;