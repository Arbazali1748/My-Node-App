import "dotenv/config";
import express from "express";
import Router from "./Routes/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api", Router);

export default app;