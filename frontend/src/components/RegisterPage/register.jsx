import React, { useState } from "react";
import loginPic from "../../assets/login-cover.jpg";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { config } from "../../App";
import axios from "axios";

const RegisterPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async (formData) => {
    if (validateInput(formData)) {
      try {
        setLoading(true);
        await axios.post(`${config.endpoint}/auth/register`, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        enqueueSnackbar("Registered Successfully", { variant: "success" });
        setLoading(false);

        setFormData({
          username: "",
          email: "",
          password: "",
        });
        console.log(formData);
        navigate("/login");
      } catch (e) {
        const errorMessage =
          e.response?.data?.message ||
          "Something went wrong. Check the backend.";
        enqueueSnackbar(errorMessage, { variant: "error" });
        setLoading(false);
      }
    }
  };

  const validateInput = (data) => {
    if (!data.username) {
      enqueueSnackbar("Username is a required field", { variant: "warning" });
      return false;
    } else if (data.username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", { variant: "warning" });
      return false;
    } else if (!data.email) {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      enqueueSnackbar("Enter a valid email address", { variant: "warning" });
      return false;
    } else if (!data.password) {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    } else if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div
      className="container-fluid d-flex flex-wrap align-items-center"
      style={{ minHeight: "100vh", padding: "0", margin: "0", position: "relative" }}
    >
      {/* Back to Home Button */}
      <Link
        to="/"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "#007bff",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        &larr; Back to Home
      </Link>

      <div
        style={{
          flex: 1,
          backgroundImage: `url(${loginPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      ></div>

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          flex: 1,
          backgroundColor: "#f4f4f4",
          padding: "2rem",
        }}
      >
        <h2 style={{ color: "#333", marginBottom: "1.5rem" }}>Register</h2>
        <form
          style={{ width: "100%", maxWidth: "400px" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 mb-3"
            style={{ backgroundColor: "#007bff" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ color: "#555" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
