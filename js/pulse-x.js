/**
 * Geek Bar Pulse X — thewatch.60fps.fr-class scroll cinema
 * Procedural Three.js device: squat purple metal + curved constellation screen.
 * 26 named meshes. ScrollTrigger scrub + Lenis (page-owned).
 */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const W = 1.18;
const H = 1.76;
const D = 0.40;
const R = 0.21;

const CHAPTERS = [
  { at: 0.00, title: 'This is the Pulse X.', dek: 'Squat purple metal. 3D curved screen. Not a stick — the bar on the Midtown wall tonight.' },
  { at: 0.10, title: 'Hold. Orbit.', dek: 'World’s first 3D curved screen. Constellation UI locked under glass. Keep scrolling.' },
  { at: 0.18, title: 'Mouthpiece lifts.', dek: 'Clear tip and silicone seals peel off the airway — first cut of the teardown.' },
  { at: 0.28, title: 'Shells split.', dek: 'Front and back housings leave the purple chassis. Same energy as a watch caseback coming off.' },
  { at: 0.38, title: 'Metal opens.', dek: 'Left and right body halves part. Brand plate, glass, and the display module float free.' },
  { at: 0.48, title: 'Core, microscopically.', dek: 'PCB, cell, mesh coil, wick, tank, chimney — every layer named, held in space.' },
  { at: 0.58, title: 'Exploded. Held.', dek: 'Twenty-six pieces, open. This is the beat people remember.' },
  { at: 0.72, title: 'It rebuilds.', dek: 'Scroll puts it back together — reverse of the explode, nothing skipped.' },
  { at: 0.90, title: 'Snaps back. Ready.', dek: 'Assembled on the scroll. Want one tonight? Midtown or McCarran — we’ll have it on the counter.' }
];

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

function supportsImportMap() {
  return !!(HTMLScriptElement.supports && HTMLScriptElement.supports('importmap'));
}

function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function brandTexture() {
  return canvasTex(256, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#1a1210';
    ctx.font = '700 72px "Manrope", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GEEK BAR', 0, 0);
  });
}

