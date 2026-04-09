/**
 * /api/bmkg.js — Vercel Serverless Function
 * Proxy aman untuk endpoint BMKG TEWS
 * Deploy: vercel --prod
 */

const BMKG_ENDPOINTS = {
  autogempa:      "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml",
  gempaterkini:   "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.xml",
  gempadirasakan: "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.xml",
};

// Cache sederhana in-memory (reset setiap cold start)
const cache = {};
const CACHE_TTL_MS = 3 * 60 * 1000; // 3 menit

export default async function handler(req, res) {
  // ── CORS Headers ──
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { type } = req.query;

  // Validasi type
  if (!type || !BMKG_ENDPOINTS[type]) {
    return res.status(400).json({
      error: "Parameter ?type= tidak valid",
      valid: Object.keys(BMKG_ENDPOINTS),
    });
  }

  const url = BMKG_ENDPOINTS[type];
  const now = Date.now();

  // ── Cek cache ──
  if (cache[type] && now - cache[type].timestamp < CACHE_TTL_MS) {
    res.setHeader("X-Cache", "HIT");
    res.setHeader("X-Cache-Age", Math.round((now - cache[type].timestamp) / 1000) + "s");
    res.setHeader("Content-Type", "application/xml");
    return res.status(200).send(cache[type].data);
  }

  // ── Fetch ke BMKG ──
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8 detik timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PNM-Disaster-Monitor/2.0",
        "Accept": "application/xml, text/xml, */*",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`BMKG responded with status ${response.status}`);
    }

    const xmlText = await response.text();

    // Simpan ke cache
    cache[type] = { data: xmlText, timestamp: now };

    res.setHeader("X-Cache", "MISS");
    res.setHeader("X-BMKG-Source", url);
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "public, max-age=180"); // browser cache 3 menit
    return res.status(200).send(xmlText);

  } catch (err) {
    const isTimeout = err.name === "AbortError";
    console.error(`[BMKG Proxy] Error fetching ${type}:`, err.message);
    return res.status(502).json({
      error: isTimeout ? "Request ke BMKG timeout" : "Gagal mengambil data BMKG",
      type,
      message: err.message,
      timestamp: new Date().toISOString(),
    });
  }
}
