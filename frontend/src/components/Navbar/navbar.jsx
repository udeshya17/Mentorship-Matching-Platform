import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

const Navbar = () => {
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
          {/* Login and Register Buttons */}
          <div className="d-flex justify-content-end">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
