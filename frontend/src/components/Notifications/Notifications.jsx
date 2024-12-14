import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../App";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [mentorshipRequests, setMentorshipRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications and mentorship requests
  useEffect(() => {
    const fetchNotificationsAndRequests = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Fetch the logged-in user's ID
        if (!userId) {
          console.error("User ID is missing from localStorage.");
          return;
        }

        // Fetch notifications
        const notificationsResponse = await axios.get(`${config.endpoint}/api/notifications/${userId}`);
        setNotifications(notificationsResponse.data);

        // Fetch mentorship requests using the user ID as mentorId
        const mentorshipRequestsResponse = await axios.get(`${config.endpoint}/api/mentorship/request/${userId}`);
        setMentorshipRequests(mentorshipRequestsResponse.data);
      } catch (error) {
        console.error("Error fetching notifications or mentorship requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificationsAndRequests();
  }, []);

  // Update the status of the mentorship request
  const handleUpdateStatus = async (requestId, status) => {
    try {
      // console.log(mentorshipRequests[0]._id);
      // Send PATCH request to update the mentorship request status
      const response = await axios.patch(`${config.endpoint}/api/mentorship/request/status`, {
        requestId : mentorshipRequests[0]._id, 
        status,    
      });

      if (response.status === 200) {
        // Update the notification and mentorship request state to reflect the status change
        setMentorshipRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, status: status } : request
          )
        );
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.requestId === requestId
              ? { ...notification, status: status.charAt(0).toUpperCase() + status.slice(1) }
              : notification
          )
        );
        alert(`Request ${status}.`);
      }
    } catch (error) {
      console.error(`Error updating request status to ${status}:`, error);
    }
  };

  if (loading) return <p className="loading-message">Loading notifications...</p>;

  return (
    <div className="notification-container">
      <h3>Your Notifications</h3>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-item ${notification.read ? "read" : "unread"}`}
            >
              <p>{notification.message}</p>

              {/* Display the mentorship request ID for reference */}
              {notification.requestId && (
                <p>Mentorship Request ID: {notification.requestId}</p>
              )}

              {/* Actions for unread notifications */}
              {!notification.read && notification.message !== "Your mentorship request was accepted" && (
                <div className="notification-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(notification.requestId, "accepted")}
                    disabled={notification.status === "Accepted"}
                  >
                    {notification.status === "Accepted" ? "Accepted" : "Accept"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(notification.requestId, "declined")}
                    disabled={notification.status === "Declined"}
                  >
                    {notification.status === "Declined" ? "Declined" : "Decline"}
                  </button>
                </div>
              )}

              {/* Display status for read notifications */}
              {notification.read && notification.status && (
                <p className={`status ${notification.status === "Accepted" ? "accepted" : "declined"}`}>
                  {notification.status}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      <h3>Your Mentorship Requests</h3>
      <div className="mentorship-request-list">
        {mentorshipRequests.length === 0 ? (
          <p>No mentorship requests available.</p>
        ) : (
          mentorshipRequests.map((request) => (
            <div key={request._id} className="mentorship-request-item">
              <p>Mentorship Request ID: {request._id}</p>
              <p>Status: {request.status || "Pending"}</p>

              {/* Buttons for accepting or declining the request */}
              {request.status === "Pending" && (
                <div className="request-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateStatus(request._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleUpdateStatus(request._id, "declined")}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
