import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import authRoute from "./routes/authRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/rooms", routes);
app.use("/auth", authRoute);
app.use("/booking", bookingRoute);

app.get("/", (req, res) => {
  res.send(`Hello, World!`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB not connected");
  });
