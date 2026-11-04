
import { defineConfig } from "@playwright/test";


export default defineConfig({
  testDir: "./tests/web",

  fullyParallel: false,

  reporter: [
    ["list"],
    ["html", {
      outputFolder: "playwright-web-report",
      open: "never"
    }]
  ],

  use: {
    baseURL: "http://localhost:5173",
    browserName: "chromium",
    headless: true
  },

  webServer: [
    {
      command: "npm run dev --workspace=@smartfan/api",
      url: "http://localhost:5000/api/health",
      reuseExistingServer: true,
      timeout: 30000
    },
    {
      command: "npm run dev --workspace=@smartfan/web",
      url: "http://localhost:5173",
      reuseExistingServer: true,
      timeout: 30000
    }
  ]
});
