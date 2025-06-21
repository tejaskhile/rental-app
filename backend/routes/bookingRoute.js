import express from "express";
import Booking from "../model/booking.js";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    const newBooking = await Booking.create({
      room: roomId,
      user: req.user.email,
      checkIn,
      checkOut,
    });
    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
});

export default router;
