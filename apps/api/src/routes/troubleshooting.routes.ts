import { Router } from "express";
import { troubleshootFan } from "../controllers/troubleshooting.controller.js";

const router = Router();

router.post("/", troubleshootFan);

export default router;