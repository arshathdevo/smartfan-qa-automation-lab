import { test, expect } from "@playwright/test";

test("Identifies a known fan problem", async ({ request }) => {
  const response = await request.post("/api/troubleshooting", {
    data: {
      message: "My fan is not turning on"
    }
  });

  expect(response.status()).toBe(200);

  const result = await response.json();

  expect(result.success).toBe(true);
  expect(result.matched).toBe(true);
  expect(result.issue).toBe("Fan is not turning ON");
});

test("Handles unknown problems safely", async ({ request }) => {
  const response = await request.post("/api/troubleshooting", {
    data: {
      message: "My fan is flying by itself"
    }
  });

  expect(response.status()).toBe(200);

  const result = await response.json();

  expect(result.success).toBe(true);
  expect(result.matched).toBe(false);
  expect(result.response).toContain("contact technical support");
});

test("Rejects empty troubleshooting messages", async ({ request }) => {
  const response = await request.post("/api/troubleshooting", {
    data: {
      message: ""
    }
  });

  expect(response.status()).toBe(400);
});