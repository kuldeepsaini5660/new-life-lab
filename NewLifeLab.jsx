import React, { useState, useRef, useCallback } from "react";
// import ownerPhoto from "./lkg.png";
/* ==========================================================
   NEW LIFE LAB — React version
   WhatsApp number badalna ho to niche WA_NUMBER change karein
   ========================================================== */
const WA_NUMBER = "917062217553"; // country code + number, no + or spaces
const LAB_NAME = "New Life Lab";
const LOGO_SRC = "data:image/png;base64,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";

const SITE_CSS = `
/* ============================================================
   NEW LIFE LAB — single file website
   WhatsApp number badalna ho to niche WA_NUMBER change karein
   ============================================================ */
:root{
  --navy:#0B2A63;
  --navy-deep:#071C45;
  --green:#168A32;
  --green-light:#6DBE45;
  --white:#FFFFFF;
  --ink:#18233A;
  --muted:#5A6883;
  --line:#E3E9F2;
  --soft:#F5F8FC;
  --radius:14px;
  --maxw:1140px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background:var(--white);color:var(--ink);
  font-family:'Inter',system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;
}
h1,h2,h3,h4{font-family:'Bricolage Grotesque','Inter',sans-serif;line-height:1.15;margin:0 0 .5em;color:var(--navy);font-weight:700;letter-spacing:-.01em}
h1{font-size:clamp(2rem,4.6vw,3.2rem)}
h2{font-size:clamp(1.5rem,3vw,2.1rem)}
h3{font-size:1.15rem}
p{margin:0 0 1em;max-width:70ch}
a{color:var(--navy);text-decoration:none}
img,svg{max-width:100%}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 20px}
.section{padding:64px 0;border-top:1px solid var(--line)}
.section:first-of-type{border-top:0}
.center{text-align:center}
.center p{margin-left:auto;margin-right:auto}
.lead{font-size:1.06rem;color:var(--muted)}

/* ---------- Buttons ---------- */
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:999px;
  font-weight:600;font-size:.95rem;border:1.5px solid transparent;cursor:pointer;transition:.18s;font-family:inherit}
.btn-green{background:var(--green);color:#fff}
.btn-green:hover{background:#12762a}
.btn-navy{background:var(--navy);color:#fff}
.btn-navy:hover{background:var(--navy-deep)}
.btn-ghost{background:#fff;color:var(--navy);border-color:var(--navy)}
.btn-ghost:hover{background:var(--soft)}
.btn:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,button:focus-visible{outline:3px solid var(--green-light);outline-offset:2px}
.btn-row{display:flex;gap:12px;flex-wrap:wrap}

/* ---------- Header ---------- */
header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;gap:16px;padding:10px 20px;max-width:var(--maxw);margin:0 auto}
.brand{display:flex;align-items:center;gap:10px;cursor:pointer}
.brand-logo{height:52px;width:auto;display:block}
.footer-logo{background:#fff;display:inline-block;padding:10px 14px;border-radius:12px;margin-bottom:14px}
.footer-logo img{height:40px;width:auto;display:block}
.brand-txt strong{display:block;font-family:'Bricolage Grotesque',sans-serif;font-size:1.02rem;color:var(--navy);line-height:1.1;font-weight:800}
.brand-txt span{display:block;font-size:.66rem;letter-spacing:.09em;color:var(--green);font-weight:600}
.menu{display:flex;gap:4px;margin-left:auto;flex-wrap:wrap}
.menu a{padding:8px 11px;border-radius:8px;font-size:.9rem;font-weight:500;color:var(--ink)}
.menu a:hover{background:var(--soft);color:var(--navy)}
.menu a.active{color:var(--green);font-weight:600}
.nav-cta{display:flex;align-items:center;gap:10px}
.nav-phone{font-weight:700;color:var(--navy);font-size:.95rem;white-space:nowrap}
.burger{display:none;margin-left:auto;background:#fff;border:1.5px solid var(--line);border-radius:10px;padding:8px 10px;cursor:pointer}
.burger span{display:block;width:20px;height:2px;background:var(--navy);margin:4px 0;border-radius:2px}
@media(max-width:1000px){
  .menu{display:none;order:3;width:100%;flex-direction:column;margin-left:0;padding-top:8px;border-top:1px solid var(--line)}
  .menu.open{display:flex}
  .burger{display:block}
  .nav-cta .nav-phone{display:none}
  .nav{flex-wrap:wrap}
}

/* ---------- Hero ---------- */
.hero{padding:56px 0 44px;background:
   radial-gradient(900px 340px at 88% 0%, #EEF7EE 0%, rgba(255,255,255,0) 70%),
   radial-gradient(700px 300px at 0% 10%, #EDF2FB 0%, rgba(255,255,255,0) 70%);}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:44px;align-items:center}
@media(max-width:900px){.hero-grid{grid-template-columns:1fr;gap:28px}}
.pill{display:inline-flex;align-items:center;gap:8px;background:#EAF6EC;color:var(--green);
  font-weight:600;font-size:.8rem;padding:6px 14px;border-radius:999px;margin-bottom:18px}
.hero h1 span{color:var(--green)}
.tagline{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;color:var(--green);font-size:1.05rem;margin-bottom:6px}
.hero-points{list-style:none;padding:0;margin:22px 0 26px;display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;max-width:520px}
.hero-points li{display:flex;gap:9px;align-items:flex-start;font-size:.94rem;color:var(--ink)}
.tick{flex:0 0 18px;margin-top:3px}
@media(max-width:520px){.hero-points{grid-template-columns:1fr}}

/* ---------- Cards ---------- */
.grid{display:grid;gap:18px}
.g2{grid-template-columns:repeat(2,1fr)}
.g3{grid-template-columns:repeat(3,1fr)}
.g4{grid-template-columns:repeat(4,1fr)}
@media(max-width:880px){.g3,.g4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr}}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:22px}
.card h3{margin-bottom:6px}
.card p{font-size:.92rem;color:var(--muted);margin:0}
.card .ic{width:44px;height:44px;margin-bottom:14px}
.feature{border-left:3px solid var(--green-light)}

/* test list */
.testbox{border:1px solid var(--line);border-radius:var(--radius);padding:22px}
.testbox h3{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.testbox ul{margin:0;padding-left:0;list-style:none;columns:2;column-gap:24px}
.testbox li{font-size:.92rem;padding:4px 0 4px 18px;position:relative;break-inside:avoid;color:var(--ink)}
.testbox li::before{content:"";position:absolute;left:0;top:12px;width:7px;height:7px;border-radius:50%;background:var(--green-light)}
@media(max-width:560px){.testbox ul{columns:1}}

/* packages */
.pack{border:1px solid var(--line);border-radius:var(--radius);padding:24px;display:flex;flex-direction:column}
.pack .top{border-bottom:1px dashed var(--line);padding-bottom:12px;margin-bottom:14px}
.pack ul{list-style:none;padding:0;margin:0 0 20px}
.pack li{font-size:.92rem;padding:5px 0 5px 20px;position:relative}
.pack li::before{content:"✓";position:absolute;left:0;color:var(--green);font-weight:700}
.pack .btn{margin-top:auto;align-self:flex-start}

/* steps */
.steps{counter-reset:s;display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
@media(max-width:900px){.steps{grid-template-columns:repeat(2,1fr)}}
@media(max-width:520px){.steps{grid-template-columns:1fr}}
.step{counter-increment:s;padding:20px;border:1px solid var(--line);border-radius:var(--radius);background:var(--soft)}
.step::before{content:counter(s,decimal-leading-zero);font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:1.3rem;color:var(--green-light);display:block;margin-bottom:6px}
.step h4{margin:0 0 4px;font-size:1rem}
.step p{font-size:.86rem;color:var(--muted);margin:0}

/* forms */
.form{background:var(--soft);border:1px solid var(--line);border-radius:18px;padding:26px;max-width:720px}
.field{margin-bottom:14px}
.field label{display:block;font-size:.85rem;font-weight:600;margin-bottom:6px;color:var(--navy)}
.field input,.field select,.field textarea{
  width:100%;padding:12px 14px;border:1.5px solid var(--line);border-radius:10px;background:#fff;
  font-family:inherit;font-size:.95rem;color:var(--ink)}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--green)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:600px){.two{grid-template-columns:1fr}}
.radio-row{display:flex;gap:18px;flex-wrap:wrap;font-size:.94rem}
.radio-row label{display:flex;align-items:center;gap:7px;font-weight:500;color:var(--ink)}
.radio-row input{width:auto}
.note{font-size:.85rem;color:var(--muted)}
.err{color:#B3261E;font-size:.85rem;display:none;margin-top:8px}

/* faq */
details{border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:10px;background:#fff}
details[open]{border-color:var(--green-light)}
summary{cursor:pointer;font-weight:600;color:var(--navy);list-style:none}
summary::-webkit-details-marker{display:none}
summary::after{content:"+";float:right;color:var(--green);font-weight:700}
details[open] summary::after{content:"–"}
details p{margin:10px 0 0;font-size:.93rem;color:var(--muted)}

/* strip */
.strip{background:var(--navy);color:#fff;border-radius:20px;padding:38px;display:flex;
  justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.strip h2{color:#fff;margin-bottom:6px}
.strip p{color:#C9D6EE;margin:0}

/* owner section */
.owner-wrap{display:grid;grid-template-columns:280px 1fr;gap:36px;align-items:center;background:var(--soft);
  border:1px solid var(--line);border-radius:20px;padding:32px}
@media(max-width:720px){.owner-wrap{grid-template-columns:1fr;text-align:center}}
.owner-photo{width:100%;aspect-ratio:1/1;max-width:260px;margin:0 auto;border-radius:50%;overflow:hidden;
  background:#EAF0FA;border:4px solid #fff;box-shadow:0 8px 24px rgba(11,42,99,.15);display:grid;place-items:center}
.owner-photo img{width:100%;height:100%;object-fit:cover;display:block}
.owner-photo .ph-icon{width:60%;height:60%;opacity:.55}
.owner-text .role{color:var(--green);font-weight:600;font-size:.92rem;margin-bottom:6px;display:block}
.owner-text blockquote{margin:14px 0 0;padding-left:16px;border-left:3px solid var(--green-light);
  font-style:italic;color:var(--muted);font-size:.98rem}
@media(max-width:720px){.owner-text blockquote{text-align:left}}

/* footer */
footer{background:var(--navy);color:#C9D6EE;margin-top:0;padding:52px 0 26px}
.fgrid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:28px}
@media(max-width:860px){.fgrid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.fgrid{grid-template-columns:1fr}}
footer h4{color:#fff;font-size:.95rem;margin-bottom:12px}
footer a{color:#C9D6EE;font-size:.92rem;display:block;padding:4px 0}
footer a:hover{color:var(--green-light)}
.fbot{border-top:1px solid rgba(255,255,255,.15);margin-top:30px;padding-top:18px;font-size:.84rem;text-align:center}

/* whatsapp float */
.wa-float{position:fixed;right:18px;bottom:18px;z-index:80;width:56px;height:56px;border-radius:50%;
  background:#25D366;display:grid;place-items:center;box-shadow:0 6px 20px rgba(0,0,0,.22)}
.legal p, .legal li{color:var(--muted);font-size:.95rem}
.legal ul{padding-left:20px}
.page{display:none}
.page.active{display:block}
@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
.mt-14{margin-top:14px}.mt-18{margin-top:18px}.mt-22{margin-top:22px}.mt-24{margin-top:24px}
.mt-26{margin-top:26px}.mt-28{margin-top:28px}.mt-32{margin-top:32px}.mt-34{margin-top:34px}
.mt-44{margin-top:44px}
.max-520{max-width:520px}.max-720{max-width:720px}.max-800{max-width:800px}
.center-row{justify-content:center}
.mb-0{margin-bottom:0}.mb-4{margin-bottom:4px}.mb-10{margin-bottom:10px}

`;

