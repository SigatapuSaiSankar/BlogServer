import express from 'express';
import { login, registerUser } from '../controller/auth.controller.js';

const router = express.Router();

router.post("/registeruser",registerUser);
router.post("/login",login);

export default router;