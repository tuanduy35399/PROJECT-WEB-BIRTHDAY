import express from "express";
import CardController from "../controllers/CardController.js";

const router = express.Router();

router.get("/", CardController.getAll); // lấy tất cả card
router.get("/:id", CardController.getById); // lấy 1 card chi tiết
router.post("/", CardController.create); // tạo card
router.put("/:id", CardController.update); // update card

export default router;
