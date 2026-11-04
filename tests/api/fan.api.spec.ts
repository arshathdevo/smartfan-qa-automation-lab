
import { test, expect } from "@playwright/test";

// Reset fan state before every test
test.beforeEach(async ({ request }) => {
  await request.post("/api/fan/power/off");

  await request.patch("/api/fan/mode", {
    data: { mode: "NORMAL" }
  });
});

// Test 1: Verify default fan state
test("GET /api/fan returns the correct default state", async ({ request }) => {
  const response = await request.get("/api/fan");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);

  expect(body.data).toEqual({
    isOn: false,
    speed: 0,
    mode: "NORMAL"
  });
});

// Test 2: Turn fan ON
test("POST /api/fan/power/on turns the fan ON", async ({ request }) => {
  const response = await request.post("/api/fan/power/on");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.isOn).toBe(true);
  expect(body.data.speed).toBe(1);
});

// Test 3: Turn fan OFF
test("POST /api/fan/power/off turns the fan OFF", async ({ request }) => {
  // First turn the fan ON
  await request.post("/api/fan/power/on");

  // Now turn the fan OFF
  const response = await request.post("/api/fan/power/off");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.isOn).toBe(false);
  expect(body.data.speed).toBe(0);
});


// Test 4: Change fan speed
test("PATCH /api/fan/speed updates the fan speed", async ({ request }) => {
  // Turn the fan ON first
  await request.post("/api/fan/power/on");

  // Change speed to level 4
  const response = await request.patch("/api/fan/speed", {
    data: { speed: 4 }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.speed).toBe(4);
  expect(body.data.isOn).toBe(true);
});

// Test 5: Reject invalid fan speed
test("PATCH /api/fan/speed rejects speed greater than 6", async ({ request }) => {
  await request.post("/api/fan/power/on");

  const response = await request.patch("/api/fan/speed", {
    data: { speed: 7 }
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe("Fan speed must be between 1 and 6");
});


// Test 6: Reject speed change when fan is OFF
test("PATCH /api/fan/speed rejects changes when fan is OFF", async ({ request }) => {
  const response = await request.patch("/api/fan/speed", {
    data: { speed: 3 }
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe("Cannot change speed when fan is OFF");
});


// Test 7: Change fan mode
test("PATCH /api/fan/mode updates the fan mode", async ({ request }) => {
  const response = await request.patch("/api/fan/mode", {
    data: { mode: "SLEEP" }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.mode).toBe("SLEEP");
});


// Test 8: Reject invalid fan mode
test("PATCH /api/fan/mode rejects invalid modes", async ({ request }) => {
  const response = await request.patch("/api/fan/mode", {
    data: { mode: "TURBO" }
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe("Mode must be NORMAL, SLEEP or BOOST");
});
