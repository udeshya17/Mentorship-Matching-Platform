import Logo from "../../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ width: "50px", height: "50px" }}
          />
        </a>
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
              <a className="nav-link active me-3" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#">
                Profile Setup
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="#">
                User Discovery
              </a>
            </li>
          </ul>
          {/* Login and Register Buttons */}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              style={{ minWidth: "100px" }}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              style={{ minWidth: "100px" }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
