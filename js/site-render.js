/**
 * Shared header/footer renderer
 * This file reads window.SS_SITE_CONFIG.
 * Edit site-config.js for menus and texts.
 */
(function () {
  const cfg = window.SS_SITE_CONFIG;

  function isEnglish() {
    return location.pathname.startsWith("/en/");
  }

  function buildFooter() {
    const lines = isEnglish() ? cfg.footer.en : cfg.footer.ja;
    const html = lines.map((l, i) => i < lines.length - 1 ? `${l}<br>` : l).join("");
    return `<footer>${html}</footer>`;
  }

  function buildHeader() {
    const isEn = isEnglish();
    const nav = isEn ? cfg.nav.en : cfg.nav.ja;
    const path = location.pathname;

    const langLabel = isEn ? "日本語" : "English";
    const langHref = isEn ? (path.replace(/^\/en/, "") || "/") : ("/en" + path);

    const titleHref = isEn ? "/en/" : "/";
    const titleMain = isEn ? cfg.title.enMain : cfg.title.jaMain;
    const titleSub = isEn ? cfg.title.enSub : cfg.title.jaSub;

    const navItems = nav.map(item => {
      const active = (item.href === "/" || item.href === "/en/")
        ? path === item.href
        : path.startsWith(item.href);
      return `<li><a href="${item.href}"${active ? ' class="active"' : ""}>${item.label}</a></li>`;
    }).join("\n        ");

    const mobileItems = nav.map(item =>
      `<li><a href="${item.href}">${item.label}</a></li>`
    ).join("\n      ");

    return `
<div class="site-hero">
  <img src="${cfg.heroImage}" alt="${titleMain}">
  <div class="hero-controls">
    <div class="lang-toggle"><a href="${langHref}">${langLabel}</a></div>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div class="hero-band" role="banner">
    <div class="hero-band-inner">
      <div class="hero-left">
        <div class="hero-left-ja">${cfg.heroBand.leftJa}</div>
        <div class="hero-left-en">${cfg.heroBand.leftEn}</div>
      </div>
      <div class="hero-right">
        <div class="hero-right-ja">${cfg.heroBand.rightJa}</div>
        <div class="hero-right-en">${cfg.heroBand.rightEn}</div>
      </div>
    </div>
  </div>
</div>

<header class="menu-bar" aria-label="Site navigation">
  <div class="menu-bar-inner">
    <div class="site-title">
      <a href="${titleHref}">${titleMain}<br>
      <span class="site-title-sub">${titleSub}</span></a>
    </div>
    <nav class="main-nav">
      <ul>
        ${navItems}
      </ul>
    </nav>
  </div>

  <nav class="mobile-nav" id="mobile-nav">
    <ul>
      ${mobileItems}
      <li><a href="${langHref}">${langLabel}</a></li>
    </ul>
  </nav>
</header>`;
  }

  function inject() {
    if (typeof window.SS_addRuntimeSeo === "function") window.SS_addRuntimeSeo();

    const headerEl = document.getElementById("site-header");
    if (headerEl) headerEl.outerHTML = buildHeader();

    const footerEl = document.getElementById("site-footer");
    if (footerEl) footerEl.outerHTML = buildFooter();

    const btn = document.getElementById("hamburger");
    const mnav = document.getElementById("mobile-nav");
    if (btn && mnav) btn.addEventListener("click", () => mnav.classList.toggle("open"));
  }

  inject();
})();
