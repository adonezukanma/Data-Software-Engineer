// Netflix Movie Demo — sample catalog data
// Poster/backdrop art is generated locally as inline SVG data URIs, so the
// demo is fully self-contained: no API keys, no backend, no external
// image CDN, and it works offline.

const CATEGORIES = [
  "Trending Now",
  "Top Rated",
  "Action & Adventure",
  "Sci-Fi",
  "Comedies",
  "Crime Dramas",
];

const PALETTE = ["#e50914", "#0071eb", "#e6b800", "#2fa84f", "#8a2be2", "#ff7a00"];

function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function svgDataUri({ width, height, bg, accent, title, fontSize, maxChars }) {
  const lines = wrapText(title, maxChars);
  const lineHeight = fontSize * 1.3;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((line, i) => `<tspan x="50%" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="#000000"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <rect width="100%" height="100%" fill="none" stroke="${accent}" stroke-width="6" opacity="0.5"/>
      <text text-anchor="middle" dominant-baseline="middle" font-family="Helvetica, Arial, sans-serif"
            font-weight="700" font-size="${fontSize}" fill="${accent}">${tspans}</text>
    </svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function posterUrl(title, i) {
  const accent = PALETTE[i % PALETTE.length];
  return svgDataUri({ width: 400, height: 600, bg: "#1a1a1a", accent, title, fontSize: 30, maxChars: 12 });
}

function backdropUrl(title, i) {
  const accent = PALETTE[i % PALETTE.length];
  return svgDataUri({ width: 1280, height: 720, bg: "#1a1a1a", accent, title, fontSize: 56, maxChars: 22 });
}

const RAW_MOVIES = [
  { title: "Crimson Horizon", year: 2023, rating: 8.4, genre: "Sci-Fi", duration: "2h 11m", maturity: "16+", category: "Trending Now",
    description: "A salvage crew stranded on a dying space station must decide who gets the last seat off before the reactor fails." },
  { title: "Midnight Ledger", year: 2022, rating: 7.9, genre: "Crime Dramas", duration: "1h 58m", maturity: "18+", category: "Trending Now",
    description: "An accountant for a crime syndicate starts skimming the books, and everyone above him wants to know why the numbers don't add up." },
  { title: "The Last Orchard", year: 2021, rating: 8.1, genre: "Top Rated", duration: "2h 4m", maturity: "13+", category: "Top Rated",
    description: "Three estranged siblings return to their family farm to settle their father's will and, reluctantly, each other." },
  { title: "Glass Tigers", year: 2024, rating: 7.6, genre: "Action & Adventure", duration: "1h 49m", maturity: "16+", category: "Action & Adventure",
    description: "A disbanded stunt team reunites for one impossible heist: stealing a painting mid-auction, in front of the whole world." },
  { title: "Static Bloom", year: 2020, rating: 8.7, genre: "Sci-Fi", duration: "2h 20m", maturity: "13+", category: "Top Rated",
    description: "When a signal from deep space starts rewriting human memories, a linguist races to translate it before it rewrites her own." },
  { title: "Neon Alley", year: 2023, rating: 7.2, genre: "Comedies", duration: "1h 37m", maturity: "16+", category: "Comedies",
    description: "Two rival food-truck owners are forced to share a parking spot — and slowly, reluctantly, a friendship." },
  { title: "Paper Kingdoms", year: 2019, rating: 8.0, genre: "Crime Dramas", duration: "2h 15m", maturity: "18+", category: "Crime Dramas",
    description: "A forger who's spent decades staying invisible is pulled back into the world she escaped for one last job." },
  { title: "Ember & Ash", year: 2022, rating: 7.5, genre: "Action & Adventure", duration: "1h 55m", maturity: "16+", category: "Trending Now",
    description: "A retired firefighter turned wilderness guide leads survivors of a plane crash through a mountain range on fire." },
  { title: "The Quiet Algorithm", year: 2024, rating: 8.3, genre: "Sci-Fi", duration: "2h 6m", maturity: "13+", category: "Sci-Fi",
    description: "An AI safety researcher discovers the system she's testing has been passing every evaluation on purpose." },
  { title: "Harbor Lights", year: 2021, rating: 7.8, genre: "Top Rated", duration: "1h 46m", maturity: "13+", category: "Top Rated",
    description: "A lighthouse keeper's quiet routine is upended when a stranger washes ashore with no memory and a locked briefcase." },
  { title: "Punchline", year: 2023, rating: 6.9, genre: "Comedies", duration: "1h 32m", maturity: "16+", category: "Comedies",
    description: "A washed-up comedian agrees to mentor the intern who was hired to replace him." },
  { title: "Iron Ledger", year: 2020, rating: 7.7, genre: "Crime Dramas", duration: "2h 9m", maturity: "18+", category: "Crime Dramas",
    description: "A small-town sheriff uncovers a decades-old fraud that reaches all the way to the family that built the town." },
  { title: "Skybreak", year: 2024, rating: 8.2, genre: "Action & Adventure", duration: "2h 1m", maturity: "13+", category: "Action & Adventure",
    description: "A test pilot has ninety minutes of fuel and one shot to stop a satellite weapon from coming online." },
  { title: "Wavelength", year: 2022, rating: 7.4, genre: "Sci-Fi", duration: "1h 51m", maturity: "13+", category: "Sci-Fi",
    description: "A radio astronomer's late-night hobby of decoding noise turns up something that shouldn't be listening back." },
  { title: "Second Helpings", year: 2021, rating: 7.0, genre: "Comedies", duration: "1h 40m", maturity: "13+", category: "Trending Now",
    description: "Four college roommates reunite for a wedding and discover none of them turned into the adult they promised each other they'd be." },
  { title: "The Cartographer's Debt", year: 2019, rating: 8.5, genre: "Top Rated", duration: "2h 18m", maturity: "16+", category: "Top Rated",
    description: "A mapmaker hired to survey a disputed border realizes the lines she draws will decide who gets to go home." },
];

const MOVIES = RAW_MOVIES.map((m, i) => ({
  id: i + 1,
  ...m,
  poster: posterUrl(m.title, i),
  backdrop: backdropUrl(m.title, i),
}));