function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
}
function openWA(text) {
  window.open(waLink(text), "_blank", "noopener");
}

/* ---------- small icon helpers ---------- */
function Tick() {
  return (
    <svg className="tick" viewBox="0 0 20 20" width="18" height="18">
      <circle cx="10" cy="10" r="9" fill="#EAF6EC" />
      <path d="M6 10.5l2.6 2.6L14 7.7" fill="none" stroke="#168A32" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.5-.3.3c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.2.1.4.2.4.3.1.2.1.7-.1 1.4z" />
    </svg>
  );
}

/* ================= HEADER ================= */
function Header({ page, go }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["home", "Home"], ["about", "About Us"], ["tests", "Tests"],
    ["packages", "Packages"], ["collection", "Home Collection"],
    ["reports", "Reports"], ["faq", "FAQ"], ["contact", "Contact"],
  ];
  return (
    <header>
      <nav className="nav">
        <div className="brand" onClick={() => go("home")}>
          <img className="brand-logo" src={LOGO_SRC} alt="New Life Lab logo" />
        </div>
        <button className="burger" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
        <div className={"menu" + (menuOpen ? " open" : "")}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href="#"
              className={page === id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); go(id); }}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <a className="nav-phone" href="tel:+917062217553">📞 7062217553</a>
          <button className="btn btn-green" onClick={() => go("book")}>Book a Test</button>
        </div>
      </nav>
    </header>
  );
}

