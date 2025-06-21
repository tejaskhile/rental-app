import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  
  const { user, setUser, setShowLogin } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h2>StayFinder.</h2>
      </Link>

      <div className="nav-btn">
        {user ? (
          <div className="user-icon-wrapper">
            <i className="fa-solid fa-user" onClick={()=>setUserInfo(!userInfo)} ></i>
            {userInfo && <div className="user-info">
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login/SignUp</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
