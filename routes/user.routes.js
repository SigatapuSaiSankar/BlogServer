import express from "express";
import { deleteUser, editUserInfo, getAllUsers, getUserById } from "../controller/user.controller.js";

const router = express.Router();

router.put("/edituserinfo/:id",editUserInfo);
router.delete("/deleteuser/:id",deleteUser);
router.get("/getallusers",getAllUsers);
router.get("/getuserbyId/:id",getUserById);

export default router;