/* ================= HOME ================= */
function HomePage({ go, bookPackage }) {
  return (
    <div>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill">🌿 Trusted Tests, Greener Health</span>
            <h1>Welcome to <span>New Life Lab</span></h1>
            <p className="lead">New Life Lab provides laboratory testing with a focus on quality sample handling, careful testing and timely reporting — from routine blood investigations to specialised tests.</p>
            <ul className="hero-points">
              <li><Tick /> Accurate laboratory reports</li>
              <li><Tick /> Home sample collection</li>
              <li><Tick /> Fast &amp; reliable reporting</li>
              <li><Tick /> Easy booking on WhatsApp</li>
            </ul>
            <div className="btn-row">
              <button className="btn btn-green" onClick={() => go("book")}>Book a Test</button>
              <button className="btn btn-ghost" onClick={() => go("collection")}>Home Sample Collection</button>
              <button className="btn btn-ghost" onClick={() => go("reports")}>Download Report</button>
            </div>
          </div>
          <div>
            <svg viewBox="0 0 520 420" role="img" aria-label="Laboratory illustration with microscope, test tubes and leaves">
              <rect width="520" height="420" fill="#FFFFFF" />
              <circle cx="262" cy="200" r="168" fill="#F3F8F4" />
              <rect x="60" y="322" width="404" height="10" rx="5" fill="#0B2A63" opacity=".12" />
              <g>
                <rect x="96" y="300" width="112" height="16" rx="8" fill="#0B2A63" />
                <rect x="140" y="214" width="16" height="90" fill="#123A80" />
                <path d="M156 214c44 0 66 22 66 54h-20c0-22-16-34-46-34z" fill="#0B2A63" />
                <rect x="196" y="262" width="20" height="46" rx="6" fill="#168A32" />
                <rect x="118" y="286" width="72" height="12" rx="4" fill="#6DBE45" />
                <circle cx="222" cy="206" r="16" fill="#0B2A63" />
                <rect x="214" y="150" width="16" height="60" rx="6" fill="#123A80" />
                <rect x="204" y="134" width="36" height="20" rx="8" fill="#168A32" />
              </g>
              <g>
                <rect x="286" y="176" width="24" height="110" rx="12" fill="#E8F4FB" stroke="#0B2A63" strokeWidth="2" />
                <rect x="290" y="226" width="16" height="56" rx="8" fill="#38BDF8" />
                <rect x="326" y="176" width="24" height="110" rx="12" fill="#FFF6E5" stroke="#0B2A63" strokeWidth="2" />
                <rect x="330" y="214" width="16" height="68" rx="8" fill="#F5A524" />
                <rect x="366" y="176" width="24" height="110" rx="12" fill="#F0FAEC" stroke="#0B2A63" strokeWidth="2" />
                <rect x="370" y="238" width="16" height="44" rx="8" fill="#6DBE45" />
                <rect x="272" y="192" width="132" height="10" rx="5" fill="#0B2A63" />
                <rect x="272" y="286" width="132" height="12" rx="6" fill="#0B2A63" />
              </g>
              <path d="M424 250c-34 4-52 26-50 60 34-2 54-24 50-60z" fill="#168A32" />
              <path d="M406 300c8-22 18-34 34-44" stroke="#0F6D28" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M92 132c30-10 54 2 64 32-30 10-54-2-64-32z" fill="#6DBE45" />
              <path d="M60 366h96l14-26 18 52 16-40 12 14h222" fill="none" stroke="#168A32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Why choose New Life Lab?</h2>
          <p className="lead">Our services are built around dependable testing and patient convenience.</p>
          <div className="grid g3 mt-26">
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EAF6EC" /><path d="M18 30V20l6-4 6 4v10" stroke="#168A32" strokeWidth="2.5" fill="none" strokeLinecap="round" /><circle cx="24" cy="26" r="3" fill="#0B2A63" /></svg>
              <h3>Quality-focused testing</h3>
              <p>Systematic laboratory processes for sample handling and testing.</p>
            </div>
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EDF2FB" /><circle cx="24" cy="19" r="5" fill="#0B2A63" /><path d="M14 34c2-6 6-9 10-9s8 3 10 9" fill="#168A32" /></svg>
              <h3>Expert pathology support</h3>
              <p>Diagnostic services provided with professional laboratory support.</p>
            </div>
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EAF6EC" /><rect x="16" y="14" width="16" height="20" rx="3" fill="#fff" stroke="#0B2A63" strokeWidth="2" /><path d="M19 20h10M19 24h10M19 28h6" stroke="#168A32" strokeWidth="2" strokeLinecap="round" /></svg>
              <h3>Timely reports</h3>
              <p>Reports are shared within the applicable reporting time of each test.</p>
            </div>
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EDF2FB" /><rect x="15" y="16" width="18" height="12" rx="3" fill="#0B2A63" /><circle cx="29" cy="22" r="2.4" fill="#6DBE45" /><path d="M15 32h18" stroke="#168A32" strokeWidth="2.5" strokeLinecap="round" /></svg>
              <h3>Affordable testing</h3>
              <p>A range of tests and health packages at reasonable charges. Call for current rates.</p>
            </div>
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EAF6EC" /><path d="M14 25l10-9 10 9v9a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" fill="#fff" stroke="#0B2A63" strokeWidth="2" /><rect x="21" y="24" width="6" height="11" rx="3" fill="#6DBE45" /></svg>
              <h3>Home sample collection</h3>
              <p>Get your sample collected from your home at a scheduled time.</p>
            </div>
            <div className="card feature">
              <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EDF2FB" /><path d="M24 13c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" fill="#168A32" /></svg>
              <h3>Modern laboratory facilities</h3>
              <p>Dependable testing through appropriate equipment and processes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Our popular tests</h2>
          <p className="lead">Commonly requested investigations at our laboratory.</p>
          <div className="grid g3 mt-26">
            <div className="card"><h3>Complete Blood Count (CBC)</h3><p>A common blood test that gives information about different blood cell types.</p></div>
            <div className="card"><h3>Liver Function Test (LFT)</h3><p>A group of tests used to assess various aspects of liver function.</p></div>
            <div className="card"><h3>Kidney Function Test (KFT)</h3><p>Laboratory tests used to evaluate kidney-related parameters.</p></div>
            <div className="card"><h3>Thyroid Profile</h3><p>Testing of commonly measured thyroid-related parameters.</p></div>
            <div className="card"><h3>Lipid Profile</h3><p>Blood tests used to measure commonly assessed blood lipids.</p></div>
            <div className="card"><h3>HbA1c</h3><p>Used for assessing average blood glucose levels over a period of time.</p></div>
          </div>
          <div className="btn-row mt-24"><button className="btn btn-navy" onClick={() => go("tests")}>View all tests</button></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Meet the owner</h2>
          <p className="lead">The person behind New Life Lab.</p>
          <div className="owner-wrap mt-24">
            <div className="owner-photo">
              <img
                src="/lkg.png"
                alt="Lokesh Saini, Owner of New Life Lab"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const icon = e.currentTarget.parentElement.querySelector(".ph-icon");
                  if (icon) icon.style.display = "block";
                }}
              />
              <svg className="ph-icon" viewBox="0 0 48 48" style={{ display: "none" }}>
                <circle cx="24" cy="19" r="8" fill="#0B2A63" />
                <path d="M9 40c2.5-10 8-15 15-15s12.5 5 15 15" fill="#168A32" />
              </svg>
            </div>
            <div className="owner-text">
              <span className="role">OWNER</span>
              <h3 className="mb-4">Lokesh Saini</h3>
              <p className="mb-0">New Life Lab</p>
              <blockquote>&quot;Our goal is to provide reliable diagnostic services with care, convenience and responsibility.&quot;</blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="strip">
            <div>
              <h2>We collect, you stay safe</h2>
              <p>Book a test and our collection staff can visit your home at the scheduled time.</p>
            </div>
            <button className="btn btn-green" onClick={() => go("collection")}>Book home collection</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap center">
          <h2>Your health. Our priority.</h2>
          <p className="lead">For test bookings, home sample collection and laboratory queries, contact New Life Lab.</p>
          <div className="btn-row center-row mt-18">
            <a className="btn btn-navy" href="tel:+917062217553">Call 7062217553</a>
            <button className="btn btn-green" onClick={() => go("book")}>Book a test</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= ABOUT ================= */
