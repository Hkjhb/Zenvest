const svgToDataUri = (svg) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const palette = {
  ink: "#18212f",
  muted: "#64748b",
  paper: "#fffaf3",
  line: "#e7d6bd",
  blue: "#2f80ed",
  teal: "#13a98a",
  amber: "#c08a42",
  rose: "#d96243",
  green: "#16a34a",
  red: "#ef4444",
};

const hero = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="760" viewBox="0 0 1280 760">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff9ef"/>
        <stop offset="1" stop-color="#edf6ff"/>
      </linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#f7fbff"/>
      </linearGradient>
      <filter id="shadow" x="-15%" y="-20%" width="130%" height="150%">
        <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#7c4a12" flood-opacity="0.18"/>
      </filter>
    </defs>
    <rect width="1280" height="760" rx="40" fill="url(#bg)"/>
    <circle cx="1040" cy="150" r="120" fill="#c08a42" opacity="0.12"/>
    <circle cx="180" cy="610" r="150" fill="#2f80ed" opacity="0.10"/>
    <rect x="84" y="78" width="1112" height="604" rx="34" fill="url(#panel)" stroke="${palette.line}" stroke-width="3" filter="url(#shadow)"/>
    <rect x="84" y="78" width="1112" height="72" rx="34" fill="#18212f"/>
    <circle cx="136" cy="115" r="12" fill="#ef4444"/>
    <circle cx="174" cy="115" r="12" fill="#f59e0b"/>
    <circle cx="212" cy="115" r="12" fill="#22c55e"/>
    <text x="266" y="124" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#ffffff">Zenvest Command Center</text>
    <rect x="948" y="96" width="190" height="36" rx="18" fill="#263446"/>
    <text x="984" y="121" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#dbeafe">Live market</text>

    <rect x="130" y="192" width="270" height="148" rx="24" fill="#fff6e8" stroke="#efd9b8"/>
    <text x="160" y="238" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="${palette.muted}">Portfolio value</text>
    <text x="160" y="287" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="800" fill="${palette.ink}">Rs. 8.42L</text>
    <path d="M160 312 L196 292 L228 304 L266 268 L312 284 L360 248" fill="none" stroke="${palette.green}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>

    <rect x="430" y="192" width="560" height="332" rx="26" fill="#ffffff" stroke="#d8e4f2"/>
    <text x="466" y="238" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="${palette.ink}">NIFTY 50 movement</text>
    <text x="466" y="268" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="${palette.muted}">Candles, volume, and trend signals</text>
    <line x1="470" y1="440" x2="940" y2="440" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="470" y1="365" x2="940" y2="365" stroke="#e2e8f0" stroke-width="2"/>
    <line x1="470" y1="290" x2="940" y2="290" stroke="#e2e8f0" stroke-width="2"/>
    <g stroke-width="5" stroke-linecap="round">
      <line x1="506" y1="368" x2="506" y2="438" stroke="${palette.green}"/><rect x="492" y="384" width="28" height="38" rx="5" fill="${palette.green}"/>
      <line x1="560" y1="326" x2="560" y2="410" stroke="${palette.green}"/><rect x="546" y="348" width="28" height="42" rx="5" fill="${palette.green}"/>
      <line x1="614" y1="312" x2="614" y2="396" stroke="${palette.red}"/><rect x="600" y="330" width="28" height="50" rx="5" fill="${palette.red}"/>
      <line x1="668" y1="284" x2="668" y2="370" stroke="${palette.green}"/><rect x="654" y="302" width="28" height="48" rx="5" fill="${palette.green}"/>
      <line x1="722" y1="262" x2="722" y2="352" stroke="${palette.green}"/><rect x="708" y="286" width="28" height="46" rx="5" fill="${palette.green}"/>
      <line x1="776" y1="302" x2="776" y2="388" stroke="${palette.red}"/><rect x="762" y="320" width="28" height="50" rx="5" fill="${palette.red}"/>
      <line x1="830" y1="250" x2="830" y2="340" stroke="${palette.green}"/><rect x="816" y="272" width="28" height="44" rx="5" fill="${palette.green}"/>
      <line x1="884" y1="230" x2="884" y2="320" stroke="${palette.green}"/><rect x="870" y="252" width="28" height="42" rx="5" fill="${palette.green}"/>
    </g>
    <path d="M496 462 C560 444 610 464 666 430 C738 386 802 422 898 356" fill="none" stroke="${palette.blue}" stroke-width="6" stroke-linecap="round"/>

    <rect x="1018" y="192" width="126" height="332" rx="26" fill="#18212f"/>
    <text x="1040" y="238" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#cbd5e1">Watchlist</text>
    <g font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="700">
      <text x="1040" y="285" fill="#ffffff">TCS</text><text x="1096" y="285" fill="${palette.green}">+1.8</text>
      <text x="1040" y="335" fill="#ffffff">INFY</text><text x="1090" y="335" fill="${palette.red}">-0.4</text>
      <text x="1040" y="385" fill="#ffffff">HDFC</text><text x="1090" y="385" fill="${palette.green}">+2.1</text>
      <text x="1040" y="435" fill="#ffffff">ITC</text><text x="1096" y="435" fill="${palette.green}">+0.6</text>
    </g>
    <rect x="130" y="374" width="270" height="150" rx="24" fill="#eef8f3" stroke="#cfe9dc"/>
    <text x="160" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="${palette.muted}">Today P&amp;L</text>
    <text x="160" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="42" font-weight="800" fill="${palette.green}">+Rs. 12,840</text>
    <rect x="130" y="560" width="1014" height="58" rx="18" fill="#fff" stroke="#e8dccb"/>
    <text x="164" y="596" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="${palette.ink}">Fast execution, clean portfolio insights, and a realistic trading simulator.</text>
  </svg>
