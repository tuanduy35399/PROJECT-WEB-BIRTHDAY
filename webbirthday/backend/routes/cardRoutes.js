import express from "express";
const router = express.Router();

// ví dụ route
router.get("/", (req, res) => {
  res.send("Card route works!");
});

export default router;
