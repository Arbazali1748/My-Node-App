import express from "express";
import { Postcreated, PostUpdate, PostSoftActive, PostSoftDelete, getPostById, getPostList, deletePost, getUserPostList } from "../Controller/PostController.js";
import authMiddleware from "../Middleware/Middleware.js";
import adminOnly from "../Middleware/AuthorizationMIddleware.js";

const Router = express.Router();

Router.post('/', authMiddleware, Postcreated);
Router.put('/PostSoftActive', authMiddleware, PostSoftActive);
Router.put('/:id', authMiddleware, PostUpdate);
Router.delete('/PostSoftDelete/:id', authMiddleware, PostSoftDelete);
Router.get('/getUserPostList', authMiddleware, getUserPostList);
Router.get('/:id', authMiddleware, getPostById);
Router.get('/', authMiddleware, adminOnly, getPostList);
Router.delete('/:id', authMiddleware, deletePost);


export default Router;