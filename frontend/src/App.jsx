import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar/navbar";
import ProfileSection from "./components/ProfileSection/profileSection";
import LoginPage from "./components/LoginPage/login";
import RegisterPage from "./components/RegisterPage/register";


export const config = {
  endpoint: `http://localhost:8082`,
};

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<ProfileSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
