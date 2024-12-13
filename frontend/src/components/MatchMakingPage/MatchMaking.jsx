import { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from "../../App";  // Import config

const MatchmakingPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Using the endpoint from config
        const response = await axios.get(`${config.endpoint}/api/mentorship/match`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Suggested Matches</h2>
      {matches.length > 0 ? (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              <p>{match.name} - {match.skills.join(', ')}</p>
              <button onClick={() => sendMentorshipRequest(match.id)}>Send Mentorship Request</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchmakingPage;
