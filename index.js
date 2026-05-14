import "dotenv/config";
import express from "express";
import Router from "./Routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", Router);

export default app;