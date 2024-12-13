import axios from "axios";
import { config } from "../../App";  // Assuming config is in App.js

const sendMentorshipRequest = async (mentorId) => {
  try {
    const response = await axios.post(
      `${config.endpoint}/api/mentorship/request`,
      { mentorId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    alert('Request sent successfully');
  } catch (error) {
    console.error('Error sending request:', error);
  }
};

const updateRequestStatus = async (requestId, status) => {
  try {
    const response = await axios.patch(
      `${config.endpoint}/api/mentorship/request/status`,
      { requestId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
    alert('Request status updated');
  } catch (error) {
    console.error('Error updating request status:', error);
  }
};
