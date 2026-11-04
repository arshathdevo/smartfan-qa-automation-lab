import type { Request, Response } from "express";
import { getTroubleshootingResponse } from "../services/troubleshooting.service.js";

export const troubleshootFan = (req: Request, res: Response) => {
  const message: unknown = req.body?.message;

  if (typeof message !== "string" || message.trim().length === 0) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid troubleshooting message."
    });
    return;
  }

  const result = getTroubleshootingResponse(message);

  res.status(200).json(result);
};