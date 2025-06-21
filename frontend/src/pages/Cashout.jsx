import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Cashout.css";
import { useState } from "react";
import axios from 'axios'

const Cashout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  const checkIn = location.state?.checkIn;
  const checkOut = location.state?.checkOut;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!room) {
    navigate("/room");
    return null;
  }
const handleDummyPayment = async (e) =>{

  e.preventDefault()
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_API_URL}/booking`, 
    {
      roomId: room._id,
      checkIn,
      checkOut,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
  );
    setPaymentSuccess(true);

  } catch (error) {
    alert('Booking Failed');
    console.log(error)
  }
  
}

  const pricePerNight = room.price;
  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;
  const total = pricePerNight * nights;


  return (
    <div className="cashout-container">
      <h1 className="cashout-title">Payment</h1>
      <div className="cashout-content">
        <div className="cashout-room">
          <img src={room.img} alt={room.title} className="cashout-room-img" />
          <div className="cashout-room-details">
            <h2>{room.title}</h2>
            <p className="cashout-location">
              <i className="fa-solid fa-location-dot"></i> {room.location}
            </p>
            <p className="cashout-price">
              Price: <span>₹{room.price}</span> / night
            </p>
            <p>
              <strong>Check-in:</strong> {checkIn}
            </p>
            <p>
              <strong>Check-out:</strong> {checkOut}
            </p>
          </div>
        </div>
        <div className="cashout-payment">
          <h3>Payment Details</h3>
          {paymentSuccess ? (
            <div className="cashout-success">
              <i className="fa-solid fa-circle-check"></i>
              <p>Payment Successful!</p>
            </div>
          ) : (
            <form onSubmit={handleDummyPayment} className="cashout-form">
              <label>
                Card Number
                <input
                  type="number"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                />
              </label>
              <div className="cashout-form-row">
                <label>
                  Expiry
                  <input
                    type="number"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                  />
                </label>
                <label>
                  CVV
                  <input
                    type="password"
                    placeholder="123"
                    required
                    maxLength={3}
                  />
                </label>
              </div>
              <button type="submit" className="pay-btn">
                Pay ₹{total}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cashout;
