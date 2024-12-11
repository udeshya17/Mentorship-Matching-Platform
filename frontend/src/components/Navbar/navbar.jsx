import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import { useState, useEffect } from "react";
import userImage from "../../assets/user.webp"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");

    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "User");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    // Reset state
    setIsLoggedIn(false);
    setUsername("");

    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active me-3" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-3" to="/profile-setup">
                Profile Setup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-3" to="/user-discovery">
                User Discovery
              </Link>
            </li>
          </ul>
          {/* Login/Logout and Register Buttons */}
          <div className="d-flex justify-content-end">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    style={{ minWidth: "100px" }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ minWidth: "100px" }}
                  >
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <img
                  src={userImage}
                  alt="User"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                />
                <span>{username}</span>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
