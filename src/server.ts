import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createUser, signin } from "./handlers/user";

const path = require("path");

// app.use(express.static("static"));
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/user", createUser);
app.post("/signin", signin);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Opps that's on us" });
  }
});

export default app;
