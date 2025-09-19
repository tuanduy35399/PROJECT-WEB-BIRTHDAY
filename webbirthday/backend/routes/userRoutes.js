import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/user", UserController.getUser);

export default router;
