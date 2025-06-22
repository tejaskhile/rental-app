import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Cashout.css";
import { useState } from "react";
import axios from "axios";

const Cashout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  const checkIn = location.state?.checkIn;
  const checkOut = location.state?.checkOut;
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!room) {
    navigate("/room");
    return null;
  }

  const handleDummyPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/booking`,
        {
          roomId: room._id,
          checkIn,
          checkOut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaymentSuccess(true);
    } catch (error) {
      alert("Booking Failed");
      console.log(error);
    }
    setLoading(false);
  };

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
    <div className="cashout-bg">
      <div className="cashout-main">
        <div className="cashout-summary">
          <img src={room.img} alt={room.title} className="cashout-room-img" />
          <div className="cashout-room-info">
            <h2>{room.title}</h2>
            <p className="cashout-location">
              <i className="fa-solid fa-location-dot"></i> {room.location}
            </p>
            <div className="cashout-dates">
              <span>
                <strong>Check-in:</strong> {checkIn}
              </span>
              <span>
                <strong>Check-out:</strong> {checkOut}
              </span>
            </div>
            <div className="cashout-price-details">
              <span>
                ₹{room.price} x {nights} night{nights > 1 ? "s" : ""}
              </span>
              <span className="cashout-total">Total: ₹{total}</span>
            </div>
          </div>
        </div>
        <div className="cashout-payment">
          <h3>Confirm and Pay</h3>
          {paymentSuccess ? (
            <div className="cashout-success">
              <i className="fa-solid fa-circle-check"></i>
              <p>Payment Successful!</p>
              <button
                className="cashout-home-btn"
                onClick={() => navigate("/")}
              >
                Go to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleDummyPayment} className="cashout-form">
              <label>
                Card Number
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  maxLength={19}
                  pattern="\d{4} \d{4} \d{4} \d{4}"
                  autoComplete="cc-number"
                />
              </label>
              <div className="cashout-form-row">
                <label>
                  Expiry
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    pattern="\d{2}/\d{2}"
                    autoComplete="cc-exp"
                  />
                </label>
                <label>
                  CVV
                  <input
                    type="password"
                    placeholder="123"
                    required
                    maxLength={3}
                    pattern="\d{3}"
                    autoComplete="cc-csc"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="pay-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ₹${total}`}
              </button>
            </form>
          )}
          <div className="cashout-secure">
            <i className="fa-solid fa-lock"></i> Your payment is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cashout;