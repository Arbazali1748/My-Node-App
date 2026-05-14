import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import Router from "./Routes/index.js";

const app = express();
const PORT = process.env.Port || process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api", Router);

if (process.argv[1] === __filename) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;