function screenTexture() {
  return canvasTex(1024, 1536, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#07060c');
    g.addColorStop(0.5, '#0c0a14');
    g.addColorStop(1, '#08070e');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(212,180,80,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.ellipse(w * 0.52, h * 0.42, 40 + i * 38, 28 + i * 26, -0.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    const stars = [
      [0.22, 0.18], [0.34, 0.14], [0.48, 0.20], [0.62, 0.16], [0.74, 0.22],
      [0.20, 0.32], [0.38, 0.30], [0.52, 0.36], [0.70, 0.30],
      [0.28, 0.46], [0.44, 0.50], [0.60, 0.46], [0.76, 0.42],
      [0.24, 0.62], [0.42, 0.66], [0.58, 0.60], [0.72, 0.68],
      [0.78, 0.52]
    ];
    const links = [
      [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [8, 4],
      [6, 9], [9, 10], [10, 11], [11, 12], [11, 17], [9, 13], [13, 14], [14, 15], [15, 16]
    ];

    ctx.strokeStyle = 'rgba(232,196,86,0.42)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    links.forEach(([a, b]) => {
      ctx.moveTo(stars[a][0] * w, stars[a][1] * h);
      ctx.lineTo(stars[b][0] * w, stars[b][1] * h);
    });
    ctx.stroke();

    stars.forEach(([x, y], i) => {
      const px = x * w;
      const py = y * h;
      const rad = ctx.createRadialGradient(px, py, 0, px, py, 18);
      rad.addColorStop(0, 'rgba(255,230,140,0.95)');
      rad.addColorStop(0.35, 'rgba(232,196,86,0.55)');
      rad.addColorStop(1, 'rgba(232,196,86,0)');
      ctx.fillStyle = rad;
      ctx.beginPath();
      ctx.arc(px, py, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = i === 17 ? '#fff6c8' : '#f3d56a';
      ctx.beginPath();
      ctx.arc(px, py, i === 17 ? 4.2 : 3.1, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    ctx.translate(w * 0.80, h * 0.54);
    ctx.strokeStyle = 'rgba(243,213,106,0.85)';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-22, -26);
    ctx.lineTo(22, 26);
    ctx.moveTo(22, -26);
    ctx.lineTo(-22, 26);
    ctx.stroke();
    ctx.restore();
  });
}

function pcbTexture() {
  return canvasTex(512, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#1b3d2a';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#245238';
    for (let i = 0; i < 18; i++) {
      ctx.fillRect(24 + (i % 3) * 150, 40 + Math.floor(i / 3) * 150, 120, 8);
      ctx.fillRect(40 + (i % 4) * 110, 80 + Math.floor(i / 4) * 180, 8, 90);
    }
    ctx.fillStyle = '#d4a54a';
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(40 + (i % 5) * 90, 60 + Math.floor(i / 5) * 110, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#0e1a12';
    ctx.fillRect(w * 0.18, h * 0.72, w * 0.64, h * 0.16);
    ctx.fillStyle = '#c9a24a';
    ctx.font = '600 28px "DM Mono", monospace';
    ctx.fillText('PULSE X', w * 0.28, h * 0.82);
  });
}

function bendFront(geo, amount) {
  const pos = geo.attributes.position;
  const w = W * 0.92;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const t = x / (w * 0.5);
    pos.setZ(i, z + amount * (1 - t * t));
  }
  geo.computeVertexNormals();
  return geo;
}

function mat(opts) {
  return new THREE.MeshPhysicalMaterial(opts);
}

function makeStudioEnv(renderer) {
  const env = new THREE.Scene();
  const add = (color, pos, sx, sy) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
    m.position.copy(pos);
    m.scale.set(sx, sy, 1);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  add(0xf4f0e8, new THREE.Vector3(0, 5.2, 1.4), 8, 2.4);
  add(0xc9b0ee, new THREE.Vector3(-4.2, 1.2, 2.2), 3.2, 5);
  add(0x1a2858, new THREE.Vector3(4.4, 0.4, -1.6), 4, 5);
  add(0xd4a54a, new THREE.Vector3(2.2, 3.2, 3.4), 1.4, 1.4);
  add(0x2a1838, new THREE.Vector3(0, -3.5, 0), 10, 10);
  add(0xffffff, new THREE.Vector3(-1.4, 2.8, 4.2), 2.2, 1.1);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.05).texture;
  pmrem.dispose();
  return tex;
}

function buildPulseX() {
  const root = new THREE.Group();
  const parts = [];
  const clipPlanes = [];

  const purple = {
    color: 0xb7a0d6,
    metalness: 0.88,
    roughness: 0.22,
    clearcoat: 0.72,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.35,
    sheen: 0.35,
    sheenColor: new THREE.Color(0xc9b4ea)
  };
  const blackShell = {
    color: 0x121018,
    metalness: 0.55,
    roughness: 0.28,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.1
  };
  const glass = {
    color: 0x0a0a12,
    metalness: 0.15,
    roughness: 0.04,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    transmission: 0.18,
    thickness: 0.045,
    ior: 1.5,
    transparent: true,
    envMapIntensity: 1.4
  };

  function add(name, label, object, explode, labelNudge, priority) {
    object.name = name;
    object.userData.home = object.position.clone();
    object.userData.homeRot = object.rotation.clone();
    object.userData.explode = explode;
    object.userData.explodeT = 0;
    object.userData.label = label;
    object.userData.labelNudge = labelNudge || { x: 90, y: -20 };
    object.userData.priority = priority || 1;
    root.add(object);
    parts.push(object);
    return object;
  }

  // 1 clear tip
  const tip = new THREE.Mesh(
    new RoundedBoxGeometry(0.22, 0.17, 0.24, 5, 0.075),
    mat({
      color: 0x1a1424,
      metalness: 0.12,
      roughness: 0.08,
      transmission: 0.62,
      thickness: 0.22,
      ior: 1.46,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      envMapIntensity: 1.5
    })
  );
  tip.position.set(-W * 0.28, H / 2 + 0.11, 0);
  add('clearTip', 'Clear mouthpiece', tip, { x: -0.12, y: 0.72, z: 0.18 }, { x: -120, y: -40 }, 2);

  // 2 tip seal
  const tipSeal = new THREE.Mesh(
    new THREE.TorusGeometry(0.075, 0.014, 10, 24),
    mat({ color: 0x2a2430, roughness: 0.7, metalness: 0.05 })
  );
  tipSeal.rotation.x = Math.PI / 2;
  tipSeal.position.set(-W * 0.28, H / 2 + 0.02, 0);
  add('tipSeal', 'Tip seal', tipSeal, { x: -0.08, y: 0.52, z: 0.08 }, { x: -130, y: 10 }, 1);

  // 3 top seal
  const topSeal = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.72, 0.03, D * 0.7, 2, 0.01),
    mat({ color: 0x1c1820, roughness: 0.65, metalness: 0.08 })
  );
  topSeal.position.set(0, H / 2 - 0.02, 0);
  add('topSeal', 'Upper gasket', topSeal, { x: 0.05, y: 0.42, z: -0.06 }, { x: 110, y: -30 }, 1);

  // 4 airflow grill (4 slits, one mesh)
  const slitGeos = [-0.045, -0.015, 0.015, 0.045].map((dx) => {
    const g = new THREE.BoxGeometry(0.055, 0.01, 0.012);
    g.translate(W * 0.28 + dx, H / 2 - 0.015, D * 0.42);
    return g;
  });
  const grill = new THREE.Mesh(
    mergeGeometries(slitGeos, false),
    mat({ color: 0x0c0a10, metalness: 0.6, roughness: 0.25 })
  );
  add('airflowGrill', 'Airflow', grill, { x: 0.35, y: 0.48, z: 0.22 }, { x: 120, y: -50 }, 1);

  // 5–6 purple body halves (clipped full rounded box)
  const bodyGeo = new RoundedBoxGeometry(W, H, D * 0.92, 8, R);
  const clipL = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
  const clipR = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
  const bodyLMat = mat({ ...purple, side: THREE.DoubleSide, clippingPlanes: [clipL], clipShadows: true });
  const bodyRMat = mat({ ...purple, side: THREE.DoubleSide, clippingPlanes: [clipR], clipShadows: true });
  const bodyL = new THREE.Mesh(bodyGeo, bodyLMat);
  const bodyR = new THREE.Mesh(bodyGeo.clone(), bodyRMat);
  add('bodyLeft', 'Purple chassis L', bodyL, { x: -0.82, y: 0.04, z: -0.08 }, { x: -140, y: 20 }, 2);
  add('bodyRight', 'Purple chassis R', bodyR, { x: 0.82, y: 0.04, z: -0.08 }, { x: 140, y: 20 }, 2);
  clipPlanes.push(
    { mesh: bodyL, local: new THREE.Vector3(-1, 0, 0), plane: clipL },
    { mesh: bodyR, local: new THREE.Vector3(1, 0, 0), plane: clipR }
  );

  // 7 front shell
  const shellF = new THREE.Mesh(
    bendFront(new RoundedBoxGeometry(W * 0.98, H * 0.98, 0.045, 7, R * 0.95), 0.055),
    mat({ ...blackShell })
  );
  shellF.position.z = D * 0.42;
  add('shellFront', 'Front shell', shellF, { x: 0, y: 0.06, z: 0.62 }, { x: 100, y: -80 }, 2);

  // 8 back shell
  const shellB = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.98, H * 0.98, 0.05, 7, R * 0.95),
    mat({ ...purple, roughness: 0.28 })
  );
  shellB.position.z = -D * 0.44;
  add('shellBack', 'Rear shell', shellB, { x: 0, y: -0.04, z: -0.70 }, { x: -90, y: 70 }, 2);

  // 9 screen module
  const module = new THREE.Mesh(
    bendFront(new THREE.BoxGeometry(W * 0.86, H * 0.86, 0.03, 16, 20, 1), 0.05),
    mat({ color: 0x0b0b12, metalness: 0.3, roughness: 0.35, emissive: 0x101018, emissiveIntensity: 0.4 })
  );
  module.position.z = D * 0.38;
  add('screenModule', 'Display module', module, { x: 0.06, y: -0.04, z: 0.92 }, { x: 130, y: 40 }, 2);

  // 10 curved screen glass
  const screenMap = screenTexture();
  const glassMesh = new THREE.Mesh(
    bendFront(new RoundedBoxGeometry(W * 0.90, H * 0.90, 0.028, 8, 0.16), 0.062),
    mat({
      ...glass,
      map: screenMap,
      emissiveMap: screenMap,
      emissive: 0xf0d070,
      emissiveIntensity: 0.22
    })
  );
  glassMesh.position.z = D * 0.48;
  add('screenGlass', 'Curved screen glass', glassMesh, { x: 0, y: 0.1, z: 1.18 }, { x: -20, y: -100 }, 2);

  // 11 constellation emissive (stars + links, one mesh) + 12 X mark
  const starPts = [
    [-0.32, 0.48], [-0.14, 0.54], [0.04, 0.44], [0.22, 0.52], [0.36, 0.42],
    [-0.34, 0.22], [-0.10, 0.26], [0.08, 0.16], [0.30, 0.24],
    [-0.22, 0.00], [-0.02, -0.08], [0.18, 0.00], [0.36, 0.06],
    [-0.28, -0.28], [-0.04, -0.34], [0.16, -0.24], [0.32, -0.36]
  ];
  const starLinks = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [6, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16]];
  const starGeos = starPts.map(([x, y]) => {
    const g = new THREE.SphereGeometry(0.016, 10, 10);
    g.translate(x, y, D * 0.52);
    return g;
  });
  starLinks.forEach(([a, b]) => {
    const ax = starPts[a][0];
    const ay = starPts[a][1];
    const bx = starPts[b][0];
    const by = starPts[b][1];
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    const g = new THREE.CylinderGeometry(0.0032, 0.0032, len, 6);
    g.rotateZ(Math.atan2(dy, dx) - Math.PI / 2);
    g.translate((ax + bx) / 2, (ay + by) / 2, D * 0.52);
    starGeos.push(g);
  });
  const constellation = new THREE.Mesh(
    mergeGeometries(starGeos, false),
    mat({
      color: 0xf3d56a,
      emissive: 0xf3d56a,
      emissiveIntensity: 1.6,
      metalness: 0.2,
      roughness: 0.25,
      toneMapped: false
    })
  );
  add('constellation', 'Constellation UI', constellation, { x: 0.18, y: 0.22, z: 1.42 }, { x: 110, y: -70 }, 2);

  const xMark = new THREE.Mesh(
    (() => {
      const a = new THREE.BoxGeometry(0.11, 0.016, 0.012);
      a.rotateZ(0.72);
      const b = new THREE.BoxGeometry(0.11, 0.016, 0.012);
      b.rotateZ(-0.72);
      return mergeGeometries([a, b], false);
    })(),
    mat({ color: 0xf6de88, emissive: 0xf3d56a, emissiveIntensity: 1.8, toneMapped: false })
  );
  xMark.position.set(0.36, 0.04, D * 0.53);
  add('xMark', 'Pulse X mark', xMark, { x: 0.42, y: 0.16, z: 1.28 }, { x: 130, y: 0 }, 1);

  // 13 brand plate
  const brand = new THREE.Mesh(
    new RoundedBoxGeometry(0.018, H * 0.62, 0.16, 2, 0.006),
    mat({
      color: 0x1a1214,
      metalness: 0.4,
      roughness: 0.35,
      map: brandTexture(),
      emissive: 0x080608,
      emissiveIntensity: 0.2
    })
  );
  brand.position.set(-W * 0.50, 0.02, 0);
  add('brandPlate', 'Brand plate', brand, { x: -1.05, y: 0.12, z: 0.15 }, { x: -150, y: -10 }, 2);

  // 14 inner frame
  const frame = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.72, H * 0.78, D * 0.52, 3, 0.06),
    mat({ color: 0x2a2433, metalness: 0.45, roughness: 0.4, side: THREE.DoubleSide })
  );
  add('innerFrame', 'Inner frame', frame, { x: 0, y: -0.08, z: -0.28 }, { x: -100, y: 80 }, 1);

  // 15 PCB
  const pcb = new THREE.Mesh(
    new THREE.BoxGeometry(W * 0.58, H * 0.62, 0.028),
    mat({
      color: 0x1f4a32,
      metalness: 0.15,
      roughness: 0.45,
      map: pcbTexture()
    })
  );
  pcb.position.set(0.04, -0.08, -0.02);
  add('pcb', 'Control PCB', pcb, { x: 0.55, y: -0.18, z: 0.12 }, { x: 140, y: 50 }, 2);

  // 16 battery
  const battery = new THREE.Mesh(
    new RoundedBoxGeometry(0.42, 0.92, 0.18, 3, 0.05),
    mat({
      color: 0x6ec8d4,
      metalness: 0.55,
      roughness: 0.28,
      clearcoat: 0.4,
      emissive: 0x123038,
      emissiveIntensity: 0.15
    })
  );
  battery.position.set(-0.12, -0.12, 0.02);
  add('battery', 'Cell', battery, { x: -0.48, y: -0.22, z: 0.22 }, { x: -140, y: 60 }, 2);

  const termP = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16),
    mat({ color: 0xd4a54a, metalness: 0.9, roughness: 0.18 })
  );
  termP.position.set(-0.12, 0.36, 0.02);
  add('battTerm', 'Cell terminal', termP, { x: -0.48, y: 0.08, z: 0.22 }, { x: -120, y: 20 }, 1);

  // 17 tank
  const tank = new THREE.Mesh(
    new RoundedBoxGeometry(0.46, 0.42, 0.22, 4, 0.06),
    mat({
      color: 0x8a6cbe,
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.55,
      thickness: 0.18,
      transparent: true,
      opacity: 0.72,
      ior: 1.4,
      emissive: 0x3a2060,
      emissiveIntensity: 0.18
    })
  );
  tank.position.set(-0.06, 0.42, 0.02);
  add('tank', 'E-liquid tank', tank, { x: -0.15, y: 0.58, z: 0.35 }, { x: -110, y: -20 }, 2);

  // 18 chimney
  const chimney = new THREE.Mesh(
    new THREE.CylinderGeometry(0.042, 0.048, 0.55, 18),
    mat({ color: 0xc8c2d4, metalness: 0.75, roughness: 0.22 })
  );
  chimney.position.set(-0.28, 0.48, 0);
  add('chimney', 'Chimney', chimney, { x: -0.22, y: 0.78, z: 0.05 }, { x: -130, y: -60 }, 1);

  // 19 coil
  const coil = new THREE.Mesh(
    new THREE.TorusGeometry(0.07, 0.018, 10, 28),
    mat({ color: 0xc47a3a, metalness: 0.85, roughness: 0.25, emissive: 0x3a1808, emissiveIntensity: 0.25 })
  );
  coil.position.set(-0.08, 0.40, 0.02);
  add('coil', 'Coil', coil, { x: 0.08, y: 0.62, z: 0.48 }, { x: 40, y: -90 }, 2);

  // 20 heating mesh
  const meshHeat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.09, 12, 1, true),
    mat({
      color: 0xaaa4b0,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true,
      emissive: 0x402010,
      emissiveIntensity: 0.2
    })
  );
  meshHeat.position.set(-0.08, 0.40, 0.02);
  add('meshHeat', 'Mesh', meshHeat, { x: 0.18, y: 0.55, z: 0.52 }, { x: 90, y: -40 }, 2);

  // 21 wick
  const wick = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 12, 10),
    mat({ color: 0xe8dcc8, roughness: 0.85, metalness: 0.0 })
  );
  wick.scale.set(1, 0.7, 1);
  wick.position.set(-0.08, 0.34, 0.02);
  add('wick', 'Wick', wick, { x: 0.28, y: 0.48, z: 0.42 }, { x: 120, y: 10 }, 1);

  // 22 USB-C
  const usbc = new THREE.Mesh(
    new RoundedBoxGeometry(0.22, 0.055, 0.07, 2, 0.02),
    mat({ color: 0xc8c4cc, metalness: 0.9, roughness: 0.18 })
  );
  usbc.position.set(0, -H / 2 + 0.02, 0.04);
  add('usbc', 'USB-C', usbc, { x: 0, y: -0.72, z: 0.18 }, { x: 20, y: 90 }, 2);

  // 23–24 LEDs
  const ledPulse = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.025, 0.025),
    mat({ color: 0xf3d56a, emissive: 0xf3d56a, emissiveIntensity: 2.2, toneMapped: false })
  );
  ledPulse.position.set(0.18, -0.28, 0.12);
  add('ledPulse', 'Pulse LED', ledPulse, { x: 0.62, y: -0.32, z: 0.38 }, { x: 140, y: 80 }, 1);

  const ledCharge = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.02, 0.02),
    mat({ color: 0x6cf0c2, emissive: 0x3ee0a8, emissiveIntensity: 1.8, toneMapped: false })
  );
  ledCharge.position.set(-0.16, -0.32, 0.12);
  add('ledCharge', 'Charge LED', ledCharge, { x: -0.58, y: -0.38, z: 0.36 }, { x: -140, y: 90 }, 1);

  // 25 bottom cap
  const cap = new THREE.Mesh(
    new RoundedBoxGeometry(W * 0.88, 0.08, D * 0.82, 4, 0.04),
    mat({ ...purple, roughness: 0.3 })
  );
  cap.position.set(0, -H / 2 + 0.02, 0);
  add('bottomCap', 'Bottom cap', cap, { x: 0, y: -0.82, z: -0.12 }, { x: -40, y: 110 }, 2);

  // 26–27 screws
  function screw(x, z, name, explode) {
    const head = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.016, 12),
      mat({ color: 0xb8b4bc, metalness: 0.92, roughness: 0.16 })
    );
    head.position.set(x, -H / 2 + 0.055, z);
    add(name, 'Screw', head, explode, { x: x > 0 ? 80 : -80, y: 100 }, 1);
    return head;
  }
  screw(-0.28, 0.08, 'screwL', { x: -0.42, y: -0.95, z: 0.22 });
  screw(0.28, 0.08, 'screwR', { x: 0.42, y: -0.95, z: 0.22 });

  const meshCount = root.traverse ? countMeshes(root) : parts.length;
  root.userData.meshCount = meshCount;
  root.userData.partCount = parts.length;
  return { root, parts, clipPlanes, meshCount };
}

