/**
 * News helper (client-side)
 * - Home: show only latest N rows and add link to /news/
 * - /news/: paginate rows (page size configurable)
 *
 * Usage:
 *  - Home page table: <tbody id="news-tbody" data-mode="home" data-home-limit="5"></tbody>
 *  - News page table: <tbody id="news-tbody" data-mode="paginate" data-page-size="10"></tbody>
 */
(function(){
  function qs(name){ return new URLSearchParams(location.search).get(name); }

  function buildPager(current, total){
    const nav = document.createElement("div");
    nav.className = "news-pager";
    nav.style.display = "flex";
    nav.style.gap = "10px";
    nav.style.alignItems = "center";
    nav.style.justifyContent = "center";
    nav.style.margin = "14px 0 8px";

    const mk = (label, page, disabled) => {
      const a = document.createElement("a");
      a.textContent = label;
      a.href = "?page=" + page;
      a.style.padding = "6px 10px";
      a.style.border = "1px solid #d1d5db";
      a.style.borderRadius = "6px";
      a.style.color = "#111827";
      a.style.textDecoration = "none";
      if(disabled){
        a.style.opacity = "0.45";
        a.style.pointerEvents = "none";
      }
      return a;
    };

    nav.appendChild(mk("← Prev", Math.max(1, current-1), current<=1));
    const info = document.createElement("span");
    info.textContent = current + " / " + total;
    info.style.fontSize = "12px";
    info.style.color = "#6b7280";
    nav.appendChild(info);
    nav.appendChild(mk("Next →", Math.min(total, current+1), current>=total));
    return nav;
  }

  function init(){
    const tbody = document.getElementById("news-tbody");
    if(!tbody) return;

    const mode = tbody.dataset.mode || "home";
    const rows = Array.from(tbody.querySelectorAll("tr"));

    if(mode === "home"){
      const limit = parseInt(tbody.dataset.homeLimit || "5", 10);
      rows.forEach((tr, i) => { if(i >= limit) tr.style.display = "none"; });

      // Append "Older news" link under the table (no removal of existing content)
      const parent = tbody.closest(".news-section");
      if(parent && rows.length > limit){
        const link = document.createElement("div");
        link.style.marginTop = "10px";
        link.style.textAlign = "right";

        const a = document.createElement("a");
        const isEn = location.pathname.startsWith("/en/");
        a.textContent = isEn ? "Older news →" : "過去のお知らせ →";
        a.href = isEn ? "/en/news/" : "/news/";
        a.style.fontSize = "13px";
        a.style.color = "#1d4ed8";
        a.style.textDecoration = "none";

        link.appendChild(a);
        parent.appendChild(link);
      }
      return;
    }

    // paginate
    const pageSize = parseInt(tbody.dataset.pageSize || "10", 10);
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const page = Math.min(totalPages, Math.max(1, parseInt(qs("page") || "1", 10)));

    rows.forEach((tr, i) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      tr.style.display = (i >= start && i < end) ? "" : "none";
    });

    const table = tbody.closest("table");
    if(table){
      const existing = table.parentElement.querySelector(".news-pager");
      if(existing) existing.remove();
      table.parentElement.appendChild(buildPager(page, totalPages));
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
