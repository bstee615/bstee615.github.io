import {
  devices,
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const distDirectory = path.resolve("dist");
const baselineRoutes = [
  "/",
  "/404.html",
  "/cv/",
  "/posts/2022/03/no-pain-no-gain/",
  "/posts/2022/05/gematria/",
  "/posts/2022/06/meditations-1-thru-4/",
  "/posts/2023/12/docker-compose/",
  "/posts/2023/12/shared-task-spooler/",
  "/posts/2024/01/shared-hf-cache/",
  "/posts/2024/03/twitter-limiter/",
  "/posts/2026/03/claude-terminal-profile/",
  "/posts/2026/03/tailscale-wsl2-ssh/",
  "/publication/2021-06-01-helium/",
  "/publication/2021-12-19-msthesis/",
  "/publication/2022-04-01-poster/",
  "/publication/2022-04-26-coms515/",
  "/publication/2023-05-04-cascading-warnings/",
  "/publication/2023-05-14-empirical/",
  "/publication/2024-04-14-deepdfa/",
  "/publication/2024-04-14-traced/",
  "/publication/2024-12-19-phddissertation/",
  "/publication/codesense/",
  "/publication/deepvulguard/",
  "/publication/llmvuln/",
  "/publication/model-analysis/",
  "/publication/rlsqm/",
  "/publication/swebench-mutation/",
  "/publications/",
  "/stream/beware-any-vs-len/",
  "/stream/beware-metric-auto-reduce-with-pytorch-lightning-torchmetrics/",
  "/stream/embeddings/",
  "/stream/encoder-decoder-models/",
  "/stream/friendship-ended-with-earlyoom/",
  "/stream/get-filepath-of-bash-activation-script/",
  "/stream/print-keys-with-jq/",
  "/stream/print-pandas-series-as-percent/",
  "/stream/siamese-network-and-triplet-loss/",
  "/stream/use-hard-links-to-replicate-log-files-in-a-generated-directory/",
  "/stream/use-head-n-0-to-get-all-items-in-list/",
  "/stream/webcam-mods-for-linux-background-blur-swap/",
  "/writing/",
  "/writing/beware-any-vs-len/",
  "/writing/beware-metric-auto-reduce-with-pytorch-lightning-torchmetrics/",
  "/writing/claude-terminal-profile/",
  "/writing/docker-compose/",
  "/writing/embeddings/",
  "/writing/encoder-decoder-models/",
  "/writing/fork-sync-workflow/",
  "/writing/friendship-ended-with-earlyoom/",
  "/writing/gematria/",
  "/writing/get-filepath-of-bash-activation-script/",
  "/writing/meditations-1-thru-4/",
  "/writing/no-pain-no-gain/",
  "/writing/print-keys-with-jq/",
  "/writing/print-pandas-series-as-percent/",
  "/writing/shared-huggingface-cache/",
  "/writing/shared-task-spooler/",
  "/writing/siamese-network-and-triplet-loss/",
  "/writing/tailscale-wsl2-ssh/",
  "/writing/twitter-limiter/",
  "/writing/use-hard-links-to-replicate-log-files-in-a-generated-directory/",
  "/writing/use-head-n-0-to-get-all-items-in-list/",
  "/writing/webcam-mods-for-linux-background-blur-swap/",
] as const;

const listHtmlFiles = async (directory = distDirectory): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? listHtmlFiles(entryPath)
        : Promise.resolve(entryPath.endsWith(".html") ? [entryPath] : []);
    }),
  );
  return files.flat();
};

const routeForHtml = (filePath: string) => {
  const relativePath = path
    .relative(distDirectory, filePath)
    .replaceAll("\\", "/");
  if (relativePath === "index.html") return "/";
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }
  return `/${relativePath}`;
};

const expectSuccessful = async (request: APIRequestContext, target: string) => {
  const response = await request.get(target);
  expect(response.status(), `${target} should resolve`).toBeLessThan(400);
};

const expectNoPageOverflow = async (page: Page) => {
  const overflow = await page.evaluate(() => ({
    body: document.body.scrollWidth - window.innerWidth,
    document: document.documentElement.scrollWidth - window.innerWidth,
  }));
  expect(overflow.body).toBeLessThanOrEqual(1);
  expect(overflow.document).toBeLessThanOrEqual(1);
};

