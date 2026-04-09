import { useState, useEffect, useCallback, useRef } from "react";

/* ─── FONTS ─── */
const FONT = `@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;800;900&family=Fira+Code:wght@300;400;500;600&display=swap');`;

/* ─── 58 CABANG PNM (dari Excel) ─── */
const CABANG = [
  {id:"CB001",nama:"PNM Ambon",provinsi:"MALUKU",lat:-3.623728,lng:128.24959},
  {id:"CB002",nama:"PNM Bau Bau",provinsi:"SULAWESI TENGGARA",lat:-5.464051,lng:122.60083},
  {id:"CB003",nama:"PNM Bandung",provinsi:"JAWA BARAT",lat:-6.942439,lng:107.64175},
  {id:"CB004",nama:"PNM Bogor",provinsi:"JAWA BARAT",lat:-6.568625,lng:106.80567},
  {id:"CB005",nama:"PNM Banjarmasin",provinsi:"KALIMANTAN SELATAN",lat:-3.339038,lng:114.61399},
  {id:"CB006",nama:"PNM Banjarnegara",provinsi:"JAWA TENGAH",lat:-7.398985,lng:109.67431},
  {id:"CB007",nama:"PNM Bojonegoro",provinsi:"JAWA TIMUR",lat:-7.154034,lng:111.88946},
  {id:"CB008",nama:"PNM Bangka Belitung",provinsi:"KEP. BANGKA BELITUNG",lat:-2.131523,lng:106.10897},
  {id:"CB009",nama:"PNM Bekasi",provinsi:"JAWA BARAT",lat:-6.271075,lng:107.092346},
  {id:"CB010",nama:"PNM Balikpapan",provinsi:"KALIMANTAN TIMUR",lat:-1.256712,lng:116.90344},
  {id:"CB011",nama:"PNM Blitar",provinsi:"JAWA TIMUR",lat:-8.102776,lng:112.18169},
  {id:"CB012",nama:"PNM Aceh",provinsi:"ACEH",lat:5.54931,lng:95.309779},
  {id:"CB013",nama:"PNM Banyuwangi",provinsi:"JAWA TIMUR",lat:-8.221729,lng:114.35618},
  {id:"CB014",nama:"PNM Cirebon",provinsi:"JAWA BARAT",lat:-6.736122,lng:108.54832},
  {id:"CB015",nama:"PNM Jakarta",provinsi:"DKI JAKARTA",lat:-6.275754,lng:106.82199},
  {id:"CB016",nama:"PNM Depok",provinsi:"JAWA BARAT",lat:-6.407708,lng:106.85706},
  {id:"CB017",nama:"PNM Denpasar",provinsi:"BALI",lat:-8.670533,lng:115.23637},
  {id:"CB018",nama:"PNM Garut",provinsi:"JAWA BARAT",lat:-7.199808,lng:107.8856},
  {id:"CB019",nama:"PNM Indramayu",provinsi:"JAWA BARAT",lat:-6.335088,lng:108.33207},
  {id:"CB020",nama:"PNM Jember",provinsi:"JAWA TIMUR",lat:-8.184562,lng:113.72343},
  {id:"CB021",nama:"PNM Jambi",provinsi:"JAMBI",lat:-1.602972,lng:103.57436},
  {id:"CB022",nama:"PNM Kendari",provinsi:"SULAWESI TENGGARA",lat:-4.00234,lng:122.53434},
  {id:"CB023",nama:"PNM Kediri",provinsi:"JAWA TIMUR",lat:-7.808673,lng:112.00173},
  {id:"CB024",nama:"PNM Tarakan",provinsi:"KALIMANTAN UTARA",lat:3.290301,lng:117.59006},
  {id:"CB025",nama:"PNM Lamongan",provinsi:"JAWA TIMUR",lat:-7.116791,lng:112.41668},
  {id:"CB026",nama:"PNM Lampung",provinsi:"LAMPUNG",lat:-5.418622,lng:105.27196},
  {id:"CB027",nama:"PNM Madiun",provinsi:"JAWA TIMUR",lat:-7.631771,lng:111.53118},
  {id:"CB028",nama:"PNM Medan",provinsi:"SUMATERA UTARA",lat:3.572437,lng:98.671735},
  {id:"CB029",nama:"PNM Magelang",provinsi:"JAWA TENGAH",lat:-7.517252,lng:110.22627},
  {id:"CB030",nama:"PNM Mojokerto",provinsi:"JAWA TIMUR",lat:-7.460711,lng:112.44126},
  {id:"CB031",nama:"PNM Makassar",provinsi:"SULAWESI SELATAN",lat:-5.154315,lng:119.452721},
  {id:"CB032",nama:"PNM Malang",provinsi:"JAWA TIMUR",lat:-7.951622,lng:112.62242},
  {id:"CB033",nama:"PNM Manado",provinsi:"SULAWESI UTARA",lat:1.442354,lng:124.84004},
  {id:"CB034",nama:"PNM Mataram",provinsi:"NUSA TENGGARA BARAT",lat:-8.582792,lng:116.1192},
  {id:"CB035",nama:"PNM Probolinggo",provinsi:"JAWA TIMUR",lat:-7.743881,lng:113.2118},
  {id:"CB036",nama:"PNM Padang",provinsi:"SUMATERA BARAT",lat:-0.942999,lng:100.3567},
  {id:"CB037",nama:"PNM Pekanbaru",provinsi:"RIAU",lat:0.479541,lng:101.46764},
  {id:"CB038",nama:"PNM Palembang",provinsi:"SUMATERA SELATAN",lat:-2.99343,lng:104.74449},
  {id:"CB039",nama:"PNM Palopo",provinsi:"SULAWESI SELATAN",lat:-3.00606,lng:120.20439},
  {id:"CB040",nama:"PNM Palu",provinsi:"SULAWESI TENGAH",lat:-0.904983,lng:119.89058},
  {id:"CB041",nama:"PNM Pematang Siantar",provinsi:"SUMATERA UTARA",lat:2.9564945,lng:99.051785},
  {id:"CB042",nama:"PNM Pati",provinsi:"JAWA TENGAH",lat:-6.742678,lng:111.03066},
  {id:"CB043",nama:"PNM Pontianak",provinsi:"KALIMANTAN BARAT",lat:-0.03317,lng:109.32578},
  {id:"CB044",nama:"PNM Purwokerto",provinsi:"JAWA TENGAH",lat:-7.444008,lng:109.23893},
  {id:"CB045",nama:"PNM Subang",provinsi:"JAWA BARAT",lat:-6.548558,lng:107.77222},
  {id:"CB046",nama:"PNM Surabaya",provinsi:"JAWA TIMUR",lat:-7.316243,lng:112.75044},
  {id:"CB047",nama:"PNM Kabanjahe",provinsi:"SUMATERA UTARA",lat:3.104997,lng:98.497228},
  {id:"CB048",nama:"PNM Sukabumi",provinsi:"JAWA BARAT",lat:-6.912216,lng:106.92958},
  {id:"CB049",nama:"PNM Solo",provinsi:"JAWA TENGAH",lat:-7.542021,lng:110.80844},
  {id:"CB050",nama:"PNM Semarang",provinsi:"JAWA TENGAH",lat:-7.012877,lng:110.39017},
  {id:"CB051",nama:"PNM Sintang",provinsi:"KALIMANTAN BARAT",lat:0.064178,lng:111.49261},
  {id:"CB052",nama:"PNM Serang",provinsi:"BANTEN",lat:-6.11606,lng:106.17262},
  {id:"CB053",nama:"PNM Tegal",provinsi:"JAWA TENGAH",lat:-6.857449,lng:109.13797},
  {id:"CB054",nama:"PNM Tangerang",provinsi:"BANTEN",lat:-6.208209,lng:106.62978},
  {id:"CB055",nama:"PNM Tulungagung",provinsi:"JAWA TIMUR",lat:-8.041344,lng:111.91211},
  {id:"CB056",nama:"PNM Tasikmalaya",provinsi:"JAWA BARAT",lat:-7.307419,lng:108.20826},
  {id:"CB057",nama:"PNM Wonogiri",provinsi:"JAWA TENGAH",lat:-7.830016,lng:110.92118},
  {id:"CB058",nama:"PNM Yogyakarta",provinsi:"DIY",lat:-7.798409,lng:110.38459},
];

