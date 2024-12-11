import { useState, useEffect } from "react";
import coverPhoto from "../../assets/profile-ph.jpg";
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    role: "",
    skills: "",
    interests: "",
    bio: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // or get from authentication context
    axios.get(`/api/profile/${userId}`)
      .then(response => {
        setProfileData(response.data);
      })
      .catch(err => {
        console.error("Error fetching profile data:", err);
      });
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // or get from authentication context
    axios.post('/api/profile', { ...profileData, userId })
      .then(response => {
        console.log("Profile saved/updated:", response.data);
        handleCloseModal(); // Close the modal after submission
      })
      .catch(err => {
        console.error("Error saving profile:", err);
      });
  };

  return (
    <div className="container-fluid d-flex flex-column flex-lg-row align-items-center" style={{ minHeight: "100vh", paddingTop: "80px" }}>
      {/* Left side: Photo */}
      <div className="text-center text-lg-start p-3" style={{ flex: 1 }}>
        <img
          src={coverPhoto}
          alt="Profile"
          className="img-fluid"
          style={{ width: "100%", maxWidth: "500px", height: "auto", borderRadius: "10px" }}
        />
      </div>

      {/* Right side: Profile Information */}
      <div className="p-3" style={{ flex: 1 }}>
        <h2>Complete Your Profile</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={profileData.role}
              onChange={handleInputChange}
              placeholder="e.g., Mentor or Mentee"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              value={profileData.skills}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, React"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="interests" className="form-label">Interests</label>
            <input
              type="text"
              className="form-control"
              id="interests"
              name="interests"
              value={profileData.interests}
              onChange={handleInputChange}
              placeholder="e.g., Web Development, AI"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              rows="3"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Write a brief bio"
            ></textarea>
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Profile</button>
        </form>
      </div>

    </div>
  );
};

export default Profile;