function AboutPage() {
  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>About New Life Lab</h1>
          <p className="lead">Trusted diagnostic services with patient convenience.</p>
          <div className="hero-grid" style={{ alignItems: "center" }}>
            <div>
              <p>New Life Lab is a diagnostic laboratory focused on providing convenient and reliable laboratory testing services. Our laboratory offers a range of routine and specialised investigations to help patients and healthcare professionals access laboratory information when required.</p>
              <div className="grid g2 mt-26">
                <div className="card"><h3>Our mission</h3><p>To provide dependable laboratory testing while keeping the whole experience — booking, collection and reporting — simple for every patient.</p></div>
                <div className="card"><h3>Our vision</h3><p>To build a trusted diagnostic laboratory known for responsible practices, patient convenience and consistent service.</p></div>
              </div>
            </div>
            <svg viewBox="0 0 420 360" role="img" aria-label="Laboratory sample tray with test tubes and a blood drop">
              <rect width="420" height="360" fill="#FFFFFF" />
              <circle cx="210" cy="180" r="150" fill="#F3F8F4" />
              <g>
                <rect x="120" y="120" width="20" height="120" rx="10" fill="#E8F4FB" stroke="#0B2A63" strokeWidth="2" />
                <rect x="124" y="170" width="12" height="66" rx="6" fill="#38BDF8" />
                <rect x="160" y="96" width="20" height="144" rx="10" fill="#FFF6E5" stroke="#0B2A63" strokeWidth="2" />
                <rect x="164" y="150" width="12" height="82" rx="6" fill="#F5A524" />
                <rect x="200" y="120" width="20" height="120" rx="10" fill="#F0FAEC" stroke="#0B2A63" strokeWidth="2" />
                <rect x="204" y="176" width="12" height="60" rx="6" fill="#6DBE45" />
              </g>
              <path d="M300 120c18 26 28 44 28 60a28 28 0 1 1-56 0c0-16 10-34 28-60z" fill="#168A32" />
              <path d="M296 168a10 10 0 0 0 10 10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="90" cy="260" r="7" fill="#6DBE45" />
              <circle cx="330" cy="250" r="5" fill="#0B2A63" />
            </svg>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Our core values</h2>
          <div className="grid g3 mt-22">
            <div className="card feature"><h3>Accuracy</h3><p>Careful sample handling and systematic testing processes.</p></div>
            <div className="card feature"><h3>Quality</h3><p>Appropriate laboratory procedures throughout the testing process.</p></div>
            <div className="card feature"><h3>Transparency</h3><p>Clear information about tests, reports and applicable charges.</p></div>
            <div className="card feature"><h3>Patient convenience</h3><p>Services designed to make laboratory testing easier for patients.</p></div>
            <div className="card feature"><h3>Timely service</h3><p>Reports as per the applicable turnaround time of each investigation.</p></div>
            <div className="card feature"><h3>Confidentiality</h3><p>Health information is treated as private and shared responsibly.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Meet our team</h2>
          <div className="card max-520 mt-18">
            <svg className="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EAF6EC" /><circle cx="24" cy="19" r="6" fill="#0B2A63" /><path d="M13 35c2-7 6-10 11-10s9 3 11 10" fill="#168A32" /></svg>
            <h3>Lokesh Saini</h3>
            <p className="mb-10">Owner — New Life Lab</p>
            <p>&quot;Our goal is to provide reliable diagnostic services with care, convenience and responsibility.&quot;</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= TESTS ================= */
function TestsPage() {
  const cats = [
    { title: "🩸 Hematology tests", items: ["Complete Blood Count (CBC)", "Hemoglobin", "ESR", "Platelet Count", "Total Leukocyte Count", "Differential Leukocyte Count", "Peripheral Smear", "Blood Group & Rh Typing"] },
    { title: "🧪 Biochemistry tests", items: ["Blood Sugar – Fasting", "Blood Sugar – PP", "Random Blood Sugar", "HbA1c", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Uric Acid", "Calcium", "Serum Creatinine", "Blood Urea", "Total Protein", "Albumin"] },
    { title: "🦋 Thyroid tests", items: ["T3", "T4", "TSH", "Thyroid Profile"] },
    { title: "❤️ Lipid profile tests", items: ["Total Cholesterol", "HDL Cholesterol", "LDL Cholesterol", "Triglycerides", "VLDL", "Cholesterol / HDL Ratio"] },
    { title: "💊 Vitamin tests", items: ["Vitamin D", "Vitamin B12", "Folate", "Other vitamin investigations"] },
    { title: "💧 Urine tests", items: ["Urine Routine Examination", "Urine Microscopy", "Urine Protein", "Urine Sugar"] },
    { title: "🧫 Microbiology tests", items: ["Culture Tests", "Sensitivity Tests", "Other microbiological investigations"] },
    { title: "🔬 Other investigations", items: ["Diabetes profile", "Hormone tests", "Pathology tests", "Contact us for more tests"] },
  ];
  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Our laboratory tests</h1>
          <p className="lead">New Life Lab provides investigations across the following testing categories. For availability, sample requirement, preparation and reporting time, please call the laboratory.</p>

          <svg viewBox="0 0 900 180" role="img" aria-label="Row of laboratory equipment" style={{ margin: "22px 0 6px", maxHeight: 170 }}>
            <rect width="900" height="180" fill="#FFFFFF" />
            <rect x="0" y="150" width="900" height="4" fill="#EAF6EC" />
            <g transform="translate(40,30)">
              <rect x="0" y="86" width="70" height="12" rx="6" fill="#0B2A63" />
              <rect x="26" y="34" width="12" height="56" fill="#123A80" />
              <path d="M38 34c26 0 40 14 40 34h-14c0-14-10-22-28-22z" fill="#0B2A63" />
              <rect x="66" y="60" width="14" height="30" rx="6" fill="#168A32" />
            </g>
            <g transform="translate(210,20)">
              <rect x="0" y="10" width="16" height="90" rx="8" fill="#E8F4FB" stroke="#0B2A63" strokeWidth="2" />
              <rect x="3" y="46" width="10" height="50" rx="5" fill="#38BDF8" />
              <rect x="26" y="0" width="16" height="100" rx="8" fill="#FFF6E5" stroke="#0B2A63" strokeWidth="2" />
              <rect x="29" y="40" width="10" height="56" rx="5" fill="#F5A524" />
              <rect x="52" y="16" width="16" height="84" rx="8" fill="#F0FAEC" stroke="#0B2A63" strokeWidth="2" />
              <rect x="55" y="54" width="10" height="42" rx="5" fill="#6DBE45" />
            </g>
            <g transform="translate(360,26)">
              <path d="M40 4c14 20 22 34 22 46a22 22 0 1 1-44 0c0-12 8-26 22-46z" fill="#168A32" />
            </g>
            <g transform="translate(470,20)">
              <rect x="0" y="0" width="66" height="86" rx="6" fill="#fff" stroke="#0B2A63" strokeWidth="2.5" />
              <path d="M10 20h46M10 34h46M10 48h30" stroke="#168A32" strokeWidth="3" strokeLinecap="round" />
              <circle cx="52" cy="66" r="12" fill="#6DBE45" />
              <path d="M46 66l4 4 8-8" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g transform="translate(600,18)">
              <circle cx="46" cy="46" r="46" fill="#EAF6EC" />
              <circle cx="46" cy="34" r="12" fill="#0B2A63" />
              <path d="M22 74c4-16 12-24 24-24s20 8 24 24" fill="#168A32" />
            </g>
            <g transform="translate(720,32)">
              <rect x="0" y="0" width="60" height="60" rx="10" fill="#EDF2FB" />
              <path d="M30 14v32M14 30h32" stroke="#0B2A63" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g transform="translate(820,30)">
              <path d="M32 2c22 8 30 24 30 34-4 24-30 38-30 38s-26-14-30-38c0-10 8-26 30-34z" fill="#6DBE45" />
            </g>
          </svg>

          <div className="grid g2 mt-28">
            {cats.map((c) => (
              <div className="testbox" key={c.title}>
                <h3>{c.title}</h3>
                <ul>
                  {c.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="strip mt-32">
            <div>
              <h2>Need a test that isn&apos;t listed?</h2>
              <p>Call the laboratory to check availability, sample requirement and reporting time.</p>
            </div>
            <a className="btn btn-green" href="tel:+917062217553">Call 7062217553</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= PACKAGES ================= */
function PackagesPage({ bookPackage }) {
  const packs = [
    { name: "Basic Health Checkup", note: "Suitable for routine health screening.", items: ["CBC", "Blood Sugar", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Urine Routine"] },
    { name: "Complete Health Checkup", note: "A broader selection of routine investigations.", items: ["CBC", "Blood Sugar", "HbA1c", "LFT", "KFT", "Lipid Profile", "Thyroid Profile", "Vitamin B12", "Vitamin D", "Urine Routine"] },
    { name: "Diabetes Checkup", note: "For blood sugar monitoring.", items: ["Fasting Blood Sugar", "Post Meal Blood Sugar", "HbA1c", "Urine Sugar"] },
    { name: "Thyroid Checkup", note: "Commonly measured thyroid parameters.", items: ["T3", "T4", "TSH"] },
    { name: "Senior Citizen Package", note: "Routine screening for elderly patients.", items: ["CBC", "Blood Sugar", "Lipid Profile", "LFT", "KFT", "Thyroid Profile", "Urine Routine"] },
    { name: "Custom Test Package", note: "Choose the tests you need.", items: ["Tests selected as per requirement", "Doctor-advised investigations", "Home collection available"] },
  ];
  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Health checkup packages</h1>
          <p className="lead">Selected investigations combined into convenient testing options. To know the charges of any package, please call the laboratory or send a booking request on WhatsApp.</p>

          <div className="grid g2 mt-28">
            {packs.map((p) => (
              <div className="pack" key={p.name}>
                <div className="top"><h3>{p.name}</h3><p className="note">{p.note}</p></div>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <button className="btn btn-green" onClick={() => bookPackage(p.name)}>Book this package</button>
              </div>
            ))}
          </div>

          <p className="note mt-22">Test requirements, preparation instructions, sample type and reporting time may vary by investigation. Please contact the laboratory before booking if you have any questions.</p>
        </div>
      </section>
    </div>
  );
}

/* ================= HOME COLLECTION ================= */
function CollectionPage() {
  const ref = useRef({ name: "", mobile: "", address: "", test: "", date: "", time: "" });
  const [err, setErr] = useState(false);
  const set = (k) => (e) => { ref.current[k] = e.target.value; };

  const submit = (e) => {
    e.preventDefault();
    const r = ref.current;
    if (!r.name || !r.mobile || !r.address || !r.test || !r.date || !r.time) {
      setErr(true);
      return;
    }
    setErr(false);
    const msg =
      "*HOME SAMPLE COLLECTION REQUEST — " + LAB_NAME + "*\n" +
      "--------------------------------\n" +
      "👤 Name: " + r.name + "\n" +
      "📞 Mobile: " + r.mobile + "\n" +
      "🏠 Address: " + r.address + "\n" +
      "🧪 Test / Package: " + r.test + "\n" +
      "📅 Date: " + r.date + "\n" +
      "⏰ Time: " + r.time + "\n" +
      "--------------------------------\nSent from website";
    openWA(msg);
  };

  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Home sample collection</h1>
          <p className="lead">Busy schedule? Unable to visit the laboratory? Schedule a sample collection from your home — the request goes straight to us on WhatsApp.</p>

          <h2 className="mt-34">How it works</h2>
          <div className="steps mt-18">
            <div className="step"><h4>Book your test</h4><p>Send the form or call us.</p></div>
            <div className="step"><h4>Choose a time</h4><p>Select a suitable date and time.</p></div>
            <div className="step"><h4>Sample collection</h4><p>Our staff visits your location.</p></div>
            <div className="step"><h4>Laboratory testing</h4><p>The sample is processed at the lab.</p></div>
            <div className="step"><h4>Get your report</h4><p>Receive it through the available report facility.</p></div>
          </div>

          <h2 className="mt-44">Book home sample collection</h2>
          <form className="form" onSubmit={submit}>
            <div className="two">
              <div className="field"><label>Patient name</label><input required onChange={set("name")} placeholder="Full name" /></div>
              <div className="field"><label>Mobile number</label><input type="tel" required onChange={set("mobile")} placeholder="10 digit mobile number" /></div>
            </div>
            <div className="field"><label>Full address</label><textarea rows="2" required onChange={set("address")} placeholder="House no., area, landmark, city" /></div>
            <div className="two">
              <div className="field"><label>Test / package</label><input required onChange={set("test")} placeholder="e.g. CBC, Thyroid Profile" /></div>
              <div className="field"><label>Preferred date</label><input type="date" required onChange={set("date")} /></div>
            </div>
            <div className="field"><label>Preferred time</label><input type="time" required onChange={set("time")} /></div>
            <button className="btn btn-green" type="submit"><WhatsAppIcon /> Send request on WhatsApp</button>
            {err && <p className="err" style={{ display: "block" }}>Please fill all the required fields.</p>}
          </form>
        </div>
      </section>
    </div>
  );
}

/* ================= REPORTS ================= */
function ReportsPage() {
  const ref = useRef({ id: "", mobile: "", name: "" });
  const [err, setErr] = useState(false);
  const set = (k) => (e) => { ref.current[k] = e.target.value; };

  const submit = (e) => {
    e.preventDefault();
    const r = ref.current;
    if (!r.id || !r.mobile || !r.name) { setErr(true); return; }
    setErr(false);
    const msg =
      "*REPORT REQUEST — " + LAB_NAME + "*\n" +
      "--------------------------------\n" +
      "🆔 Patient / Report ID: " + r.id + "\n" +
      "👤 Name: " + r.name + "\n" +
      "📞 Mobile: " + r.mobile + "\n" +
      "--------------------------------\nPlease share my laboratory report.";
    openWA(msg);
  };

  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Get your laboratory report</h1>
          <p className="lead">Enter your Patient ID / Report ID and registered mobile number. Your request is sent to the laboratory on WhatsApp and the report is shared with you.</p>

          <form className="form" onSubmit={submit}>
            <div className="two">
              <div className="field"><label>Patient ID / Report ID</label><input required onChange={set("id")} placeholder="As given by the laboratory" /></div>
              <div className="field"><label>Registered mobile number</label><input type="tel" required onChange={set("mobile")} placeholder="10 digit mobile number" /></div>
            </div>
            <div className="field"><label>Patient name</label><input required onChange={set("name")} placeholder="Full name" /></div>
            <button className="btn btn-green" type="submit">Request my report on WhatsApp</button>
            {err && <p className="err" style={{ display: "block" }}>Please fill all the required fields.</p>}
          </form>

          <div className="card mt-26 max-720">
            <h3>Trouble getting your report?</h3>
            <p>Call our laboratory team at <a href="tel:+917062217553"><strong>7062217553</strong></a> and we will help you.</p>
          </div>
          <p className="note mt-18">Laboratory reports contain personal health information. Keep your report details private and do not share them publicly.</p>
        </div>
      </section>
    </div>
  );
}

/* ================= BOOK A TEST ================= */
const TEST_OPTIONS = {
  "Popular tests": ["Complete Blood Count (CBC)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Thyroid Profile", "Lipid Profile", "HbA1c", "Blood Sugar (Fasting / PP)", "Vitamin D", "Vitamin B12", "Urine Routine"],
  "Health packages": ["Basic Health Checkup", "Complete Health Checkup", "Diabetes Checkup", "Thyroid Checkup", "Senior Citizen Package", "Custom Test Package"],
};

function BookPage({ presetTest }) {
  const ref = useRef({ name: "", mobile: "", age: "", gender: "", test: "", date: "", time: "", mode: "Visit Laboratory", address: "", msg: "" });
  const [mode, setMode] = useState("Visit Laboratory");
  const [testVal, setTestVal] = useState("");
  const [err, setErr] = useState(false);

  React.useEffect(() => {
    if (presetTest) { setTestVal(presetTest); ref.current.test = presetTest; }
  }, [presetTest]);

  const set = (k) => (e) => { ref.current[k] = e.target.value; };

  const submit = (e) => {
    e.preventDefault();
    const r = ref.current;
    r.test = testVal;
    r.mode = mode;
    if (!r.name || !r.mobile || !r.age || !r.gender || !r.test || !r.date || !r.time) {
      setErr(true);
      return;
    }
    setErr(false);
    let msg =
      "*NEW TEST BOOKING — " + LAB_NAME + "*\n" +
      "--------------------------------\n" +
      "👤 Name: " + r.name + "\n" +
      "📞 Mobile: " + r.mobile + "\n" +
      "🎂 Age: " + r.age + "\n" +
      "⚧ Gender: " + r.gender + "\n" +
      "🧪 Test / Package: " + r.test + "\n" +
      "📅 Preferred Date: " + r.date + "\n" +
      "⏰ Preferred Time: " + r.time + "\n" +
      "📍 Collection: " + r.mode + "\n";
    if (r.mode === "Home Sample Collection" && r.address) msg += "🏠 Address: " + r.address + "\n";
    if (r.msg) msg += "📝 Message: " + r.msg + "\n";
    msg += "--------------------------------\nSent from website";
    openWA(msg);
  };

  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Book your laboratory test</h1>
          <p className="lead">Fill in the details below. On submitting, your booking opens directly in WhatsApp and reaches New Life Lab instantly.</p>

          <form className="form" onSubmit={submit}>
            <h3>Patient details</h3>
            <div className="two">
              <div className="field"><label>Full name</label><input required onChange={set("name")} placeholder="Enter your name" /></div>
              <div className="field"><label>Mobile number</label><input type="tel" required onChange={set("mobile")} placeholder="10 digit mobile number" /></div>
            </div>
            <div className="two">
              <div className="field"><label>Age</label><input type="number" min="0" max="120" required onChange={set("age")} placeholder="Age" /></div>
              <div className="field">
                <label>Gender</label>
                <select required onChange={set("gender")} defaultValue="">
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>

            <h3 className="mt-22">Test details</h3>
            <div className="field">
              <label>Select test / package</label>
              <select required value={testVal} onChange={(e) => setTestVal(e.target.value)}>
                <option value="">Select a test or package</option>
                {Object.entries(TEST_OPTIONS).map(([group, opts]) => (
                  <optgroup label={group} key={group}>
                    {opts.map((o) => <option key={o}>{o}</option>)}
                  </optgroup>
                ))}
                <option>Other (mentioned in message)</option>
              </select>
            </div>
            <div className="two">
              <div className="field"><label>Preferred date</label><input type="date" required onChange={set("date")} /></div>
              <div className="field"><label>Preferred time</label><input type="time" required onChange={set("time")} /></div>
            </div>

            <h3 className="mt-22">Sample collection</h3>
            <div className="field">
              <div className="radio-row">
                <label><input type="radio" name="mode" value="Visit Laboratory" checked={mode === "Visit Laboratory"} onChange={() => setMode("Visit Laboratory")} /> Visit laboratory</label>
                <label><input type="radio" name="mode" value="Home Sample Collection" checked={mode === "Home Sample Collection"} onChange={() => setMode("Home Sample Collection")} /> Home sample collection</label>
              </div>
            </div>
            {mode === "Home Sample Collection" && (
              <div className="field">
                <label>Address for home collection</label>
                <textarea rows="2" onChange={set("address")} placeholder="House no., area, landmark, city" />
              </div>
            )}
            <div className="field"><label>Additional message (optional)</label><textarea rows="2" onChange={set("msg")} placeholder="Anything we should know" /></div>

            <button className="btn btn-green" type="submit"><WhatsAppIcon /> Send booking on WhatsApp</button>
            {err && <p className="err" style={{ display: "block" }}>Please fill all the required fields.</p>}
            <p className="note mt-14">After you send the request, our team will contact you to confirm availability, appointment details and applicable charges.</p>
          </form>
        </div>
      </section>
    </div>
  );
}

/* ================= CONTACT ================= */
function ContactPage() {
  const ref = useRef({ name: "", mobile: "", msg: "" });
  const [err, setErr] = useState(false);
  const set = (k) => (e) => { ref.current[k] = e.target.value; };

  const submit = (e) => {
    e.preventDefault();
    const r = ref.current;
    if (!r.name || !r.mobile || !r.msg) { setErr(true); return; }
    setErr(false);
    const msg =
      "*WEBSITE ENQUIRY — " + LAB_NAME + "*\n" +
      "--------------------------------\n" +
      "👤 Name: " + r.name + "\n" +
      "📞 Mobile: " + r.mobile + "\n" +
      "💬 Message: " + r.msg + "\n" +
      "--------------------------------\nSent from website";
    openWA(msg);
  };

  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Contact New Life Lab</h1>
          <p className="lead">For test information, appointment booking, home sample collection or report queries, contact us.</p>

          <div className="grid g3 mt-26">
            <div className="card"><h3>📍 Laboratory address</h3><p>New Life Lab<br />[Complete Address]<br />[Area], [City] – [PIN]<br />Rajasthan, India</p></div>
            <div className="card"><h3>📞 Phone</h3><p><a href="tel:+917062217553">7062217553</a><br />Owner: Lokesh Saini</p></div>
            <div className="card"><h3>🕐 Opening hours</h3><p>Monday – Sunday: [Opening – Closing]<br />Home collection: [Available hours]</p></div>
          </div>

          <h2 className="mt-44">Send us a message</h2>
          <form className="form" onSubmit={submit}>
            <div className="two">
              <div className="field"><label>Name</label><input required onChange={set("name")} placeholder="Your name" /></div>
              <div className="field"><label>Mobile number</label><input type="tel" required onChange={set("mobile")} placeholder="10 digit mobile number" /></div>
            </div>
            <div className="field"><label>Message</label><textarea rows="3" required onChange={set("msg")} placeholder="Write your message" /></div>
            <button className="btn btn-green" type="submit">Send message on WhatsApp</button>
            {err && <p className="err" style={{ display: "block" }}>Please fill all the required fields.</p>}
          </form>

          <h2 className="mt-44">Find us</h2>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            {/* Google Maps embed: apni lab ka embed link yahan daalein */}
            <iframe
              title="New Life Lab location"
              src="https://www.google.com/maps?q=Jaipur%2C%20Rajasthan&output=embed"
              width="100%"
              height="320"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= FAQ ================= */
function FaqPage() {
  const faqs = [
    ["How can I book a test?", "Use the booking form on this website — it sends your details to us on WhatsApp — or call 7062217553 directly."],
    ["Do you provide home sample collection?", "Yes, home sample collection is available for applicable tests and locations. Please contact us to confirm availability in your area."],
    ["How can I get my laboratory report?", "Reports can be requested from the Reports page or collected from the laboratory, depending on the service provided."],
    ["Do all tests require fasting?", "No. Preparation depends on the specific test. Please confirm the instructions before your sample collection."],
    ["How long does it take to receive a report?", "Reporting time depends on the test. The applicable turnaround time is communicated for the selected investigation."],
    ["Can I book multiple tests together?", "Yes, multiple tests can be requested together, subject to availability and sample requirements."],
    ["Can I request home collection for a health package?", "Home collection may be available for applicable packages and locations. Please confirm while booking."],
    ["How do I know the charges?", "Charges vary by test and package. Call 7062217553 or send a booking request and our team will inform you of the applicable charges."],
  ];
  return (
    <div>
      <section className="section">
        <div className="wrap">
          <h1>Frequently asked questions</h1>
          <div className="mt-24 max-800">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= LEGAL PAGES ================= */
function PrivacyPage() {
  return (
    <div className="page legal">
      <section className="section">
        <div className="wrap">
          <h1>Privacy policy</h1>
          <p>At New Life Lab, we respect the privacy of our patients and website visitors.</p>
          <h3>Information submitted through our website may include</h3>
          <ul><li>Name</li><li>Mobile number</li><li>Address</li><li>Test or package details</li><li>Appointment information</li><li>Report-related information</li></ul>
          <h3>We use this information for</h3>
          <ul><li>Processing test bookings</li><li>Arranging home sample collection</li><li>Responding to enquiries</li><li>Providing report-related services</li><li>Communicating appointment information</li></ul>
          <p>Booking details submitted on this website are sent to the laboratory through WhatsApp. We take reasonable measures to protect information handled through our website.</p>
          <h3>Patient information</h3>
          <p>Laboratory reports and health-related information should be treated as confidential. Patients should avoid sharing report credentials with unauthorised persons.</p>
          <p>For privacy questions, contact New Life Lab at 7062217553.</p>
        </div>
      </section>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="page legal">
      <section className="section">
        <div className="wrap">
          <h1>Terms &amp; conditions</h1>
          <p>By using the New Life Lab website, you agree to the following terms:</p>
          <ul>
            <li>Information on this website is intended to provide general information about laboratory services.</li>
            <li>Test availability, charges and reporting times may change.</li>
            <li>Appointment requests are subject to confirmation by the laboratory.</li>
            <li>Home sample collection availability may depend on location and test requirements.</li>
            <li>Patients should follow the preparation instructions provided for their specific test.</li>
            <li>Report access should only be used by the authorised patient or recipient.</li>
            <li>Laboratory reports should be interpreted in consultation with a qualified healthcare professional.</li>
            <li>The laboratory may update website content and service information when required.</li>
          </ul>
          <p>For questions, contact 7062217553.</p>
        </div>
      </section>
    </div>
  );
}

function DisclaimerPage() {
  return (
    <div className="page legal">
      <section className="section">
        <div className="wrap">
          <h1>Medical disclaimer</h1>
          <p>The information provided on this website is for general informational purposes regarding laboratory testing and diagnostic services.</p>
          <p>Laboratory test results are not, by themselves, a diagnosis. Interpretation of test results depends on the patient&apos;s medical history, symptoms, examination and other relevant clinical information.</p>
          <p>Patients should discuss their laboratory results with a qualified healthcare professional for appropriate interpretation and medical advice.</p>
          <p>New Life Lab does not replace consultation with a qualified healthcare professional.</p>
        </div>
      </section>
    </div>
  );
}

/* ================= FOOTER ================= */
function Footer({ go }) {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="footer-logo"><img src={LOGO_SRC} alt="New Life Lab logo" /></div>
            <p style={{ color: "#6DBE45", fontWeight: 600, margin: "0 0 8px" }}>Trusted Tests, Greener Health</p>
            <p style={{ fontSize: ".92rem" }}>Reliable laboratory testing services with a focus on quality, convenience and timely reporting.</p>
          </div>
          <div>
            <h4>Quick links</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("about"); }}>About us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("tests"); }}>Tests</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("packages"); }}>Health packages</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("collection"); }}>Home collection</a>
          </div>
          <div>
            <h4>Patient services</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); go("book"); }}>Book a test</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("reports"); }}>Get your report</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("faq"); }}>FAQ</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("contact"); }}>Contact us</a>
          </div>
          <div>
            <h4>Contact &amp; legal</h4>
            <a href="tel:+917062217553">📞 7062217553</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("contact"); }}>Owner: Lokesh Saini</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("privacy"); }}>Privacy policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("terms"); }}>Terms &amp; conditions</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("disclaimer"); }}>Medical disclaimer</a>
          </div>
        </div>
        <div className="fbot">© 2026 New Life Lab. All rights reserved.</div>
      </div>
    </footer>
  );
}