`);

const broker = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
    <defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf2"/><stop offset="1" stop-color="#eef7ff"/></linearGradient></defs>
    <rect width="900" height="700" rx="36" fill="url(#b)"/>
    <rect x="72" y="74" width="756" height="520" rx="32" fill="#ffffff" stroke="#ead9c2" stroke-width="3"/>
    <text x="112" y="132" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="${palette.ink}">Market activity</text>
    <text x="112" y="166" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="${palette.muted}">Orders, investments, and daily volume at a glance</text>
    <g transform="translate(112 215)">
      <rect width="170" height="250" rx="24" fill="#fff3df"/>
      <rect x="26" y="130" width="30" height="86" rx="10" fill="${palette.amber}"/>
      <rect x="70" y="88" width="30" height="128" rx="10" fill="${palette.blue}"/>
      <rect x="114" y="48" width="30" height="168" rx="10" fill="${palette.green}"/>
      <text x="28" y="238" font-family="Segoe UI, Arial, sans-serif" font-size="15" fill="${palette.muted}">Volume</text>
    </g>
    <g transform="translate(330 215)">
      <rect width="220" height="250" rx="24" fill="#f1f8ff"/>
      <circle cx="110" cy="96" r="60" fill="none" stroke="#dbeafe" stroke-width="28"/>
      <path d="M110 36 A60 60 0 0 1 164 122" fill="none" stroke="${palette.blue}" stroke-width="28" stroke-linecap="round"/>
      <path d="M164 122 A60 60 0 0 1 72 146" fill="none" stroke="${palette.green}" stroke-width="28" stroke-linecap="round"/>
      <text x="50" y="205" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="${palette.muted}">Asset mix</text>
    </g>
    <g transform="translate(600 215)">
      <rect width="176" height="250" rx="24" fill="#f5fbf7"/>
      <path d="M32 176 C64 142 78 152 98 110 C114 78 136 78 152 52" fill="none" stroke="${palette.green}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="152" cy="52" r="14" fill="${palette.green}"/>
      <text x="34" y="220" font-family="Segoe UI, Arial, sans-serif" font-size="16" fill="${palette.muted}">Growth</text>
    </g>
  </svg>
`);

