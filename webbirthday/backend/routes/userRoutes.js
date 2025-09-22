import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.update);

export default router;
