import { Router } from "express";

import { RegisterUser, Newlogin } from "../Controller/JwtController.js";

const Route = Router();

Route.post("/RegisterUser", RegisterUser);

Route.post("/Newlogin", Newlogin);

export default Route;