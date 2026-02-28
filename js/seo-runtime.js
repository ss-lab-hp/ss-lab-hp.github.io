/**
 * Runtime SEO helpers (optional)
 * This keeps the site working even if you preview locally (file://) or on a temporary domain.
 * When your final domain is fixed, you can replace this with fully static tags.
 */
(function () {
  function upsertLink(rel, attrs) {
    let el = document.querySelector(`head link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }

  function upsertMeta(selector, attrs) {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      // selector should be meta[name="..."] or meta[property="..."]
      const m = selector.match(/meta\[(name|property)=\"([^\"]+)\"\]/);
      if (m) el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }

  function absoluteUrl(path) {
    // If opened via file://, origin becomes "null". Use a placeholder.
    const origin = (location.origin && location.origin !== "null") ? location.origin : "https://example.com";
    return origin.replace(/\/$/, "") + path;
  }

  window.SS_addRuntimeSeo = function SS_addRuntimeSeo() {
    const path = location.pathname.endsWith("index.html")
      ? location.pathname.replace(/index\.html$/, "")
      : location.pathname;

    const isEn = path.startsWith("/en/");
    const jaPath = isEn ? (path.replace(/^\/en/, "") || "/") : path;
    const enPath = isEn ? path : ("/en" + (path === "/" ? "/" : path));

    // canonical + hreflang
    upsertLink("canonical", { href: absoluteUrl(path) });
    upsertLink("alternate", { hreflang: "ja", href: absoluteUrl(jaPath) });
    upsertLink("alternate", { hreflang: "en", href: absoluteUrl(enPath) });

    // basic og/twitter URL
    upsertMeta('meta[property="og:url"]', { content: absoluteUrl(path) });
    upsertMeta('meta[name="twitter:url"]', { content: absoluteUrl(path) });
  };
})();
