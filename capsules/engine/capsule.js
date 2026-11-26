/* =====================================================================
   Capsules IA · moteur commun.
   Lit window.CAPSULE (défini par le fichier de la capsule), construit la page
   et anime la scène de particules. Ne contient aucun contenu propre à une capsule.

   Schéma attendu (voir .claude/skills/capsule/references/formes.md) :
   window.CAPSULE = {
     numero: 1, theme: "Les bases", titre: "Le token", duree: "2 min",
     accroche: "Phrase d'ouverture.",
     pages: [{ forme: {type, ...}, kicker, chiffre?, titre, texte, source?: {label, url?} }],
     aRetenir: { titre: "Trois réflexes", points: ["<b>Mot clé.</b> Explication.", ...] }
   }
   ===================================================================== */
(function () {
  "use strict";
  const C = window.CAPSULE;
  if (!C) { document.body.textContent = "window.CAPSULE manquant."; return; }

  const pad = n => String(n).padStart(2, "0");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const indexHref = C.index || "../index.html";

  // ---------- Étapes : ouverture + pages + à retenir ----------
  const steps = [
    { hero: true, forme: { type: "nuage" }, kicker: `Capsule IA · ${C.duree || "2 min"}`, titre: C.titre, texte: C.accroche, hint: "Faites défiler ↓" },
    ...(C.pages || []),
    { outro: true, forme: { type: "anneau", segments: (C.aRetenir?.points || []).length || 3 }, kicker: "À retenir", titre: C.aRetenir?.titre || "À retenir", points: C.aRetenir?.points || [] }
  ];

  // ---------- DOM ----------
  document.documentElement.lang = "fr";
  const sources = [];
  const srcKey = x => x.url || x.label;
  steps.forEach(s => { if (s.source && !sources.some(x => srcKey(x) === srcKey(s.source))) sources.push(s.source); });
  const srcLink = x => x.url ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)}</a>` : `<span>${esc(x.label)}</span>`;

  const stepsHTML = steps.map(s => {
    let h = `<section class="step${s.hero ? " hero" : ""}"><div class="pin"><div class="card">`;
    h += `<div class="kicker">${esc(s.kicker || "")}</div>`;
    if (s.hero) h += `<h1>${esc(s.titre)}</h1>`;
    else {
      if (s.chiffre) h += `<div class="big">${esc(s.chiffre)}</div>`;
      h += `<h2>${esc(s.titre)}</h2>`;
    }
    if (s.texte) h += `<p class="body">${esc(s.texte)}</p>`;
    if (s.points) h += `<ol class="takeaways">${s.points.map(li => `<li><span>${li}</span></li>`).join("")}</ol>`;
    if (s.source) h += `<div class="src">Source : ${srcLink(s.source)}</div>`;
    if (s.outro && sources.length) h += `<div class="sources src">${sources.map(srcLink).join("")}</div>`;
    if (s.hint) h += `<div class="hint">${esc(s.hint)}</div>`;
    return h + `</div></div></section>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <canvas id="stage" aria-hidden="true"></canvas>
    <header class="topbar">
      <span><a href="${esc(indexHref)}">← Capsules</a> · <b>n°${pad(C.numero)}</b> <span class="serie">· ${esc(C.theme || "")}</span></span>
      <span><b>${esc(C.titre)}</b> · <span class="count" id="tb-count"></span></span>
    </header>
    <main id="steps">${stepsHTML}</main>
    <div class="progress" aria-hidden="true"><i id="bar"></i></div>`);
  if (!document.title) document.title = `${C.titre} · Capsule IA ${pad(C.numero)}`;

  // Titre d'ouverture : réduit la taille quand un mot long dépasse la carte.
  const h1 = document.querySelector(".step.hero h1");
  function fitTitle() {
    if (!h1) return;
    h1.style.fontSize = "";
    const size = parseFloat(getComputedStyle(h1).fontSize);
    if (h1.scrollWidth > h1.clientWidth) h1.style.fontSize = Math.floor(size * h1.clientWidth / h1.scrollWidth) + "px";
  }
  fitTitle();
  document.fonts?.ready.then(fitTitle);
  addEventListener("resize", fitTitle);

  engine();

  async function engine() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stepsEl = [...document.querySelectorAll(".step")];
    const total = stepsEl.length;
    const countEl = document.getElementById("tb-count");
    const barEl = document.getElementById("bar");

    // Progression avec crans : pendant le "hold" d'une page, la progression reste
    // exactement sur cette page (forme figée, texte immobile), puis elle reprend.
    const holdOf = el => el.offsetHeight - innerHeight;
    function scrollProgress() {
      const y = scrollY;
      for (let i = 0; i < total; i++) {
        const top = stepsEl[i].offsetTop, end = top + holdOf(stepsEl[i]);
        if (y <= end) {
          if (y >= top || i === 0) return i;
          const prevEnd = stepsEl[i - 1].offsetTop + holdOf(stepsEl[i - 1]);
          return i - 1 + (y - prevEnd) / Math.max(1, top - prevEnd);
        }
      }
      return total - 1;
    }
    // Feu d'artifice : une page peut le demander avec `feuDArtifice: true`. Il part quand la page
    // devient active (fusées dorées et lavande, ~6 s), derrière la carte de texte. Ignoré si l'utilisateur
    // préfère moins d'animations.
    const fireworks = (() => {
      let cv, g, W, H, rockets = [], sparks = [], running = false, until = 0, next = 0;
      const css = getComputedStyle(document.documentElement);
      const cols = ["--accent", "--accent-hi", "--paper", "--particle"].map(v => css.getPropertyValue(v).trim() || "#D1AD78");
      const size = () => { const d = Math.min(devicePixelRatio, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0); };
      const launch = () => rockets.push({ x: W * (.15 + Math.random() * .7), y: H, vy: -(H * (.016 + Math.random() * .006)), top: H * (.15 + Math.random() * .35), c: cols[(Math.random() * 2) | 0] });
      const explode = r => {
        const n = 70 + (Math.random() * 40 | 0), c2 = cols[(Math.random() * cols.length) | 0];
        for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = 1.5 + Math.random() * 4.5; sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, d: .008 + Math.random() * .012, c: Math.random() < .6 ? r.c : c2, r: .8 + Math.random() * 1.6 }); }
      };
      function loop(t) {
        if (!running) return;
        g.clearRect(0, 0, W, H);
        if (t < until && t > next) { launch(); next = t + 250 + Math.random() * 450; }
        rockets = rockets.filter(r => {
          r.y += r.vy; r.vy *= .985;
          g.globalAlpha = .9; g.fillStyle = r.c; g.beginPath(); g.arc(r.x, r.y, 1.8, 0, 6.283); g.fill();
          if (r.y <= r.top || Math.abs(r.vy) < 2) { explode(r); return false; }
          return true;
        });
        sparks = sparks.filter(p => {
          p.vx *= .975; p.vy = p.vy * .975 + .05; p.x += p.vx; p.y += p.vy; p.life -= p.d;
          if (p.life <= 0) return false;
          g.globalAlpha = p.life; g.fillStyle = p.c; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
          return true;
        });
        if (t < until || rockets.length || sparks.length) requestAnimationFrame(loop);
        else { running = false; g.clearRect(0, 0, W, H); }
      }
      return {
        start() {
          if (reduce) return;
          if (!cv) {
            cv = document.createElement("canvas"); cv.setAttribute("aria-hidden", "true");
            cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:1";
            document.body.appendChild(cv); g = cv.getContext("2d"); size(); addEventListener("resize", size);
          }
          const now = performance.now(); until = now + 6000; next = now + 300;
          if (!running) { running = true; requestAnimationFrame(loop); }
        },
        stop() { until = 0; rockets = []; sparks = []; }
      };
    })();

    let activeIdx = -1;
    function updateChrome(p) {
      const idx = Math.round(p);
      countEl.textContent = `${pad(idx + 1)} / ${pad(total)}`;
      barEl.style.width = `${(p / (total - 1)) * 100}%`;
      if (idx !== activeIdx) {
        stepsEl.forEach((el, k) => el.classList.toggle("is-active", k === idx));
        activeIdx = idx;
        if (steps[idx].feuDArtifice) fireworks.start(); else fireworks.stop();
      }
    }
    updateChrome(scrollProgress());

    addEventListener("keydown", e => {
      const keys = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
      if (!(e.key in keys) || e.target.closest("a, input, textarea")) return;
      e.preventDefault();
      const k = Math.max(0, Math.min(total - 1, activeIdx + (e.shiftKey && e.key === " " ? -1 : keys[e.key])));
      const el = stepsEl[k];
      scrollTo({ top: el.offsetTop + holdOf(el) / 2, behavior: reduce ? "auto" : "smooth" });
    });
    // Utilisé par tools/check.mjs pour photographier chaque page au milieu de son cran.
    window.__capsuleStepY = k => stepsEl[k].offsetTop + holdOf(stepsEl[k]) / 2;

    const fallback = () => addEventListener("scroll", () => updateChrome(scrollProgress()), { passive: true });
    if (!window.THREE) return fallback();
    const canvas = document.getElementById("stage");
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); }
    catch (e) { return fallback(); }

    const css = getComputedStyle(document.documentElement);
    const col = name => new THREE.Color(css.getPropertyValue(name).trim());
    renderer.setClearColor(0x000000, 0);  // fond = dégradé CSS du canvas
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 9);
    const group = new THREE.Group();
    scene.add(group);

    const N = innerWidth < 700 ? 4200 : 7500;
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const TAU = Math.PI * 2;
    const tiltX = (y, z, t) => [y * Math.cos(t) - z * Math.sin(t), y * Math.sin(t) + z * Math.cos(t)];
    const inList = (list, k) => Array.isArray(list) && list.includes(k);

    // ---------- Formes : chaque générateur retourne {p: positions, a: accents} ----------
    // L'espace utile tient dans environ x ∈ [-3.2, 3.2], y ∈ [-2.4, 2.4].
    function make(fn) {
      const p = new Float32Array(N * 3), a = new Float32Array(N);
      for (let i = 0; i < N; i++) { const r = fn(i); p[i*3] = r[0]; p[i*3+1] = r[1]; p[i*3+2] = r[2]; a[i] = r[3] || 0; }
      return { p, a };
    }
    // Tire un index de groupe proportionnellement à des poids.
    function picker(weights) {
      const sum = weights.reduce((a, b) => a + b, 0) || 1, cum = [];
      weights.reduce((a, w, k) => (cum[k] = a + w / sum), 0);
      return () => { const r = Math.random(); const k = cum.findIndex(c => r <= c); return k < 0 ? weights.length - 1 : k; };
    }

    // Échantillonne un canevas dessiné en rouge codé (rgb((k+1)*40,0,0) pour l'élément k) en particules.
    function sampleCanvas(ctx, W, H, isAcc) {
      const data = ctx.getImageData(0, 0, W, H).data, pts = [];
      for (let py = 0; py < H; py += 2) for (let px = 0; px < W; px += 2) {
        const o = (py * W + px) * 4;
        if (data[o + 3] > 200) pts.push(px, py, Math.max(0, Math.round(data[o] / 40) - 1));
      }
      // Répartition sans doublons : on parcourt les points dans un ordre mélangé.
      const n = pts.length / 3 || 1, s = 6.4 / W, order = [...Array(n).keys()];
      for (let k = n - 1; k > 0; k--) { const r = Math.floor(Math.random() * (k + 1)); [order[k], order[r]] = [order[r], order[k]]; }
      return make(i => {
        const j = order[i % n] * 3;
        return [(pts[j] - W / 2) * s + (Math.random() - .5) * s * 2, (H / 2 - pts[j + 1]) * s + (Math.random() - .5) * s * 2, gauss() * .03, isAcc(pts[j + 2])];
      });
    }

    const SHAPES = {
      nuage: () => make(() => {
        const u = Math.random() * 2 - 1, th = Math.random() * TAU, r = 2.5 * Math.cbrt(Math.random()), s = Math.sqrt(1 - u * u);
        return [r * s * Math.cos(th), r * u, r * s * Math.sin(th), Math.random() < .07 ? 1 : 0];
      }),

      anneau: ({ segments = 3 }) => make(() => {
        // Un arc par point à retenir, séparés par une coupure ; arcs alternés or / lavande.
        const k = Math.floor(Math.random() * segments), u = (k + .06 + .88 * Math.random()) / segments * TAU + Math.PI / 2;
        const v = Math.random() * TAU, R = 2.1, r = .38;
        const x = (R + r * Math.cos(v)) * Math.cos(u), [y, z] = tiltX((R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v), 1.05);
        return [x, y, z, k % 2 === 0 ? 1 : 0];
      }),

      grille: ({ cols = 10, rows = 10, accent = 0 }) => {
        const sp = Math.min(.52, 5.6 / Math.max(cols, rows)), cells = cols * rows, rad = sp * .17;
        return make(i => {
          const c = i % cells, cx = c % cols, cy = Math.floor(c / cols);
          const a = Math.random() * TAU, r = rad * Math.sqrt(Math.random());
          return [(cx - (cols - 1) / 2) * sp + Math.cos(a) * r, ((rows - 1) / 2 - cy) * sp + Math.sin(a) * r, gauss() * .02, c < accent ? 1 : 0];
        });
      },

      barres: ({ valeurs = [1], accent = [] }) => {
        const max = Math.max(...valeurs), n = valeurs.length;
        const w = Math.min(1.1, 5.4 / (n * 1.6)), gap = w * .9, H = 4.6, span = n * w + (n - 1) * gap;
        const pick = picker(valeurs);
        return make(() => {
          const k = pick(), h = valeurs[k] / max * H, x0 = -span / 2 + k * (w + gap) + w / 2;
          return [x0 + (Math.random() - .5) * w, -H / 2 + Math.random() * h, (Math.random() - .5) * w, inList(accent, k) ? 1 : 0];
        });
      },

      pile: ({ feuilles = 20, accent = "tous-les-6" }) => make(i => {
        const k = i % feuilles, x = (Math.random() - .5) * 2.6, z = (Math.random() - .5) * 3.4, [y, z2] = tiltX(-1.5 + k * (3 / feuilles), z, .5);
        const acc = accent === "dessus" ? k === feuilles - 1 : accent === "tous-les-6" ? k % 6 === 5 : inList(accent, k);
        return [x, y, z2, acc ? 1 : 0];
      }),

      entonnoir: ({ niveaux = [100, 50, 10], accent = [] }) => {
        // Tranches horizontales empilées de haut en bas, largeur proportionnelle à la valeur.
        const n = niveaux.length, max = Math.max(...niveaux), Wmax = 5.0, h = Math.min(.7, 4.4 / n), gap = h * .35;
        const totalH = n * h + (n - 1) * gap, pick = picker(niveaux);
        return make(() => {
          const k = pick(), w = Math.max(.12, niveaux[k] / max * Wmax), yc = totalH / 2 - k * (h + gap) - h / 2;
          return [(Math.random() - .5) * w, yc + (Math.random() - .5) * h, (Math.random() - .5) * h * .6, inList(accent, k) ? 1 : 0];
        });
      },

      frise: ({ jalons = 5, accent = [] }) => {
        // Une ligne et des jalons régulièrement espacés : 35 % des particules sur la ligne.
        const L = 6, xs = [...Array(jalons)].map((_, k) => -L / 2 + (jalons === 1 ? L / 2 : k * L / (jalons - 1)));
        return make(() => {
          if (Math.random() < .35) { const x = (Math.random() - .5) * L; return [x, gauss() * .02, gauss() * .02, 0]; }
          const k = Math.floor(Math.random() * jalons), a = Math.random() * TAU, u = Math.random() * 2 - 1, r = .26 * Math.cbrt(Math.random()), s = Math.sqrt(1 - u * u);
          return [xs[k] + r * s * Math.cos(a), r * u, r * s * Math.sin(a), inList(accent, k) ? 1 : 0];
        });
      },

      reseau: ({ noeuds = 6, accent = [], centre = true }) => {
        // Un nœud central (index 0) relié à `noeuds` satellites en cercle, satellites reliés entre voisins.
        const P = [[0, 0, 0]];
        for (let k = 0; k < noeuds; k++) { const a = k / noeuds * TAU + .3; P.push([Math.cos(a) * 2.3, Math.sin(a) * 2.0, Math.sin(a * 2) * .4]); }
        const E = [];
        for (let k = 1; k <= noeuds; k++) { if (centre) E.push([0, k]); E.push([k, k % noeuds + 1]); }
        const accN = k => inList(accent, k);
        return make(() => {
          if (Math.random() < .45) {
            const [a, b] = E[Math.floor(Math.random() * E.length)], t = Math.random();
            return [P[a][0] + (P[b][0] - P[a][0]) * t + gauss() * .02, P[a][1] + (P[b][1] - P[a][1]) * t + gauss() * .02, P[a][2] + (P[b][2] - P[a][2]) * t, accN(a) && accN(b) ? 1 : 0];
          }
          const k = Math.floor(Math.random() * P.length), rr = (k === 0 && centre ? .5 : .3) * Math.cbrt(Math.random());
          const u = Math.random() * 2 - 1, a = Math.random() * TAU, s = Math.sqrt(1 - u * u);
          return [P[k][0] + rr * s * Math.cos(a), P[k][1] + rr * u, P[k][2] + rr * s * Math.sin(a), accN(k) ? 1 : 0];
        });
      },

      pictos: ({ icones = ["engrenage"], accent = [] }) => {
        // Pictogrammes côte à côte, dessinés sur un canevas puis échantillonnés comme `texte`.
        const W = 1400, H = 520, n = icones.length, cell = Math.min(W / n, H * 1.25), S = Math.min(cell * .95, H * .95);
        const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); };
        const hole = fn => { ctx.save(); ctx.globalCompositeOperation = "destination-out"; ctx.fillStyle = "#000"; fn(); ctx.restore(); };
        const ICONES = {
          engrenage: (u) => {
            const R = .46 * u, r = .34 * u, dents = 8; ctx.beginPath();
            for (let k = 0; k < dents * 4; k++) {
              const a = k / (dents * 4) * TAU, rad = (k % 4 === 1 || k % 4 === 2) ? R : r;
              ctx[k ? "lineTo" : "moveTo"](Math.cos(a) * rad, Math.sin(a) * rad);
            }
            ctx.closePath(); ctx.fill();
            hole(() => { ctx.beginPath(); ctx.arc(0, 0, .15 * u, 0, TAU); ctx.fill(); });
          },
          document: (u) => {
            const w = .66 * u, h = .86 * u, x = -w / 2, y = -h / 2, f = .2 * u;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w - f, y); ctx.lineTo(x + w, y + f); ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.closePath(); ctx.fill();
            hole(() => {
              ctx.beginPath(); ctx.moveTo(x + w - f, y); ctx.lineTo(x + w - f, y + f); ctx.lineTo(x + w, y + f); ctx.closePath(); ctx.fill();
              for (let k = 0; k < 4; k++) ctx.fillRect(x + .12 * u, y + (.3 + k * .14) * u, (k === 3 ? .26 : .42) * u, .055 * u);
            });
          },
          bulle: (u) => {
            const w = .9 * u, h = .64 * u, x = -w / 2, y = -h / 2 - .06 * u;
            rr(x, y, w, h, .14 * u); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + .18 * u, y + h - 2); ctx.lineTo(x + .14 * u, y + h + .2 * u); ctx.lineTo(x + .4 * u, y + h - 2); ctx.closePath(); ctx.fill();
            hole(() => { for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.arc(k * .22 * u, y + h / 2, .065 * u, 0, TAU); ctx.fill(); } });
          },
          base: (u) => {
            const w = .38 * u, e = .1 * u;
            for (let k = 0; k < 3; k++) {
              const yc = (-.3 + k * .27) * u;
              ctx.beginPath(); ctx.ellipse(0, yc + .1 * u, w, e, 0, 0, Math.PI); ctx.lineTo(-w, yc - .02 * u); ctx.ellipse(0, yc - .02 * u, w, e, 0, Math.PI, TAU, true); ctx.closePath(); ctx.fill();
            }
            ctx.beginPath(); ctx.ellipse(0, -.32 * u, w, e, 0, 0, TAU); ctx.fill();
          },
          loupe: (u) => {
            ctx.beginPath(); ctx.arc(-.08 * u, -.08 * u, .3 * u, 0, TAU); ctx.arc(-.08 * u, -.08 * u, .2 * u, 0, TAU, true); ctx.fill();
            ctx.save(); ctx.rotate(Math.PI / 4); rr(.3 * u, -.06 * u, .32 * u, .12 * u, .05 * u); ctx.fill(); ctx.restore();
          },
          cadenas: (u) => {
            ctx.beginPath(); ctx.arc(0, -.12 * u, .22 * u, Math.PI, 0); ctx.lineTo(.22 * u, .02 * u); ctx.lineTo(.12 * u, .02 * u); ctx.lineTo(.12 * u, -.12 * u); ctx.arc(0, -.12 * u, .12 * u, 0, Math.PI, true); ctx.lineTo(-.12 * u, .02 * u); ctx.lineTo(-.22 * u, .02 * u); ctx.closePath(); ctx.fill();
            rr(-.34 * u, 0, .68 * u, .44 * u, .06 * u); ctx.fill();
            hole(() => { ctx.beginPath(); ctx.arc(0, .17 * u, .06 * u, 0, TAU); ctx.fill(); ctx.fillRect(-.025 * u, .17 * u, .05 * u, .14 * u); });
          },
          personne: (u) => {
            ctx.beginPath(); ctx.arc(0, -.2 * u, .17 * u, 0, TAU); ctx.fill();
            ctx.beginPath(); ctx.ellipse(0, .44 * u, .36 * u, .4 * u, 0, Math.PI, TAU); ctx.closePath(); ctx.fill();
          }
        };
        icones.forEach((nom, k) => {
          ctx.save(); ctx.translate(W / 2 + (k - (n - 1) / 2) * cell, H / 2); ctx.fillStyle = `rgb(${(k + 1) * 40},0,0)`;
          if (ICONES[nom]) ICONES[nom](S); else console.error(`Picto inconnu : "${nom}". Pictos disponibles : ${Object.keys(ICONES).join(", ")}`);
          ctx.restore();
        });
        return sampleCanvas(ctx, W, H, k => (accent === "tout" ? 1 : inList(accent, k) ? 1 : 0));
      },

      // ----- Formes inventées par la capsule elle-même -----
      dessin: ({ chemins = [], vue = [100, 100], trait = 0, accent = [] }) => {
        // Chemins SVG (attribut d) dans un repère `vue` [largeur, hauteur], remplis (trait = 0)
        // ou tracés (trait = épaisseur dans le repère). 6 chemins au plus : un groupe d'accent par chemin.
        const W = 1400, H = 520, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        const k = Math.min(W * .92 / vue[0], H * .92 / vue[1]);
        ctx.translate((W - vue[0] * k) / 2, (H - vue[1] * k) / 2); ctx.scale(k, k);
        ctx.lineCap = ctx.lineJoin = "round"; ctx.lineWidth = trait;
        chemins.slice(0, 6).forEach((d, g) => {
          const c = `rgb(${(g + 1) * 40},0,0)`, p = new Path2D(d);
          if (trait > 0) { ctx.strokeStyle = c; ctx.stroke(p); } else { ctx.fillStyle = c; ctx.fill(p); }
        });
        if (chemins.length > 6) console.error("dessin : 6 chemins au plus, les suivants sont ignorés.");
        return sampleCanvas(ctx, W, H, g => accent === "tout" ? 1 : inList(accent, g) ? 1 : 0);
      },

      libre: ({ fn }) => {
        // fn(i, n, outils) → [x, y, z, accent] pour la particule i sur n.
        // Repère : x ∈ [-3.2, 3.2], y ∈ [-2.4, 2.4], z ∈ [-1, 1] ; accent 0 (lavande) à 1 (or).
        if (typeof fn !== "function") { console.error("libre : `fn` doit être une fonction."); return SHAPES.nuage(); }
        const outils = { TAU, gauss, rand: Math.random, tiltX };
        return make(i => fn(i, N, outils));
      },

      texte: ({ segments = ["?"], accent = "alterne" }) => {
        const W = 1400, H = 520, cv = document.createElement("canvas");
        cv.width = W; cv.height = H;
        const ctx = cv.getContext("2d", { willReadFrequently: true });
        const fam = '"Red Hat Display", "Montserrat", "Arial Black", sans-serif';
        let fs = 470; ctx.font = `900 ${fs}px ${fam}`;
        const gapPx = () => fs * .12;
        let widths = segments.map(s => ctx.measureText(s).width);
        let tw = widths.reduce((a, b) => a + b, 0) + gapPx() * (segments.length - 1);
        fs = Math.min(fs, fs * (W * .92) / tw);
        ctx.font = `900 ${fs}px ${fam}`; ctx.textBaseline = "middle";
        widths = segments.map(s => ctx.measureText(s).width);
        tw = widths.reduce((a, b) => a + b, 0) + gapPx() * (segments.length - 1);
        let x = (W - tw) / 2;
        segments.forEach((s, k) => { ctx.fillStyle = `rgb(${(k + 1) * 40},0,0)`; ctx.fillText(s, x, H / 2 + fs * .04); x += widths[k] + gapPx(); });
        return sampleCanvas(ctx, W, H, k => accent === "tout" ? 1 : accent === "alterne" ? k % 2 : (inList(accent, k) ? 1 : 0));
      }
    };

    // Attendre la police d'affichage avant de dessiner le texte en particules.
    try { await Promise.race([document.fonts.load('900 100px "Red Hat Display"'), new Promise(r => setTimeout(r, 2500))]); } catch (e) {}
    const targets = steps.map(s => {
      const f = s.forme || { type: "nuage" };
      if (!SHAPES[f.type]) console.error(`Forme inconnue : "${f.type}". Formes disponibles : ${Object.keys(SHAPES).join(", ")}`);
      return (SHAPES[f.type] || SHAPES.nuage)(f);
    });

    // ---------- Géométrie et shader ----------
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(targets[0].p), acc = new Float32Array(targets[0].a);
    const seed = new Float32Array(N), dir = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      seed[i] = Math.random();
      const u = Math.random() * 2 - 1, th = Math.random() * TAU, s = Math.sqrt(1 - u * u);
      dir[i*3] = s * Math.cos(th); dir[i*3+1] = u; dir[i*3+2] = s * Math.sin(th);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aAccent", new THREE.BufferAttribute(acc, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 }, uSize: { value: 24 }, uPR: { value: renderer.getPixelRatio() }, uFocus: { value: 0 },
        uBase: { value: col("--particle") }, uAccent: { value: col("--accent") }
      },
      // uFocus (0 → 1) : la page est dans son cran. Le bruit tombe, les points s'affinent.
      vertexShader: `
        attribute float aAccent; attribute float aSeed;
        uniform float uTime, uSize, uPR, uFocus;
        varying float vA; varying float vTw; varying float vF;
        void main() {
          vec3 p = position;
          float drift = mix(.05, .004, uFocus);
          p += drift * vec3(sin(uTime * .9 + aSeed * 40.), cos(uTime * .7 + aSeed * 23.), sin(uTime * .5 + aSeed * 11.));
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          vTw = mix(.6 + .4 * sin(uTime * 2. + aSeed * 60.), 1., uFocus);
          gl_PointSize = uSize * uPR * mix(1.15, .8, uFocus) * (.8 + aAccent * .35) / -mv.z;
          vA = aAccent; vF = uFocus;
        }`,
      fragmentShader: `
        uniform vec3 uBase, uAccent;
        varying float vA; varying float vTw; varying float vF;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          float a = smoothstep(.5, mix(.0, .3, vF), d);
          vec3 c = mix(uBase, uAccent, vA);
          gl_FragColor = vec4(c, a * mix(.55, .95, vA) * vTw);
        }`
    });
    group.add(new THREE.Points(geo, mat));

    // ---------- Mise en page de la scène ----------
    function layout() {
      const w = innerWidth, h = innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const halfH = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), halfW = halfH * camera.aspect;
      if (w <= 760) { group.position.set(0, halfH * .38, 0); group.scale.setScalar(Math.min(.95, halfW / 3.6)); }
      else { group.position.set(halfW * .36, 0, 0); group.scale.setScalar(Math.min(1, halfW * .58 / 3.4)); }
      mat.uniforms.uPR.value = renderer.getPixelRatio();
    }
    layout(); addEventListener("resize", layout);

    let mx = 0, my = 0;
    addEventListener("pointermove", e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; }, { passive: true });

    // ---------- Boucle ----------
    let cur = scrollProgress(), rx = 0, ry = 0, focus = 0;
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const clock = new THREE.Clock();
    function frame() {
      const time = clock.getElapsedTime();
      const target = scrollProgress();
      cur += (target - cur) * (reduce ? .3 : .11);
      if (Math.abs(target - cur) < 1e-4) cur = target;
      updateChrome(target);

      const i = Math.min(Math.floor(cur), total - 1), j = Math.min(i + 1, total - 1);
      const raw = cur - i, t = ease(raw);
      const A = targets[i], B = targets[j];
      const burst = reduce ? 0 : Math.sin(Math.PI * raw) * 1.1;
      for (let k = 0; k < N; k++) {
        const k3 = k * 3, sk = burst * (.4 + seed[k]);
        pos[k3]     = A.p[k3]     + (B.p[k3]     - A.p[k3])     * t + dir[k3]     * sk;
        pos[k3 + 1] = A.p[k3 + 1] + (B.p[k3 + 1] - A.p[k3 + 1]) * t + dir[k3 + 1] * sk;
        pos[k3 + 2] = A.p[k3 + 2] + (B.p[k3 + 2] - A.p[k3 + 2]) * t + dir[k3 + 2] * sk;
        acc[k] = A.a[k] + (B.a[k] - A.a[k]) * t;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.aAccent.needsUpdate = true;

      // Focus : proche d'une page ET quasi immobile → la forme se verrouille, face caméra.
      const d = Math.abs(cur - Math.round(cur)), still = Math.abs(target - cur) < .02 ? 1 : 0;
      const want = Math.max(0, 1 - d / .06) * still;
      focus += (want - focus) * (want > focus ? .06 : .2);
      mat.uniforms.uFocus.value = focus;

      const loose = 1 - focus * .85;
      const swing = reduce ? 0 : Math.sin(time * .25) * .3 * loose;
      ry += ((swing + mx * .45 * loose) - ry) * .06;
      rx += ((my * .25 * loose) - rx) * .06;
      group.rotation.set(rx, ry, 0);
      mat.uniforms.uTime.value = reduce ? 0 : time;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
})();
