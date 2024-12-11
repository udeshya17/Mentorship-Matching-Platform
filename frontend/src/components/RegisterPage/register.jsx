import React from "react";
import loginPic from "../../assets/login-cover.jpg";

const RegisterPage = () => {
  return (
    <div
      className="container-fluid d-flex flex-wrap align-items-center"
      style={{ minHeight: "100vh", padding: "0", margin: "0" }}
    >
      {/* Left Side: Image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${loginPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      ></div>

      {/* Right Side: Login Form */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          flex: 1,
          backgroundColor: "#f4f4f4",
          padding: "2rem",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "1.5rem" }}>Login</h2>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>
        
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            style={{ backgroundColor: "#007bff" }}
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p style={{ color: "#555" }}>
          Already registered?
          <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login now
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
