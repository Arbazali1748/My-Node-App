import "dotenv/config";
import express from "express";
import Router from "./Routes/index.js";
const app = express();
const Port = process.env.Port || 3000;
app.use(express.json());
app.get('/', (req, resp) => {
    return resp.send("Hi Everyone.");
})

// Route file Setting Here
app.use("/api", Router);

// Server startup for local development
if (process.env.NODE_ENV !== "production") {
    app.listen(Port, () => console.log(`server is running on port ${Port}`));
}

//app.listen(Port, () => console.log(`server is  running on port ${Port}`))
export default app;
