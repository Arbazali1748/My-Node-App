import express from "express";
import { usercreated, userUpdate,getUser,getUserList,deleteUser } from "../Controller/UserController.js";

const router = express.Router();

router.post('/',usercreated);
router.put('/:id', userUpdate);
router.get('/:id', getUser);
router.get('/', getUserList);
router.delete('/:id', deleteUser);

export default router;