import coverPh from "../../assets/cover-ph.webp";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";

const ProfileSection = () => {
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
            Mentor Matching Platform
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
            {/* Link wraps the button */}
            <Link to="/register">
              <button type="button" className="btn btn-outline-success btn-lg">
                Register Yourself
              </button>
            </Link>
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
    </>
  );
};

export default ProfileSection;
