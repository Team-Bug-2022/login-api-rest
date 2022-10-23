import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from 'http';
import AuthRouter from "./api/routers/auth.router.js";

dotenv.config();

// Connect to db
await mongoose.connect(process.env.MONGODB_URL);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

// Express
const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

const server = createServer(app); 

// Routes
app.get("/", (req, res) => {
  res.send("LOGIN BBVA API");
});

app.use("/", AuthRouter);

// Launch server
server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Se inició el servidor");
});