function countMeshes(root) {
  let n = 0;
  root.traverse((o) => {
    if (o.isMesh) n += 1;
  });
  return n;
}

function showFallback(reason) {
  const runway = document.getElementById('gb-runway');
  const fallback = document.getElementById('gb-fallback');
  const canvas = document.getElementById('gb-canvas');
  const hud = document.getElementById('gb-hud');
  const labels = document.getElementById('gb-labels');
  const leaders = document.getElementById('gb-leaders');
  if (runway) runway.classList.add('is-static');
  if (fallback) fallback.hidden = false;
  if (canvas) canvas.hidden = true;
  if (hud) hud.hidden = true;
  if (labels) labels.hidden = true;
  if (leaders) leaders.hidden = true;
  if (reason) console.info('[pulse-x] fallback:', reason);
}

function setChapter(progress, els) {
  let ch = CHAPTERS[0];
  for (let i = 0; i < CHAPTERS.length; i++) {
    if (progress >= CHAPTERS[i].at) ch = CHAPTERS[i];
  }
  if (els.title && els.title.textContent !== ch.title) {
    els.title.textContent = ch.title;
    els.dek.textContent = ch.dek;
  }
  if (els.cta) els.cta.classList.toggle('is-on', progress >= 0.88);
  if (els.dots) {
    const idx = CHAPTERS.indexOf(ch);
    els.dots.forEach((d, i) => d.classList.toggle('on', i === idx));
  }
}

