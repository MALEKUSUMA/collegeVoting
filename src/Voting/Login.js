import { useNavigate } from "react-router-dom";
import "./Login.css";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [p, setP] = useState("");
  const [u, setU] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  const navigate = useNavigate();

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/api/admin/login", { username: u, password: p })
      .then(() => {
        navigate("/results");
      })
      .catch((error) => {
        console.log("Invalid details");
        setError(
          error.response && error.response.status === 401
            ? "Invalid credentials"
            : "An error occurred"
        );
      });
  };

  const handleNavigateToResults = () => {
    navigate("/results");
  };

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("user", username);
    axios
      .post("http://localhost:8081/api/student/login", {
        registerNumber: username,
        password: password,
      })
      .then(() => {
        navigate("/user", { state: { username } });
      })
      .catch((error) => {
        console.log("Invalid details");
        setError1(
          error.response && error.response.status === 401
            ? "Invalid credentials"
            : "An error occurred"
        );
      });
  };

  return (
    <div>
      <button className="hi" onClick={handleNavigateToResults}>
        Live Results
      </button>
      <div id="container">
        <div className="login-box">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminSubmit}>
            <label htmlFor="admin-username">Employee Id:</label>
            <input
              type="text"
              id="admin-username"
              required
              onChange={(e) => setU(e.target.value)}
            />
            <label htmlFor="admin-password">Password:</label>
            <input
              type="password"
              id="admin-password"
              required
              onChange={(e) => setP(e.target.value)}
            />
            <input type="submit" value="Login" />
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>

        <div className="login-box">
          <h2>Student Login</h2>
          <form onSubmit={handleStudentSubmit}>
            <label htmlFor="student-username">Register Number:</label>
            <input
              type="text"
              id="student-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="student-password">Password:</label>
            <input
              type="password"
              id="student-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value="Login" />
          </form>
          {error1 && <div className="error-message">{error1}</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
