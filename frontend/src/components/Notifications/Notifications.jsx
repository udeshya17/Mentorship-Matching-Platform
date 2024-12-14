import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../../App";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID is missing from localStorage.");
          return;
        }

        const response = await axios.get(`${config.endpoint}/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId) => {
    try {
      await axios.post(`${config.endpoint}/api/notifications/accept`, {
        notificationId,
      });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      alert("Request accepted.");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (notificationId) => {
    try {
      await axios.post(`${config.endpoint}/api/notifications/decline`, {
        notificationId,
      });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      alert("Request declined.");
    } catch (error) {
      console.error("Error declining request:", error);
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
              {!notification.read && (
                <div className="notification-actions">
                  <button
                    className="btn btn-success"
                    onClick={() => handleAccept(notification._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDecline(notification._id)}
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
