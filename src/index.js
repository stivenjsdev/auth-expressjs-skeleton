import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const server = express();
const PORT = process.env.PORT;
const URL = process.env.URL;
// console.log(process.env.port);

// Middlewares
server.use(express.json());
server.use(cors());

// Routes
server.use("/api/auth", authRoutes);
server.use("/api/profile", profileRoutes);
server.use("/api/welcome", (req, res) =>
  res.status(200).json({ message: "Welcome to the auth api" })
);

const main = async () => {
  try {
    // conectar a MongoDB
    await mongoose.connect(URL);

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en el  puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    // console.log(error.stack);
  }
};

main();
