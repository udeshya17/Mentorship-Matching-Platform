import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { config } from "../../App";

const MatchResultsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonState, setButtonState] = useState(() => {
    const storedState = localStorage.getItem("buttonState");
    return storedState ? JSON.parse(storedState) : {};
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("UserID not found in localStorage");
        }

        const response = await axios.get(`${config.endpoint}/api/mentorship/match`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          params: { userId },
        });

        setMatches(response.data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        enqueueSnackbar("Failed to load matches. Please try again later.", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [enqueueSnackbar]);

  const handleSendRequest = async (mentorId) => {
    try {
      const menteeId = localStorage.getItem("userId");
      if (!menteeId) {
        throw new Error("UserID not found in localStorage");
      }

      // Send mentorship request
      const response = await axios.post(
        `${config.endpoint}/api/mentorship/request`,
        { menteeId, mentorId, status: "pending" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        const requestId = response.data.requestId; // Extract requestId from the response
        enqueueSnackbar("Mentorship request sent successfully!", { variant: "success" });

        // Update button state to "Sent Successfully"
        const updatedState = {
          ...buttonState,
          [mentorId]: "Sent Successfully",
        };
        setButtonState(updatedState);
        localStorage.setItem("buttonState", JSON.stringify(updatedState));

        // Send notification
        await axios.post(`${config.endpoint}/api/notifications`, {
          _id: `notification-${mentorId}-${Date.now()}`, // Optional: Unique ID generation
          message: "Mentorship request received",
          requestId: requestId,
          userId: mentorId,
          senderId: menteeId,
          read: false,
          status: null,
        });
      }
    } catch (error) {
      console.error("Error sending request:", error);
      enqueueSnackbar(
        error.response?.data?.message || "Failed to send mentorship request. Please try again.",
        { variant: "error" }
      );
    }
  };

  if (loading) return <p>Loading...</p>;

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

                <button
                  className={`btn ${
                    buttonState[match.match.userId]
                      ? "btn-success"
                      : "btn-primary"
                  }`}
                  onClick={() => handleSendRequest(match.match.userId)}
                  disabled={buttonState[match.match.userId] === "Sent Successfully"}
                >
                  {buttonState[match.match.userId] || "Send Request"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchResultsPage;
