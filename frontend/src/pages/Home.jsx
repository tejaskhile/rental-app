import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import bg from "../assets/bg3.jpg";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms`)
      .then((res) => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error while fetching rooms", err);
        setLoading(false);
      });
  }, []);

  const scrollToListings = () => {
    const listingsSection = document.querySelector(".listings-container");
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="main">
        <img src={bg} alt="" />
        <h1 className="headline">Find your perfect stay--faster, easier, smarter!</h1>
        <div className="search-bar">
          <div className="search">
            <input
              type="text"
              placeholder="Search for location..."
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
            <button  onClick={scrollToListings} disabled={searchTerm.trim() === ""} >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="listings-container">
        {loading && <div className="loading">Loading rooms...</div>}
        <h3 className="explore-btn" onClick={scrollToListings}>
          Explore popular places<i className="fa-solid fa-angle-down"></i>
        </h3>
        <div className="listings">
            {filteredRooms.map((room, index) => (
              <Link to={`/room/${room._id}`} key={room._id} className="listing">
                <div className="listing-img">
                  <img src={room.img} alt="" />
                </div>
                <div className="listing-details">
                  <h5>{room.title}</h5>
                  <p>₹{room.price}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
