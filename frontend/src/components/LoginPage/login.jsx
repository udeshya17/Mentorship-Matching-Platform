import React, { useState } from "react";
import loginPic from "../../assets/login-cover.jpg";
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";
import { config } from "../../App";
import axios from "axios";

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

  const login = async (formData) => {
    if (validateInput(formData)) {
      try {
        setLoading(true);
        const response = await axios.post(`${config.endpoint}/auth/login`, {
          username: formData.username,
          password: formData.password,
        });

        const { isLoggedIn, username, userId } = response.data;

        if (isLoggedIn) {
          enqueueSnackbar("Login Successful", { variant: "success" });

          // Store user details in localStorage
          localStorage.setItem("userId", userId)
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("username", username);

          // console.log("Stored in localStorage:", {
          //   isLoggedIn: localStorage.getItem("isLoggedIn"),
          //   userId: localStorage.getItem("userId"),
          //   username: localStorage.getItem("username"),
          // });

          setLoading(false);
          setFormData({
            username: "",
            password: "",
          });

          // Redirect to profile page (or dashboard)
          
          navigate("/");
        } else {
          enqueueSnackbar("Invalid login credentials", { variant: "error" });
          setLoading(false);
        }
      } catch (e) {
        const errorMessage =
          e.response?.data?.message || "Something went wrong. Check the backend.";
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
    await login(formData);
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
        <h2 style={{ color: "#333", marginBottom: "1.5rem" }}>Login</h2>
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ color: "#555" }}>
          Not registered?{" "}
          <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
