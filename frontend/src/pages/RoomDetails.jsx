import React, { useState, useEffect } from "react";
import "../styles/RoomDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch((err) => console.error("Error while fetching room", err));
  }, []);

  if (!room) return <div>Loading room...</div>;

  return (
    <div className="details-container">
      <div className="nav">
        <Link to="/">
          <h4>
            <i className="fa-solid fa-angle-left"></i>Back
          </h4>
        </Link>
        <h2 className="logo">StayFinder.</h2>
      </div>
      <hr />
      <div className="room-details">
        <h3>{room.title}</h3>
        <div className="main-content">
          <div className="image-container">
            <div className="left">
              <img src={room.img} alt="" />
            </div>
            <div className="right">
              <img className="top" src={room.img2} alt="" />
              <img className="bottom" src={room.img3} alt="" />
            </div>
          </div>
          <div className="booking-card">
            <h2>Rs {room.price} per night</h2>
            <label htmlFor="date">From:</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
            <label htmlFor="date">To:</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
            <Link
              to={`/room/${room._id}/cashout`}
              state={{ room, checkIn, checkOut }}
              onClick={e => {
                if (!checkIn || !checkOut) {
                  e.preventDefault();
                  alert("Please select both check-in and check-out dates.");
                }
              }}
            >
              <button className="book-now-btn" disabled={!checkIn || !checkOut}>
                Book Now
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h4>Room in {room.location}</h4>
          <p>3 rooms, kitchen and a pool.</p>
        </div>
        <hr />
        <div className="info-container">
          <p>{room.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