function initPulseX() {
  const runway = document.getElementById('gb-runway');
  const canvas = document.getElementById('gb-canvas');
  if (!runway || !canvas) return;

  if (reducedMotion()) {
    showFallback('prefers-reduced-motion');
    return;
  }
  if (!supportsImportMap() || !hasWebGL()) {
    showFallback('no-webgl');
    return;
  }

  const title = document.getElementById('gb-title');
  const dek = document.getElementById('gb-dek');
  const cta = document.getElementById('gb-cta');
  const dots = Array.from(document.querySelectorAll('#gb-progress .gb-dot'));
  const labelsEl = document.getElementById('gb-labels');
  const svg = document.getElementById('gb-leaders');
  const mobile = isMobile();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.environment = makeStudioEnv(renderer);

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  const camRig = {
    az: 0.62,
    el: 0.26,
    dist: 3.55,
    lookX: 0,
    lookY: 0.08,
    lookZ: 0
  };

  const { root, parts, clipPlanes, meshCount } = buildPulseX();
  scene.add(root);
  canvas.dataset.meshes = String(meshCount);
  canvas.dataset.parts = String(parts.length);
  console.info('[pulse-x] meshes', meshCount, 'parts', parts.length);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.15, 48),
    new THREE.MeshBasicMaterial({
      color: 0x050308,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.18;
  scene.add(shadow);

  scene.add(new THREE.AmbientLight(0xb8a8d4, 0.28));
  const key = new THREE.DirectionalLight(0xfff4e8, 2.15);
  key.position.set(2.6, 3.4, 3.2);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x8aa4ff, 0.55);
  fill.position.set(-3.2, 0.8, 1.6);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xc084fc, 1.15);
  rim.position.set(-1.2, 1.4, -3.4);
  scene.add(rim);
  const gold = new THREE.PointLight(0xd4a54a, 1.4, 8);
  gold.position.set(1.4, 1.8, 2.2);
  scene.add(gold);

  const tmp = new THREE.Vector3();
  const tmpN = new THREE.Vector3();

  parts.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'gb-label';
    el.innerHTML = '<i></i><span>' + p.userData.label + '</span>';
    labelsEl.appendChild(el);
    p.userData.labelEl = el;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', 'rgba(212,165,74,0.45)');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
    p.userData.leader = line;
  });

  function placeCamera() {
    const x = Math.cos(camRig.el) * Math.sin(camRig.az) * camRig.dist;
    const y = Math.sin(camRig.el) * camRig.dist;
    const z = Math.cos(camRig.el) * Math.cos(camRig.az) * camRig.dist;
    camera.position.set(x, y, z);
    camera.lookAt(camRig.lookX, camRig.lookY, camRig.lookZ);
  }

  function applyExplode() {
    parts.forEach((p) => {
      const t = p.userData.explodeT;
      const e = p.userData.explode;
      const h = p.userData.home;
      p.position.set(h.x + e.x * t, h.y + e.y * t, h.z + e.z * t);
    });
  }

  function syncClips() {
    clipPlanes.forEach(({ mesh, local, plane }) => {
      mesh.updateWorldMatrix(true, false);
      tmpN.copy(local).transformDirection(mesh.matrixWorld);
      mesh.getWorldPosition(tmp);
      plane.normal.copy(tmpN);
      plane.constant = -tmpN.dot(tmp);
    });
  }

  function syncLabels(w, h) {
    parts.forEach((p) => {
      const t = p.userData.explodeT;
      const show = t > 0.42 && (!mobile || p.userData.priority >= 2);
      const el = p.userData.labelEl;
      const line = p.userData.leader;
      if (!show) {
        el.style.opacity = '0';
        line.setAttribute('opacity', '0');
        return;
      }
      p.getWorldPosition(tmp);
      tmp.project(camera);
      if (tmp.z > 1) {
        el.style.opacity = '0';
        line.setAttribute('opacity', '0');
        return;
      }
      const sx = (tmp.x * 0.5 + 0.5) * w;
      const sy = (-tmp.y * 0.5 + 0.5) * h;
      const nx = sx + p.userData.labelNudge.x * (mobile ? 0.7 : 1);
      const ny = sy + p.userData.labelNudge.y * (mobile ? 0.7 : 1);
      el.style.opacity = String(Math.min(1, (t - 0.42) / 0.25));
      el.style.transform = 'translate(' + nx + 'px,' + ny + 'px)';
      line.setAttribute('x1', sx.toFixed(1));
      line.setAttribute('y1', sy.toFixed(1));
      line.setAttribute('x2', nx.toFixed(1));
      line.setAttribute('y2', ny.toFixed(1));
      line.setAttribute('opacity', el.style.opacity);
    });
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
  }
  resize();
  window.addEventListener('resize', resize);

  const cinema = {
    az: 0.62,
    el: 0.26,
    dist: 3.55,
    lookX: 0,
    lookY: 0.08,
    lookZ: 0,
    progress: 0
  };

  const ptr = { x: 0, y: 0 };
  window.addEventListener('pointermove', (e) => {
    ptr.x += ((e.clientX / window.innerWidth) * 2 - 1 - ptr.x) * 0.08;
    ptr.y += ((e.clientY / window.innerHeight) * 2 - 1 - ptr.y) * 0.08;
  }, { passive: true });

  let inView = false;
  let raf = 0;

  function frame(t) {
    if (!inView) return;
    camRig.az = cinema.az + ptr.x * 0.12;
    camRig.el = cinema.el - ptr.y * 0.06;
    camRig.dist = cinema.dist;
    camRig.lookX = cinema.lookX;
    camRig.lookY = cinema.lookY;
    camRig.lookZ = cinema.lookZ;
    applyExplode();
    syncClips();
    placeCamera();
    const pulse = 1.45 + Math.sin((t || 0) * 0.0024) * 0.25;
    const stars = root.getObjectByName('constellation');
    const xm = root.getObjectByName('xMark');
    if (stars && stars.material) stars.material.emissiveIntensity = pulse;
    if (xm && xm.material) xm.material.emissiveIntensity = pulse + 0.2;
    renderer.render(scene, camera);
    syncLabels(canvas.clientWidth, canvas.clientHeight);
    raf = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (raf) return;
    raf = requestAnimationFrame(frame);
  }
  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    showFallback('no-gsap');
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: runway,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.15,
      anticipatePin: 1,
      onToggle: (self) => {
        inView = self.isActive;
        if (inView) startLoop();
        else stopLoop();
      },
      onUpdate: (self) => {
        cinema.progress = self.progress;
        setChapter(self.progress, { title, dek, cta, dots });
      }
    }
  });

  // HOLD + ORBIT (assembled hero)
  tl.to(cinema, { az: 1.15, el: 0.32, dist: 3.15, lookY: 0.06, duration: 0.12, ease: 'none' }, 0);

  // Push toward mouthpiece
  tl.to(cinema, { az: 0.35, el: 0.48, dist: 2.15, lookX: -0.28, lookY: 0.85, lookZ: 0.05, duration: 0.07, ease: 'none' }, 0.12);

  const sequence = [
    ['clearTip', 0.18],
    ['tipSeal', 0.195],
    ['topSeal', 0.21],
    ['airflowGrill', 0.222],
    ['chimney', 0.236],
    ['shellFront', 0.255],
    ['shellBack', 0.272],
    ['screenGlass', 0.295],
    ['constellation', 0.312],
    ['xMark', 0.322],
    ['screenModule', 0.338],
    ['brandPlate', 0.355],
    ['bodyLeft', 0.375],
    ['bodyRight', 0.375],
    ['innerFrame', 0.40],
    ['tank', 0.418],
    ['coil', 0.434],
    ['meshHeat', 0.446],
    ['wick', 0.458],
    ['pcb', 0.478],
    ['battery', 0.492],
    ['battTerm', 0.504],
    ['ledPulse', 0.518],
    ['ledCharge', 0.528],
    ['usbc', 0.542],
    ['bottomCap', 0.556],
    ['screwL', 0.568],
    ['screwR', 0.568]
  ];

  // Camera during sequential explode — pull back to see layers
  tl.to(cinema, { az: 0.85, el: 0.22, dist: 3.05, lookX: 0, lookY: 0.12, lookZ: 0.15, duration: 0.10, ease: 'none' }, 0.24);
  tl.to(cinema, { az: 0.55, el: 0.18, dist: 2.35, lookX: 0.02, lookY: 0.05, lookZ: 0.2, duration: 0.10, ease: 'none' }, 0.34);
  tl.to(cinema, { az: 1.05, el: 0.28, dist: 2.55, lookX: -0.05, lookY: -0.05, lookZ: 0.05, duration: 0.10, ease: 'none' }, 0.44);

  sequence.forEach(([name, t0]) => {
    const obj = root.getObjectByName(name);
    if (!obj) return;
    tl.to(obj.userData, { explodeT: 1, duration: 0.028, ease: 'none' }, t0);
  });

  // EXPLODED HOLD — slow orbit, pulled back
  tl.to(cinema, { az: 2.05, el: 0.42, dist: 4.55, lookX: 0, lookY: 0.05, lookZ: 0.1, duration: 0.13, ease: 'none' }, 0.58);

  // REASSEMBLE reverse
  const reverse = sequence.slice().reverse();
  reverse.forEach(([name], i) => {
    const obj = root.getObjectByName(name);
    if (!obj) return;
    tl.to(obj.userData, { explodeT: 0, duration: 0.018, ease: 'none' }, 0.72 + i * 0.0055);
  });
  tl.to(cinema, { az: 0.72, el: 0.24, dist: 3.25, lookX: 0, lookY: 0.06, lookZ: 0, duration: 0.16, ease: 'none' }, 0.72);

  // SETTLE
  tl.to(cinema, { az: 0.58, el: 0.24, dist: 3.4, lookX: 0, lookY: 0.08, lookZ: 0, duration: 0.08, ease: 'none' }, 0.92);

  inView = true;
  startLoop();
  placeCamera();
  applyExplode();
  syncClips();
  renderer.render(scene, camera);

  if (window.ScrollTrigger) {
    requestAnimationFrame(() => window.ScrollTrigger.refresh());
  }
}

try {
  initPulseX();
} catch (err) {
  console.error('[pulse-x]', err);
  showFallback('init-error');
}
