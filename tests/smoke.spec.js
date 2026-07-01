import { expect, test } from "@playwright/test";

const waitForExperience = async (page) => {
  await page.goto("/");
  await page.waitForFunction(() => !document.querySelector(".preloader"), {
    timeout: 15_000,
  });
  await expect(page.getByTestId("app-shell")).toBeVisible();
};

test.describe("homepage smoke", () => {
  let browserErrors;

  test.beforeEach(async ({ page }) => {
    browserErrors = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        browserErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      browserErrors.push(error.message);
    });
  });

  test.afterEach(() => {
    expect(browserErrors ?? []).toEqual([]);
  });

  test("homepage loads and hero section renders", async ({ page }) => {
    await waitForExperience(page);

    await expect(page).toHaveTitle(/Monster Energy Redesign Concept/i);
    await expect(page.getByTestId("site-nav")).toBeVisible();
    await expect(page.getByTestId("hero-section")).toBeVisible();
  });

  test("mobile navigation opens", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForExperience(page);

    await page.getByTestId("mobile-menu-toggle").click();

    await expect(page.getByTestId("mobile-navigation")).toBeVisible();
    await expect(page.getByText("ENERGY DRINKS").last()).toBeVisible();
  });

  test("testimonials modal opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await waitForExperience(page);

    await page.getByTestId("testimonials-section").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Open 3ameed's Monster review/i }).click();

    await expect(page.getByTestId("testimonial-modal")).toBeVisible();

    await page.getByTestId("testimonial-modal-close").click();
    await expect(page.getByTestId("testimonial-modal")).toBeHidden();
  });

  test("scroll reaches footer", async ({ page }) => {
    await waitForExperience(page);

    await page.getByTestId("site-footer").scrollIntoViewIfNeeded();

    await expect(page.getByTestId("site-footer")).toBeVisible();
  });
});
