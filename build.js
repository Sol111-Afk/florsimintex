/* FLORSIMINTEX — generator pagini statice.
   O singură sursă de conținut + markup, 3 teme vizuale (industrial / clean / neon).
   Rulează:  node build.js   →  scrie index.html + industrial.html + clean.html + neon.html
   CSS/JS sunt fișiere separate, editabile manual (css/, js/). */

const fs = require('fs');
const path = require('path');

/* ----------------------------------------------------------------- DATE FIRMĂ */
const C = {
  brand: 'FLORSIMINTEX',
  legal: 'FLORSIMINTEX S.R.L.',
  tagline: 'Tractări · Vulcanizare · Utilaje · Spălătorie',
  city: 'Comarnic',
  county: 'jud. Prahova',
  address: 'Str. Republicii 1 Bis, Comarnic',
  cui: '1327508',
  tel: '0722 553 406',
  telRaw: '+40722553406',
  wa: '40722553406',
  fix: '0244 360 278',
  fixRaw: '+40244360278',
  maps: 'https://maps.app.goo.gl/q3RN5pKrEn8EoF1H6',
  mapsTractari: 'https://maps.app.goo.gl/4gYi3hnEfFh5eGaT8',
  areas: ['DN1', 'Comarnic', 'Posada', 'Secăria', 'Talea', 'Sinaia', 'Breaza', 'Nistorești', 'Câmpina', 'Bănești'],
  waMsg: encodeURIComponent('Bună ziua! Am nevoie de ajutor — '),
  site: 'https://sol111-afk.github.io/florsimintex',
  geo: { lat: 45.2486, lng: 25.6361 },
  slogan: 'Suni. Venim. Te scoatem din drum.',
  sameAs: ['https://maps.app.goo.gl/q3RN5pKrEn8EoF1H6', 'https://maps.app.goo.gl/4gYi3hnEfFh5eGaT8'],
};

