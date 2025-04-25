import express from "express";
import { checkEmail, login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/check-email", checkEmail);

export default router;