/* ─── THEMES ─── */
const THEMES = {
  dark: {
    bg: "#070d18", surface: "#0c1525", surface2: "#0f1d30",
    border: "#0e2240", border2: "#163352",
    text: "#c8dff0", textSub: "#4a7090", textMuted: "#263e55",
    accent: "#0ea5e9", accentBg: "#0ea5e910",
    headerBg: "#08111f",
    sideBg: "#080f1c",
    scrollTrack: "#0a1520", scrollThumb: "#1a3050",
    shadow: "0 4px 24px #00000080",
    mapBg: "#07121f", mapStroke: "#0d2540", mapFill: "#0c2035",
    cardBg: "#0c1525",
    inputBg: "#0a1828", inputBorder: "#163352",
    toggleBg: "#1a3050", toggleKnob: "#0ea5e9",
  },
  light: {
    bg: "#f0f4f8", surface: "#ffffff", surface2: "#f5f9fc",
    border: "#dde8f0", border2: "#c5d8e8",
    text: "#1a2d3e", textSub: "#607d8b", textMuted: "#b0c8d8",
    accent: "#0284c7", accentBg: "#0284c710",
    headerBg: "#ffffff",
    sideBg: "#f8fafc",
    scrollTrack: "#e8f0f5", scrollThumb: "#b0d0e8",
    shadow: "0 4px 24px #00000018",
    mapBg: "#e8f2fb", mapStroke: "#c0d8ec", mapFill: "#d5e9f7",
    cardBg: "#ffffff",
    inputBg: "#f0f6fa", inputBorder: "#c5d8e8",
    toggleBg: "#e0eef8", toggleKnob: "#0284c7",
  }
};

const SEV_CFG = {
  rendah: { color:"#f59e0b", label:"RENDAH",  tip:["Pantau BMKG/BNPB","Siapkan tas darurat","Koordinasi cabang"] },
  sedang: { color:"#f97316", label:"SEDANG",  tip:["Aktifkan tim siaga","Evakuasi dokumen penting","Lapor setiap 2 jam","Siapkan jalur evakuasi"] },
  tinggi: { color:"#ef4444", label:"TINGGI",  tip:["⚠️ EVAKUASI SEGERA!","Tutup operasional","Hubungi BPBD lokal","Lapor pusat setiap 30 menit","Aktifkan posko krisis"] },
};

