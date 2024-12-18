import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/home";
import LoginPage from "./components/LoginPage/login";
import RegisterPage from "./components/RegisterPage/register";


export const config = {
  endpoint: `https://mentorship-matching-platform-wrri.onrender.com`,
};

function App() {

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
