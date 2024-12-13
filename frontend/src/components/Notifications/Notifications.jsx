import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from "../../App";  // Assuming config is in App.js

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${config.endpoint}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,  // Send the token for authentication
          },
        });

        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
