import { test, expect } from "@playwright/test";

test("GET /api/fan returns the correct default state", async ({ request }) => {
  // Reset the fan to a known state
  await request.post("/api/fan/power/off");

  await request.patch("/api/fan/mode", {
    data: { mode: "NORMAL" }
  });

  // Send a GET request
  const response = await request.get("/api/fan");

  // Verify HTTP status
  expect(response.status()).toBe(200);

  // Read the response body
  const body = await response.json();

  // Verify the API response
  expect(body.success).toBe(true);

  expect(body.data).toEqual({
    isOn: false,
    speed: 0,
    mode: "NORMAL"
  });
});