import { Router } from "express";

const router = Router();

router.get("/user", (req, res) => {
  res.send({ api: "User" });
});

router.get("/posts", (req, res) => {
  res.send({ api: "Posts" });
});

export default router;
