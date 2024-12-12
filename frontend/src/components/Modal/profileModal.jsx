import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { config } from "../../App";

const ProfileModal = ({ showModal, handleClose, profileDetails, handleSave }) => {
  const [formData, setFormData] = useState(profileDetails);
  const [isUpdating, setIsUpdating] = useState(false); 

  // Update form data when profileDetails props change
  useEffect(() => {
    setFormData(profileDetails);
  }, [profileDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle skills and interests as arrays
    if (name === "skills" || name === "interests") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.split(",").map((item) => item.trim()),
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
  
    const userId = localStorage.getItem("userId");
  
    // Exclude _id and __v from the form data
    const { _id, __v, ...profileData } = { ...formData, userId };
  
    try {
      // Update profile API call
      const response = await axios.put(
        `${config.endpoint}/api/profile/${userId}`,
        profileData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Profile updated:", response.data);
  
      // Save updated data in the parent component
      handleSave(response.data);
    } catch (error) {
      console.error(
        "Error updating profile data:",
        error.response?.data || error.message
      );
    } finally {
      setIsUpdating(false);
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
              placeholder="Enter role"
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
