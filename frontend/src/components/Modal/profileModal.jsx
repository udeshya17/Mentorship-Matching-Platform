import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { config } from "../../App";

const ProfileModal = ({ showModal, handleClose, profileDetails = {}, handleSave }) => {
  const defaultProfile = {
    role: "",
    skills: [],
    interests: [],
    bio: "",
  };

  const [formData, setFormData] = useState({ ...defaultProfile, ...profileDetails });
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update form data when profileDetails props change
  useEffect(() => {
    setFormData({ ...defaultProfile, ...profileDetails });
  }, [profileDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle skills and interests as arrays
    if (name === "skills" || name === "interests") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value ? value.split(",").map((item) => item.trim()) : [],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsUpdating(true);
    setErrorMessage("");
  
    const userId = localStorage.getItem("userId");
  
    // Exclude `_id` and `__v` from the form data
    const { _id, __v, ...profileData } = { ...formData, userId };
  
    try {
      // Check if the profile exists
      const checkProfileResponse = await axios.get(
        `${config.endpoint}/api/profile/${userId}`
      );
  
      if (checkProfileResponse.data) {
        // Profile exists, proceed with the PUT request
        const updateResponse = await axios.put(
          `${config.endpoint}/api/profile/${userId}`,
          profileData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Profile updated:", updateResponse.data);
        handleSave(updateResponse.data);
      }
    } catch (error) {
      // Handle case where profile does not exist (404)
      if (error.response?.status === 404) {
        try {
          // Profile doesn't exist, proceed with the POST request
          const createResponse = await axios.post(
            `${config.endpoint}/api/profile`,
            profileData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log("Profile created:", createResponse.data);
          handleSave(createResponse.data);
        } catch (createError) {
          console.error(
            "Error creating profile:",
            createError.response?.data || createError.message
          );
          setErrorMessage(
            createError.response?.data?.message ||
              "Failed to create profile. Please try again."
          );
        }
      } else {
        console.error(
          "Error checking profile existence:",
          error.response?.data || error.message
        );
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to update profile. Please try again."
        );
      }
    } finally {
      setIsUpdating(false);
      handleClose(); // Close modal in either case
    }
  };
  

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role (mentor or mentee)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Form.Control
              type="text"
              name="skills"
              value={formData.skills.join(", ")}
              onChange={handleChange}
              placeholder="Enter skills (comma separated)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Interests</Form.Label>
            <Form.Control
              type="text"
              name="interests"
              value={formData.interests.join(", ")}
              onChange={handleChange}
              placeholder="Enter interests (comma separated)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter bio"
            />
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isUpdating}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
