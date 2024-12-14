import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack"; // Importing notistack
import { config } from "../../App"; // Assuming your endpoint config is here

const MatchResultsPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonState, setButtonState] = useState({}); // To manage the button state
  const { enqueueSnackbar } = useSnackbar(); // Accessing the enqueueSnackbar function

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
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleSendRequest = async (mentorId) => {
    try {
      const menteeId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage as mentee's ID
      if (!menteeId) {
        throw new Error("UserID not found in localStorage");
      }

      const response = await axios.post(
        `${config.endpoint}/api/mentorship/request`,
        { menteeId, mentorId, status: "pending" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Show success notification using notistack
        enqueueSnackbar("Mentorship request sent successfully!", {
          variant: "success",
        });

        // Update the button state to show success message
        setButtonState((prevState) => ({
          ...prevState,
          [mentorId]: "Request Sent Successfully", // Set the success message for the clicked mentorId
        }));
      }
    } catch (error) {
      console.error("Error sending request:", error);

      // Show error notification using notistack
      enqueueSnackbar("Failed to send mentorship request.", { variant: "error" });
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

                {/* Button state handling */}
                <button
                  className={`btn ${buttonState[match.match._id] ? "btn-success" : "btn-primary"}`}
                  onClick={() => handleSendRequest(match.match._id)} // Send request to the mentor
                  disabled={buttonState[match.match._id]} // Disable button once request is sent
                >
                  {buttonState[match.match._id] || "Send Request"}
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
