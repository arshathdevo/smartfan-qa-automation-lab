import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/api",

  fullyParallel: false,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],

  use: {
    baseURL: "http://localhost:5000",
    extraHTTPHeaders: {
      "Content-Type": "application/json"
    }
  }
});