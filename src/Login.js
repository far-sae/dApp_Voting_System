import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Switch between login and signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post("http://localhost:5000/api/login", {
          username,
          password,
        });
      } else {
        // Signup request
        response = await axios.post("http://localhost:5000/api/signup", {
          username,
          password,
          email,
        });
      }
      setUser(response.data.user);
    } catch (error) {
      console.error("Login/Signup error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="container mt-4">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary me-2">
          {isLogin ? "Login" : "Signup"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setIsLogin(!isLogin)}
        >
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