/* ================= APP ================= */
export default function NewLifeLabApp() {
  const [page, setPage] = useState("home");
  const [presetTest, setPresetTest] = useState("");

  const go = useCallback((id) => {
    setPage(id);
    window.scrollTo({ top: 0 });
  }, []);

  const bookPackage = useCallback((name) => {
    setPresetTest(name);
    go("book");
  }, [go]);

  let content;
  switch (page) {
    case "about": content = <AboutPage />; break;
    case "tests": content = <TestsPage />; break;
    case "packages": content = <PackagesPage bookPackage={bookPackage} />; break;
    case "collection": content = <CollectionPage />; break;
    case "reports": content = <ReportsPage />; break;
    case "book": content = <BookPage presetTest={presetTest} />; break;
    case "contact": content = <ContactPage />; break;
    case "faq": content = <FaqPage />; break;
    case "privacy": content = <PrivacyPage />; break;
    case "terms": content = <TermsPage />; break;
    case "disclaimer": content = <DisclaimerPage />; break;
    default: content = <HomePage go={go} bookPackage={bookPackage} />;
  }

  return (
    <>
      <style>{SITE_CSS}</style>
      <Header page={page} go={go} />
      <main>{content}</main>
      <Footer go={go} />
      <a
        className="wa-float"
        href={waLink("Hello " + LAB_NAME + ", mujhe test ke baare mein jaankari chahiye.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
