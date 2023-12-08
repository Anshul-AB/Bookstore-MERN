import express from "express";
const app = express();
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

//middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use('/books', booksRoutes);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to our MERN book store");
});


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
