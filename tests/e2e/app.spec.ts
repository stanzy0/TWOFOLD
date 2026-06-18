import { test, expect } from "@playwright/test";

test("homepage loads and shows Twofold", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toContainText("Twofold");
});

test("login page loads", async ({ page }) => {
  await page.goto("/login");
  await expect(page.locator("body")).toContainText("Welcome to Twofold");
});
