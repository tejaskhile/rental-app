import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserAuth = ({ children }) => {
  const { user, setUser, setShowLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.BACKEND_API}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        setLoading(false);
        navigate("/");
      }
    };

    verifyUser();
  }, [token, navigate, setUser]);


  useEffect(() => {
    if ((!user || !token)) {
      navigate("/");
      setShowLogin(true);
    }
  }, [user, token, navigate, setShowLogin]);

  if (loading) return <div>Loading...</div>;


  return <>{children}</>;
};

export default UserAuth;