/* manifest imagini responsive (generat de asset-build.cjs) */
const imgMan = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/img-manifest.json'), 'utf8'));
/* <picture> AVIF + WebP + fallback jpg, cu width/height din manifest (CLS 0) */
function pic(name, alt, sizes, opts = {}) {
  const m = imgMan[name];
  if (!m) return `<img src="assets/images/${name}.jpg" alt="${alt}" loading="lazy" decoding="async">`;
  const set = (ext) => m.widths.map(w => `assets/images/${name}-${w}.${ext} ${w}w`).join(', ');
  const load = opts.priority ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<picture>
            <source type="image/avif" srcset="${set('avif')}" sizes="${sizes}">
            <source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">
            <img src="assets/images/${name}.jpg" alt="${alt}" width="${m.w}" height="${m.h}" ${load}>
          </picture>`;
}

/* ----------------------------------------------------------------- FAQ (folosit și pentru FAQPage schema) */
const faqs = [
  ['Cât costă o tractare?', 'Depinde de distanță și de situație. Îți spunem prețul la telefon înainte să pornim — fără surprize.'],
  ['Veniți și noaptea sau de sărbători?', 'Da. Asistența rutieră e non-stop, 24/7, inclusiv în weekend și de sărbători.'],
  ['Cât de repede ajungeți?', 'Avem echipe permanente pe DN1, în zona Comarnic–Sinaia. Suni, îți spunem în câte minute ajungem la tine.'],
  ['Ridicați mașini din șanț sau după accident?', 'Da. Avem trolii electrice, hidraulice și manuale și autoplatforme moderne pentru orice situație — pană, accident sau defecțiune.'],
  ['Tractați și camioane sau utilaje?', 'Da. Transportăm utilaje grele și agabaritic cu trailer dedicat, plus dube, remorci, bărci și rulote.'],
];

/* ----------------------------------------------------------------- ICONIȚE SVG (line, stroke currentColor) */
const ico = {
  tow: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 32h26V18h8l6 7v7h-4"/><path d="M30 18l-9-9-7 7"/><circle cx="13" cy="36" r="4"/><circle cx="38" cy="36" r="4"/><path d="M8 32V22h6"/></svg>',
  tire: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="7"/><path d="M24 6v8M24 34v8M6 24h8M34 24h8M11 11l6 6M31 31l6 6M37 11l-6 6M17 31l-6 6"/></svg>',
  crane: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 40h22V28h7l5 6v6h-3"/><path d="M14 28V14h5l16 5"/><path d="M19 14l9-6"/><circle cx="13" cy="44" r="3"/><circle cx="34" cy="44" r="3"/></svg>',
  excavator: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 40h24v-9H8a4 4 0 0 0-4 4z"/><path d="M28 31v-7l9-10 4 3-7 9"/><path d="M38 24l5 6-4 6h-6"/><path d="M4 36h24"/></svg>',
  wash: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6c-6 8-10 13-10 18a10 10 0 0 0 20 0c0-5-4-10-10-18z"/><path d="M20 28a4 4 0 0 0 4 4"/></svg>',
  atv: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="11" cy="34" r="6"/><circle cx="37" cy="34" r="6"/><path d="M11 34h14l4-10h8M17 24l4-6h8l3 6"/><path d="M29 24l-4 10"/></svg>',
  clock: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="18"/><path d="M24 13v11l8 5"/></svg>',
  pin: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 44s14-12 14-24a14 14 0 1 0-28 0c0 12 14 24 14 24z"/><circle cx="24" cy="20" r="5"/></svg>',
  phone: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6l6 1 2 9-5 4a24 24 0 0 0 11 11l4-5 9 2 1 6a4 4 0 0 1-4 4A34 34 0 0 1 10 10a4 4 0 0 1 4-4z"/></svg>',
  bolt: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M26 4 10 28h10l-2 16 18-26H26z"/></svg>',
  shield: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4l16 6v12c0 11-7 17-16 22-9-5-16-11-16-22V10z"/><path d="M17 24l5 5 9-11"/></svg>',
  wa: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11 19.6L3 29l6.6-2a13 13 0 1 0 6.4-24zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-4 1 1-3.9-.3-.4A10.6 10.6 0 1 1 16 26.6zm6-7.9c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2s-.9 1.1-1.1 1.3-.4.2-.8 0a8.6 8.6 0 0 1-4.3-3.7c-.3-.6.3-.5.9-1.8.1-.2 0-.4 0-.6s-.8-1.9-1-2.6c-.3-.7-.6-.6-.8-.6h-.7a1.3 1.3 0 0 0-1 .4 4 4 0 0 0-1.2 2.9 6.9 6.9 0 0 0 1.4 3.6 15.7 15.7 0 0 0 6 5.3c2.2 1 3 1 4.1.9a3.5 3.5 0 0 0 2.3-1.6 2.9 2.9 0 0 0 .2-1.6c0-.2-.3-.3-.6-.5z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  star: '<svg viewBox="0 0 24 24" class="star" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.7L18.5 22 12 18.3 5.5 22l1.7-8L2 9.3l7-.8z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4 10-12"/></svg>',
};

/* ----------------------------------------------------------------- SERVICII */
const services = [
  { ico: 'tow', tag: 'NON-STOP 24/7', t: 'Tractări & asistență rutieră', d: 'Intervenim non-stop pe DN1 și Valea Prahovei. Autoplatforme moderne, trolii electrice și hidraulice pentru orice situație — pană, accident sau defecțiune.', img: 'asistenta-rutiera.jpg' },
  { ico: 'tire', tag: 'Luni–Sâm 08–17', t: 'Vulcanizare auto', d: 'Anvelope autoturisme, camioane și utilaje. Dejantare, echilibrare și service roți, rapid și corect. Reparăm și pe loc dacă te-a prins pana în drum.', img: 'vulcanizare-atelier.jpg' },
  { ico: 'crane', tag: 'Agabaritic', t: 'Transport utilaje & agabaritic', d: 'Mutăm excavatoare, buldoexcavatoare, tractoare și utilaje grele cu trailer dedicat. Transport mașini noi sau avariate, dube, remorci, bărci și rulote.', img: 'transport-utilaje.jpg' },
  { ico: 'excavator', tag: 'Numai cu deservent', t: 'Închiriere utilaje', d: 'Excavatoare și utilaje de construcții pentru închiriere în zona Comarnic, numai cu deservent calificat. Asigurăm și transportul la punctul de lucru.', img: 'inchiriere-utilaje.jpg' },
  { ico: 'wash', tag: 'Self wash · non-stop', t: 'Spălătorie self wash', d: 'Spălătorie self-service deschisă non-stop. Speli mașina când vrei tu, cu echipamente moderne și jet de înaltă presiune, la orice oră din zi sau din noapte.', img: '' },
  { ico: 'atv', tag: 'Ture pe munte', t: 'Închiriere ATV-uri', d: 'Închiriază ATV și pornește pe traseele de pe Valea Prahovei. Modele pentru începători și avansați, echipament inclus — o zi de adrenalină chiar din Comarnic.', img: 'inchiriere-atv.jpg' },
];

const whyUs = [
  ['bolt', 'Ajungem repede', 'Echipe permanente în zonă, pe DN1. Suni, spui unde ești, plecăm spre tine.'],
  ['shield', 'Autoplatforme moderne', 'Mașina ta urcă pe platformă, nu e trasă pe asfalt. Trolii electrice, hidraulice și manuale.'],
  ['clock', 'Program non-stop, 7/24', 'Asistența rutieră nu se închide. Suntem la telefon 24/7, inclusiv în weekend și de sărbători.'],
  ['check', 'O firmă, toate serviciile', 'De la tractare la vulcanizare, utilaje și spălătorie — rezolvi totul într-un singur loc, cu oameni pe care îi cunoști.'],
];

const stats = [
  ['24/7', 'asistență rutieră non-stop'],
  ['9', 'localități acoperite pe DN1'],
  ['12+', 'oameni în echipă'],
  ['100%', 'autoplatforme moderne'],
];

/* Recenzii REALE de pe Google (doar cele pozitive cu text — verificate, neinventate) */
const reviews = [
  { n: 'Radu Coman', meta: 'Local Guide · Google', s: 5, t: 'Servicii rapide și de calitate 🔥', date: 'acum 10 luni' },
  { n: 'Mihaela Nedelcu', meta: 'Local Guide · Google', s: 5, t: 'Mulțumim și vă așteptăm din nou.', date: 'acum 6 luni' },
  { n: 'Boiangiu', meta: 'Google', s: 5, t: 'Super.', date: 'acum 5 ani' },
];

/* ----------------------------------------------------------------- HELPERE */
const waLink = (txt) => `https://wa.me/${C.wa}?text=${txt || C.waMsg}`;
const stars = (n) => Array.from({ length: 5 }, (_, i) => ico.star.replace('class="star"', `class="star${i < n ? '' : ' off'}"`)).join('');

/* ----------------------------------------------------------------- MARKUP (comun tuturor temelor) */
function body() {
  return `
<a class="skip" href="#main">Sari la conținut</a>

<header class="site-head" id="top">
  <div class="wrap head-inner">
    <a class="brand" href="#top" aria-label="${C.brand} — acasă">
      <span class="brand-mark">${ico.tow}</span>
      <span class="brand-txt"><b>${C.brand}</b><i>${C.city} · DN1</i></span>
    </a>
    <nav class="nav" aria-label="Principal">
      <a href="#servicii">Servicii</a>
      <a href="#dece">De ce noi</a>
      <a href="#acoperire">Acoperire</a>
      <a href="#recenzii">Recenzii</a>
      <a href="#contact">Contact</a>
    </nav>
    <div class="head-cta">
      <a class="btn btn-ghost" href="tel:${C.telRaw}">${ico.phone}<span>${C.tel}</span></a>
      <button class="burger" aria-label="Meniu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="chevron-bar" aria-hidden="true"><span class="chevron-bar__fill"></span></div>
</header>

<main id="main">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-media">${pic('hero-tractare', 'Autospeciala FLORSIMINTEX tractând un autoturism pe DN1', '100vw', { priority: true })}</div>
    <div class="hero-overlay"></div>
    <div class="hero-sweep" aria-hidden="true"></div>
    <div class="wrap hero-inner">
      <p class="eyebrow reveal"><span class="ping"></span> Non-stop pe DN1 · Valea Prahovei</p>
      <h1 class="reveal">Ai rămas în pană<br>pe drum? <em>Te ajutăm noi.</em></h1>
      <p class="lead reveal">Tractări și asistență rutieră 24/7 în ${C.city} și pe toată Valea Prahovei. Plus vulcanizare, închiriere utilaje și spălătorie self wash — toate la aceeași echipă.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-call" href="tel:${C.telRaw}">${ico.phone}<span>Sună acum · ${C.tel}</span></a>
        <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ico.wa}<span>Scrie pe WhatsApp</span></a>
        <a class="btn btn-ghost btn-loc" href="${waLink(encodeURIComponent('Bună ziua! Am rămas în pană și am nevoie de tractare.'))}" target="_blank" rel="noopener" data-geo data-wa="${C.wa}">${ico.pin}<span>Sunt blocat aici</span></a>
      </div>
      <ul class="hero-chips reveal">
        <li>${ico.check} Ajungem rapid</li>
        <li>${ico.check} Autoplatforme moderne</li>
        <li>${ico.check} Non-stop, 7/24</li>
      </ul>
    </div>
  </section>

  <!-- TICKER ZONE -->
  <div class="ticker" aria-label="Zone acoperite">
    <div class="ticker-track">
      ${C.areas.concat(C.areas, C.areas).map(a => `<span>${ico.pin}${a}</span>`).join('')}
    </div>
  </div>

  <!-- STATS -->
  <section class="stats wrap">
    ${stats.map(([n, l]) => `<div class="stat reveal"><b data-count="${n}">${n}</b><span>${l}</span></div>`).join('')}
  </section>

  <!-- CUM FUNCȚIONEAZĂ -->
  <section class="section section-alt" id="cum">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">Cum funcționează</p>
        <h2>De la telefon, la mașina ta în siguranță</h2>
        <p class="sub">Fără pași complicați și fără call-center. Suni — de aici ne ocupăm noi.</p>
      </header>
      <ol class="steps">
        <li class="step reveal"><span class="step-no">01</span><div><h3>Suni</h3><p>La ${C.tel} răspunde un om, nu un robot. Ne spui unde ești și ce-ai pățit.</p></div></li>
        <li class="step reveal"><span class="step-no">02</span><div><h3>Plecăm spre tine</h3><p>Echipa cea mai apropiată de pe DN1 pornește imediat. Îți spunem în câte minute ajungem.</p></div></li>
        <li class="step reveal"><span class="step-no">03</span><div><h3>Te scoatem din drum</h3><p>Mașina urcă pe platformă, nu e târâtă. Te ducem unde ai nevoie — acasă, la service, în siguranță.</p></div></li>
      </ol>
    </div>
  </section>

  <!-- SERVICII -->
  <section class="section" id="servicii">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">Ce facem</p>
        <h2>Servicii pentru drum, atelier și șantier</h2>
        <p class="sub">O singură firmă din ${C.city} care îți rezolvă mașina, anvelopele și utilajele. Suni, te ajutăm.</p>
      </header>
      <div class="services">
        ${services.map((s, i) => `
        <article class="card reveal${s.img ? ' has-img' : ' no-img'}" style="--i:${i}">
          <span class="card-glow" aria-hidden="true"></span>
          ${s.img
            ? `<div class="card-media">${pic(s.img.replace(/\.jpg$/, ''), s.t + ' — FLORSIMINTEX ' + C.city, '(max-width:880px) 100vw, 380px')}</div>`
            : `<div class="card-media card-media--ph" aria-hidden="true"><span class="ph-ico">${ico[s.ico]}</span></div>`}
          <div class="card-body">
            <span class="card-ico">${ico[s.ico]}</span>
            <span class="card-tag">${s.tag}</span>
            <h3>${s.t}</h3>
            <p>${s.d}</p>
            <a class="card-link" href="${waLink(encodeURIComponent('Bună ziua! Vreau detalii despre: ' + s.t))}" target="_blank" rel="noopener">Cere o ofertă ${ico.arrow}</a>
          </div>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <!-- DE CE NOI -->
  <section class="section section-alt" id="dece">
    <div class="wrap feature">
      <div class="feature-media reveal">
        ${pic('asistenta-rutiera', 'Platformă de asistență rutieră non-stop FLORSIMINTEX', '(max-width:880px) 90vw, 460px')}
        <div class="feature-badge">${ico.clock}<div><b>NON-STOP</b><span>și de sărbători</span></div></div>
      </div>
      <div class="feature-text">
        <p class="kicker reveal">De ce FLORSIMINTEX</p>
        <h2 class="reveal">Pe noi ne găsești când chiar ai nevoie</h2>
        <ul class="why">
          ${whyUs.map(([k, t, d]) => `<li class="reveal"><span class="why-ico">${ico[k]}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}
        </ul>
        <a class="btn btn-call reveal" href="tel:${C.telRaw}">${ico.phone}<span>${C.tel}</span></a>
      </div>
    </div>
  </section>

  <!-- DESPRE NOI -->
  <section class="section" id="despre">
    <div class="wrap feature feature-rev">
      <div class="feature-text">
        <p class="kicker reveal">Cine suntem</p>
        <h2 class="reveal">De ani buni, pe DN1</h2>
        <p class="about-p reveal">Suntem din ${C.city}, de pe DN1, de unde pleacă toate intervențiile noastre. Dacă ai trecut prin Valea Prahovei, probabil ne-ai văzut autospeciala roșie cu dungi galbene — „ASISTENȚĂ RUTIERĂ NON-STOP". Aia suntem noi.</p>
        <p class="about-p reveal">Ridicăm mașini din șanț, schimbăm cauciucuri pe ploaie și tractăm pe platformă. Avem program non-stop, 7/24, pentru asistență rutieră — suni, răspundem și venim. Pentru utilaje grele și transport agabaritic avem trailer dedicat și utilaje proprii.</p>
        <a class="btn btn-call reveal" href="tel:${C.telRaw}">${ico.phone}<span>${C.tel}</span></a>
      </div>
      <div class="feature-media reveal">
        ${pic('tractare-platforma', 'Autoplatforma FLORSIMINTEX pe DN1, Valea Prahovei', '(max-width:880px) 90vw, 460px')}
        <div class="feature-badge">${ico.pin}<div><b>${C.city}</b><span>pe DN1</span></div></div>
      </div>
    </div>
  </section>

  <!-- GALERIE -->
  <section class="section section-alt" id="galerie">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">De pe teren</p>
        <h2>Flota și intervențiile noastre</h2>
        <p class="sub">Poze reale, nu stock. Asta ridicăm, asta conducem, asta închiriem.</p>
      </header>
      <div class="gallery">
        ${[
          ['tractare-platforma', 'Autospeciala care vine la tine, pe DN1.'],
          ['transport-utilaje', 'Scania + JCB pe trailer — transport agabaritic.'],
          ['inchiriere-utilaje', 'Excavator CAT, închiriat cu deservent.'],
          ['vulcanizare-interior', 'Atelierul de vulcanizare din ' + C.city + '.'],
          ['inchiriere-atv', 'ATV-uri pentru ture pe munte.'],
          ['asistenta-rutiera', 'Asistență rutieră non-stop, în orice condiții.'],
        ].map(([n, cap]) => `
        <figure class="shot reveal">
          ${pic(n, cap, '(max-width:600px) 100vw, (max-width:1000px) 50vw, 380px')}
          <figcaption>${cap}</figcaption>
        </figure>`).join('')}
      </div>
    </div>
  </section>

  <!-- ACOPERIRE -->
  <section class="section" id="acoperire">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">Unde ajungem</p>
        <h2>Acoperim toată Valea Prahovei</h2>
        <p class="sub">Echipe permanente pe DN1, gata de plecare. Dacă ești în zonă, suntem la tine în cel mai scurt timp.</p>
      </header>
      <div class="areas reveal">
        ${C.areas.map(a => `<span class="area-pill">${ico.pin}${a}</span>`).join('')}
      </div>
      <div class="map-embed map-facade reveal" data-map="https://www.google.com/maps?q=${encodeURIComponent('VULCANIZARE AUTO COMARNIC, Str. Republicii 1 Bis, Comarnic, Prahova')}&amp;z=15&amp;output=embed" role="button" tabindex="0" aria-label="Apasă pentru a încărca harta interactivă Google Maps">
        <span class="map-facade-grid" aria-hidden="true"></span>
        <span class="map-facade-pin">${ico.pin}</span>
        <span class="map-facade-txt"><b>Vezi-ne pe hartă</b><span>${C.address} · apasă pentru harta interactivă</span></span>
      </div>
      <div class="map-cta reveal">
        <div>
          <b>${C.address}</b>
          <span>${C.city}, ${C.county}</span>
        </div>
        <a class="btn btn-ghost" href="${C.maps}" target="_blank" rel="noopener">${ico.pin}<span>Deschide în Google Maps</span></a>
      </div>
    </div>
  </section>

  <!-- RECENZII -->
  <section class="section section-alt" id="recenzii">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">Ce spun clienții</p>
        <h2>Oameni pe care i-am scos din drum</h2>
        <div class="rating-line reveal"><span class="stars">${stars(5)}</span> <b>5,0</b> pe Google pentru asistență rutieră · <a class="rating-link" href="${C.mapsTractari}" target="_blank" rel="noopener">vezi recenziile</a></div>
      </header>
      <div class="reviews" id="reviews-track">
        ${reviews.map(r => `
        <figure class="review reveal">
          <span class="stars">${stars(r.s)}</span>
          <blockquote>${r.t}</blockquote>
          <figcaption><span class="avatar">${r.n[0]}</span><span><b>${r.n}</b><i>${r.meta}${r.date ? ' · ' + r.date : ''}</i></span></figcaption>
        </figure>`).join('')}
      </div>
      <div class="review-dots" aria-label="Navigare recenzii"></div>
      <a class="reviews-all reveal" href="${C.mapsTractari}" target="_blank" rel="noopener">${ico.star}<span>Vezi toate recenziile pe Google</span></a>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section" id="faq">
    <div class="wrap">
      <header class="sec-head reveal">
        <p class="kicker">Întrebări frecvente</p>
        <h2>Ce ne întreabă lumea cel mai des</h2>
        <p class="sub">Răspunsuri scurte și oneste. Restul ți le spunem la telefon.</p>
      </header>
      <div class="faq">
        ${faqs.map(([q, a]) => `
        <details class="faq-item reveal">
          <summary>${q}<span class="faq-ico" aria-hidden="true"></span></summary>
          <div class="faq-a"><p>${a}</p></div>
        </details>`).join('')}
      </div>
    </div>
  </section>

  <!-- CONTACT / CTA -->
  <section class="section contact" id="contact">
    <div class="wrap contact-inner">
      <div class="contact-text">
        <p class="kicker reveal">Contact</p>
        <h2 class="reveal">Sună-ne. Restul rezolvăm noi.</h2>
        <p class="sub reveal">Asistență rutieră non-stop. Pentru vulcanizare, utilaje sau spălătorie, dă-ne un semn pe WhatsApp.</p>
        <div class="contact-actions reveal">
          <a class="btn btn-call" href="tel:${C.telRaw}">${ico.phone}<span>${C.tel}</span></a>
          <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ico.wa}<span>WhatsApp</span></a>
          <a class="btn btn-ghost btn-loc" href="${waLink(encodeURIComponent('Bună ziua! Am rămas în pană și am nevoie de tractare.'))}" target="_blank" rel="noopener" data-geo data-wa="${C.wa}">${ico.pin}<span>Sunt blocat aici</span></a>
        </div>
        <ul class="contact-list reveal">
          <li>${ico.pin}<span>${C.address}, ${C.county}</span></li>
          <li>${ico.phone}<span>${C.tel} · ${C.fix}</span></li>
        </ul>
      </div>
      <div class="hours reveal">
        <h3>Program</h3>
        <table>
          <tr><td>Tractări & asistență rutieră</td><td class="hl">NON-STOP</td></tr>
          <tr><td>Spălătorie self wash</td><td class="hl">NON-STOP</td></tr>
          <tr><td>Vulcanizare</td><td>Luni–Sâmbătă · 08–17</td></tr>
          <tr><td>Închiriere utilaje · cu deservent</td><td>Luni–Sâmbătă · 08–17</td></tr>
        </table>
        <p class="hours-note">${ico.clock} Pe drum, la orice oră — asistența rutieră răspunde mereu.</p>
      </div>
    </div>
  </section>
</main>

<footer class="site-foot">
  <div class="wrap foot-inner">
    <div class="foot-brand">
      <span class="brand-mark">${ico.tow}</span>
      <div><b>${C.brand}</b><span>${C.slogan}</span></div>
    </div>
    <nav class="foot-nav" aria-label="Footer">
      <a href="#servicii">Servicii</a><a href="#acoperire">Acoperire</a><a href="#recenzii">Recenzii</a><a href="#contact">Contact</a>
    </nav>
    <p class="foot-legal">© <span id="y"></span> ${C.legal} · CUI ${C.cui} · ${C.address}, ${C.county}<br>Tractări · Vulcanizare · Închiriere utilaje · Spălătorie self wash — non-stop pe DN1.</p>
  </div>
</footer>

<!-- BUTOANE FLOTANTE (desktop) -->
<div class="dock">
  <a class="dock-btn dock-call" href="tel:${C.telRaw}" aria-label="Sună acum">${ico.phone}</a>
  <a class="dock-btn dock-wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Scrie pe WhatsApp">${ico.wa}</a>
</div>

<!-- BARĂ FIXĂ DE APEL (mobil) -->
<div class="callbar">
  <a class="callbar-call" href="tel:${C.telRaw}">${ico.phone}<span>Sună acum · ${C.tel}</span></a>
  <a class="callbar-wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Scrie pe WhatsApp">${ico.wa}</a>
</div>
`;
}

/* ----------------------------------------------------------------- ȘABLON PAGINĂ */
function page(theme) {
  const title = `${C.brand} ${C.city} — Tractări non-stop, Vulcanizare, Utilaje & Spălătorie`;
  const desc = `Tractări auto și asistență rutieră non-stop pe DN1 și Valea Prahovei. Vulcanizare, transport și închiriere utilaje, spălătorie auto în ${C.city}, Prahova. Sună ${C.tel}.`;
  const url = `${C.site}/${theme}.html`;
  const ogImg = `${C.site}/assets/images/hero-tractare.jpg`;
  const indexable = theme === 'industrial';
  const heroAvif = imgMan['hero-tractare'].widths.map(w => `assets/images/hero-tractare-${w}.avif ${w}w`).join(', ');
  const bizId = `${C.site}/#business`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['AutoRepair', 'EmergencyService'], '@id': bizId,
        name: C.legal, url: C.site, image: ogImg, telephone: C.telRaw,
        priceRange: '$$', currenciesAccepted: 'RON',
        address: { '@type': 'PostalAddress', streetAddress: 'Str. Republicii 1 Bis', addressLocality: C.city, addressRegion: 'Prahova', postalCode: '105700', addressCountry: 'RO' },
        geo: { '@type': 'GeoCoordinates', latitude: C.geo.lat, longitude: C.geo.lng },
        hasMap: C.maps, sameAs: C.sameAs,
        contactPoint: [{ '@type': 'ContactPoint', telephone: C.telRaw, contactType: 'asistență rutieră', availableLanguage: 'ro' }, { '@type': 'ContactPoint', telephone: C.fixRaw, contactType: 'birou' }],
        areaServed: C.areas.map(a => ({ '@type': 'Place', name: a })),
        openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
        makesOffer: services.map(s => ({ '@type': 'Offer', name: s.t })),
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '3', bestRating: '5' },
        review: reviews.map(r => ({ '@type': 'Review', author: { '@type': 'Person', name: r.n }, reviewRating: { '@type': 'Rating', ratingValue: r.s, bestRating: 5 }, reviewBody: r.t }))
      },
      ...services.map((s, i) => ({ '@type': 'Service', '@id': `${C.site}/#service-${i}`, name: s.t, description: s.d, serviceType: s.t, provider: { '@id': bizId }, areaServed: C.areas })),
      { '@type': 'FAQPage', '@id': `${C.site}/#faq`, mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  };
  return `<!doctype html>
<html lang="ro" class="theme-${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0d0e11">
<link rel="canonical" href="${url}">
${indexable ? '' : '<meta name="robots" content="noindex,follow">\n'}<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="ro_RO">
<meta property="og:site_name" content="${C.brand} ${C.city}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1600">
<meta property="og:image:height" content="1200">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImg}">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="assets/icons/icon-192.png">
<link rel="preconnect" href="https://www.google.com">
<link rel="preload" as="image" type="image/avif" imagesrcset="${heroAvif}" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/anton-latin.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="assets/fonts/pjs-700-latin.woff2" crossorigin>
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/theme-${theme}.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
${body()}
<script src="js/app.js" defer></script>
</body>
</html>`;
}

/* ----------------------------------------------------------------- SELECTOR (index.html) */
function chooser() {
  const variants = [
    ['industrial', 'Industrial / Garaj', 'Asfalt închis, roșu & alb cu chevroni hazard. Rugged, autentic — exact ca pe autospecialele lor.'],
    ['clean', 'Modern / Clean', 'Luminos, mult spațiu, fotografii mari. Curat și de încredere.'],
    ['neon', 'Dark / Neon', 'Negru profund cu accente luminoase. Modern, tech, cu glow subtil.'],
  ];
  return `<!doctype html>
<html lang="ro" class="theme-industrial">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>FLORSIMINTEX — alege varianta de design</title>
<meta name="robots" content="noindex">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/theme-industrial.css">
<style>
  body{display:grid;place-items:center;min-height:100vh;padding:40px 20px}
  .pick{max-width:980px;width:100%}
  .pick h1{font-family:var(--font-display);font-size:clamp(2.4rem,7vw,4.5rem);line-height:.95;letter-spacing:.01em;margin:0 0 .2em}
  .pick .sub{color:var(--muted);max-width:54ch;margin:0 0 2.4rem;font-size:1.05rem}
  .pick-grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
  .pick-card{display:block;padding:26px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);text-decoration:none;color:inherit;transition:.25s}
  .pick-card:hover{transform:translateY(-6px);border-color:var(--accent);box-shadow:0 20px 50px rgba(0,0,0,.4)}
  .pick-card b{font-family:var(--font-display);font-size:1.5rem;display:block;margin-bottom:.4rem;letter-spacing:.02em}
  .pick-card span{color:var(--muted);font-size:.95rem;line-height:1.5}
  .pick-card .go{margin-top:1.2rem;display:inline-flex;gap:.4rem;align-items:center;color:var(--accent);font-weight:700}
  .pick-card .go svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.4}
  .pick-note{margin-top:2rem;color:var(--muted);font-size:.85rem}
</style>
</head>
<body>
<div class="pick">
  <p class="kicker">FLORSIMINTEX · ${C.city}</p>
  <h1>Alege varianta<br>care îți place</h1>
  <p class="sub">Același conținut, trei atmosfere diferite. Deschide-le și spune-mi care merge mai departe — pe aceea o finisăm și o punem live.</p>
  <div class="pick-grid">
    ${variants.map(([k, t, d]) => `<a class="pick-card" href="${k}.html"><b>${t}</b><span>${d}</span><span class="go">Vezi varianta ${ico.arrow}</span></a>`).join('')}
  </div>
  <p class="pick-note">Date reale din profilurile Google · poze reale ale firmei · ${C.tel}</p>
</div>
</body>
</html>`;
}

/* ----------------------------------------------------------------- SCRIE FIȘIERE */
const out = (f, c) => { fs.writeFileSync(path.join(__dirname, f), c); console.log('✓', f, (c.length / 1024).toFixed(1) + 'kb'); };
['industrial', 'clean', 'neon'].forEach(t => out(`${t}.html`, page(t)));
out('index.html', chooser());
out('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${C.site}/industrial.html</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
</urlset>
`);
out('robots.txt', `User-agent: *
Allow: /

Sitemap: ${C.site}/sitemap.xml
`);
console.log('Build gata.');
