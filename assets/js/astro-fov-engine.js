// Shared JS engine for the "how big would it look to <instrument>?" figures.
// Pasted into each shortcode's IIFE via readFile (so it is not parsed as a Hugo
// template). The shortcode must define the hooks footprintExtent, drawFootprint,
// footprintCaption, colorKeyItems and instrumentCards.
  // ---------------------------------------------------------------- data
  var UNIT_PC = { km: 3.2407793e-14, AU: 4.848137e-6, pc: 1, kpc: 1e3, Mpc: 1e6 };
  var ARCSEC_PER_RAD = 206264.806;
  var TYPE_LABEL = {
    spiral: 'Spiral galaxy', elliptical: 'Elliptical galaxy', irregular: 'Irregular / merging galaxy', ring: 'Ring galaxy',
    group: 'Galaxy group / cluster', nebula: 'Emission nebula', pillars: 'Pillars (dark dust columns)', planetary: 'Planetary nebula / shell',
    snr: 'Supernova remnant', globular: 'Globular cluster', open: 'Open cluster', planet: 'Planet / Moon'
  };
  var TYPE_ORDER = ['spiral', 'elliptical', 'irregular', 'ring', 'group', 'nebula', 'pillars', 'planetary', 'snr', 'globular', 'open', 'planet'];

  // name, aliases, type, [distance, unit], [diameter, unit], extras (tilt, rot, look)
  var DB = [
    ['Andromeda Galaxy', ['M31', 'NGC 224', 'Andromeda'], 'spiral', [0.78, 'Mpc'], [46, 'kpc'], { tilt: 0.32, rot: 0.6 }],
    ['Triangulum Galaxy', ['M33', 'NGC 598', 'Triangulum'], 'spiral', [0.85, 'Mpc'], [18, 'kpc'], { tilt: 0.75, rot: 0.3 }],
    ['Whirlpool Galaxy', ['M51', 'NGC 5194', 'Whirlpool'], 'spiral', [8.6, 'Mpc'], [24, 'kpc'], { tilt: 0.9, rot: 0.8 }],
    ['Pinwheel Galaxy', ['M101', 'NGC 5457', 'Pinwheel'], 'spiral', [6.9, 'Mpc'], [55, 'kpc'], { tilt: 0.95, rot: 0.1 }],
    ['Sombrero Galaxy', ['M104', 'NGC 4594', 'Sombrero'], 'spiral', [9.5, 'Mpc'], [30, 'kpc'], { tilt: 0.14, rot: 0.1 }],
    ['Large Magellanic Cloud', ['LMC'], 'irregular', [50, 'kpc'], [10, 'kpc'], {}],
    ['Small Magellanic Cloud', ['SMC'], 'irregular', [62, 'kpc'], [5, 'kpc'], {}],
    ['Cigar Galaxy', ['M82', 'NGC 3034'], 'irregular', [3.5, 'Mpc'], [12, 'kpc'], {}],
    ['Antennae Galaxies', ['NGC 4038', 'NGC 4039', 'Antennae'], 'irregular', [22, 'Mpc'], [30, 'kpc'], {}],
    ['Cartwheel Galaxy', ['ESO 350-40', 'Cartwheel'], 'ring', [150, 'Mpc'], [44, 'kpc'], { tilt: 0.85 }],
    ['Messier 87', ['M87', 'NGC 4486', 'Virgo A'], 'elliptical', [16.4, 'Mpc'], [40, 'kpc'], { tilt: 0.85 }],
    ['Messier 32', ['M32', 'NGC 221'], 'elliptical', [0.8, 'Mpc'], [2.5, 'kpc'], { tilt: 0.8 }],
    ['NGC 1275 (Perseus A)', ['NGC 1275', 'Perseus A', '3C 84', 'Perseus Cluster BCG'], 'elliptical', [75, 'Mpc'], [60, 'kpc'], { tilt: 0.9 }],
    ['NGC 4696 (Centaurus Cluster BCG)', ['NGC 4696', 'Centaurus A1'], 'elliptical', [43, 'Mpc'], [50, 'kpc'], { tilt: 0.8 }],
    ['NGC 1399 (Fornax Cluster BCG)', ['NGC 1399', 'Fornax BCG'], 'elliptical', [20, 'Mpc'], [45, 'kpc'], { tilt: 0.9 }],
    ['NGC 3311 (Hydra Cluster BCG)', ['NGC 3311', 'Hydra BCG'], 'elliptical', [50, 'Mpc'], [60, 'kpc'], { tilt: 0.9 }],
    ['NGC 4889 (Coma Cluster BCG)', ['NGC 4889', 'Coma BCG'], 'elliptical', [100, 'Mpc'], [100, 'kpc'], { tilt: 0.7 }],
    ['NGC 6166 (Abell 2199 BCG)', ['NGC 6166', 'Abell 2199 BCG'], 'elliptical', [135, 'Mpc'], [100, 'kpc'], { tilt: 0.85 }],
    ['IC 1101 (Abell 2029 BCG)', ['IC 1101', 'Abell 2029 BCG'], 'elliptical', [340, 'Mpc'], [500, 'kpc'], { tilt: 0.7 }],
    ["Stephan's Quintet", ['HCG 92', 'NGC 7317'], 'group', [85, 'Mpc'], [100, 'kpc'], {}],
    ['Coma Cluster', ['Abell 1656', 'Coma'], 'group', [100, 'Mpc'], [2, 'Mpc'], {}],
    ['SMACS 0723', ['SMACS J0723.3-7327'], 'group', [0.39, 'z'], [1, 'Mpc'], {}],
    ["Abell 2744 (Pandora's Cluster)", ['Abell 2744', 'Pandora'], 'group', [0.308, 'z'], [2, 'Mpc'], {}],
    ['GN-z11', ['GN z11'], 'irregular', [10.6, 'z'], [1, 'kpc'], {}],
    ['JADES-GS-z14-0', ['GS-z14-0', 'JADES z14'], 'irregular', [14.2, 'z'], [0.7, 'kpc'], {}],
    ['Orion Nebula', ['M42', 'NGC 1976', 'Orion'], 'nebula', [0.41, 'kpc'], [25, 'pc'], {}],
    ['Eagle Nebula', ['M16', 'NGC 6611'], 'nebula', [1.74, 'kpc'], [20, 'pc'], {}],
    ['Pillars of Creation', ['Pillars', 'Eagle pillars'], 'pillars', [1.74, 'kpc'], [2, 'pc'], {}],
    ['Carina Nebula', ['NGC 3372', 'Carina'], 'nebula', [2.3, 'kpc'], [90, 'pc'], {}],
    ['Lagoon Nebula', ['M8', 'NGC 6523', 'Lagoon'], 'nebula', [1.25, 'kpc'], [55, 'pc'], {}],
    ['Tarantula Nebula', ['30 Doradus', 'NGC 2070', 'Tarantula'], 'nebula', [50, 'kpc'], [200, 'pc'], {}],
    ['Horsehead Nebula', ['Barnard 33', 'B33', 'Horsehead'], 'nebula', [0.4, 'kpc'], [1, 'pc'], {}],
    ['Ring Nebula', ['M57', 'NGC 6720'], 'planetary', [0.71, 'kpc'], [0.5, 'pc'], { tilt: 0.8 }],
    ['Southern Ring Nebula', ['NGC 3132', 'Eight-Burst'], 'planetary', [0.77, 'kpc'], [0.4, 'pc'], { tilt: 0.85 }],
    ['Helix Nebula', ['NGC 7293', 'Helix'], 'planetary', [0.2, 'kpc'], [0.9, 'pc'], { tilt: 0.95 }],
    ["Cat's Eye Nebula", ['NGC 6543', "Cat's Eye"], 'planetary', [1.0, 'kpc'], [0.2, 'pc'], { tilt: 0.75 }],
    ['WR 124 Nebula', ['WR 124'], 'planetary', [4.6, 'kpc'], [3, 'pc'], {}],
    ['Crab Nebula', ['M1', 'NGC 1952', 'Crab'], 'snr', [2.0, 'kpc'], [3.4, 'pc'], { tilt: 0.75 }],
    ['Cassiopeia A', ['Cas A'], 'snr', [3.4, 'kpc'], [5, 'pc'], {}],
    ['Veil Nebula', ['Cygnus Loop', 'NGC 6960', 'Veil'], 'snr', [0.74, 'kpc'], [38, 'pc'], {}],
    ['Pleiades', ['M45', 'Seven Sisters'], 'open', [0.136, 'kpc'], [10, 'pc'], {}],
    ['Omega Centauri', ['NGC 5139', 'Omega Cen'], 'globular', [5.4, 'kpc'], [50, 'pc'], {}],
    ['47 Tucanae', ['NGC 104', '47 Tuc'], 'globular', [4.5, 'kpc'], [45, 'pc'], {}],
    ['Messier 13', ['M13', 'NGC 6205', 'Hercules Cluster'], 'globular', [7.1, 'kpc'], [40, 'pc'], {}],
    ['Moon', ['The Moon', 'Luna'], 'planet', [384400, 'km'], [3474, 'km'], { look: { kind: 'moon' } }],
    ['Mars', [], 'planet', [0.52, 'AU'], [6779, 'km'], { look: { kind: 'mars' } }],
    ['Jupiter', [], 'planet', [4.2, 'AU'], [142984, 'km'], { look: { kind: 'jupiter' } }],
    ['Saturn', [], 'planet', [8.5, 'AU'], [116460, 'km'], { look: { kind: 'saturn' } }],
    ['Uranus', [], 'planet', [18.2, 'AU'], [50724, 'km'], { look: { kind: 'ice', color: '#8fd6e0' } }],
    ['Neptune', [], 'planet', [29, 'AU'], [49244, 'km'], { look: { kind: 'ice', color: '#3f6fd8' } }]
  ].map(function (r) {
    return { name: r[0], aliases: r[1], type: r[2], dist: { v: r[3][0], u: r[3][1] }, diam: { v: r[4][0], u: r[4][1] }, extra: r[5] || {} };
  });

  // ------------------------------------------------------------ helpers
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9]/g, ''); }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rngFor(seed) {
    var a = seed >>> 0;
    return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }

  // Flat LCDM angular-diameter distance (Mpc), Simpson integration.
  function angDiamDistMpc(z) {
    var Om = 0.3, OL = 0.7, DH = 299792.458 / 70, n = 400, h = z / n, sum = 0;
    function f(x) { return 1 / Math.sqrt(Om * Math.pow(1 + x, 3) + OL); }
    for (var i = 0; i <= n; i++) { var w = (i === 0 || i === n) ? 1 : (i % 2 ? 4 : 2); sum += w * f(i * h); }
    return DH * (h / 3) * sum / (1 + z);
  }
  function distToPc(v, u) { return u === 'z' ? angDiamDistMpc(v) * 1e6 : v * UNIT_PC[u]; }
  function sizeToPc(v, u) { return v * UNIT_PC[u]; }

  function fmtAngle(a) {
    if (a < 0.1) return (a * 1000).toFixed(0) + ' mas';
    if (a < 1) return a.toFixed(2) + '″';
    if (a < 120) return a.toFixed(a < 10 ? 2 : 1) + '″';
    if (a < 7200) return (a / 60).toFixed(a < 600 ? 2 : 1) + '′';
    return (a / 3600).toFixed(2) + '°';
  }
  // Scale-bar length: a round number (1, 2, 5 x 10^n) in the most natural unit.
  function niceBar(targetArcsec) {
    var units = [['mas', 0.001], ['″', 1], ['′', 60], ['°', 3600]], u = units[0], i;
    for (i = 0; i < units.length; i++) if (targetArcsec >= units[i][1]) u = units[i];
    var t = targetArcsec / u[1], base = Math.pow(10, Math.floor(Math.log10(t))), best = base;
    [1, 2, 5, 10].forEach(function (m) { if (m * base <= t) best = m * base; });
    var v = Math.round(best * 1000) / 1000;
    return { arcsec: best * u[1], label: v + (u[0] === 'mas' ? ' mas' : u[0]) };
  }

  function fmtNum(x) {
    if (x >= 1000) return Math.round(x).toLocaleString();
    if (x >= 100) return x.toFixed(0);
    if (x >= 10) return x.toFixed(1);
    if (x >= 1) return x.toFixed(2);
    return x.toPrecision(2);
  }

  // ------------------------------------------------ particle generators
  function makeGen(rand) {
    var g = {};
    g.n = function () { var u = Math.max(1e-9, rand()), v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    return g;
  }
  function orient(parts, tilt, rot) {
    var c = Math.cos(rot), s = Math.sin(rot);
    parts.forEach(function (p) {
      var y = p.y * tilt, x = p.x;
      p.x = x * c - y * s; p.y = x * s + y * c;
    });
  }
  function P(x, y, s, a, c) { return { x: x, y: y, s: s, a: a, c: c }; }

  var PALETTE = {
    spiral: ['#ffd9a0', '#9ec5ff', '#cfe0ff', '#ff8fb8'],
    elliptical: ['#ffcf8a', '#ffe0b3', '#ffb86b', '#fff1d6'],
    irregular: ['#7fb2ff', '#ff8fc8', '#c7d8ff', '#ffd9a0'],
    ring: ['#ffd9a0', '#7fb2ff', '#cfe0ff', '#ff8fc8'],
    group: ['#ffcf8a', '#ffb86b', '#9ec5ff', '#a78bfa'],
    nebula: ['#f472b6', '#e879f9', '#2dd4bf', '#60a5fa', '#fb923c', '#ffffff'],
    pillars: ['#fb923c', '#7a4a2a', '#2dd4bf', '#fde68a', '#a0522d'],
    planetary: ['#2dd4bf', '#60a5fa', '#f472b6', '#ffffff'],
    snr: ['#f87171', '#fb923c', '#60a5fa', '#e9d5ff', '#34d399'],
    globular: ['#ffe2a8', '#ffd08a', '#fff4de', '#ffb86b', '#a8c8ff'],
    open: ['#a8c8ff', '#dbe7ff', '#ffffff', '#7fb2ff'],
    planet: ['#ffd9a0']
  };

  function generate(type, name, extra) {
    var rand = rngFor(hashStr(name + '|' + type)), G = makeGen(rand), parts = [], i, N;
    var pal = PALETTE[type] || PALETTE.spiral;

    if (type === 'spiral') {
      N = 7500;
      for (i = 0; i < N; i++) {
        var u = rand();
        if (u < 0.13) { var r = Math.abs(G.n()) * 0.09, t = rand() * 6.283; parts.push(P(r * Math.cos(t), r * Math.sin(t), 1.1, 0.8, 0)); }
        else if (u < 0.38) { var rd = clamp(-Math.log(1 - rand() * 0.98) * 0.28, 0, 1), td = rand() * 6.283; parts.push(P(rd * Math.cos(td), rd * Math.sin(td), 0.8, 0.3, rand() < 0.5 ? 0 : 2)); }
        else {
          var arm = rand() < 0.5 ? 0 : 1, ra = 0.07 + 0.93 * Math.pow(rand(), 0.8);
          var th = Math.log(ra / 0.07) / 0.3 + arm * Math.PI + G.n() * 0.2 * (1.2 - ra);
          ra += G.n() * 0.022;
          var knot = rand() < 0.07;
          parts.push(P(ra * Math.cos(th), ra * Math.sin(th), knot ? 1.8 : 0.9, knot ? 0.85 : 0.5, knot ? 3 : (rand() < 0.5 ? 1 : 2)));
        }
      }
      orient(parts, extra.tilt || 0.8, extra.rot || 0.5);
    } else if (type === 'elliptical') {
      N = 6500;
      for (i = 0; i < N; i++) {
        var re = Math.pow(rand(), 1.6) * 0.95 + Math.abs(G.n()) * 0.05, te = rand() * 6.283;
        parts.push(P(re * Math.cos(te), re * Math.sin(te), 0.8 + (1 - re) * 0.7, 0.2 + (1 - re) * 0.6, Math.floor(rand() * 4)));
      }
      orient(parts, extra.tilt || 0.75, extra.rot || 0.4);
    } else if (type === 'irregular') {
      var centers = [], k;
      for (k = 0; k < 9; k++) centers.push({ x: G.n() * 0.35, y: G.n() * 0.3, s: 0.1 + rand() * 0.18, c: rand() < 0.55 ? 0 : 1 });
      N = 6500;
      for (i = 0; i < N; i++) {
        var cc = centers[Math.floor(rand() * centers.length)];
        var x = cc.x + G.n() * cc.s, y = cc.y + G.n() * cc.s * 0.8;
        var knot2 = rand() < 0.05;
        parts.push(P(x, y, knot2 ? 1.7 : 0.9, knot2 ? 0.85 : 0.45, knot2 ? 1 : (rand() < 0.7 ? cc.c : 2 + (rand() < 0.5 ? 1 : 0))));
      }
      orient(parts, 0.8, rand() * 3);
      var mx = 0; parts.forEach(function (p) { mx = Math.max(mx, Math.hypot(p.x, p.y)); });
      parts.forEach(function (p) { p.x /= mx * 1.02; p.y /= mx * 1.02; });
    } else if (type === 'ring') {
      N = 6000;
      for (i = 0; i < N; i++) {
        var u2 = rand();
        if (u2 < 0.12) { var rc = Math.abs(G.n()) * 0.07, tc = rand() * 6.283; parts.push(P(rc * Math.cos(tc), rc * Math.sin(tc), 1.1, 0.8, 0)); }
        else if (u2 < 0.8) { var rr = 0.82 + G.n() * 0.05, tr = rand() * 6.283, kn = rand() < 0.08; parts.push(P(rr * Math.cos(tr), rr * Math.sin(tr), kn ? 1.8 : 0.9, kn ? 0.9 : 0.55, kn ? 3 : 1)); }
        else { var rs = rand() * 0.8, ts = Math.floor(rand() * 5) * 1.2566 + G.n() * 0.06; parts.push(P(rs * Math.cos(ts), rs * Math.sin(ts), 0.7, 0.28, 2)); }
      }
      orient(parts, extra.tilt || 0.85, 0.3);
    } else if (type === 'group') {
      var members = 10 + Math.floor(rand() * 16), m;
      for (m = 0; m < 5; m++) { var cx = G.n() * 0.18, cy = G.n() * 0.18; for (i = 0; i < 160; i++) parts.push(P(cx + G.n() * 0.09, cy + G.n() * 0.07, 1.1, 0.45, 0)); }
      for (m = 0; m < members; m++) {
        var gx = G.n() * 0.42, gy = G.n() * 0.34, sg = 0.02 + rand() * 0.04, spiralMember = rand() < 0.35, cnt = 70 + Math.floor(rand() * 60), ang = rand() * 3;
        for (i = 0; i < cnt; i++) {
          var px = G.n() * sg, py = G.n() * sg * 0.55;
          parts.push(P(gx + px * Math.cos(ang) - py * Math.sin(ang), gy + px * Math.sin(ang) + py * Math.cos(ang), 1.0, 0.55, spiralMember ? 2 : (rand() < 0.5 ? 0 : 1)));
        }
        parts.push(P(gx, gy, 2.4, 0.85, 0));
      }
      for (i = 0; i < 900; i++) parts.push(P(G.n() * 0.4, G.n() * 0.35, 1.6, 0.05, 3));
      var mg = 0; parts.forEach(function (p) { mg = Math.max(mg, Math.hypot(p.x, p.y)); });
      mg = Math.min(mg, 1.4);
      parts.forEach(function (p) { p.x /= mg * 1.05; p.y /= mg * 1.05; });
    } else if (type === 'nebula') {
      var lobes = [], lx = 0, ly = 0;
      for (k = 0; k < 7; k++) { lx += G.n() * 0.18; ly += G.n() * 0.15; lobes.push({ x: lx, y: ly, s: 0.12 + rand() * 0.22, c: Math.floor(rand() * 5) }); }
      N = 5200;
      for (i = 0; i < N; i++) {
        var lb = lobes[Math.floor(rand() * lobes.length)];
        parts.push(P(lb.x + G.n() * lb.s, lb.y + G.n() * lb.s * 0.8, 2.4 + rand() * 1.8, 0.07 + rand() * 0.1, rand() < 0.65 ? lb.c : Math.floor(rand() * 5)));
      }
      for (k = 0; k < 7; k++) {
        var a0 = rand() * 6.28, r0 = rand() * 0.45, x0 = Math.cos(a0) * r0, y0 = Math.sin(a0) * r0, dir = rand() * 6.28, curve = G.n() * 0.04, len = 0.35 + rand() * 0.4, fc = Math.floor(rand() * 5);
        for (i = 0; i < 160; i++) { var tt = i / 160; var d = dir + curve * tt * 6; parts.push(P(x0 + Math.cos(dir) * len * tt + Math.cos(d) * G.n() * 0.01, y0 + Math.sin(dir) * len * tt + Math.sin(d) * G.n() * 0.01 + Math.sin(tt * 4 + k) * 0.05, 1.0, 0.5, fc)); }
      }
      for (i = 0; i < 40; i++) parts.push(P(G.n() * 0.5, G.n() * 0.45, 1.2 + rand() * 1.4, 0.8, 5));
      var mn = 0; parts.forEach(function (p) { mn = Math.max(mn, Math.hypot(p.x, p.y)); });
      parts.forEach(function (p) { p.x /= mn * 1.0; p.y /= mn * 1.0; });
    } else if (type === 'pillars') {
      var pil = [{ x: -0.55, h: 1.5, w: 0.15, lean: 0.12 }, { x: 0.0, h: 1.2, w: 0.11, lean: -0.08 }, { x: 0.5, h: 0.95, w: 0.1, lean: 0.15 }];
      for (i = 0; i < 1500; i++) parts.push(P(G.n() * 0.7, G.n() * 0.45 - 0.1, 3.6, 0.05, 2));
      pil.forEach(function (pl) {
        for (i = 0; i < 1900; i++) {
          var h = Math.pow(rand(), 0.8), yy = 1 - h * pl.h, width = pl.w * (0.55 + 0.55 * (1 - h * 0.6));
          var xx = pl.x + pl.lean * h + G.n() * width * 0.5;
          var tip = h > 0.9;
          parts.push(P(xx, yy, tip ? 1.6 : 1.5, tip ? 0.55 : 0.28, tip ? (rand() < 0.5 ? 3 : 0) : (rand() < 0.8 ? 1 : 4)));
        }
        for (i = 0; i < 120; i++) { var hh = 0.9 + rand() * 0.1; parts.push(P(pl.x + pl.lean * hh + G.n() * pl.w * 0.55, 1 - hh * pl.h + G.n() * 0.02, 1.0, 0.8, 2)); }
      });
      for (i = 0; i < 60; i++) parts.push(P(G.n() * 0.8, G.n() * 0.5 - 0.4, 1.0, 0.8, 3));
      var mp = 0; parts.forEach(function (p) { mp = Math.max(mp, Math.abs(p.x), Math.abs(p.y)); });
      parts.forEach(function (p) { p.x /= mp * 1.05; p.y = (p.y - 0.15) / mp / 1.05; });
    } else if (type === 'planetary') {
      N = 5200;
      for (i = 0; i < N; i++) {
        var u3 = rand(), t3 = rand() * 6.283;
        if (u3 < 0.55) { var r3 = 0.6 + G.n() * 0.07; parts.push(P(r3 * Math.cos(t3), r3 * Math.sin(t3), 1.0, 0.5, rand() < 0.7 ? 0 : 1)); }
        else if (u3 < 0.85) { var r4 = 0.85 + G.n() * 0.07; parts.push(P(r4 * Math.cos(t3), r4 * Math.sin(t3), 2.0, 0.12, 2)); }
        else { var r5 = Math.abs(G.n()) * 0.45; parts.push(P(r5 * Math.cos(t3), r5 * Math.sin(t3), 2.4, 0.08, 1)); }
      }
      parts.push(P(0, 0, 4, 0.95, 3));
      orient(parts, extra.tilt || 0.85, 0.5);
    } else if (type === 'snr') {
      var knots = [], kk;
      for (kk = 0; kk < 22; kk++) knots.push({ a: rand() * 6.283, r: 0.78 + G.n() * 0.05, s: 0.04 + rand() * 0.05, c: Math.floor(rand() * 5) });
      N = 6000;
      for (i = 0; i < N; i++) {
        var u4 = rand();
        if (u4 < 0.5) { var kn2 = knots[Math.floor(rand() * knots.length)]; parts.push(P(kn2.r * Math.cos(kn2.a) + G.n() * kn2.s, kn2.r * Math.sin(kn2.a) + G.n() * kn2.s, 1.2, 0.5, kn2.c)); }
        else if (u4 < 0.75) { var rs2 = 0.8 + G.n() * 0.06, ts2 = rand() * 6.283; parts.push(P(rs2 * Math.cos(ts2), rs2 * Math.sin(ts2), 1.0, 0.3, rand() < 0.5 ? 0 : 1)); }
        else { var ri = Math.abs(G.n()) * 0.4, ti = rand() * 6.283; parts.push(P(ri * Math.cos(ti), ri * Math.sin(ti), 1.8, 0.1, rand() < 0.6 ? 2 : 4)); }
      }
      parts.push(P(0, 0, 2.6, 0.9, 3));
      orient(parts, extra.tilt || 0.9, 0.7);
    } else if (type === 'globular') {
      N = 7500;
      for (i = 0; i < N; i++) {
        var rg = clamp(0.18 / Math.sqrt(Math.pow(rand() * 0.995 + 0.002, -2 / 3) - 1), 0, 1), tg = rand() * 6.283;
        parts.push(P(rg * Math.cos(tg), rg * Math.sin(tg), 0.8 + (1 - rg) * 0.8, 0.3 + (1 - rg) * 0.5, rand() < 0.04 ? 4 : Math.floor(rand() * 4)));
      }
    } else if (type === 'open') {
      for (i = 0; i < 2000; i++) parts.push(P(G.n() * 0.4, G.n() * 0.4, 3.5, 0.03, 3));
      for (i = 0; i < 260; i++) {
        var ro = Math.pow(rand(), 0.7) * 0.9, to = rand() * 6.283, bright = rand() < 0.12;
        parts.push(P(ro * Math.cos(to), ro * Math.sin(to), bright ? 2.6 : 1.0 + rand() * 0.8, bright ? 0.95 : 0.55, Math.floor(rand() * 3)));
      }
    }
    return parts;
  }

  // -------------------------------------------------------------- state
  var wrap = document.querySelector('.nfv-wrap');
  var $ = function (id) { return wrap.querySelector(id); };
  var canvas = $('#nfv-canvas'), ctx = canvas.getContext('2d');
  var searchEl = $('#nfv-search'), selectEl = $('#nfv-select'), statusEl = $('#nfv-status'), namesEl = $('#nfv-names');
  var typeEl = $('#nfv-type'), distEl = $('#nfv-dist'), distUnitEl = $('#nfv-dist-unit'), diamEl = $('#nfv-diam'), diamUnitEl = $('#nfv-diam-unit');
  var zoomEl = $('#nfv-zoom'), cardsEl = $('#nfv-cards');

  var W = 1000, H = 560, dpr = 1;
  var scale = 3;                       // screen px per arcsec
  var obj = null;                      // { name, type, extra, parts }
  var angDiam = 1;                     // arcsec

  var stars = [];
  (function () { var r = rngFor(7); for (var i = 0; i < 130; i++) stars.push({ x: r(), y: r(), a: 0.15 + r() * 0.5, s: 0.6 + r() * 1.1 }); })();

  var spriteCache = {};
  function getSprite(color) {
    if (spriteCache[color]) return spriteCache[color];
    var c = document.createElement('canvas'); c.width = c.height = 48;
    var g = c.getContext('2d');
    var rgb = color.replace('#', ''), r = parseInt(rgb.substr(0, 2), 16), gg = parseInt(rgb.substr(2, 2), 16), b = parseInt(rgb.substr(4, 2), 16);
    var grad = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    grad.addColorStop(0, 'rgba(' + r + ',' + gg + ',' + b + ',1)');
    grad.addColorStop(0.3, 'rgba(' + r + ',' + gg + ',' + b + ',0.45)');
    grad.addColorStop(1, 'rgba(' + r + ',' + gg + ',' + b + ',0)');
    g.fillStyle = grad; g.fillRect(0, 0, 48, 48);
    spriteCache[color] = c;
    return c;
  }

  // ----------------------------------------------------------- drawing
  function drawParticles(c, cx, cy, rpx, o) {
    var pal = PALETTE[o.type] || PALETTE.spiral;
    c.save();
    c.globalCompositeOperation = 'lighter';
    var parts = o.parts, i, p, size, x, y;
    for (i = 0; i < parts.length; i++) {
      p = parts[i];
      x = cx + p.x * rpx; y = cy + p.y * rpx;
      size = clamp(rpx * 0.034 * p.s, 3, 40);
      if (x < -size || y < -size || x > W + size || y > H + size) continue;
      c.globalAlpha = Math.min(1, p.a * (rpx < 60 ? 1.2 : 1));
      c.drawImage(getSprite(pal[p.c % pal.length]), x - size / 2, y - size / 2, size, size);
    }
    c.restore();
  }

  function drawPlanet(c, cx, cy, r, look) {
    look = look || { kind: 'jupiter' };
    var k = look.kind;
    function bandsFill(colors) {
      c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.clip();
      var n = colors.length, h = (2 * r) / n;
      colors.forEach(function (col, i) { c.fillStyle = col; c.fillRect(cx - r, cy - r + i * h, 2 * r, h + 1); });
      c.restore();
    }
    function shade() {
      var g = c.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      g.addColorStop(0, 'rgba(255,255,255,0.12)'); g.addColorStop(0.6, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.7)');
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.fill();
    }
    function rings(front) {
      var radii = [1.35, 1.55, 1.75, 1.95, 2.2], alphas = [0.5, 0.75, 0.55, 0.7, 0.35];
      radii.forEach(function (m, i) {
        c.strokeStyle = 'rgba(224,200,160,' + alphas[i] + ')'; c.lineWidth = Math.max(1, r * 0.1);
        c.beginPath(); c.ellipse(cx, cy, r * m, r * m * 0.32, -0.25, front ? 0 : Math.PI, front ? Math.PI : 6.2832); c.stroke();
      });
    }
    if (k === 'saturn') rings(false);
    if (k === 'moon') {
      c.fillStyle = '#b9b6b0'; c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.fill();
      var rr = rngFor(11);
      c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.clip();
      for (var i = 0; i < 40; i++) { c.fillStyle = 'rgba(70,70,75,' + (0.15 + rr() * 0.25) + ')'; c.beginPath(); c.arc(cx + (rr() - 0.5) * 1.8 * r, cy + (rr() - 0.5) * 1.8 * r, r * (0.03 + rr() * 0.12), 0, 6.2832); c.fill(); }
      c.restore();
    } else if (k === 'mars') {
      c.fillStyle = '#c1633d'; c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.fill();
      c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.clip();
      c.fillStyle = 'rgba(80,35,25,0.45)'; c.beginPath(); c.ellipse(cx - r * 0.2, cy + r * 0.1, r * 0.4, r * 0.18, 0.3, 0, 6.2832); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.ellipse(cx, cy - r * 0.95, r * 0.4, r * 0.18, 0, 0, 6.2832); c.fill();
      c.restore();
    } else if (k === 'ice') {
      c.fillStyle = look.color || '#8fd6e0'; c.beginPath(); c.arc(cx, cy, r, 0, 6.2832); c.fill();
    } else if (k === 'saturn') {
      bandsFill(['#d8c28f', '#c7ad78', '#e3d3a6', '#bda26b', '#d8c28f', '#c7ad78', '#e3d3a6']);
    } else {
      bandsFill(['#d6b38a', '#a0724a', '#e8d3b0', '#b5835a', '#d9c0a0', '#a0724a', '#d6b38a', '#c49a70']);
    }
    shade();
    if (k === 'saturn') rings(true);
  }

  function drawObject(c, cx, cy, rpx, o) {
    if (o.type === 'planet') {
      if (rpx < 2) { drawGlow(c, cx, cy, 12, '#ffd9a0'); return; }
      drawPlanet(c, cx, cy, rpx, o.extra.look);
    } else {
      if (rpx < 5) { drawGlow(c, cx, cy, 16, (PALETTE[o.type] || PALETTE.spiral)[0]); return; }
      drawParticles(c, cx, cy, rpx, o);
    }
  }
  function drawGlow(c, x, y, size, color) {
    c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.95;
    c.drawImage(getSprite(color), x - size / 2, y - size / 2, size, size);
    c.restore();
  }

  function shadowText(c, text, x, y) {
    c.save();
    c.shadowColor = 'rgba(0,0,0,0.95)'; c.shadowBlur = 5; c.shadowOffsetX = 0; c.shadowOffsetY = 1;
    c.lineWidth = 3; c.strokeStyle = 'rgba(3,6,13,0.85)'; c.lineJoin = 'round';
    c.strokeText(text, x, y);
    c.fillText(text, x, y);
    c.restore();
  }

  function scaleBar(c, x, y, pxPerArcsec, label) {
    var bar = niceBar(140 / pxPerArcsec), px = bar.arcsec * pxPerArcsec;
    function barPath() {
      c.beginPath();
      c.moveTo(x, y); c.lineTo(x + px, y); c.moveTo(x, y - 5); c.lineTo(x, y + 5); c.moveTo(x + px, y - 5); c.lineTo(x + px, y + 5);
    }
    c.save(); c.lineCap = 'round';
    c.shadowColor = 'rgba(0,0,0,0.95)'; c.shadowBlur = 6; c.shadowOffsetY = 1;
    c.strokeStyle = 'rgba(3,6,13,0.9)'; c.lineWidth = 5; barPath(); c.stroke();
    c.restore();
    c.strokeStyle = '#e2e8f0'; c.lineWidth = 2; barPath(); c.stroke();
    c.fillStyle = '#e2e8f0'; c.font = '13px "STIX Two Text", serif'; c.textAlign = 'center'; c.textBaseline = 'bottom';
    shadowText(c, bar.label + (label ? ' ' + label : ''), x + px / 2, y - 7);
  }

  // Bottom-right reminder of what the colors mean.
  function drawColorKey(c) {
    var items = colorKeyItems();
    if (angDiam / 2 * scale < 26) items.push({ color: '#fbbf24', text: 'Object marker and magnified inset', dim: false, dash: false });
    c.save();
    c.font = '13px "STIX Two Text", serif'; c.textAlign = 'left'; c.textBaseline = 'middle';
    var widest = 0;
    items.forEach(function (it) { widest = Math.max(widest, c.measureText(it.text).width); });
    var bw = widest + 46, bh = items.length * 22 + 12, bx = W - bw - 14, by = H - bh - 14;
    c.fillStyle = 'rgba(3,6,13,0.72)'; c.strokeStyle = 'rgba(148,163,184,0.3)'; c.lineWidth = 1;
    c.fillRect(bx, by, bw, bh); c.strokeRect(bx, by, bw, bh);
    items.forEach(function (it, i) {
      var y = by + 6 + i * 22 + 11;
      c.globalAlpha = it.dim ? 0.4 : 1;
      c.strokeStyle = it.color; c.lineWidth = 2.5;
      c.setLineDash(it.dash ? [4, 3] : []);
      c.strokeRect(bx + 10, y - 6, 18, 12);
      c.setLineDash([]);
      c.fillStyle = it.color; c.globalAlpha = it.dim ? 0.15 : 0.22; c.fillRect(bx + 10, y - 6, 18, 12);
      c.globalAlpha = it.dim ? 0.5 : 1; c.fillStyle = '#e2e8f0';
      c.fillText(it.text, bx + 36, y);
    });
    c.restore();
  }

  function render() {
    var c = ctx;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    var bg = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
    bg.addColorStop(0, '#0b1224'); bg.addColorStop(1, '#03060d');
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    stars.forEach(function (s) { c.globalAlpha = s.a; c.fillStyle = '#fff'; c.fillRect(s.x * W, s.y * H, s.s, s.s); });
    c.globalAlpha = 1;
    if (!obj) return;

    var cx = W / 2, cy = H / 2, rpx = angDiam / 2 * scale;
    drawObject(c, cx, cy, rpx, obj);

    // marker for tiny objects
    if (rpx < 8) {
      c.strokeStyle = 'rgba(251,191,36,0.7)'; c.setLineDash([3, 3]); c.lineWidth = 1;
      c.beginPath(); c.arc(cx, cy, 15, 0, 6.2832); c.stroke(); c.setLineDash([]);
    }

    drawFootprint(c, cx, cy);
    if (typeof drawGhost === 'function') drawGhost(c, cx, cy);

    // label
    c.fillStyle = '#e2e8f0'; c.font = 'bold 15px "STIX Two Text", serif'; c.textAlign = 'left'; c.textBaseline = 'top';
    shadowText(c, obj.name + '  ·  ' + fmtAngle(angDiam), 14, 12);
    c.fillStyle = '#94a3b8'; c.font = '12px "STIX Two Text", serif';
    shadowText(c, footprintCaption(), 14, 32);
    scaleBar(c, 18, H - 18, scale, '');
    drawColorKey(c);

    // inset for objects too small to see at this zoom
    if (rpx < 26) {
      var S = 210, ix = W - S - 14, iy = 14, ir = 82;
      c.save();
      c.fillStyle = 'rgba(3,6,13,0.92)'; c.fillRect(ix, iy, S, S);
      c.beginPath(); c.rect(ix, iy, S, S); c.clip();
      var icx = ix + S / 2, icy = iy + S / 2 - 6;
      drawObject(c, icx, icy, ir, obj);
      var s2 = (ir * 2) / angDiam;   // px per arcsec inside the inset
      scaleBar(c, ix + 16, iy + S - 12, s2, '');
      c.restore();
      c.strokeStyle = '#fbbf24'; c.lineWidth = 1.5; c.strokeRect(ix, iy, S, S);
      c.fillStyle = '#fbbf24'; c.font = '12px "STIX Two Text", serif'; c.textAlign = 'left'; c.textBaseline = 'top';
      shadowText(c, 'Zoomed ×' + Math.round(ir / Math.max(rpx, 0.01)).toLocaleString(), ix + 8, iy + 6);
    }
  }

  // ------------------------------------------------------------- logic
  function applyScale(s) {
    scale = clamp(s, 0.01, 1e4);
    zoomEl.value = Math.log10(scale);
    render();
  }
  function fitFov() {
    // Default view: the footprint spans 75% of the canvas width (or 90% of its height).
    // Objects larger than that simply extend past the canvas; "Fit object"
    // or the zoom slider shows them whole.
    var ext = footprintExtent();
    applyScale(Math.min(0.75 * W / ext.w, 0.9 * H / ext.h));
  }
  function fitObj() { applyScale(0.8 * Math.min(W, H) / angDiam); }

  function recompute(refit) {
    var d = parseFloat(distEl.value), D = parseFloat(diamEl.value);
    if (!(d > 0) || !(D > 0) || !obj) return;
    var distPc = distToPc(d, distUnitEl.value), diamPc = sizeToPc(D, diamUnitEl.value);
    angDiam = Math.max(1e-5, diamPc / distPc * ARCSEC_PER_RAD);
    updateCards(d, D, distPc, diamPc);
    if (refit) fitFov(); else render();
  }

  function card(label, value, sub) {
    return '<div class="nfv-card"><div class="nfv-card-label">' + label + '</div><div class="nfv-card-value">' + value + '</div><div class="nfv-card-sub">' + sub + '</div></div>';
  }
  function updateCards(d, D, distPc, diamPc) {
    cardsEl.innerHTML =
      card('Angular diameter', fmtAngle(angDiam), fmtNum(angDiam) + ' arcseconds · ' + fmtNum(angDiam / 3600) + ' degrees') +
      instrumentCards(d, D, distPc, diamPc) +
      card('Physical size', fmtNum(D) + ' ' + diamUnitEl.value,
        'at ' + (distUnitEl.value === 'z' ? 'redshift ' + d + ' (' + fmtNum(angDiamDistMpc(d)) + ' Mpc angular-diameter distance)' : 'a distance of ' + fmtNum(d) + ' ' + distUnitEl.value));
  }

  function fillUnits() {
    ['AU', 'km', 'pc', 'kpc', 'Mpc', 'z'].forEach(function (u) { var o = document.createElement('option'); o.value = o.textContent = u; distUnitEl.appendChild(o); });
    ['km', 'AU', 'pc', 'kpc'].forEach(function (u) { var o = document.createElement('option'); o.value = o.textContent = u; diamUnitEl.appendChild(o); });
    var o = document.createElement('option'); o.value = o.textContent = 'Mpc'; diamUnitEl.appendChild(o);
  }

  function setObject(entry, custom) {
    obj = {
      name: entry.name, type: entry.type, extra: entry.extra || {},
      parts: entry.type === 'planet' ? [] : generate(entry.type, custom ? 'custom' : entry.name, entry.extra || {})
    };
    typeEl.value = entry.type;
    distEl.value = entry.dist.v; distUnitEl.value = entry.dist.u;
    diamEl.value = entry.diam.v; diamUnitEl.value = entry.diam.u;
    recompute(true);
  }

  function findMatch(q) {
    var n = norm(q);
    if (n.length < 2) return null;
    var best = null, i, j, keys;
    for (i = 0; i < DB.length; i++) {
      keys = [DB[i].name].concat(DB[i].aliases);
      for (j = 0; j < keys.length; j++) if (norm(keys[j]) === n) return DB[i];
    }
    for (i = 0; i < DB.length && !best; i++) {
      keys = [DB[i].name].concat(DB[i].aliases);
      for (j = 0; j < keys.length; j++) if (norm(keys[j]).indexOf(n) === 0 && n.length >= 3) { best = DB[i]; break; }
    }
    for (i = 0; i < DB.length && !best; i++) {
      keys = [DB[i].name].concat(DB[i].aliases);
      for (j = 0; j < keys.length; j++) if (norm(keys[j]).indexOf(n) >= 0 && n.length >= 3) { best = DB[i]; break; }
    }
    return best;
  }

  function setStatus(html) { statusEl.innerHTML = html; }

  // ---------------------------------------------------------- wiring
  fillUnits();
  TYPE_ORDER.forEach(function (t) { var o = document.createElement('option'); o.value = t; o.textContent = TYPE_LABEL[t]; typeEl.appendChild(o); });

  var placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = 'Select an object…'; selectEl.appendChild(placeholder);
  TYPE_ORDER.forEach(function (t) {
    var items = DB.filter(function (e) { return e.type === t; });
    if (!items.length) return;
    var og = document.createElement('optgroup'); og.label = TYPE_LABEL[t];
    items.forEach(function (e) { var o = document.createElement('option'); o.value = e.name; o.textContent = e.name; og.appendChild(o); });
    selectEl.appendChild(og);
  });
  DB.forEach(function (e) {
    [e.name].concat(e.aliases).forEach(function (n) { var o = document.createElement('option'); o.value = n; namesEl.appendChild(o); });
  });

  function chooseEntry(entry) {
    setObject(entry, false);
    selectEl.value = entry.name;
    setStatus('Matched <strong>' + entry.name + '</strong> (' + TYPE_LABEL[entry.type].toLowerCase() + '). Edit the type, distance or diameter below to change it.');
  }

  selectEl.addEventListener('change', function () {
    var e = DB.filter(function (x) { return x.name === selectEl.value; })[0];
    if (e) { searchEl.value = e.name; chooseEntry(e); }
  });
  searchEl.addEventListener('input', function () {
    var q = searchEl.value.trim();
    if (!q) { setStatus(''); return; }
    var m = findMatch(q);
    if (m) chooseEntry(m);
    else setStatus('<span class="nfv-warn">No match in the built-in table for "' + q.replace(/</g, '&lt;') + '".</span> Choose a type and enter a distance and diameter below to draw your own object.');
  });
  typeEl.addEventListener('change', function () {
    if (!obj) return;
    var look = obj.extra && obj.extra.look;
    obj = { name: obj.name, type: typeEl.value, extra: typeEl.value === 'planet' ? { look: look || { kind: 'jupiter' } } : {}, parts: [] };
    if (obj.type !== 'planet') obj.parts = generate(obj.type, obj.name, {});
    render();
  });
  [distEl, diamEl].forEach(function (e) { e.addEventListener('input', function () { recompute(false); }); });
  [distUnitEl, diamUnitEl].forEach(function (e) { e.addEventListener('change', function () { recompute(true); }); });
  $('#nfv-fit-fov').addEventListener('click', fitFov);
  $('#nfv-fit-obj').addEventListener('click', fitObj);
  zoomEl.addEventListener('input', function () { scale = Math.pow(10, parseFloat(zoomEl.value)); render(); });

  function resize() {
    var w = canvas.parentNode.clientWidth || 1000;
    W = w; H = Math.round(w * 0.56); dpr = window.devicePixelRatio || 1;
    canvas.style.height = H + 'px';
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    if (obj) fitFov(); else render();
  }
  window.addEventListener('resize', resize);

  W = canvas.parentNode.clientWidth || 1000; H = Math.round(W * 0.56); dpr = window.devicePixelRatio || 1;
  canvas.style.height = H + 'px'; canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  var startName = (typeof DEFAULT_OBJECT === 'string') ? DEFAULT_OBJECT : 'Whirlpool Galaxy';
  var start = DB.filter(function (e) { return e.name === startName; })[0];
  searchEl.value = start.name;
  chooseEntry(start);
