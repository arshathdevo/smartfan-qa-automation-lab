import type { Request, Response } from "express";

import {
  getFanState,
  turnFanOn,
  turnFanOff,
  setFanSpeed,
  setFanMode
} from "../services/fan.service.js";

import type { FanMode } from "../types/fan.js";

// Get fan state
export const getFan = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: getFanState()
  });
};

// Turn fan ON
export const powerOn = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Fan turned ON",
    data: turnFanOn()
  });
};

// Turn fan OFF
export const powerOff = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Fan turned OFF",
    data: turnFanOff()
  });
};

// Update fan speed
export const updateSpeed = (req: Request, res: Response) => {
  const speed: unknown = req.body?.speed;

  if (typeof speed !== "number") {
    res.status(400).json({
      success: false,
      message: "Speed must be a number"
    });
    return;
  }

  try {
    const data = setFanSpeed(speed);

    res.status(200).json({
      success: true,
      message: "Fan speed updated",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Invalid speed"
    });
  }
};

// Update fan mode
export const updateMode = (req: Request, res: Response) => {
  const mode: unknown = req.body?.mode;
  const validModes: FanMode[] = ["NORMAL", "SLEEP", "BOOST"];

  if (typeof mode !== "string" || !validModes.includes(mode as FanMode)) {
    res.status(400).json({
      success: false,
      message: "Mode must be NORMAL, SLEEP or BOOST"
    });
    return;
  }

  const data = setFanMode(mode as FanMode);

  res.status(200).json({
    success: true,
    message: "Fan mode updated",
    data
  });
};