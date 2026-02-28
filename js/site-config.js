/**
 * Site configuration (editable)
 * - Navigation labels/links
 * - Footer text
 * - Hero texts / image
 *
 * Edit this file when updating menus or lab info.
 */
window.SS_SITE_CONFIG = {
  heroImage: "/images/hero.png",

  nav: {
    ja: [
      { label: "ホーム",     href: "/"                      },
      { label: "研究内容",   href: "/research/"             },
      { label: "メンバー",   href: "/people/"               },
      { label: "研究業績",   href: "/publications/"         },
      { label: "ギャラリー", href: "/gallery/"              },
      { label: "募集",       href: "/joinus/"               },
      { label: "連絡先",     href: "/access/"               },
      { label: "AIポリシー", href: "/generative-ai-policy/" },
      { label: "リンク",     href: "/link/"                 },
    ],
    en: [
      { label: "Home",         href: "/en/"                      },
      { label: "Research",     href: "/en/research/"             },
      { label: "People",       href: "/en/people/"               },
      { label: "Publications", href: "/en/publications/"         },
      { label: "Gallery",      href: "/en/gallery/"              },
      { label: "Join us",      href: "/en/joinus/"               },
      { label: "Contact",      href: "/en/access/"               },
      { label: "AI Policy",    href: "/en/generative-ai-policy/" },
      { label: "Links",        href: "/en/link/"                 },
    ],
  },

  heroBand: {
    leftJa:  "豊橋技術科学大学<br>電気・電気情報工学系",
    leftEn:  "Department of Electrical and Electronic Information Engineering<br>Toyohashi University of Technology",
    rightJa: "スマートシステム研究室",
    rightEn: "Smart System Laboratory",
  },

  title: {
    jaMain: "スマートシステム研究室",
    jaSub:  "豊橋技術科学大学",
    enMain: "Smart System Laboratory",
    enSub:  "Toyohashi University of Technology",
  },

  footer: {
    ja: [
      "豊橋技術科学大学 電気・電気情報工学系 情報通信システムコース",
      "スマートシステム研究室 〒441-8580 愛知県豊橋市天伯町雲雀ヶ丘1-1 C-410",
      "Copyright © Smart System Laboratory",
    ],
    en: [
      "Smart System Laboratory",
      "Department of Electrical and Electronic Information Engineering, Toyohashi University of Technology",
      "C-410, 1-1 Hibari Gaoka, Tempaku-cho, Toyohashi-shi, Aichi 441-8580, Japan",
      "Copyright © Smart System Laboratory",
    ],
  },
};
