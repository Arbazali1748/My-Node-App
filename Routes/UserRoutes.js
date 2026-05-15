import express from "express";
import { usercreated, userUpdate, getUser, getUserList, deleteUser } from "../Controller/UserController.js";

const Router = express.Router();

Router.post('/', usercreated);
Router.put('/:id', userUpdate);
Router.get('/:id', getUser);
Router.get('/', getUserList);
Router.delete('/:id', deleteUser);

export default Router;