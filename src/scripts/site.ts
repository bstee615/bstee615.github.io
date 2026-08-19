import type {
  TransitionBeforePreparationEvent,
  TransitionBeforeSwapEvent,
} from "astro:transitions/client";

type DetailBackTarget = {
  destination: string;
  href: string;
  label: string;
};

const pageOrder = new Map([
  ["/", 0],
  ["/cv/", 1],
  ["/writing/", 2],
]);
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const copyResetTimers = new WeakMap<HTMLButtonElement, number>();
let pendingDetailBackTarget: DetailBackTarget | undefined;
let scrollFrame = 0;
let transitionObserver: MutationObserver | undefined;
let printOpenDetails = new Set<HTMLDetailsElement>();

const isDetailPage = (pathname: string) =>
  /^\/(?:publication|writing)\/[^/]+\/?$/.test(pathname);

const isMainPage = (pathname: string) =>
  pageOrder.has(pathname) || pathname === "/publications/";

const savedTheme = () => {
  const value = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("site-theme="))
    ?.split("=")[1];
  return value === "pastel-dark" || value === "pastel-light"
    ? value
    : undefined;
};

const updateThemeLabel = () => {
  const toggle = document.querySelector("#theme-toggle");
  const isDark = document.documentElement.dataset.theme === "pastel-dark";
  toggle?.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} mode`,
  );
};

const applySystemTheme = () => {
  if (savedTheme()) return;
  document.documentElement.dataset.theme = systemTheme.matches
    ? "pastel-dark"
    : "pastel-light";
  updateThemeLabel();
};

const pageLabel = () => {
  const label = document.title.replace(/ · Benjamin Steenhoek$/, "");
  return label === "Benjamin Steenhoek" ? "Home" : label;
};

const detailBackTarget = (): DetailBackTarget | undefined => {
  const target = history.state?.siteDetailBackTarget;
  return target &&
    typeof target.destination === "string" &&
    typeof target.href === "string" &&
    typeof target.label === "string"
    ? target
    : undefined;
};

const saveScrollPosition = () => {
  history.replaceState(
    {
      ...(history.state ?? {}),
      scrollX: window.scrollX,
      scrollY: window.scrollY,
    },
    "",
  );
};

const restoreScrollPosition = () => {
  const { scrollX, scrollY } = history.state ?? {};
  if (!Number.isFinite(scrollX) || !Number.isFinite(scrollY)) return;

  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(scrollX, scrollY);
  window.requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  });
};

const configureDetailBackButton = () => {
  const button = document.querySelector("[data-detail-back]");
  if (!(button instanceof HTMLAnchorElement)) return;

  const fallback = window.location.pathname.startsWith("/publication/")
    ? { href: "/publications/", label: "Publications" }
    : { href: "/writing/", label: "Blog" };
  const target = detailBackTarget();
  const label = button.querySelector("[data-detail-back-label]");
  button.hidden = !isDetailPage(window.location.pathname);
  if (button.hidden) return;

  const destinationMatches = target?.destination === window.location.href;
  const href = destinationMatches ? target.href : fallback.href;
  const targetLabel = destinationMatches ? target.label : fallback.label;
  button.href = href;
  button.setAttribute("aria-label", `Back to ${targetLabel}`);
  if (label) label.textContent = `Back to ${targetLabel}`;
};

const updateScrollTopButton = () => {
  scrollFrame = 0;
  const button = document.querySelector("[data-scroll-top]");
  if (button instanceof HTMLButtonElement) button.hidden = window.scrollY <= 1;
};

const scheduleScrollTopUpdate = () => {
  if (!scrollFrame)
    scrollFrame = window.requestAnimationFrame(updateScrollTopButton);
};

const writeClipboardText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (error) {
      console.warn(
        "Clipboard API unavailable; using selection fallback",
        error,
      );
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Browser rejected the clipboard copy command");
};

const configureCodeCopyButtons = () => {
  document.querySelectorAll(".body pre").forEach((pre) => {
    if (!(pre instanceof HTMLElement) || pre.closest(".code-sample")) return;
    if (!pre.querySelector("code")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "code-sample";
    pre.before(wrapper);
    wrapper.append(pre);

    const button = document.createElement("button");
    button.className = "copy-code-button btn btn-secondary btn-xs";
    button.type = "button";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code sample");
    wrapper.append(button);
  });
};

const configurePageTransitions = () => {
  document.querySelectorAll("a[href]").forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;

    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin) return;

    const isHeaderLink = Boolean(link.closest(".site-header"));
    const isSlideNavigation = link.hasAttribute("data-slide-navigation");
    const isTransitionPage = pageOrder.has(target.pathname);
    const isDetailNavigation =
      isDetailPage(target.pathname) ||
      (isDetailPage(window.location.pathname) && isMainPage(target.pathname));
    const isCurrentPage =
      target.pathname === window.location.pathname &&
      target.search === window.location.search;

    link.toggleAttribute(
      "data-astro-reload",
      !(
        ((isHeaderLink && isTransitionPage) ||
          isSlideNavigation ||
          isDetailNavigation) &&
        !isCurrentPage
      ),
    );
  });
};

const configurePage = () => {
  configurePageTransitions();
  configureDetailBackButton();
  configureCodeCopyButtons();
  updateScrollTopButton();
  updateThemeLabel();
};

const finishTransitionScroll = () => {
  if (document.documentElement.hasAttribute("data-astro-transition")) return;
  transitionObserver?.disconnect();
  transitionObserver = undefined;
  delete document.documentElement.dataset.transitionScroll;
};

const handleClick = async (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;

  const themeToggle = event.target.closest("#theme-toggle");
  if (themeToggle) {
    const nextTheme =
      document.documentElement.dataset.theme === "pastel-dark"
        ? "pastel-light"
        : "pastel-dark";
    document.documentElement.dataset.theme = nextTheme;
    const secureCookie =
      window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `site-theme=${nextTheme}; Path=/; Max-Age=31536000; SameSite=Lax${secureCookie}`;
    updateThemeLabel();
    return;
  }

  const backButton = event.target.closest("[data-detail-back]");
  if (backButton instanceof HTMLAnchorElement) {
    const target = detailBackTarget();
    if (target?.destination === window.location.href) {
      event.preventDefault();
      history.back();
    }
    return;
  }

  if (event.target.closest("[data-scroll-top]")) {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    return;
  }

  const copyButton = event.target.closest(".copy-code-button");
  if (!(copyButton instanceof HTMLButtonElement)) return;
  const code = copyButton.closest(".code-sample")?.querySelector("code");
  if (!code) return;

  const previousTimer = copyResetTimers.get(copyButton);
  if (previousTimer) window.clearTimeout(previousTimer);
  try {
    await writeClipboardText(code.textContent ?? "");
    copyButton.textContent = "Copied";
    copyButton.setAttribute("aria-label", "Code sample copied");
    copyResetTimers.set(
      copyButton,
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
        copyButton.setAttribute("aria-label", "Copy code sample");
        copyResetTimers.delete(copyButton);
      }, 1800),
    );
  } catch (error) {
    console.error("Could not copy code sample", error);
    copyButton.textContent = "Copy failed";
    copyButton.setAttribute("aria-label", "Code sample could not be copied");
  }
};

systemTheme.addEventListener("change", applySystemTheme);
document.addEventListener("click", handleClick);
window.addEventListener("scroll", scheduleScrollTopUpdate, { passive: true });
window.addEventListener("pagehide", saveScrollPosition);
window.addEventListener("pageshow", restoreScrollPosition);
window.addEventListener("beforeprint", () => {
  printOpenDetails = new Set(
    [...document.querySelectorAll("details")].filter((detail) => detail.open),
  );
  document.querySelectorAll("details").forEach((detail) => {
    detail.open = true;
  });
});
window.addEventListener("afterprint", () => {
  document.querySelectorAll("details").forEach((detail) => {
    if (!printOpenDetails.has(detail)) detail.open = false;
  });
  printOpenDetails.clear();
});

document.addEventListener("astro:page-load", configurePage);
document.addEventListener("astro:before-preparation", (rawEvent) => {
  const event = rawEvent as TransitionBeforePreparationEvent;
  saveScrollPosition();

  const isPageChange =
    event.from.pathname !== event.to.pathname ||
    event.from.search !== event.to.search;
  if (isPageChange)
    document.documentElement.dataset.transitionScroll = "instant";

  const fromIsDetail = isDetailPage(event.from.pathname);
  const toIsDetail = isDetailPage(event.to.pathname);
  if (toIsDetail) {
    pendingDetailBackTarget = {
      destination: event.to.href,
      href: event.from.href,
      label: pageLabel(),
    };
    event.direction = "forward";
    return;
  }
  if (fromIsDetail && isMainPage(event.to.pathname)) {
    event.direction = "back";
    return;
  }

  if (!(event.sourceElement instanceof Element)) return;
  if (!event.sourceElement.closest(".site-header")) return;
  const fromIndex = pageOrder.get(event.from.pathname);
  const toIndex = pageOrder.get(event.to.pathname);
  if (
    fromIndex === undefined ||
    toIndex === undefined ||
    fromIndex === toIndex
  ) {
    return;
  }
  event.direction = toIndex < fromIndex ? "back" : "forward";
});
document.addEventListener("astro:before-swap", (rawEvent) => {
  const event = rawEvent as TransitionBeforeSwapEvent;
  event.newDocument.documentElement.dataset.theme =
    document.documentElement.dataset.theme;
  if (document.documentElement.dataset.transitionScroll === "instant") {
    event.newDocument.documentElement.dataset.transitionScroll = "instant";
  }
});
document.addEventListener("astro:after-swap", () => {
  if (pendingDetailBackTarget?.destination === window.location.href) {
    history.replaceState(
      { ...history.state, siteDetailBackTarget: pendingDetailBackTarget },
      "",
    );
  }
  pendingDetailBackTarget = undefined;
  transitionObserver?.disconnect();
  transitionObserver = new MutationObserver(finishTransitionScroll);
  transitionObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-astro-transition"],
  });
  finishTransitionScroll();
});

applySystemTheme();
configurePage();
