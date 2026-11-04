import { test, expect } from "@playwright/test";
test.beforeEach(async ({ request }) => {
  // Reset fan power before every test
  await request.post("http://localhost:5000/api/fan/power/off");

  // Reset operating mode
  await request.patch("http://localhost:5000/api/fan/mode", {
    data: { mode: "NORMAL" }
  });
});

test("SmartFan dashboard loads successfully", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Fan Dashboard" })
  ).toBeVisible();

  await expect(
    page.getByRole("heading", { name: "Living Room Fan" })
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Turn ON" })
  ).toBeVisible();
});

test("Fan can be turned ON and OFF", async ({ page }) => {
  await page.goto("/");

  // Turn fan ON
  await page.getByRole("button", { name: "Turn ON" }).click();

  await expect(
    page.getByText("Your fan is running")
  ).toBeVisible();

  // Turn fan OFF
  await page.getByRole("button", { name: "Turn OFF" }).click();

  await expect(
    page.getByText("Your fan is currently switched off")
  ).toBeVisible();
});
test("Fan speed can be changed from 1 to 6", async ({ page }) => {
  await page.goto("/");

  // Turn fan ON
  await page.getByRole("button", { name: "Turn ON" }).click();

  // Select speed 4
  await page.getByRole("button", { name: "4", exact: true }).click();

  // Verify speed changed
  await expect(page.locator(".speed-display strong")).toHaveText("4");

  // Select speed 6
  await page.getByRole("button", { name: "6", exact: true }).click();

  // Verify speed changed
  await expect(page.locator(".speed-display strong")).toHaveText("6");
});

test("Fan operating modes can be changed", async ({ page }) => {
  await page.goto("/");

  // Select SLEEP mode
  await page.getByRole("button", { name: "SLEEP" }).click();

  await expect(
    page.locator(".metric-card").filter({ hasText: "CURRENT MODE" })
  ).toContainText("SLEEP");

  // Select BOOST mode
  await page.getByRole("button", { name: "BOOST" }).click();

  await expect(
    page.locator(".metric-card").filter({ hasText: "CURRENT MODE" })
  ).toContainText("BOOST");
});

test("Speed controls are disabled when fan is OFF", async ({ page }) => {
  await page.goto("/");

  for (const speed of [1, 2, 3, 4, 5, 6]) {
    await expect(
      page.getByRole("button", { name: String(speed), exact: true })
    ).toBeDisabled();
  }
});
test("Troubleshooting assistant identifies known problems", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Describe your fan problem...").fill(
    "My fan is not turning on"
  );

  await page.getByRole("button", { name: "Send" }).click();

  await expect(
    page.getByText(
      "Check whether the fan has power. If the problem continues, contact technical support."
    )
  ).toBeVisible();
});

test("Troubleshooting assistant handles unknown problems safely", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Describe your fan problem...").fill(
    "My fan is flying by itself"
  );

  await page.getByRole("button", { name: "Send" }).click();

  await expect(
    page.getByText(
      "I'm unable to identify this issue from my troubleshooting knowledge base. Please contact technical support."
    )
  ).toBeVisible();
});