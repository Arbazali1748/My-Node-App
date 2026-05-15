import express from "express";
import { PostRole, PostUpdate, getRoleById, getRoleList, deleteRole, RoleSoftActive, RoleSoftDelete } from "../Controller/RoleController.js";
import authMiddleware from "../Middleware/Middleware.js";
import adminOnly from "../Middleware/AuthorizationMIddleware.js";

const Router = express.Router();

Router.post('/', PostRole);
Router.put('/RoleSoftActive', RoleSoftActive);
Router.put('/:id', PostUpdate);
Router.delete('/RoleSoftDelete/:id', RoleSoftDelete);
Router.get('/:id', getRoleById);
Router.get('/', getRoleList); // middelware adminOnly
Router.delete('/:id', deleteRole);


export default Router;