const openDetailAndReturn = async (
  page: Page,
  archive: string,
  linkSelector: string,
  backLabel: string,
) => {
  await page.goto(archive);
  const link = page.locator(linkSelector).nth(7);
  await link.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -120));
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(0);

  const href = await link.getAttribute("href");
  await link.click();
  await expect(page).toHaveURL(new RegExp(`${href?.replaceAll("/", "\\/")}$`));

  const back = page.getByRole("link", { name: `Back to ${backLabel}` });
  await expect(back).toBeVisible();
  await back.click();
  await expect(page).toHaveURL(
    new RegExp(`${archive.replaceAll("/", "\\/")}$`),
  );
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY);
};

test("generated routes and local references remain intact", async ({
  baseURL,
  request,
}) => {
  const files = await listHtmlFiles();
  const routes = files.map(routeForHtml).sort();
  expect(routes.length).toBeGreaterThanOrEqual(baselineRoutes.length);
  for (const baselineRoute of baselineRoutes) {
    expect(routes, `${baselineRoute} should remain generated`).toContain(
      baselineRoute,
    );
  }
  for (const route of routes) await expectSuccessful(request, route);

  const references = new Set<string>();
  for (const file of files) {
    const html = await readFile(file, "utf8");
    const route = routeForHtml(file);
    const values = [
      ...[...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(
        (match) => match[1],
      ),
      ...[...html.matchAll(/\bsrcset=["']([^"']+)["']/g)].flatMap((match) =>
        match[1]
          .split(",")
          .map((candidate) => candidate.trim().split(/\s+/)[0]),
      ),
    ];
    for (const value of values) {
      if (/^(?:data|mailto|tel|javascript):/.test(value)) continue;
      const target = new URL(value, new URL(route, baseURL));
      if (target.origin === baseURL)
        references.add(`${target.pathname}${target.search}`);
    }
  }

  for (const reference of [...references].sort()) {
    await expectSuccessful(request, reference);
  }

  for (const asset of [
    "/images/email.svg",
    "/images/github.svg",
    "/images/globe.svg",
    "/images/linkedin.svg",
    "/images/profile-330.webp",
    "/images/profile.webp",
    "/images/scholar.svg",
    "/files/2022-04-01-poster.pdf",
    "/files/2022-04-26-coms515-opensource.pdf",
    "/files/2024-12-19-dissertation.pdf",
  ]) {
    await expectSuccessful(request, asset);
  }
  await expect(
    readFile(path.join(distDirectory, "CNAME"), "utf8").then((value) =>
      value.trim(),
    ),
  ).resolves.toBe("benjijang.com");
});

test("optimized images decode on every image-bearing page", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/publication/2022-04-01-poster/",
    "/publication/2022-04-26-coms515/",
    "/writing/claude-terminal-profile/",
    "/writing/encoder-decoder-models/",
    "/writing/friendship-ended-with-earlyoom/",
    "/writing/gematria/",
    "/writing/meditations-1-thru-4/",
    "/writing/no-pain-no-gain/",
    "/writing/shared-huggingface-cache/",
    "/writing/shared-task-spooler/",
    "/writing/twitter-limiter/",
    "/writing/webcam-mods-for-linux-background-blur-swap/",
  ]) {
    await page.goto(route);
    const images = page.locator("img");
    const count = await images.count();
    expect(count, `${route} should contain an image`).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element) => {
            const htmlImage = element as HTMLImageElement;
            return htmlImage.complete && htmlImage.naturalWidth > 0;
          }),
        )
        .toBe(true);
    }
  }
});

