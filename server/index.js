import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import { firebaseConfig } from "./firebaseConfig.js";

dotenv.config();

import userRouter from "./routes/user.routes.js";
import appsRouter from "./routes/apps.routes.js";
import movieRouter from "./routes/movie.routes.js";
import bookRouter from "./routes/book.routes.js";

const port = 3001;

const app = express();

admin.initializeApp(firebaseConfig);

try {
  mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    dbName: "google-play"
  });
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Hoi!"));

app.use("/users", userRouter);
app.use("/apps", appsRouter);
app.use("/movies", movieRouter);
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
