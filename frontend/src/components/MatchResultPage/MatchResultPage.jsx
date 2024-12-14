import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../App"; // Assuming your endpoint config is here

const MatchResultsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Fetch userId from localStorage
        const userId = localStorage.getItem("userId");
        console.log("UserID fetched from localStorage:", userId);

        if (!userId) {
          throw new Error("UserID not found in localStorage");
        }

        // Make API call with userId
        const response = await axios.get(`${config.endpoint}/api/mentorship/match`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
            "Content-Type": "application/json",
          },
          params: { userId }, // Pass userId as a query parameter
        });

        setMatches(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Match Results</h2>
      <div className="row">
        {matches.map((match, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{match.match.bio}</h5>
                <p className="card-text">
                  <strong>Role:</strong> {match.match.role} <br />
                  <strong>Skills:</strong> {match.match.skills.join(", ")} <br />
                  <strong>Interests:</strong> {match.match.interests.join(", ")}
                </p>
                <p className="card-text">
                  <strong>Match Score:</strong> {match.matchScore}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchResultsPage;
