import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { config } from "../../App";

const MatchmakingPage = () => {
  const [matches, setMatches] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const userId = localStorage.getItem("userId");

        // Fetch user profile
        const userProfileResponse = await axios.get(
          `${config.endpoint}/api/profile/${userId}`
        );

        const profileData = userProfileResponse.data;
        setUserProfile(profileData);

        // Fetch matches based on user's skills and interests
        const matchResponse = await axios.post(
          `${config.endpoint}/api/profile/matches`,
          {
            skills: profileData.skills,
            interests: profileData.interests,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setMatches(matchResponse.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setError("Failed to fetch matches. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const handleSendRequest = async (matchId) => {
    try {
      const userId = localStorage.getItem("userId");

      await axios.post(
        `${config.endpoint}/api/mentorship/request`,
        {
          mentorId: matchId,
          menteeId: userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Mentorship request sent successfully!");
    } catch (error) {
      console.error("Error sending mentorship request:", error);
      alert("Failed to send mentorship request. Please try again later.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Mentorship Matches</h1>

      {matches.length > 0 ? (
        <Row className="g-4">
          {matches.map((match) => (
            <Col key={match._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{match.name}</Card.Title>

                  <Card.Subtitle className="mb-2 text-muted">
                    Role: {match.role}
                  </Card.Subtitle>

                  <Card.Text>
                    <strong>Skills:</strong> {match.skills.join(", ")}
                    <br />
                    <strong>Interests:</strong> {match.interests.join(", ")}
                  </Card.Text>

                  <Badge bg="info">{match.bio}</Badge>

                  <div className="mt-3 text-center">
                    <Button
                      variant="success"
                      onClick={() => handleSendRequest(match._id)}
                    >
                      Send Request
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <p>No matches found based on your profile. Try updating your profile for better matches!</p>
        </div>
      )}
    </Container>
  );
};

export default MatchmakingPage;
