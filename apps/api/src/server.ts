import express from "express";
import cors from "cors";

import fanRoutes from "./routes/fan.routes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartFan API is running!",
    timestamp: new Date().toISOString()
  });
});

// Fan API routes
app.use("/api/fan", fanRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`SmartFan API running at http://localhost:${PORT}`);
});