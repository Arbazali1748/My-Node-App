import express from "express";
import { Postcreated, PostUpdate, PostSoftActive, PostSoftDelete, getPostById, getPostList, deletePost, getUserPostList } from "../Controller/PostController.js";
import authMiddleware from "../Middleware/Middleware.js";
import adminOnly from "../Middleware/AuthorizationMIddleware.js";

const router = express.Router();

router.post('/',authMiddleware ,Postcreated);
router.put('/PostSoftActive', authMiddleware, PostSoftActive);
router.put('/:id', authMiddleware, PostUpdate);
router.delete('/PostSoftDelete/:id', authMiddleware, PostSoftDelete);
router.get('/getUserPostList', authMiddleware, getUserPostList);
router.get('/:id', authMiddleware, getPostById);
router.get('/',authMiddleware,adminOnly, getPostList);
router.delete('/:id', authMiddleware, deletePost);


export default router;