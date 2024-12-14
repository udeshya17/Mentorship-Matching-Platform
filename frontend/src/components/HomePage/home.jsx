import { useEffect, useState } from "react";
import coverPh from "../../assets/cover-ph.webp";
import Navbar from "../Navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Profile/profile";
import UserDiscoveryPage from "../UserDiscoveryPage/UserDiscoveryPage";
import MatchResultPage from "../MatchResultPage/MatchResultPage";
import Notification from "../Notifications/Notifications"


const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleCompleteProfile = () => {
    // Navigate to the profile setup page if logged in
    if (isLoggedIn) {
      navigate("/profile-setup");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex flex-column flex-lg-row align-items-center"
        style={{
          backgroundColor: "#a3c4b4",
          minHeight: "100vh",
          padding: "0",
          margin: "0",
          paddingTop: "80px",
        }}
      >
        {/* Left Content */}
        <div
          className="text-center text-lg-start p-3"
          style={{
            flex: 1,
            order: 1, // Text comes first on larger screens
          }}
        >
          <h1
            style={{
              color: "#003d33",
              fontSize: "3rem",
              marginBottom: "0.5rem",
            }}
          >
            Welcome to
          </h1>
          <h2
            style={{
              color: "#004d40",
              fontSize: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            Mentorship Matching Platform
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#004d40",
              maxWidth: "500px",
              lineHeight: "1.6",
            }}
          >
            Where users can create an account, set up a profile as a mentor or
            mentee, specify their skills or areas of interest, and find matches
            with others for mentorship opportunities.
          </p>
          <div className="mt-4">
            {/* Conditionally render button */}
            {!isLoggedIn ? (
              <Link to="/register">
                <button type="button" className="btn btn-outline-success btn-lg">
                  Register Yourself
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-outline-success btn-lg"
                onClick={handleCompleteProfile}
              >
                Complete Your Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div
          className="text-center p-3"
          style={{
            flex: 1,
            order: 2, // Image is on the right for larger screens
          }}
        >
          <img
            src={coverPh}
            alt="Profile Image"
            style={{
              width: "90%",
              maxWidth: "700px",
              height: "auto",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>

      {/* Conditionally render Profile and UserDiscoveryPage */}
      {isLoggedIn && (
        <>
          <Profile />
          <UserDiscoveryPage />
          <MatchResultPage />
          <Notification />
        </>
      )}
    </>
  );
};

export default HomePage;
