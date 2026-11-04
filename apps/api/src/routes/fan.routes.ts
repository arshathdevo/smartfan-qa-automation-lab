import { Router } from "express";

import {
  getFan,
  powerOn,
  powerOff,
  updateSpeed,
  updateMode
} from "../controllers/fan.controller.js";

const router = Router();

// Fan state
router.get("/", getFan);

// Power controls
router.post("/power/on", powerOn);
router.post("/power/off", powerOff);

// Speed and mode controls
router.patch("/speed", updateSpeed);
router.patch("/mode", updateMode);

export default router;