/* ─── HAVERSINE ─── */
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371, toR = x => x * Math.PI / 180;
  const dLat = toR(lat2-lat1), dLng = toR(lng2-lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toR(lat1))*Math.cos(toR(lat2))*Math.sin(dLng/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

/* ─── COORDINATE → SVG ─── */
const MAP_W = 580, MAP_H = 260;
function toSVG(lat, lng) {
  const x = ((lng - 94.0) / (142.0 - 94.0)) * (MAP_W - 30) + 15;
  const y = ((7.0 - lat) / (7.0 - (-12.0))) * (MAP_H - 24) + 12;
  return { x, y };
}

/* ─── XML PARSER ─── */
function parseXML(str) {
  return new DOMParser().parseFromString(str, "text/xml");
}
function xmlText(doc, tag) {
  const el = doc.querySelector(tag);
  return el ? el.textContent.trim() : "";
}

/* ─── BMKG FETCH — via /api/bmkg (Vercel Serverless) ─── */
// Endpoint internal sendiri, tidak bergantung CORS proxy publik
async function fetchBMKG(type) {
  try {
    const r = await fetch(`/api/bmkg?type=${type}`, {
      headers: { "Accept": "application/xml" },
    });
    if (!r.ok) throw new Error(`API error ${r.status}`);
    return await r.text();
  } catch { return null; }
}

function parseAutoGempa(xml) {
  if (!xml) return null;
  const doc = parseXML(xml);
  const lat  = parseFloat(xmlText(doc, "Lintang").replace("°LS","").replace("°LU",""));
  const lats = xmlText(doc, "Lintang");
  const lngs = xmlText(doc, "Bujur");
  const latV = lats.includes("LS") ? -Math.abs(parseFloat(lats)) : Math.abs(parseFloat(lats));
  const lngV = Math.abs(parseFloat(lngs));
  return {
    tanggal: xmlText(doc,"Tanggal"),
    jam:     xmlText(doc,"Jam"),
    mag:     parseFloat(xmlText(doc,"Magnitude")),
    kedalaman: xmlText(doc,"Kedalaman"),
    lat:     latV, lng: lngV,
    wilayah: xmlText(doc,"Wilayah"),
    potensi: xmlText(doc,"Potensi"),
    dirasakan: xmlText(doc,"Dirasakan"),
    shakemap: xmlText(doc,"Shakemap"),
  };
}

function parseGempaList(xml, isM5) {
  if (!xml) return [];
  const doc = parseXML(xml);
  return Array.from(doc.querySelectorAll("gempa")).slice(0,15).map((g,i) => {
    const lats = g.querySelector("Lintang")?.textContent||"";
    const lngs = g.querySelector("Bujur")?.textContent||"";
    const latV = lats.includes("LS") ? -Math.abs(parseFloat(lats)) : Math.abs(parseFloat(lats));
    const lngV = Math.abs(parseFloat(lngs));
    return {
      id: i,
      tanggal:   g.querySelector("Tanggal")?.textContent||"",
      jam:       g.querySelector("Jam")?.textContent||"",
      mag:       parseFloat(g.querySelector("Magnitude")?.textContent||"0"),
      kedalaman: g.querySelector("Kedalaman")?.textContent||"",
      lat: latV, lng: lngV,
      wilayah:   g.querySelector("Wilayah")?.textContent||"",
      potensi:   isM5 ? (g.querySelector("Potensi")?.textContent||"") : "",
      dirasakan: !isM5 ? (g.querySelector("Dirasakan")?.textContent||"") : "",
    };
  });
}

/* ─── WHATSAPP TEMPLATE ─── */
function buildWAMessage(gempa, cabangList) {
  const terdampak = cabangList.map(c=>`• ${c.nama} (${c.jarak} km)`).join("\n");
  return `🚨 *ALERT GEMPA BUMI - PNM DISASTER MONITOR*\n\n📅 ${gempa.tanggal} | ⏰ ${gempa.jam} WIB\n📍 *Lokasi:* ${gempa.wilayah}\n💪 *Magnitudo:* M${gempa.mag}\n🏔️ *Kedalaman:* ${gempa.kedalaman}\n⚠️ *Potensi:* ${gempa.potensi||"Tidak berpotensi tsunami"}\n\n🏢 *Cabang Terdampak (dalam radius):*\n${terdampak || "Tidak ada cabang dalam radius"}\n\n🔗 Pantau: BMKG App / bmkg.go.id\n_Dikirim otomatis oleh PNM Disaster Monitor_`;
}

/* ─── ISLAND SVG PATHS (simplified Indonesia) ─── */
const ISLAND_PATHS = [
  // Sumatra
  "M 55 22 L 68 14 L 90 12 L 118 20 L 140 35 L 148 55 L 143 78 L 130 98 L 110 112 L 88 108 L 68 90 L 52 65 L 48 42 Z",
  // Java
  "M 148 132 L 195 122 L 270 128 L 318 136 L 325 148 L 280 158 L 210 158 L 158 148 Z",
  // Kalimantan
  "M 205 28 L 268 18 L 320 26 L 352 50 L 358 88 L 338 115 L 298 128 L 255 122 L 212 105 L 192 72 L 188 46 Z",
  // Sulawesi
  "M 375 48 L 395 38 L 408 50 L 412 72 L 398 92 L 388 105 L 380 118 L 375 135 L 365 128 L 360 110 L 368 88 L 370 65 Z",
  "M 388 105 L 405 108 L 418 120 L 410 132 L 395 125 Z",
  "M 360 80 L 345 88 L 350 100 L 362 98 Z",
  // Maluku & Papua (simplified)
  "M 445 52 L 518 42 L 540 58 L 535 92 L 512 112 L 475 118 L 448 102 L 438 78 Z",
  "M 460 78 L 480 75 L 492 88 L 478 98 L 462 92 Z",
  // Bali & Nusa Tenggara
  "M 328 155 L 340 150 L 348 158 L 340 165 L 328 163 Z",
  "M 352 158 L 368 154 L 376 162 L 368 168 L 352 166 Z",
  "M 380 162 L 395 158 L 402 165 L 392 172 L 380 170 Z",
];

/* ══════════════════════════════════════════════
   KOMPONEN UTAMA
══════════════════════════════════════════════ */
export default function App() {
  const [isDark, setIsDark]       = useState(true);
  const [radius, setRadius]       = useState(100);
  const [autoGempa, setAutoGempa] = useState(null);
  const [listM5, setListM5]       = useState([]);
  const [listFelt, setListFelt]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [selectedGempa, setSelectedGempa] = useState(null);
  const [activeTab, setActiveTab] = useState("m5"); // m5 | felt
  const [showWA, setShowWA]       = useState(false);
  const [waPhone, setWaPhone]     = useState("628xxx");
  const [waMsg, setWaMsg]         = useState("");
  const [alertCabang, setAlertCabang] = useState([]);
  const [filterProv, setFilterProv] = useState("ALL");
  const [showShakemap, setShowShakemap] = useState(false);
  const [fetchError, setFetchError]   = useState(false);
  const timerRef = useRef(null);
  const T = isDark ? THEMES.dark : THEMES.light;

  /* ─── Fetch BMKG ─── */
  const fetchAll = useCallback(async () => {
    setLoading(true); setFetchError(false);
    try {
      const [xmlAuto, xmlM5, xmlFelt] = await Promise.all([
        fetchBMKG("autogempa"), fetchBMKG("gempaterkini"), fetchBMKG("gempadirasakan")
      ]);
      const ag = parseAutoGempa(xmlAuto);
      if (ag) setAutoGempa(ag);
      else setFetchError(true);
      setListM5(parseGempaList(xmlM5, true));
      setListFelt(parseGempaList(xmlFelt, false));
      setLastUpdate(new Date());
    } catch { setFetchError(true); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  /* ─── Auto-refresh 5 min ─── */
  useEffect(() => {
    timerRef.current = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(timerRef.current);
  }, [fetchAll]);

  /* ─── Proximity Alert ─── */
  useEffect(() => {
    if (!autoGempa) return;
    const nearby = CABANG
      .map(c => ({ ...c, jarak: haversine(autoGempa.lat, autoGempa.lng, c.lat, c.lng) }))
      .filter(c => c.jarak <= radius)
      .sort((a,b) => a.jarak - b.jarak);
    setAlertCabang(nearby);
  }, [autoGempa, radius]);

  /* ─── Selected gempa cabang ─── */
  const selCabang = selectedGempa ? CABANG
    .map(c => ({ ...c, jarak: haversine(selectedGempa.lat, selectedGempa.lng, c.lat, c.lng) }))
    .filter(c => c.jarak <= radius)
    .sort((a,b) => a.jarak - b.jarak) : [];

  const sevColor = mag => mag >= 6.5 ? "#ef4444" : mag >= 5.0 ? "#f97316" : "#f59e0b";
  const sevLabel = mag => mag >= 6.5 ? "TINGGI" : mag >= 5.0 ? "SEDANG" : "RENDAH";

  /* ─── WhatsApp ─── */
  const openWA = (gempa, cabList) => {
    setWaMsg(buildWAMessage(gempa, cabList));
    setShowWA(true);
  };
  const sendFonnte = async () => {
    alert(`Integrasi Fonnte:\nPOST https://api.fonnte.com/send\nHeaders: Authorization: YOUR_FONNTE_TOKEN\nBody: { target: "${waPhone}", message: "...", countryCode: "62" }\n\nGanti YOUR_FONNTE_TOKEN dengan token dari fonnte.com`);
  };

  /* ─── Filter provinsi ─── */
  const provinsiList = ["ALL", ...new Set(CABANG.map(c=>c.provinsi))].sort();
  const filteredCabang = filterProv === "ALL" ? CABANG : CABANG.filter(c=>c.provinsi===filterProv);

  /* ─── SVG map display gempa ─── */
  const mapGempa = selectedGempa || autoGempa;

  return (
    <>
      <style>{`
        ${FONT}
        * { box-sizing:border-box; margin:0; padding:0; }
        body { background:${T.bg}; font-family:'Exo 2',sans-serif; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:${T.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background:${T.scrollThumb}; border-radius:4px; }
        .mono { font-family:'Fira Code',monospace; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideIn { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ripple { 0%{transform:scale(0.8);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
        .pulse-dot { animation: pulse 1.5s ease-in-out infinite; }
        .slide-in { animation: slideIn 0.3s ease; }
        .fade-in { animation: fadeIn 0.4s ease; }
        .hover-row:hover { background:${T.accentBg}!important; cursor:pointer; }
        .btn-primary { background:${T.accent}; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-family:'Exo 2'; font-weight:700; font-size:12px; cursor:pointer; letter-spacing:1px; transition:opacity 0.2s; }
        .btn-primary:hover { opacity:0.85; }
        .btn-ghost { background:transparent; border:1px solid ${T.border2}; color:${T.textSub}; padding:6px 12px; border-radius:6px; font-family:'Fira Code'; font-size:11px; cursor:pointer; transition:all 0.2s; }
        .btn-ghost:hover { border-color:${T.accent}; color:${T.accent}; }
        .tab { padding:6px 14px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; border:none; letter-spacing:1px; transition:all 0.2s; font-family:'Exo 2'; }
        .tab-active { background:${T.accent}; color:#fff; }
        .tab-inactive { background:transparent; color:${T.textSub}; border:1px solid ${T.border}; }
        .tab-inactive:hover { border-color:${T.accent}; color:${T.accent}; }
        .toggle-switch { width:46px; height:24px; border-radius:12px; background:${T.toggleBg}; position:relative; cursor:pointer; transition:background 0.3s; border:none; display:flex; align-items:center; padding:0 3px; }
        .toggle-knob { width:18px; height:18px; border-radius:50%; background:${T.toggleKnob}; transition:transform 0.3s; transform:${isDark?"translateX(0)":"translateX(22px)"}; }
        input[type=range] { -webkit-appearance:none; width:100%; height:4px; border-radius:2px; background:${T.border2}; outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:14px; height:14px; border-radius:50%; background:${T.accent}; cursor:pointer; }
        select { background:${T.inputBg}; color:${T.text}; border:1px solid ${T.inputBorder}; border-radius:6px; padding:5px 8px; font-family:'Fira Code'; font-size:11px; outline:none; }
        select:focus { border-color:${T.accent}; }
        .alert-banner { background:linear-gradient(90deg,#ef444422,#ef444408); border:1px solid #ef444455; border-radius:8px; padding:10px 14px; animation: fadeIn 0.5s ease; }
        .modal-overlay { position:fixed; inset:0; background:#00000090; z-index:999; display:flex; align-items:center; justify-content:center; }
        .modal-box { background:${T.surface}; border:1px solid ${T.border2}; border-radius:12px; padding:24px; width:540px; max-height:80vh; overflow-y:auto; box-shadow:${T.shadow}; }
        textarea { background:${T.inputBg}; color:${T.text}; border:1px solid ${T.inputBorder}; border-radius:6px; padding:10px; font-family:'Fira Code'; font-size:11px; width:100%; line-height:1.6; outline:none; resize:vertical; }
        input[type=text] { background:${T.inputBg}; color:${T.text}; border:1px solid ${T.inputBorder}; border-radius:6px; padding:6px 10px; font-family:'Fira Code'; font-size:12px; outline:none; width:100%; }
        input[type=text]:focus, textarea:focus { border-color:${T.accent}; }
      `}</style>

      {/* ── WhatsApp Modal ── */}
      {showWA && (
        <div className="modal-overlay" onClick={()=>setShowWA(false)}>
          <div className="modal-box fade-in" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <div style={{fontWeight:800,fontSize:15,color:T.text,letterSpacing:1}}>📱 NOTIFIKASI WHATSAPP</div>
              <button className="btn-ghost" onClick={()=>setShowWA(false)}>✕ Tutup</button>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.textSub,marginBottom:6,fontFamily:"'Fira Code'"}}>NOMOR TUJUAN (format: 628xxx)</div>
              <input type="text" value={waPhone} onChange={e=>setWaPhone(e.target.value)} placeholder="628123456789"/>
            </div>
            <div style={{marginBottom:12}}>
              <div style={{fontSize:11,color:T.textSub,marginBottom:6,fontFamily:"'Fira Code'"}}>PESAN</div>
              <textarea rows={12} value={waMsg} onChange={e=>setWaMsg(e.target.value)}/>
            </div>
            <div style={{background:T.surface2,border:`1px solid ${T.border}`,borderRadius:8,padding:12,marginBottom:14}}>
              <div style={{fontSize:10,color:T.textSub,fontFamily:"'Fira Code'",marginBottom:6}}>▶ KODE INTEGRASI — FONNTE API</div>
              <pre style={{fontFamily:"'Fira Code'",fontSize:10,color:"#4ade80",lineHeight:1.7,whiteSpace:"pre-wrap"}}>
{`// Install: npm install axios
const axios = require('axios');

await axios.post('https://api.fonnte.com/send', {
  target: '${waPhone}',
  message: \`${waMsg.substring(0,60)}...\`,
  countryCode: '62'
}, {
  headers: { Authorization: 'YOUR_FONNTE_TOKEN' }
});

// Atau via Twilio:
// const client = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
// client.messages.create({
//   from: 'whatsapp:+14155238886',
//   to:   'whatsapp:+${waPhone}',
//   body: message
// });`}
              </pre>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn-primary" style={{background:"#25D366"}} onClick={sendFonnte}>
                📤 Kirim via Fonnte
              </button>
              <button className="btn-ghost" onClick={()=>{navigator.clipboard.writeText(waMsg).then(()=>alert("Pesan disalin!"))}}>
                📋 Salin Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Shakemap Modal ── */}
      {showShakemap && autoGempa?.shakemap && (
        <div className="modal-overlay" onClick={()=>setShowShakemap(false)}>
          <div className="modal-box fade-in" style={{width:"auto",textAlign:"center"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontWeight:800,fontSize:14,color:T.text,marginBottom:12}}>🗺️ SHAKEMAP — {autoGempa.wilayah}</div>
            <img src={`https://data.bmkg.go.id/DataMKG/TEWS/${autoGempa.shakemap}`} alt="Shakemap" style={{maxWidth:"100%",borderRadius:8}}/>
            <div style={{marginTop:12}}><button className="btn-ghost" onClick={()=>setShowShakemap(false)}>Tutup</button></div>
          </div>
        </div>
      )}

      <div style={{minHeight:"100vh",background:T.bg,color:T.text,transition:"all 0.3s"}}>

        {/* ══ HEADER ══ */}
        <div style={{background:T.headerBg,borderBottom:`1px solid ${T.border}`,padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:T.shadow,position:"sticky",top:0,zIndex:100}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${T.accent},#7c3aed)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🛡️</div>
            <div>
              <div style={{fontWeight:900,fontSize:15,letterSpacing:2,color:T.text}}>PNM DISASTER MONITOR</div>
              <div className="mono" style={{fontSize:9,color:T.textSub,letterSpacing:1}}>SISTEM PEMANTAUAN BENCANA REAL-TIME</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {loading && <div className="pulse-dot mono" style={{fontSize:11,color:"#f59e0b"}}>● MEMUAT DATA...</div>}
            {fetchError && !loading && <div className="mono" style={{fontSize:11,color:"#ef4444"}}>⚠ GAGAL AKSES BMKG</div>}
            {lastUpdate && !loading && (
              <div className="mono" style={{fontSize:10,color:T.textSub}}>
                Update: {lastUpdate.toLocaleTimeString("id-ID")}
              </div>
            )}
            <button className="btn-ghost" onClick={fetchAll} disabled={loading} style={{fontSize:11}}>↺ Refresh</button>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:12}}>{isDark?"🌙":"☀️"}</span>
              <button className="toggle-switch" onClick={()=>setIsDark(!isDark)}>
                <div className="toggle-knob"/>
              </button>
            </div>
          </div>
        </div>

        {/* ══ ALERT BANNER (jika ada cabang terdampak) ══ */}
        {alertCabang.length > 0 && autoGempa && (
          <div style={{padding:"8px 20px",background:"#ef444410",borderBottom:"1px solid #ef444430"}}>
            <div className="alert-banner">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <span className="pulse-dot" style={{fontSize:18}}>🚨</span>
                  <div>
                    <span style={{fontWeight:800,color:"#ef4444",fontSize:13,letterSpacing:1}}>PERINGATAN AKTIF — </span>
                    <span style={{fontWeight:600,color:T.text,fontSize:13}}>{alertCabang.length} cabang dalam radius {radius} km dari gempa M{autoGempa.mag}</span>
                  </div>
                </div>
                <button className="btn-primary" style={{background:"#25D366",fontSize:11}} onClick={()=>openWA(autoGempa,alertCabang)}>
                  📱 Kirim WhatsApp Alert
                </button>
              </div>
              <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                {alertCabang.slice(0,5).map(c=>(
                  <span key={c.id} className="mono" style={{fontSize:10,background:"#ef444420",border:"1px solid #ef444440",borderRadius:4,padding:"2px 8px",color:"#ef4444"}}>
                    {c.nama} · {c.jarak} km
                  </span>
                ))}
                {alertCabang.length > 5 && <span className="mono" style={{fontSize:10,color:"#ef4444"}}>+{alertCabang.length-5} lainnya</span>}
              </div>
            </div>
          </div>
        )}

        <div style={{display:"flex",height:"calc(100vh - 58px - (alertCabang.length>0?74px:0))"}}>

          {/* ══ SIDEBAR KIRI ══ */}
          <div style={{width:220,minWidth:220,background:T.sideBg,borderRight:`1px solid ${T.border}`,overflowY:"auto",padding:"14px 0"}}>

            {/* Radius Control */}
            <div style={{padding:"0 14px 14px",borderBottom:`1px solid ${T.border}`}}>
              <div className="mono" style={{fontSize:9,color:T.textMuted,letterSpacing:2,marginBottom:10}}>RADIUS ALERT</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:12,color:T.text,fontWeight:700}}>{radius} km</span>
                <span className="mono" style={{fontSize:10,color:T.textSub}}>{alertCabang.length} cabang</span>
              </div>
              <input type="range" min="25" max="500" step="25" value={radius} onChange={e=>setRadius(Number(e.target.value))}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                <span className="mono" style={{fontSize:9,color:T.textMuted}}>25km</span>
                <span className="mono" style={{fontSize:9,color:T.textMuted}}>500km</span>
              </div>
            </div>

            {/* Filter Provinsi */}
            <div style={{padding:"12px 14px",borderBottom:`1px solid ${T.border}`}}>
              <div className="mono" style={{fontSize:9,color:T.textMuted,letterSpacing:2,marginBottom:8}}>FILTER PROVINSI</div>
              <select value={filterProv} onChange={e=>setFilterProv(e.target.value)} style={{width:"100%"}}>
                {provinsiList.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>

            {/* Cabang List */}
            <div style={{padding:"12px 14px 8px"}}>
              <div className="mono" style={{fontSize:9,color:T.textMuted,letterSpacing:2,marginBottom:8}}>
                KANTOR CABANG ({filteredCabang.length})
              </div>
            </div>
            {filteredCabang.map(c=>{
              const inAlert = alertCabang.some(a=>a.id===c.id);
              const jarak = autoGempa ? haversine(autoGempa.lat,autoGempa.lng,c.lat,c.lng) : null;
              return (
                <div key={c.id} className="hover-row" style={{padding:"7px 14px",borderLeft:inAlert?"3px solid #ef4444":"3px solid transparent",background:inAlert?"#ef444408":"transparent"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:12,color:inAlert?"#ef4444":T.text,fontWeight:inAlert?700:400,lineHeight:1.3}}>{c.nama}</div>
                    {inAlert && <span className="pulse-dot" style={{color:"#ef4444",fontSize:14}}>●</span>}
                  </div>
                  <div className="mono" style={{fontSize:9,color:T.textMuted,marginTop:2}}>
                    {c.provinsi}
                    {jarak && ` · ${jarak} km`}
                  </div>
                </div>
              );
            })}

            {/* Legend */}
            <div style={{padding:"14px 14px 8px",marginTop:10,borderTop:`1px solid ${T.border}`}}>
              <div className="mono" style={{fontSize:9,color:T.textMuted,letterSpacing:2,marginBottom:8}}>TINGKAT BAHAYA</div>
              {Object.entries(SEV_CFG).map(([k,v])=>(
                <div key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:v.color}}/>
                  <span className="mono" style={{fontSize:10,color:T.textSub}}>{v.label}</span>
                </div>
              ))}
            </div>

            {/* Sumber Data */}
            <div style={{padding:"10px 14px",borderTop:`1px solid ${T.border}`}}>
              <div className="mono" style={{fontSize:9,color:T.textMuted,letterSpacing:2,marginBottom:6}}>SUMBER DATA</div>
              {["BMKG (Real-time)","BNPB","PVMBG","Excel PNM"].map(s=>(
                <div key={s} className="mono" style={{fontSize:10,color:T.textMuted,marginBottom:3}}>· {s}</div>
              ))}
            </div>
          </div>

          {/* ══ AREA UTAMA ══ */}
          <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:14}}>

            {/* STAT CARDS */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
              {[
                { label:"Cabang PNM",   value:CABANG.length,     sub:"Seluruh Indonesia",    color:T.accent,    icon:"🏢" },
                { label:"Mag. Terbaru", value:autoGempa?`M${autoGempa.mag}`:"—", sub:autoGempa?.wilayah?.substring(0,28)||"Memuat...", color:autoGempa?sevColor(autoGempa.mag):"#888", icon:"⚡" },
                { label:"Cabang Alert", value:alertCabang.length, sub:`Radius ${radius} km`,  color:alertCabang.length>0?"#ef4444":"#22c55e", icon:"🚨" },
                { label:"Data Gempa",   value:listM5.length+listFelt.length, sub:"M5+ & Dirasakan", color:"#a855f7", icon:"📊" },
              ].map((s,i)=>(
                <div key={i} style={{background:T.cardBg,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px",borderLeft:`3px solid ${s.color}`,boxShadow:T.shadow}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div className="mono" style={{fontSize:9,color:T.textSub,letterSpacing:2,marginBottom:6}}>{s.label}</div>
                      <div style={{fontWeight:900,fontSize:22,color:s.color,letterSpacing:1}}>{s.value}</div>
                      <div className="mono" style={{fontSize:9,color:T.textMuted,marginTop:4,lineHeight:1.4}}>{s.sub}</div>
                    </div>
                    <span style={{fontSize:20,opacity:0.7}}>{s.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* GEMPA TERBARU + PETA */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:14}}>

              {/* PETA SVG */}
              <div style={{background:T.cardBg,border:`1px solid ${T.border}`,borderRadius:10,padding:14,boxShadow:T.shadow}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontWeight:800,fontSize:12,color:T.text,letterSpacing:1.5}}>🗺️ PETA CABANG & EPISENTER GEMPA</div>
                  <div className="mono" style={{fontSize:9,color:T.textSub}}>◆ cabang · ★ gempa · lingkaran = radius alert</div>
                </div>
                <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{width:"100%",background:T.mapBg,borderRadius:8,border:`1px solid ${T.border}`}}>
                  {/* Ocean bg */}
                  <rect width={MAP_W} height={MAP_H} fill={T.mapBg}/>
                  {/* Grid */}
                  {[0.2,0.4,0.6,0.8].map(r=>(
                    <line key={r} x1={MAP_W*r} y1={0} x2={MAP_W*r} y2={MAP_H} stroke={T.mapStroke} strokeWidth="0.4" strokeDasharray="3,4"/>
                  ))}
                  {[0.25,0.5,0.75].map(r=>(
                    <line key={r} x1={0} y1={MAP_H*r} x2={MAP_W} y2={MAP_H*r} stroke={T.mapStroke} strokeWidth="0.4" strokeDasharray="3,4"/>
                  ))}
                  {/* Islands */}
                  {ISLAND_PATHS.map((p,i)=>(
                    <path key={i} d={p} fill={T.mapFill} stroke={T.mapStroke} strokeWidth="0.8"/>
                  ))}
                  {/* Radius circle di episenter gempa terpilih */}
                  {mapGempa && (()=>{
                    const ep = toSVG(mapGempa.lat, mapGempa.lng);
                    const deg = radius / 111;
                    const px  = (deg / (142-94)) * (MAP_W-30);
                    return (
                      <circle cx={ep.x} cy={ep.y} r={px} fill="none"
                        stroke={alertCabang.length>0?"#ef4444":"#f97316"}
                        strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
                    );
                  })()}
                  {/* Cabang markers */}
                  {filteredCabang.map(c=>{
                    const {x,y} = toSVG(c.lat,c.lng);
                    const inAlert = alertCabang.some(a=>a.id===c.id);
                    return (
                      <g key={c.id} style={{cursor:"pointer"}}>
                        <circle cx={x} cy={y} r={inAlert?4.5:3} fill={inAlert?"#ef4444":T.accent} stroke={T.surface} strokeWidth="1" opacity="0.9"/>
                        {inAlert && <circle cx={x} cy={y} r={7} fill="none" stroke="#ef4444" strokeWidth="0.8" opacity="0.5"/>}
                      </g>
                    );
                  })}
                  {/* Gempa terbaru / terpilih */}
                  {mapGempa && (()=>{
                    const {x,y} = toSVG(mapGempa.lat,mapGempa.lng);
                    const col = sevColor(mapGempa.mag);
                    return (
                      <g>
                        <polygon points={`${x},${y-8} ${x+7},${y+5} ${x-7},${y+5}`} fill={col} opacity="0.95" stroke="#fff" strokeWidth="0.8"/>
                        <text x={x} y={y-11} textAnchor="middle" fill={col} fontSize="6.5" fontFamily="'Exo 2'" fontWeight="bold">M{mapGempa.mag}</text>
                      </g>
                    );
                  })()}
                  {/* Gempa list M5 */}
                  {listM5.slice(0,10).map((g,i)=>{
                    if(!g.lat||!g.lng) return null;
                    const {x,y} = toSVG(g.lat,g.lng);
                    const col = sevColor(g.mag);
                    return (
                      <circle key={i} cx={x} cy={y} r={Math.max(2.5,g.mag-2.5)} fill={col}
                        opacity="0.5" stroke={col} strokeWidth="0.5" style={{cursor:"pointer"}}
                        onClick={()=>setSelectedGempa(g)}/>
                    );
                  })}
                  {/* Labels */}
                  <text x={22} y={MAP_H-5} fill={T.textMuted} fontSize="7" fontFamily="'Fira Code'">94°E</text>
                  <text x={MAP_W-30} y={MAP_H-5} fill={T.textMuted} fontSize="7" fontFamily="'Fira Code'">141°E</text>
                </svg>
                {/* Legenda peta */}
                <div style={{display:"flex",gap:16,marginTop:8,flexWrap:"wrap"}}>
                  {[
                    {shape:"●",color:T.accent,label:"Cabang PNM"},
                    {shape:"●",color:"#ef4444",label:"Cabang Alert"},
                    {shape:"▲",color:"#ef4444",label:"Episenter Gempa"},
                    {shape:"○",color:"#f97316",label:"M5+ Terkini"},
                  ].map(l=>(
                    <div key={l.label} style={{display:"flex",alignItems:"center",gap:4}}>
                      <span className="mono" style={{color:l.color,fontSize:11}}>{l.shape}</span>
                      <span className="mono" style={{fontSize:9,color:T.textSub}}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GEMPA TERBARU CARD */}
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {/* Auto Gempa */}
                <div style={{background:T.cardBg,border:`1px solid ${T.border}`,borderRadius:10,padding:14,boxShadow:T.shadow,flex:"none"}}>
                  <div style={{fontWeight:800,fontSize:11,color:T.text,letterSpacing:1.5,marginBottom:10}}>⚡ GEMPA TERBARU (BMKG)</div>
                  {loading && !autoGempa ? (
                    <div className="mono pulse-dot" style={{fontSize:11,color:T.textSub,textAlign:"center",padding:"20px 0"}}>Memuat data BMKG...</div>
                  ) : fetchError && !autoGempa ? (
                    <div className="mono" style={{fontSize:11,color:"#ef4444",textAlign:"center",padding:"20px 0"}}>
                      ⚠ Gagal akses BMKG<br/>
                      <span style={{fontSize:9,color:T.textSub}}>Cek koneksi / CORS proxy</span>
                    </div>
                  ) : autoGempa ? (
                    <div className="fade-in">
                      <div style={{textAlign:"center",marginBottom:12}}>
                        <div style={{fontWeight:900,fontSize:38,color:sevColor(autoGempa.mag),letterSpacing:2}}>M{autoGempa.mag}</div>
                        <div style={{fontWeight:700,fontSize:11,color:sevColor(autoGempa.mag),background:`${sevColor(autoGempa.mag)}18`,border:`1px solid ${sevColor(autoGempa.mag)}40`,borderRadius:4,padding:"2px 10px",display:"inline-block",letterSpacing:2,marginTop:4}}>
                          {sevLabel(autoGempa.mag)}
                        </div>
                      </div>
                      {[
                        ["📍 Lokasi", autoGempa.wilayah],
                        ["📅 Waktu",  `${autoGempa.tanggal} ${autoGempa.jam}`],
                        ["🏔️ Kedalaman", autoGempa.kedalaman],
                        ["🌊 Potensi", autoGempa.potensi||"Tidak berpotensi tsunami"],
                        ["👥 Dirasakan", autoGempa.dirasakan||"—"],
                      ].map(([k,v])=>(
                        <div key={k} style={{display:"flex",gap:8,marginBottom:6,alignItems:"flex-start"}}>
                          <span className="mono" style={{fontSize:9,color:T.textSub,minWidth:70,paddingTop:1}}>{k}</span>
                          <span style={{fontSize:11,color:T.text,fontWeight:600,lineHeight:1.4}}>{v}</span>
                        </div>
                      ))}
                      <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                        {autoGempa.shakemap && (
                          <button className="btn-ghost" onClick={()=>setShowShakemap(true)} style={{fontSize:10}}>🗺️ Shakemap</button>
                        )}
                        <button className="btn-primary" style={{fontSize:10,background:"#25D366"}} onClick={()=>openWA(autoGempa,alertCabang)}>
                          📱 WA Alert
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Cabang Terdampak */}
                {alertCabang.length > 0 && (
                  <div style={{background:"#ef444408",border:"1px solid #ef444430",borderRadius:10,padding:14,flex:1,overflowY:"auto",maxHeight:220}}>
                    <div style={{fontWeight:800,fontSize:11,color:"#ef4444",letterSpacing:1.5,marginBottom:8}}>
                      🏢 CABANG TERDAMPAK ({alertCabang.length})
                    </div>
                    {alertCabang.map(c=>(
                      <div key={c.id} className="hover-row" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 6px",borderRadius:4,marginBottom:2}}>
                        <div>
                          <div style={{fontSize:11,fontWeight:700,color:T.text}}>{c.nama}</div>
                          <div className="mono" style={{fontSize:9,color:T.textSub}}>{c.provinsi}</div>
                        </div>
                        <div className="mono" style={{fontSize:10,color:"#ef4444",fontWeight:700,whiteSpace:"nowrap"}}>{c.jarak} km</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* GEMPA LIST TABS */}
            <div style={{background:T.cardBg,border:`1px solid ${T.border}`,borderRadius:10,padding:14,boxShadow:T.shadow}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontWeight:800,fontSize:12,color:T.text,letterSpacing:1.5}}>📋 DATA GEMPA TERKINI</div>
                <div style={{display:"flex",gap:6}}>
                  <button className={`tab ${activeTab==="m5"?"tab-active":"tab-inactive"}`} onClick={()=>setActiveTab("m5")}>M5+ ({listM5.length})</button>
                  <button className={`tab ${activeTab==="felt"?"tab-active":"tab-inactive"}`} onClick={()=>setActiveTab("felt")}>Dirasakan ({listFelt.length})</button>
                </div>
              </div>

              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead>
                    <tr style={{borderBottom:`1px solid ${T.border}`}}>
                      {["#","Tanggal","Waktu","Mag.","Kedalaman","Lokasi",activeTab==="m5"?"Potensi":"Dirasakan","Jarak ke Cabang Terdekat","Aksi"].map(h=>(
                        <th key={h} className="mono" style={{textAlign:"left",padding:"6px 10px",fontSize:9,color:T.textMuted,letterSpacing:1,fontWeight:500}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab==="m5"?listM5:listFelt).map((g,i)=>{
                      const nearCabang = g.lat ? CABANG
                        .map(c=>({...c,jarak:haversine(g.lat,g.lng,c.lat,c.lng)}))
                        .sort((a,b)=>a.jarak-b.jarak)[0] : null;
                      const isAlert = nearCabang && nearCabang.jarak <= radius;
                      return (
                        <tr key={i} className="hover-row" onClick={()=>setSelectedGempa(g)}
                          style={{borderBottom:`1px solid ${T.border}`,background:selectedGempa?.id===g.id?`${sevColor(g.mag)}08`:"transparent"}}>
                          <td className="mono" style={{padding:"8px 10px",fontSize:10,color:T.textMuted}}>{i+1}</td>
                          <td className="mono" style={{padding:"8px 10px",fontSize:10,color:T.textSub,whiteSpace:"nowrap"}}>{g.tanggal}</td>
                          <td className="mono" style={{padding:"8px 10px",fontSize:10,color:T.textSub,whiteSpace:"nowrap"}}>{g.jam}</td>
                          <td style={{padding:"8px 10px"}}>
                            <span style={{fontWeight:800,fontSize:13,color:sevColor(g.mag)}}>M{g.mag}</span>
                          </td>
                          <td className="mono" style={{padding:"8px 10px",fontSize:10,color:T.textSub}}>{g.kedalaman}</td>
                          <td style={{padding:"8px 10px",fontSize:11,color:T.text,maxWidth:160}}>{g.wilayah}</td>
                          <td style={{padding:"8px 10px",fontSize:10,color:T.textSub,maxWidth:130}}>{activeTab==="m5"?g.potensi:g.dirasakan}</td>
                          <td style={{padding:"8px 10px"}}>
                            {nearCabang ? (
                              <div>
                                <div style={{fontSize:11,fontWeight:700,color:isAlert?"#ef4444":T.text}}>{nearCabang.nama}</div>
                                <div className="mono" style={{fontSize:9,color:isAlert?"#ef4444":T.textSub}}>{nearCabang.jarak} km {isAlert&&"⚠️"}</div>
                              </div>
                            ) : <span className="mono" style={{fontSize:9,color:T.textMuted}}>—</span>}
                          </td>
                          <td style={{padding:"8px 10px"}}>
                            <button className="btn-ghost" style={{fontSize:9,padding:"3px 8px"}} onClick={e=>{e.stopPropagation();const c=CABANG.map(cb=>({...cb,jarak:haversine(g.lat,g.lng,cb.lat,cb.lng)})).filter(cb=>cb.jarak<=radius).sort((a,b)=>a.jarak-b.jarak);openWA(g,c);}}>
                              📱 WA
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {(activeTab==="m5"?listM5:listFelt).length===0 && (
                      <tr><td colSpan={9} style={{textAlign:"center",padding:"24px",color:T.textSub}} className="mono">
                        {loading?"Memuat data...":"Tidak ada data"}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* INSTRUKSI DARURAT */}
            {autoGempa && (
              <div style={{background:T.cardBg,border:`1px solid ${T.border}`,borderRadius:10,padding:14,boxShadow:T.shadow}}>
                <div style={{fontWeight:800,fontSize:12,color:T.text,letterSpacing:1.5,marginBottom:12}}>📋 PROTOKOL RESPONS DARURAT</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                  {Object.entries(SEV_CFG).map(([k,v])=>(
                    <div key={k} style={{background:`${v.color}10`,border:`1px solid ${v.color}30`,borderRadius:8,padding:12,
                      opacity:k==="tinggi"&&autoGempa.mag>=6.5||k==="sedang"&&autoGempa.mag>=5&&autoGempa.mag<6.5||k==="rendah"&&autoGempa.mag<5?1:0.5}}>
                      <div style={{fontWeight:800,fontSize:11,color:v.color,letterSpacing:1.5,marginBottom:8}}>
                        {k==="tinggi"?"⚠️ ":k==="sedang"?"⚡ ":"ℹ️ "}{v.label}
                        {((k==="tinggi"&&autoGempa.mag>=6.5)||(k==="sedang"&&autoGempa.mag>=5&&autoGempa.mag<6.5)||(k==="rendah"&&autoGempa.mag<5)) && (
                          <span style={{marginLeft:6,fontSize:9,background:v.color,color:"#fff",borderRadius:3,padding:"1px 5px"}}>AKTIF</span>
                        )}
                      </div>
                      {v.tip.map((t,i)=>(
                        <div key={i} style={{fontSize:11,color:T.text,marginBottom:5,display:"flex",gap:6,alignItems:"flex-start"}}>
                          <span style={{color:v.color,marginTop:1}}>›</span><span>{t}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="mono" style={{textAlign:"center",fontSize:9,color:T.textMuted,padding:"8px 0",borderTop:`1px solid ${T.border}`}}>
              PNM Disaster Monitor v2.0 · Data: BMKG Real-time · 58 Cabang PNM · {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
