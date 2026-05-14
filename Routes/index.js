import { Router } from "express";
import userroute from "./UserRoutes.js";
import Postroute from "./PostRoutes.js";
import AuthenticationRoutes from "./AuthenticationRoutes.js";
const routed = Router();
routed.use("/user", userroute);
routed.use("/post", Postroute);
routed.use("/Authentication", AuthenticationRoutes);
export default routed;