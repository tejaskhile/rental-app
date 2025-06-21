import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    description: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
