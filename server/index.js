import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";  
import cors from "cors";  
import * as dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.route.js";

const port = process.env.PORT || 3000;

const app = express();

try {
  mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
  });
  console.log("Connected to db");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => res.send("Hoi!"));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