const press = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="360" viewBox="0 0 1000 360">
    <rect width="1000" height="360" rx="32" fill="#fffaf3"/>
    <text x="62" y="82" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="800" fill="${palette.ink}">Featured insights</text>
    <text x="62" y="116" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="${palette.muted}">Research, education, and product updates for investors.</text>
    <g transform="translate(60 160)" font-family="Segoe UI, Arial, sans-serif" font-weight="800">
      <rect width="250" height="88" rx="18" fill="#ffffff" stroke="#ead9c2"/><text x="42" y="56" font-size="26" fill="${palette.ink}">MARKET</text>
      <rect x="295" width="250" height="88" rx="18" fill="#ffffff" stroke="#ead9c2"/><text x="342" y="56" font-size="26" fill="${palette.ink}">FINTECH</text>
      <rect x="590" width="250" height="88" rx="18" fill="#ffffff" stroke="#ead9c2"/><text x="638" y="56" font-size="26" fill="${palette.ink}">INSIGHTS</text>
    </g>
  </svg>
`);

const ecosystem = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
    <rect width="900" height="700" rx="36" fill="#f8fbff"/>
    <circle cx="450" cy="350" r="220" fill="#eaf4ff"/>
    <circle cx="450" cy="350" r="108" fill="#18212f"/>
    <text x="390" y="338" font-family="Segoe UI, Arial, sans-serif" font-size="25" font-weight="800" fill="#ffffff">Zenvest</text>
    <text x="382" y="372" font-family="Segoe UI, Arial, sans-serif" font-size="17" fill="#cbd5e1">ecosystem</text>
    <g font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="${palette.ink}">
      <rect x="86" y="120" width="210" height="92" rx="24" fill="#ffffff" stroke="#d6e4f5"/><text x="132" y="176">Dashboard</text>
      <rect x="604" y="120" width="210" height="92" rx="24" fill="#ffffff" stroke="#d6e4f5"/><text x="662" y="176">Watchlist</text>
      <rect x="86" y="486" width="210" height="92" rx="24" fill="#ffffff" stroke="#d6e4f5"/><text x="139" y="542">Orders</text>
      <rect x="604" y="486" width="210" height="92" rx="24" fill="#ffffff" stroke="#d6e4f5"/><text x="650" y="542">Analytics</text>
    </g>
    <path d="M296 166 C360 180 394 234 424 255" fill="none" stroke="${palette.blue}" stroke-width="7" stroke-linecap="round"/>
    <path d="M604 166 C540 180 506 234 476 255" fill="none" stroke="${palette.amber}" stroke-width="7" stroke-linecap="round"/>
    <path d="M296 532 C360 520 394 466 424 445" fill="none" stroke="${palette.green}" stroke-width="7" stroke-linecap="round"/>
    <path d="M604 532 C540 520 506 466 476 445" fill="none" stroke="${palette.rose}" stroke-width="7" stroke-linecap="round"/>
  </svg>
`);

const education = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
    <rect width="900" height="700" rx="36" fill="#fff8ed"/>
    <rect x="120" y="96" width="660" height="470" rx="32" fill="#ffffff" stroke="#ead9c2" stroke-width="3"/>
    <rect x="120" y="96" width="660" height="82" rx="32" fill="#18212f"/>
    <text x="166" y="148" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ffffff">Zenvest Learn</text>
    <rect x="170" y="230" width="230" height="254" rx="24" fill="#eef7ff"/>
    <path d="M205 392 L254 336 L305 366 L365 292" fill="none" stroke="${palette.blue}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="365" cy="292" r="14" fill="${palette.blue}"/>
    <g font-family="Segoe UI, Arial, sans-serif">
      <text x="446" y="256" font-size="24" font-weight="800" fill="${palette.ink}">Learn markets step by step</text>
      <rect x="446" y="300" width="250" height="18" rx="9" fill="#e2e8f0"/>
      <rect x="446" y="340" width="286" height="18" rx="9" fill="#e2e8f0"/>
      <rect x="446" y="380" width="210" height="18" rx="9" fill="#e2e8f0"/>
      <rect x="446" y="438" width="170" height="48" rx="24" fill="${palette.amber}"/>
      <text x="484" y="470" font-size="18" font-weight="800" fill="#ffffff">Start lesson</text>
    </g>
  </svg>
`);

export const placeholders = {
  hero,
  broker,
  press,
  ecosystem,
  education,
};
