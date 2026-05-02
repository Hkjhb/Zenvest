const svgToDataUri = (svg) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const createPlaceholder = ({
  title,
  subtitle,
  width = 1200,
  height = 700,
  accent = "#387ed1",
  background = "#eef6ff",
}) =>
  svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" rx="32" fill="${background}" />
      <rect x="60" y="60" width="${width - 120}" height="${height - 120}" rx="28" fill="white" stroke="#dbeafe" stroke-width="4" />
      <circle cx="${width - 180}" cy="140" r="48" fill="${accent}" opacity="0.14" />
      <circle cx="180" cy="${height - 140}" r="64" fill="${accent}" opacity="0.1" />
      <rect x="110" y="130" width="${Math.min(260, width - 220)}" height="16" rx="8" fill="${accent}" opacity="0.25" />
      <rect x="110" y="180" width="${Math.min(420, width - 220)}" height="34" rx="10" fill="${accent}" opacity="0.85" />
      <rect x="110" y="235" width="${Math.min(520, width - 220)}" height="18" rx="9" fill="#94a3b8" opacity="0.55" />
      <rect x="110" y="280" width="${Math.max(260, width * 0.34)}" height="${Math.max(160, height * 0.28)}" rx="18" fill="${accent}" opacity="0.12" />
      <rect x="${Math.max(420, width * 0.5)}" y="300" width="${Math.max(220, width * 0.22)}" height="20" rx="10" fill="${accent}" opacity="0.25" />
      <rect x="${Math.max(420, width * 0.5)}" y="345" width="${Math.max(300, width * 0.28)}" height="20" rx="10" fill="${accent}" opacity="0.18" />
      <rect x="${Math.max(420, width * 0.5)}" y="390" width="${Math.max(260, width * 0.24)}" height="20" rx="10" fill="${accent}" opacity="0.14" />
      <text x="110" y="${height - 110}" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="700" fill="#0f172a">${title}</text>
      <text x="110" y="${height - 60}" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#475569">${subtitle}</text>
    </svg>
  `);

export const placeholders = {
  hero: createPlaceholder({
    title: "Zenvest",
    subtitle: "Invest, trade, and learn from one clean dashboard.",
    width: 1280,
    height: 760,
  }),
  broker: createPlaceholder({
    title: "Largest stock broker in India",
    subtitle: "A clean stand-in visual while the real assets are added.",
    width: 900,
    height: 700,
  }),
  press: createPlaceholder({
    title: "Trusted by major publications",
    subtitle: "Business coverage and product mentions.",
    width: 1000,
    height: 360,
    background: "#f8fafc",
  }),
  ecosystem: createPlaceholder({
    title: "The Zenvest ecosystem",
    subtitle: "Products, investing tools, and education together.",
    width: 900,
    height: 700,
  }),
  education: createPlaceholder({
    title: "Free market education",
    subtitle: "Learning resources for investors and traders.",
    width: 900,
    height: 700,
  }),
};
