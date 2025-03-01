import { Router } from "express";

const router = Router();

router.postt("/", (req, res) => {
    res.send("Auth");
});

export default router;