test("homepage navigation and saved theme preference work", async ({
  context,
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  const primaryLinks = page.getByRole("navigation", {
    name: "Primary navigation",
  });
  for (const { name, id } of [
    { name: "About", id: "about" },
    { name: "Posts", id: "posts" },
    { name: "Publications", id: "publications" },
  ]) {
    const link = primaryLinks.getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", `/#${id}`);
    await link.click();
    await expect(page).toHaveURL(new RegExp(`\\/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await expect(primaryLinks.getByRole("link", { name: "CV" })).toHaveAttribute(
    "href",
    "/cv/",
  );
  await expect(
    primaryLinks.getByRole("link", { name: "Blog" }),
  ).toHaveAttribute("href", "/writing/");

  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "pastel-dark",
  );
  const toggle = page.getByRole("button", { name: "Switch to light mode" });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "pastel-light",
  );
  await expect(context.cookies()).resolves.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "site-theme", value: "pastel-light" }),
    ]),
  );

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-theme",
    "pastel-light",
  );
  await expect(
    page.getByRole("button", { name: "Switch to dark mode" }),
  ).toBeVisible();
});

test("writing detail Back restores the exact archive scroll and Up returns home", async ({
  page,
}) => {
  await openDetailAndReturn(page, "/writing/", ".writing h2 a", "Blog");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const up = page.getByRole("button", { name: "Back to top" });
  await expect(up).toBeVisible();
  await up.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThanOrEqual(1);
});

test("publication detail Back restores the exact archive scroll", async ({
  page,
}) => {
  await openDetailAndReturn(
    page,
    "/publications/",
    ".publication-card__content h3 a",
    "Publications",
  );
});

test("publication detail structurally highlights the site author", async ({
  page,
}) => {
  await page.goto("/publication/2024-04-14-deepdfa/");

  const authors = page.locator(".authors");
  await expect(authors).toHaveText(
    "Benjamin Steenhoek · Hongyang Gao · Wei Le",
  );
  await expect(authors.locator("mark")).toHaveText("Benjamin Steenhoek");
});

test("code samples copy exactly and stay contained", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as Window & { copiedCode?: string }).copiedCode = text;
        },
      },
    });
  });
  await page.goto("/writing/beware-any-vs-len/");

  const code = page.locator(".body pre code").first();
  const expectedText = await code.textContent();
  const copy = page.locator(".copy-code-button").first();
  await copy.click();
  await expect(copy).toHaveText("Copied");
  expect(
    await page.evaluate(
      () => (window as Window & { copiedCode?: string }).copiedCode,
    ),
  ).toBe(expectedText);

  await page.locator(".body").evaluate((body) => {
    const table = document.createElement("table");
    table.innerHTML = `<tbody><tr><td style="white-space: nowrap">${"wide-content-".repeat(30)}</td></tr></tbody>`;
    body.append(table);
  });

  const codeSamples = page.locator(".body pre");
  const tables = page.locator(".body table");
  expect(await codeSamples.count()).toBeGreaterThan(0);
  expect(await tables.count()).toBeGreaterThan(0);
  expect(
    await tables
      .first()
      .evaluate((table) => table.scrollWidth > table.clientWidth),
  ).toBe(true);
  const containers = page.locator(".body pre, .body table");
  for (const container of await containers.all()) {
    const box = await container.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth + 1),
    );
  }
});

test("legacy post and stream URLs redirect to canonical writing pages", async ({
  page,
  request,
}) => {
  const legacyRoutes = [
    ["/posts/2024/01/shared-hf-cache/", "/writing/shared-huggingface-cache/"],
    ["/stream/beware-any-vs-len/", "/writing/beware-any-vs-len/"],
  ] as const;

  for (const [legacy, canonical] of legacyRoutes) {
    const response = await request.get(legacy);
    expect(await response.text()).toContain(`url=${canonical}`);
    await page.goto(legacy);
    await expect(page).toHaveURL(
      new RegExp(`${canonical.replaceAll("/", "\\/")}$`),
    );
  }
});

test("unknown routes show the custom 404 and return home", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Return home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: "About me" })).toBeVisible();
});

test.describe("focused mobile coverage", () => {
  test("iPhone-sized CV disclosures are touch-friendly", async ({
    browser,
  }) => {
    const context = await browser.newContext(devices["iPhone 13"]);
    const page = await context.newPage();
    try {
      await page.goto("/cv/");
      await expectNoPageOverflow(page);

      const disclosure = page.locator("summary", {
        hasText: "More professional experience",
      });
      const details = disclosure.locator("..");
      const box = await disclosure.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(43.5);
      await disclosure.click();
      await expect(details).toHaveAttribute("open", "");
      await disclosure.click();
      await expect(details).not.toHaveAttribute("open", "");
    } finally {
      await context.close();
    }
  });

  test("Android landscape pages avoid overflow and keep header targets usable", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      ...devices["Pixel 5"],
      viewport: { width: 740, height: 360 },
      screen: { width: 740, height: 360 },
    });
    const page = await context.newPage();
    try {
      for (const route of [
        "/",
        "/writing/shared-task-spooler/",
        "/publication/2024-12-19-phddissertation/",
      ]) {
        await page.goto(route);
        await expectNoPageOverflow(page);
      }

      for (const target of await page
        .locator(".site-header nav a, #theme-toggle")
        .all()) {
        const box = await target.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(43.5);
        expect(box?.height).toBeGreaterThanOrEqual(43.5);
      }
    } finally {
      await context.close();
    }
  });
});
