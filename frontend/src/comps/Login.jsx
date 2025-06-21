import React, { useContext, useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.js";
import axios from "axios";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setShowLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault(e);
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
      setShowLogin(false);
    } catch (err) {
      console.error(err);
    }
  };


  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        email: regEmail,
        password: regPassword,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setActiveTab("login")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        <i className="fa-solid fa-xmark" onClick={() => setShowLogin(false)}></i>
      </div>
      <div className="form">
        {activeTab === "login" ? (
          <form className="login-form" onSubmit={loginHandler}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <span>
              Don't have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </span>
          </form>
        ) : (
          <form className="login-form" onSubmit={registerHandler}>
            <input
              type="email"
              id="regEmail"
              name="regEmail"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
            />
            <input
              type="password"
              id="regPassword"
              name="regPassword"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Sign Up
            </button>
            <span>
              Already have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
