const puppeteer = require("puppeteer");

const BASE_URL = "http://localhost:8000/";
const PAGES = [
  "index.html",
  "houses.html",
  "wizards.html",
  "timeline.html",
  "about.html",
  "404.html",
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const allConsoleErrors = [];
  const internalLinks = new Set();

  for (const route of PAGES) {
    const url = new URL(route, BASE_URL).href;
    const pageErrors = [];
    const consoleErrors = [];

    const handleConsole = (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push({ text: msg.text(), location: route });
      }
    };
    const handlePageError = (error) => {
      pageErrors.push({ error: error.message, location: route });
    };

    page.on("console", handleConsole);
    page.on("pageerror", handlePageError);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    const links = await page.$$eval("a[href]", (anchors) =>
      anchors
        .map((anchor) => ({
          href: anchor.getAttribute("href"),
          text: anchor.textContent.trim(),
        }))
        .filter((link) => Boolean(link.href))
    );

    links.forEach(({ href }) => {
      const absolute = new URL(href, url);
      if (absolute.origin === new URL(BASE_URL).origin) {
        internalLinks.add(absolute.pathname.replace(/^\//, "") || "index.html");
      }
    });

    page.removeListener("console", handleConsole);
    page.removeListener("pageerror", handlePageError);

    if (consoleErrors.length || pageErrors.length) {
      allConsoleErrors.push(...consoleErrors, ...pageErrors);
    }
  }

  // Validate spoiler toggle behaviour on wizards page
  const wizardsUrl = new URL("wizards.html", BASE_URL).href;
  await page.goto(wizardsUrl, { waitUntil: "networkidle0", timeout: 60000 });

  const spoilerResults = await page.evaluate(() => {
    const toggle = document.querySelector("[data-spoiler-toggle]");
    const summaries = Array.from(
      document.querySelectorAll("[data-wizards-grid] .card__summary")
    );
    const images = Array.from(
      document.querySelectorAll("[data-wizards-grid] .card__media img")
    );

    const getFilters = (nodes) =>
      nodes.map((node) => window.getComputedStyle(node).getPropertyValue("filter"));

    const initialSummaryFilters = getFilters(summaries);

    if (toggle) toggle.click();

    const afterToggleSummaryFilters = getFilters(summaries);
    const afterToggleImageFilters = getFilters(images);

    return {
      initialSummaryFilters,
      afterToggleSummaryFilters,
      afterToggleImageFilters,
    };
  });

  await browser.close();

  const linkErrors = [];
  for (const link of internalLinks) {
    const url = new URL(link, BASE_URL).href;
    const response = await fetch(url, { method: "HEAD" }).catch((error) => ({
      ok: false,
      statusText: error.message,
    }));
    if (!response.ok) {
      linkErrors.push({ link, status: response.status, statusText: response.statusText });
    }
  }

  const spoilerIssues = [];
  if (spoilerResults.initialSummaryFilters.some((filter) => filter !== "none")) {
    spoilerIssues.push("Spoiler toggle ON state is not clean.");
  }
  if (
    !spoilerResults.afterToggleSummaryFilters.every((filter) => /blur/i.test(filter))
  ) {
    spoilerIssues.push("Summaries are not fully blurred when toggle OFF.");
  }
  if (spoilerResults.afterToggleImageFilters.some((filter) => /blur/i.test(filter))) {
    spoilerIssues.push("Wizard images are blurred when toggle OFF.");
  }

  const hasIssues =
    allConsoleErrors.length > 0 || linkErrors.length > 0 || spoilerIssues.length > 0;

  if (hasIssues) {
    console.error(
      JSON.stringify(
        {
          consoleErrors: allConsoleErrors,
          linkErrors,
          spoilerIssues,
        },
        null,
        2
      )
    );
    process.exit(1);
  } else {
    console.log(
      JSON.stringify(
        {
          consoleErrors: [],
          linkErrors: [],
          spoilerIssues: [],
        },
        null,
        2
      )
    );
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
