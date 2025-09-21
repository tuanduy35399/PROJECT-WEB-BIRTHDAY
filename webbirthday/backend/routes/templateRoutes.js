import express from "express";
import TemplateController from "../controllers/TemplateController.js";

const router = express.Router();

router.post("/", TemplateController.create);
router.get("/", TemplateController.getAll);
router.get("/:id", TemplateController.getById);
router.put("/:id", TemplateController.update);

export default router;
