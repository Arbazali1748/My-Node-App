import { Router } from "express";

import { RegisterUser, Newlogin} from "../Controller/JwtController.js";

const route = Router();

route.post("/RegisterUser", RegisterUser);

route.post("/Newlogin", Newlogin);

export default route;