'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Shared Renderer Singleton ───────────────────────────
let sharedRenderer = null;
let sharedRaf = null;
const toolScenes = new Map();

function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.matchMedia?.('(max-width: 768px)').matches ||
    window.matchMedia?.('(pointer: coarse)').matches
  );
}

function getRenderer() {
  if (sharedRenderer) {
    try {
      const gl = sharedRenderer.getContext();
      if (gl && gl.isContextLost()) {
        sharedRenderer.dispose();
        sharedRenderer = null;
        sharedRaf = null;
        toolScenes.clear();
      } else {
        return sharedRenderer;
      }
    } catch(e) {
      sharedRenderer = null;
      sharedRaf = null;
      toolScenes.clear();
    }
  }
  if (typeof window === 'undefined') return null;
  const isMobile = isMobileDevice();
  sharedRenderer = new THREE.WebGLRenderer({
    antialias: !isMobile,
    alpha: true,
    powerPreference: isMobile ? 'low-power' : 'high-performance',
    preserveDrawingBuffer: false,
  });
  sharedRenderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
  sharedRenderer.setSize(72, 72);
  sharedRenderer.setClearColor(0x000000, 0);
  startSharedLoop();
  return sharedRenderer;
}

function startSharedLoop() {
  if (sharedRaf) return;
  const loop = () => {
    sharedRaf = requestAnimationFrame(loop);
    if (!sharedRenderer || toolScenes.size === 0) return;
    toolScenes.forEach((tool) => {
      updateToolScene(tool);
      const { scene, camera, canvas } = tool;
      sharedRenderer.clear();
      sharedRenderer.render(scene, camera);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(sharedRenderer.domElement, 0, 0, canvas.width, canvas.height);
    });
  };
  loop();
}

function createToolScene(href, color) {
  const scene = new THREE.Scene();
  const isMobile = isMobileDevice();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4.5;
  scene.add(new THREE.AmbientLight(0xffffff, isMobile ? 0.9 : 0.5));
  const dl = new THREE.DirectionalLight(0xffffff, isMobile ? 1.25 : 1.0); dl.position.set(3,3,3); scene.add(dl);
  const pl = new THREE.PointLight(color, isMobile ? 2.8 : 2, 10); pl.position.set(-1,1,2); scene.add(pl);
  const g = new THREE.Group(); scene.add(g);
  const m = (c, wire) => new THREE.MeshPhongMaterial({ color: new THREE.Color(c), emissive: new THREE.Color(c), emissiveIntensity: isMobile ? 0.28 : 0.18, shininess: 80, transparent: true, opacity: 0.96, wireframe: !!wire });
  const lm = (c, op=0.5) => new THREE.LineBasicMaterial({ color: new THREE.Color(c), transparent: true, opacity: op });

  if (href === '/qr') {
    [[1,1,1,0,1],[1,0,1,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,0,1,1,1]].forEach((row,r)=>row.forEach((cell,c)=>{if(!cell)return;const mesh=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.28,0.14),m(color));mesh.position.set((c-2)*0.32,(2-r)*0.32,0);g.add(mesh);}));
    [[-1.2,1.2],[1.2,1.2],[-1.2,-1.2]].forEach(([x,y])=>{const o=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.9,0.15),m(color,true));o.position.set(x,y,0.1);g.add(o);const i2=new THREE.Mesh(new THREE.BoxGeometry(0.4,0.4,0.2),m(color));i2.position.set(x,y,0.15);g.add(i2);});
  } else if (href === '/hashtag') {
    [-0.45,0.45].forEach(y=>{const b=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.22,0.22),m(color));b.position.set(0,y,0);g.add(b);});
    [-0.45,0.45].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(0.22,1.8,0.22),m(color));b.position.set(x,0,0);g.add(b);});
  } else if (href === '/image-tools') {
    // Image Toolkit - layered image frames
    const frame1=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.0,0.1),m(color));frame1.position.set(-0.2,0.2,0);g.add(frame1);
    const frame2=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.0,0.1),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.55}));frame2.position.set(0.1,-0.1,0.25);g.add(frame2);
    const frame3=new THREE.Mesh(new THREE.BoxGeometry(1.4,1.0,0.1),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.3}));frame3.position.set(0.3,-0.3,0.45);g.add(frame3);
    const inner=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.7,0.06),new THREE.MeshPhongMaterial({color:0x1a1a2e,transparent:true,opacity:0.8}));inner.position.set(-0.2,0.2,0.08);g.add(inner);
    g.scale.setScalar(0.82);
  } else if (href === '/compress') {
    g.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.BoxGeometry(1.8,1.8,1.8)),lm(color)));
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.9,0.6,0.9),m(color)));
    [1,-1].forEach(d=>{const a=new THREE.Mesh(new THREE.ConeGeometry(0.15,0.4,4),m(color));a.position.set(0,d*1.1,0);a.rotation.z=d>0?Math.PI:0;g.add(a);});
  } else if (href === '/tts') {
    const cap=new THREE.Mesh(new THREE.CylinderGeometry(0.38,0.38,1.0,16),m(color));cap.position.set(0,0.4,0);g.add(cap);
    const dome=new THREE.Mesh(new THREE.SphereGeometry(0.38,16,8,0,Math.PI*2,0,Math.PI/2),m(color));dome.position.set(0,0.9,0);g.add(dome);
    const stand=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,0.7,8),m(color));stand.position.set(0,-0.65,0);g.add(stand);
    const base=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.08,16),m(color));base.position.set(0,-1.05,0);g.add(base);
    [0.7,1.0].forEach(r=>{const curve=new THREE.EllipseCurve(0,0.4,r,r,-Math.PI/3,Math.PI/3);const geo=new THREE.BufferGeometry().setFromPoints(curve.getPoints(20).map(p=>new THREE.Vector3(p.x,p.y,0)));const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color,transparent:true,opacity:0.6}));g.add(line);const l2=line.clone();l2.scale.x=-1;g.add(l2);});
  } else if (href === '/pdf') {
    g.add(new THREE.Mesh(new THREE.BoxGeometry(1.2,1.5,0.1),m(color)));
    [0.1,-0.1,-0.3,-0.5].forEach(y=>{const ln=new THREE.Mesh(new THREE.BoxGeometry(0.75,0.07,0.08),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.25}));ln.position.set(0,y,0.06);g.add(ln);});
    const arr=new THREE.Mesh(new THREE.ConeGeometry(0.18,0.4,4),m(color));arr.position.set(0,-0.92,0);arr.rotation.z=Math.PI;g.add(arr);
  } else if (href === '/domain') {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.82,16,16),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.08})));
    g.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(0.82,10,10)),lm(color,0.4)));
    const eq=new THREE.Mesh(new THREE.TorusGeometry(0.82,0.04,8,32),m(color));eq.rotation.x=Math.PI/2;g.add(eq);
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.82,0.04,8,32),m(color)));
    const lens=new THREE.Mesh(new THREE.TorusGeometry(0.38,0.08,8,16),m('#FFD93D'));lens.position.set(0.7,0.7,0.5);g.add(lens);
    const han=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.07,0.5,8),m('#FFD93D'));han.rotation.z=Math.PI/4;han.position.set(1.05,0.35,0.5);g.add(han);
    g.scale.setScalar(0.88);
  } else if (href === '/resume') {
    g.add(new THREE.Mesh(new THREE.BoxGeometry(1.25,1.6,0.08),new THREE.MeshPhongMaterial({color:0xfafafa,transparent:true,opacity:0.1})));
    const sidebar=new THREE.Mesh(new THREE.BoxGeometry(0.38,1.6,0.1),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.55}));sidebar.position.set(-0.435,0,0.01);g.add(sidebar);
    const photo=new THREE.Mesh(new THREE.CylinderGeometry(0.14,0.14,0.08,16),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.35}));photo.rotation.x=Math.PI/2;photo.position.set(-0.435,0.55,0.08);g.add(photo);
    const nb=new THREE.Mesh(new THREE.BoxGeometry(0.75,0.14,0.06),new THREE.MeshBasicMaterial({color:new THREE.Color(color),transparent:true,opacity:0.8}));nb.position.set(0.19,0.65,0.06);g.add(nb);
    [[0.65,0.38],[0.55,0.2],[0.6,0.02],[0.4,-0.14],[0.58,-0.3],[0.45,-0.45]].forEach(([w,y])=>{const ln=new THREE.Mesh(new THREE.BoxGeometry(w,0.055,0.04),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.22}));ln.position.set(0.19,y,0.06);g.add(ln);});
  } else if (href === '/video') {
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.9,0.12,8,32),m(color)));
    const pts=[new THREE.Vector2(0.5,0),new THREE.Vector2(-0.3,0.55),new THREE.Vector2(-0.3,-0.55)];
    const playGeo=new THREE.ShapeGeometry(new THREE.Shape(pts));
    g.add(new THREE.Mesh(playGeo,new THREE.MeshPhongMaterial({color:new THREE.Color(color),emissive:new THREE.Color(color),emissiveIntensity:0.3,shininess:80,transparent:true,opacity:0.95,side:THREE.DoubleSide})));
    [0,60,120,180,240,300].forEach(deg=>{const a=deg*Math.PI/180;const hole=new THREE.Mesh(new THREE.BoxGeometry(0.18,0.12,0.18),m(color));hole.position.set(Math.cos(a)*0.9,Math.sin(a)*0.9,0);hole.rotation.z=a;g.add(hole);});
    g.add(new THREE.Mesh(new THREE.CircleGeometry(0.12,16),new THREE.MeshBasicMaterial({color:new THREE.Color(color)})));
  } else if (href === '/story') {
    const pageL=new THREE.Mesh(new THREE.BoxGeometry(0.8,1.2,0.06),m(color));pageL.position.set(-0.42,0,0);pageL.rotation.y=0.3;g.add(pageL);
    const pageR=new THREE.Mesh(new THREE.BoxGeometry(0.8,1.2,0.06),m(color));pageR.position.set(0.42,0,0);pageR.rotation.y=-0.3;g.add(pageR);
    const spine=new THREE.Mesh(new THREE.BoxGeometry(0.12,1.2,0.12),m(color));g.add(spine);
    [-0.35,-0.15,0.05,0.25].forEach(y=>{const ln=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.05,0.04),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.2}));ln.position.set(-0.42,y,0.04);g.add(ln);});
    [0,72,144,216,288].forEach(deg=>{const a=deg*Math.PI/180;const ray=new THREE.Mesh(new THREE.BoxGeometry(0.08,0.4,0.06),m('#ffffff'));ray.position.set(0.65+Math.cos(a)*0.2,0.65+Math.sin(a)*0.2,0.1);ray.rotation.z=a;g.add(ray);});
    const sparkCenter=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,8),m('#ffffff'));sparkCenter.position.set(0.65,0.65,0.12);g.add(sparkCenter);
    g.scale.setScalar(0.82);
  } else if (href === '/keyword') {
    const lens=new THREE.Mesh(new THREE.TorusGeometry(0.62,0.1,8,32),m(color));g.add(lens);
    const handle=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,0.7,8),m(color));handle.rotation.z=Math.PI/4;handle.position.set(0.6,-0.6,0);g.add(handle);
    [-0.18,0.18].forEach(y=>{const b=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.09,0.1),m(color));b.position.set(0,y,0.08);g.add(b);});
    [-0.18,0.18].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(0.09,0.7,0.1),m(color));b.position.set(x,0,0.08);g.add(b);});
    g.scale.setScalar(0.85);
  } else if (href === '/imagegen') {
    const ft=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.12,0.12),m(color));ft.position.set(0,0.84,0);g.add(ft);
    const fb=new THREE.Mesh(new THREE.BoxGeometry(1.8,0.12,0.12),m(color));fb.position.set(0,-0.84,0);g.add(fb);
    const fl=new THREE.Mesh(new THREE.BoxGeometry(0.12,1.8,0.12),m(color));fl.position.set(-0.84,0,0);g.add(fl);
    const fr=new THREE.Mesh(new THREE.BoxGeometry(0.12,1.8,0.12),m(color));fr.position.set(0.84,0,0);g.add(fr);
    const canvas2=new THREE.Mesh(new THREE.BoxGeometry(1.55,1.55,0.04),new THREE.MeshPhongMaterial({color:new THREE.Color('#1a1a2e'),transparent:true,opacity:0.6}));g.add(canvas2);
    [0,45,90,135].forEach(deg=>{const a=deg*Math.PI/180;const ray=new THREE.Mesh(new THREE.BoxGeometry(0.1,0.9,0.06),m(color));ray.rotation.z=a;g.add(ray);});
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.15,12,12),m(color)));
    g.scale.setScalar(0.72);
  } else if (href === '/passport') {
    const frame=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.4,0.1),m(color));g.add(frame);
    const photo=new THREE.Mesh(new THREE.BoxGeometry(0.88,1.18,0.08),new THREE.MeshPhongMaterial({color:new THREE.Color('#e8f4f8'),transparent:true,opacity:0.9}));photo.position.z=0.06;g.add(photo);
    const head=new THREE.Mesh(new THREE.SphereGeometry(0.18,12,12),new THREE.MeshPhongMaterial({color:new THREE.Color('#b0c4d8'),transparent:true,opacity:0.8}));head.position.set(0,0.3,0.1);g.add(head);
    const body=new THREE.Mesh(new THREE.BoxGeometry(0.38,0.35,0.08),new THREE.MeshPhongMaterial({color:new THREE.Color('#b0c4d8'),transparent:true,opacity:0.8}));body.position.set(0,-0.1,0.1);g.add(body);
    [[-0.38,0.52],[0.38,0.52],[-0.38,-0.52],[0.38,-0.52]].forEach(([x,y])=>{const c=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.04,0.06),m(color));c.position.set(x,y,0.12);g.add(c);const c2=new THREE.Mesh(new THREE.BoxGeometry(0.04,0.12,0.06),m(color));c2.position.set(x,y,0.12);g.add(c2);});
    g.scale.setScalar(0.78);
  } else if (href === '/password') {
    // Lock with shield
    const shield=new THREE.Mesh(new THREE.CylinderGeometry(0.7,0.6,1.4,6),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.25,wireframe:false}));g.add(shield);
    g.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.CylinderGeometry(0.7,0.6,1.4,6)),lm(color,0.5)));
    const lockBody=new THREE.Mesh(new THREE.BoxGeometry(0.55,0.45,0.2),m(color));lockBody.position.set(0,0.05,0.5);g.add(lockBody);
    const shackle=new THREE.Mesh(new THREE.TorusGeometry(0.18,0.07,8,16,Math.PI),m(color));shackle.position.set(0,0.4,0.5);g.add(shackle);
    const keyhole=new THREE.Mesh(new THREE.CircleGeometry(0.08,16),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.5}));keyhole.position.set(0,0.12,0.62);g.add(keyhole);
    g.scale.setScalar(0.85);
  } else if (href === '/unit') {
    // Ruler + arrows
    const ruler=new THREE.Mesh(new THREE.BoxGeometry(2.0,0.35,0.15),m(color));g.add(ruler);
    for(let i=-4;i<=4;i++){const tick=new THREE.Mesh(new THREE.BoxGeometry(0.05,i%2===0?0.25:0.15,0.12),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.3}));tick.position.set(i*0.22,0,0.1);g.add(tick);}
    const arrL=new THREE.Mesh(new THREE.ConeGeometry(0.12,0.3,4),m(color));arrL.position.set(-1.1,0.5,0);arrL.rotation.z=Math.PI/2;g.add(arrL);
    const arrR=new THREE.Mesh(new THREE.ConeGeometry(0.12,0.3,4),m(color));arrR.position.set(1.1,0.5,0);arrR.rotation.z=-Math.PI/2;g.add(arrR);
    const bar=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.06,0.08),m(color));bar.position.set(0,0.5,0);g.add(bar);
    g.scale.setScalar(0.78);
  } else if (href === '/base64') {
    // Binary/code brackets
    [-0.6,0.6].forEach((x,i)=>{
      const bracket=new THREE.Mesh(new THREE.BoxGeometry(0.12,1.4,0.12),m(color));bracket.position.set(x,0,0);g.add(bracket);
      const top=new THREE.Mesh(new THREE.BoxGeometry(0.35,0.12,0.12),m(color));top.position.set(x+(i===0?0.18:-0.18),0.64,0);g.add(top);
      const bot=new THREE.Mesh(new THREE.BoxGeometry(0.35,0.12,0.12),m(color));bot.position.set(x+(i===0?0.18:-0.18),-0.64,0);g.add(bot);
    });
    [[-0.15,0.3],[0.15,0.3],[-0.15,-0.3],[0.15,-0.3],[-0.15,0],[0.15,0]].forEach(([x,y],i)=>{
      const dot=new THREE.Mesh(new THREE.SphereGeometry(0.08,8,8),m(i%2===0?color:'#ffffff'));dot.position.set(x,y,0.2);g.add(dot);
    });
    g.scale.setScalar(0.88);
  } else if (href === '/emi') {
    // Calculator + coin/chart
    const body=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.5,0.15),m(color));g.add(body);
    const screen=new THREE.Mesh(new THREE.BoxGeometry(0.9,0.45,0.1),new THREE.MeshPhongMaterial({color:0x001122,transparent:true,opacity:0.9}));screen.position.set(0,0.48,0.1);g.add(screen);
    // Chart bars on screen
    [[0.3,0.1,-0.28],[0.5,0.17,-0.1],[0.4,0.14,0.08],[0.7,0.22,0.26]].forEach(([h,hh,x])=>{const bar=new THREE.Mesh(new THREE.BoxGeometry(0.12,h,0.06),m(color));bar.position.set(x,0.48-0.22+hh,0.15);g.add(bar);});
    // Keys
    [[-0.3,0],[0,0],[0.3,0],[-0.3,-0.25],[0,-0.25],[0.3,-0.25],[-0.3,-0.5],[0,-0.5],[0.3,-0.5]].forEach(([x,y])=>{const key=new THREE.Mesh(new THREE.BoxGeometry(0.2,0.15,0.08),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.5}));key.position.set(x,y,0.1);g.add(key);});
    g.scale.setScalar(0.72);
  } else if (href === '/loan') {
    // House + checkmark
    const walls=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.9,0.15),m(color));walls.position.set(0,-0.25,0);g.add(walls);
    const roofShape=new THREE.Shape();roofShape.moveTo(-0.78,0.2);roofShape.lineTo(0,0.85);roofShape.lineTo(0.78,0.2);roofShape.closePath();
    const roof=new THREE.Mesh(new THREE.ShapeGeometry(roofShape),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.95,side:THREE.DoubleSide}));g.add(roof);
    const door=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.42,0.12),new THREE.MeshPhongMaterial({color:0x1a1a2e,transparent:true,opacity:0.8}));door.position.set(0,-0.49,0.1);g.add(door);
    // Checkmark badge
    const badge=new THREE.Mesh(new THREE.CircleGeometry(0.28,16),new THREE.MeshPhongMaterial({color:new THREE.Color('#22c55e'),transparent:true,opacity:0.9,side:THREE.DoubleSide}));badge.position.set(0.58,0.55,0.4);g.add(badge);
    g.scale.setScalar(0.82);
  } else if (href === '/invoice') {
    // Document with ₹ symbol
    const doc=new THREE.Mesh(new THREE.BoxGeometry(1.1,1.45,0.1),m(color));g.add(doc);
    const fold=new THREE.Mesh(new THREE.BoxGeometry(0.35,0.35,0.12),new THREE.MeshPhongMaterial({color:0x1a1a2e,transparent:true,opacity:0.8}));fold.position.set(0.385,0.555,0.08);g.add(fold);
    [-0.05,-0.22,-0.38,-0.55].forEach(y=>{const ln=new THREE.Mesh(new THREE.BoxGeometry(0.65,0.055,0.06),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.2}));ln.position.set(-0.08,y,0.08);g.add(ln);});
    // Rupee symbol area
    const rBg=new THREE.Mesh(new THREE.CircleGeometry(0.22,16),new THREE.MeshPhongMaterial({color:new THREE.Color('#22c55e'),transparent:true,opacity:0.85,side:THREE.DoubleSide}));rBg.position.set(-0.08,0.38,0.12);g.add(rBg);
    g.scale.setScalar(0.78);
  } else if (href === '/word-counter') {
    // Text lines with counter
    const page=new THREE.Mesh(new THREE.BoxGeometry(1.25,1.55,0.08),m(color));g.add(page);
    [-0.4,-0.2,0,0.2,0.4,0.58].forEach((y,i)=>{const w=[0.7,0.85,0.65,0.9,0.55,0.4][i];const ln=new THREE.Mesh(new THREE.BoxGeometry(w,0.07,0.06),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.22}));ln.position.set((0.625-w/2)*0.1,y,0.07);g.add(ln);});
    const badge=new THREE.Mesh(new THREE.CircleGeometry(0.3,16),new THREE.MeshPhongMaterial({color:new THREE.Color('#4D96FF'),transparent:true,opacity:0.9,side:THREE.DoubleSide}));badge.position.set(0.45,-0.62,0.18);g.add(badge);
    g.scale.setScalar(0.78);
  } else if (href === '/json') {
    // Curly braces
    [-0.7,0.7].forEach((x,idx)=>{
      const dir=idx===0?1:-1;
      const top=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.12,0.12),m(color));top.position.set(x+dir*0.14,0.7,0);g.add(top);
      const mid1=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.5,0.12),m(color));mid1.position.set(x,0.44,0);g.add(mid1);
      const nub=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.14,0.14),m(color));nub.position.set(x-dir*0.14,0,0);g.add(nub);
      const mid2=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.5,0.12),m(color));mid2.position.set(x,-0.44,0);g.add(mid2);
      const bot=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.12,0.12),m(color));bot.position.set(x+dir*0.14,-0.7,0);g.add(bot);
    });
    // Dots inside
    [0.2,-0.2].forEach(y=>{const d=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,8),m(color));d.position.set(0,y,0.2);g.add(d);});
    g.scale.setScalar(0.82);
  } else {
    // fallback sphere
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.8,16,16),new THREE.MeshPhongMaterial({color:new THREE.Color(color),transparent:true,opacity:0.3,wireframe:true})));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.4,8,8),m(color)));
  }

  return { scene, camera, g, pl, t: 0, angle: 0, hovered: false, href, color, mouseX: 0, mouseY: 0 };
}

function updateToolScene(tool) {
  tool.t += 0.016;
  const { g, pl, t, hovered: isHov, href } = tool;

  if (href === '/tts') {
    g.rotation.y = Math.sin(t * (isHov ? 1.2 : 0.4)) * 0.5;
    g.rotation.x = 0;
  } else {
    if (isHov) {
      const targetX = -tool.mouseY * 0.55;
      const targetY = tool.mouseX * 0.75;
      g.rotation.x += (targetX - g.rotation.x) * 0.1;
      g.rotation.y += (targetY - g.rotation.y) * 0.1;
    } else {
      const spd = href === '/qr' ? 0.005 : 0.008;
      g.rotation.y += spd;
      g.rotation.x += (0 - g.rotation.x) * 0.04;
    }
  }

  if (href !== '/tts') {
    const base = href === '/qr' ? 0.62 : 1.0;
    const ts = isHov ? base * 1.15 : base;
    g.scale.lerp(new THREE.Vector3(ts, ts, ts), 0.1);
  }

  pl.intensity = isHov ? 3.5 + Math.sin(t * 3) : 1.5;
}

function createMobileRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(72, 72, false);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

// ── Color map for all 20 tools ──
const TOOL_COLORS = {
  '/story':'#A78BFA','/hashtag':'#FF6B6B','/imagegen':'#F59E0B','/keyword':'#34D399',
  '/image-tools':'#FFD93D','/pdf':'#FF9A3C','/passport':'#60A5FA','/qr':'#00FFB2',
  '/password':'#F472B6','/domain':'#00C9FF','/unit':'#6BCB77','/base64':'#C77DFF',
  '/emi':'#FB923C','/loan':'#E879F9','/invoice':'#38BDF8','/word-counter':'#4D96FF',
  '/json':'#86EFAC','/tts':'#4D96FF','/video':'#FF4ECD','/resume':'#FF6B6B',
  // legacy
  '/resize':'#FFD93D','/compress':'#6BCB77','/convert':'#C77DFF',
};

// ── Tool Icon Component ───────────────────────────────────
export default function ToolIcon3D({ href, hovered, mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const localStateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const color = TOOL_COLORS[href] || '#00FFB2';

    if (isMobileDevice()) {
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 72 * dpr;
      canvas.height = 72 * dpr;
      canvas.style.width = '72px';
      canvas.style.height = '72px';
      ctx.scale(dpr, dpr);
      let t = 0;
      let raf = null;
      const mobileLoop = () => {
        t += 0.022;
        ctx.clearRect(0, 0, 72, 72);
        drawToolIcon2D(ctx, href, 36, 36, 72, t, hovered, color);
        raf = requestAnimationFrame(mobileLoop);
      };
      mobileLoop();
      return () => { if (raf) cancelAnimationFrame(raf); };
    }

    // Desktop: shared renderer (single WebGL context for all icons)
    canvas.width = 72;
    canvas.height = 72;
    canvas.style.width = '72px';
    canvas.style.height = '72px';

    const tool = createToolScene(href, color);
    tool.canvas = canvas;
    const key = href + '_' + Math.random().toString(36).slice(2);
    localStateRef.current = { key };
    toolScenes.set(key, tool);
    getRenderer();

    return () => {
      if (localStateRef.current?.key) toolScenes.delete(localStateRef.current.key);
      localStateRef.current = null;
    };
  }, [href]);

  useEffect(() => {
    if (!localStateRef.current?.key) return;
    const tool = toolScenes.get(localStateRef.current.key);
    if (tool) tool.hovered = hovered;
  }, [hovered, href]);

  useEffect(() => {
    if (!localStateRef.current?.key) return;
    const tool = toolScenes.get(localStateRef.current.key);
    if (tool) { tool.mouseX = mouseX || 0; tool.mouseY = mouseY || 0; }
  }, [mouseX, mouseY, href]);

  return (
    <canvas ref={canvasRef}
      style={{ display:'block', borderRadius:'14px', width:'72px', height:'72px',
        transition:'filter .3s', filter: hovered ? 'drop-shadow(0 0 12px rgba(255,255,255,0.3))' : 'none',
        pointerEvents:'none', touchAction:'none' }} />
  );
}

// ── 2D Canvas fallback drawing ────────────────────────────
function drawToolIcon2D(ctx, href, cx, cy, s, t, hov, color) {
  ctx.save();
  ctx.translate(cx, cy);
  const bob = Math.sin(t * (hov ? 3 : 1.5)) * 2;
  ctx.translate(0, bob);
  const glow = hov ? 16 : 8;
  ctx.shadowColor = color;
  ctx.shadowBlur = glow;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (href === '/qr') {
    [[-18,-18],[8,-18],[-18,8]].forEach(([x,y]) => { ctx.strokeRect(x,y,14,14); ctx.fillRect(x+4,y+4,6,6); });
    [[2,2],[10,2],[2,10],[18,18],[-2,18]].forEach(([x,y]) => ctx.fillRect(x,y,4,4));
  } else if (href === '/hashtag') {
    [-10,10].forEach(x=>{ctx.beginPath();ctx.moveTo(x,-18);ctx.lineTo(x-4,18);ctx.stroke();});
    [-8,8].forEach(y=>{ctx.beginPath();ctx.moveTo(-18,y);ctx.lineTo(18,y-4);ctx.stroke();});
  } else if (href === '/image-tools') {
    // Stacked image frames
    ctx.globalAlpha=0.4; ctx.strokeRect(-16,-12,26,20); ctx.globalAlpha=0.7; ctx.strokeRect(-12,-8,26,20); ctx.globalAlpha=1; ctx.strokeRect(-8,-4,26,20);
    ctx.beginPath(); ctx.moveTo(-6,8); ctx.lineTo(-2,4); ctx.lineTo(4,10); ctx.lineTo(8,6); ctx.lineTo(14,12); ctx.stroke();
    ctx.beginPath(); ctx.arc(10,-1,3,0,Math.PI*2); ctx.fill();
  } else if (href === '/compress') {
    ctx.strokeRect(-16,-16,32,32);
    ctx.beginPath(); ctx.moveTo(0,-20); ctx.lineTo(0,20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6,-10); ctx.lineTo(0,-18); ctx.lineTo(6,-10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6,10); ctx.lineTo(0,18); ctx.lineTo(6,10); ctx.stroke();
  } else if (href === '/tts') {
    ctx.beginPath(); ctx.roundRect(-9,-16,18,24,8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(0,8); ctx.lineTo(0,18); ctx.stroke();
    [14,20].forEach(r=>{ctx.beginPath(); ctx.arc(0,-4,r,-0.8,0.8); ctx.stroke(); ctx.beginPath(); ctx.arc(0,-4,r,Math.PI-0.8,Math.PI+0.8); ctx.stroke();});
  } else if (href === '/pdf') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    [-8,-2,4,10].forEach(y=>{ctx.beginPath(); ctx.moveTo(-8,y); ctx.lineTo(8,y); ctx.stroke();});
    ctx.beginPath(); ctx.moveTo(0,18); ctx.lineTo(0,26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5,22); ctx.lineTo(0,28); ctx.lineTo(5,22); ctx.stroke();
  } else if (href === '/domain') {
    ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0,0,18,8,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18,0); ctx.lineTo(18,0); ctx.stroke();
    ctx.beginPath(); ctx.arc(12,12,8,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18,18); ctx.lineTo(24,24); ctx.stroke();
  } else if (href === '/resume') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.fillRect(-10,-12,8,10);
    [-2,4,10].forEach(y=>{ctx.beginPath(); ctx.moveTo(2,y-10); ctx.lineTo(10,y-10); ctx.stroke();});
    [-2,4,10].forEach(y=>{ctx.beginPath(); ctx.moveTo(-10,y); ctx.lineTo(10,y); ctx.stroke();});
  } else if (href === '/video') {
    ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4,-8); ctx.lineTo(10,0); ctx.lineTo(-4,8); ctx.closePath(); ctx.fill();
  } else if (href === '/story') {
    ctx.beginPath(); ctx.roundRect(-18,-14,14,28,3); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(4,-14,14,28,3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-14); ctx.lineTo(0,14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14,-20); ctx.lineTo(16,-12); ctx.lineTo(24,-10); ctx.lineTo(16,-8); ctx.lineTo(14,0); ctx.lineTo(12,-8); ctx.lineTo(4,-10); ctx.lineTo(12,-12); ctx.closePath(); ctx.fill();
  } else if (href === '/keyword') {
    ctx.beginPath(); ctx.arc(-4,-4,12,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,6); ctx.lineTo(18,18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8,-4); ctx.lineTo(0,-4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4,-8); ctx.lineTo(-4,0); ctx.stroke();
  } else if (href === '/imagegen') {
    ctx.beginPath(); ctx.roundRect(-18,-18,36,36,6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-12,10); ctx.lineTo(-2,0); ctx.lineTo(6,8); ctx.lineTo(14,-4); ctx.stroke();
    ctx.beginPath(); ctx.arc(8,-8,4,0,Math.PI*2); ctx.fill();
  } else if (href === '/passport') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.beginPath(); ctx.arc(0,-4,6,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-8,4,16,10,4); ctx.stroke();
    [[-14,-18],[14,-18],[-14,18],[14,18]].forEach(([x,y])=>{ ctx.fillRect(x-2,y-2,4,4); });
  } else if (href === '/password') {
    ctx.beginPath(); ctx.roundRect(-12,0,24,18,4); ctx.fill();
    ctx.lineWidth=3.5; ctx.beginPath(); ctx.arc(0,-2,10,Math.PI,0); ctx.stroke();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.35;
    ctx.beginPath(); ctx.arc(0,10,3,0,Math.PI*2); ctx.fill();
    ctx.fillRect(-1.5,10,3,6);
    ctx.globalAlpha=1; ctx.fillStyle=color;
    [-8,0,8].forEach(x=>{ ctx.beginPath(); ctx.arc(x,20,2,0,Math.PI*2); ctx.fill(); });
  } else if (href === '/unit') {
    ctx.beginPath(); ctx.roundRect(-18,-6,36,12,3); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.3;
    [-12,-6,0,6,12].forEach(x=>{ ctx.fillRect(x-0.5,-6,1,x===0?8:5); });
    ctx.globalAlpha=1; ctx.fillStyle=color;
    ctx.beginPath(); ctx.moveTo(-22,-14); ctx.lineTo(-18,-18); ctx.lineTo(-14,-14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22,14); ctx.lineTo(18,18); ctx.lineTo(14,14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18,-14); ctx.lineTo(18,14); ctx.stroke();
  } else if (href === '/base64') {
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-18,20); ctx.lineTo(-22,0); ctx.lineTo(-18,-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18,20); ctx.lineTo(22,0); ctx.lineTo(18,-20); ctx.stroke();
    [[-6,0],[0,0],[6,0],[-6,-10],[6,-10],[-6,10],[6,10]].forEach(([x,y])=>{ ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fill(); });
  } else if (href === '/emi') {
    ctx.beginPath(); ctx.roundRect(-16,-18,32,36,4); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-12,-14,24,10,2); ctx.stroke();
    [-4,2,8].forEach((y,i)=>{
      const w=[14,10,8][i];
      ctx.fillRect(-10,y,w,4);
    });
    ctx.fillStyle='#22c55e'; ctx.fillRect(-2,8,14,4);
  } else if (href === '/loan') {
    ctx.beginPath(); ctx.moveTo(-18,8); ctx.lineTo(0,-16); ctx.lineTo(18,8); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-12,8,24,12,2); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-4,8,8,12,2); ctx.stroke();
    ctx.lineWidth=2; ctx.fillStyle='#22c55e';
    ctx.beginPath(); ctx.arc(14,-14,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.4;
    ctx.beginPath(); ctx.moveTo(10,-14); ctx.lineTo(13,-11); ctx.lineTo(18,-17); ctx.stroke();
    ctx.globalAlpha=1;
  } else if (href === '/invoice') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-18); ctx.lineTo(14,-10); ctx.lineTo(6,-10); ctx.closePath(); ctx.stroke();
    ctx.lineWidth=2;
    [-6,-1,6,12].forEach(y=>{ ctx.beginPath(); ctx.moveTo(-8,y); ctx.lineTo(8,y); ctx.stroke(); });
    ctx.fillStyle='#22c55e'; ctx.beginPath(); ctx.arc(-8,-10,4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.5;
    ctx.font='bold 6px sans-serif'; ctx.textAlign='center'; ctx.fillText('₹',-8,-8);
    ctx.globalAlpha=1;
  } else if (href === '/word-counter') {
    ctx.lineWidth=2;
    [-14,-7,0,7,14].forEach((y,i)=>{const w=[24,20,22,18,14][i]; ctx.beginPath(); ctx.moveTo(-w/2,y); ctx.lineTo(w/2,y); ctx.stroke();});
    ctx.fillStyle='#4D96FF'; ctx.beginPath(); ctx.arc(14,14,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.5;
    ctx.font='bold 8px sans-serif'; ctx.textAlign='center'; ctx.fillText('99',14,17);
    ctx.globalAlpha=1;
  } else if (href === '/json') {
    ctx.lineWidth=2.5;
    [[-14,0],[-10,0]].forEach(([offx])=>{
      ctx.beginPath(); ctx.moveTo(offx,-16); ctx.lineTo(offx+4,-20); ctx.lineTo(offx+8,-16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(offx+4,-20); ctx.lineTo(offx+4,20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(offx,-16); ctx.lineTo(offx-4,-20); ctx.lineTo(offx-8,-16); ctx.stroke();
    });
    ctx.beginPath(); ctx.moveTo(-16,-20); ctx.lineTo(-20,0); ctx.lineTo(-16,20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16,-20); ctx.lineTo(20,0); ctx.lineTo(16,20); ctx.stroke();
    [-6,0,6].forEach(y=>{ ctx.beginPath(); ctx.arc(0,y,2,0,Math.PI*2); ctx.fill(); });
  } else {
    ctx.beginPath(); ctx.arc(0,0,16,0,Math.PI*2); ctx.stroke();
    ctx.fillRect(-4,-4,8,8);
  }
  ctx.restore();
}

// ── Canvas 2D base ────────────────────────────────────────
function Icon2D({ draw, size, hovered, color }) {
  const ref = useRef(null);
  const state = useRef({ hovered: false, t: 0, raf: null });
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    const loop = () => { state.current.t += 0.022; ctx.clearRect(0,0,size,size); draw(ctx,size/2,size/2,size,state.current.t,state.current.hovered,color); state.current.raf = requestAnimationFrame(loop); };
    loop();
    return () => cancelAnimationFrame(state.current.raf);
  }, [size, color]);
  useEffect(() => { state.current.hovered = hovered; }, [hovered]);
  return <canvas ref={ref} width={size} height={size} style={{ display:'block', width:`${size}px`, height:`${size}px`, borderRadius:'12px', transition:'filter .3s', filter: hovered ? `drop-shadow(0 0 10px ${color}cc)` : 'none', pointerEvents:'none', touchAction:'none' }} />;
}

// ── Feature Icons ─────────────────────────────────────────
function drawBolt(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);const sc=1+Math.sin(t*(hov?5:2))*0.06;ctx.scale(sc,sc);ctx.shadowColor=color;ctx.shadowBlur=hov?16:5;ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(s*0.08,-s*0.44);ctx.lineTo(-s*0.14,s*0.04);ctx.lineTo(s*0.04,s*0.04);ctx.lineTo(-s*0.08,s*0.44);ctx.lineTo(s*0.2,-s*0.06);ctx.lineTo(s*0.04,-s*0.06);ctx.closePath();ctx.fill();ctx.restore();}
function drawLock(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy+Math.sin(t*(hov?3:1))*s*0.03);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.22,s*0.02,s*0.44,s*0.36,s*0.05);ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=s*0.08;ctx.beginPath();ctx.arc(0,s*0.02,s*0.18,Math.PI,0);ctx.stroke();ctx.fillStyle='rgba(0,0,0,0.35)';ctx.beginPath();ctx.arc(0,s*0.17,s*0.06,0,Math.PI*2);ctx.fill();ctx.fillRect(-s*0.03,s*0.17,s*0.06,s*0.1);ctx.restore();}
function drawPhone(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.sin(t*(hov?2:0.6))*0.1);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.2,-s*0.38,s*0.4,s*0.76,s*0.06);ctx.fill();ctx.fillStyle='#1a1a2e';ctx.beginPath();ctx.roundRect(-s*0.16,-s*0.31,s*0.32,s*0.56,s*0.04);ctx.fill();ctx.fillStyle='#4D96FF';ctx.globalAlpha=0.7;ctx.fillRect(-s*0.13,-s*0.26,s*0.26,s*0.42);ctx.globalAlpha=1;ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,s*0.33,s*0.05,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#00FFB2';ctx.lineWidth=1.5;[s*0.13,s*0.21].forEach(r=>{ctx.beginPath();ctx.arc(0,-s*0.06,r,-Math.PI*0.75,-Math.PI*0.25);ctx.stroke();});ctx.restore();}
function drawNoSignup(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.fillStyle='#555';ctx.beginPath();ctx.arc(0,-s*0.16,s*0.1,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(0,s*0.04,s*0.17,Math.PI,0);ctx.fill();const r=s*0.36;ctx.strokeStyle=color;ctx.lineWidth=s*0.09;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.lineCap='round';const d=r*0.62;ctx.beginPath();ctx.moveTo(-d,-d);ctx.lineTo(d,d);ctx.stroke();ctx.beginPath();ctx.moveTo(d,-d);ctx.lineTo(-d,d);ctx.stroke();ctx.restore();}
function drawClock(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);const r=s*0.36;ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1.5;for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2-Math.PI/2,len=i%3===0?s*0.08:s*0.04;ctx.beginPath();ctx.moveTo(Math.cos(a)*(r-len),Math.sin(a)*(r-len));ctx.lineTo(Math.cos(a)*r*0.88,Math.sin(a)*r*0.88);ctx.stroke();}const now=t*(hov?2:0.6);ctx.lineCap='round';ctx.strokeStyle='white';ctx.lineWidth=2.5;const ha=now*0.083-Math.PI/2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ha)*r*0.55,Math.sin(ha)*r*0.55);ctx.stroke();ctx.lineWidth=2;const ma=now-Math.PI/2;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ma)*r*0.75,Math.sin(ma)*r*0.75);ctx.stroke();ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,0,s*0.04,0,Math.PI*2);ctx.fill();ctx.restore();}
function drawRocket(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy-Math.sin(t*(hov?3:1.2))*s*0.04);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.12,-s*0.3,s*0.24,s*0.38,s*0.12);ctx.fill();ctx.beginPath();ctx.moveTo(0,-s*0.44);ctx.lineTo(-s*0.12,-s*0.3);ctx.lineTo(s*0.12,-s*0.3);ctx.closePath();ctx.fill();ctx.fillStyle='#87ceeb';ctx.beginPath();ctx.arc(0,-s*0.16,s*0.07,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cc4400';[-1,1].forEach(dx=>{ctx.beginPath();ctx.moveTo(dx*s*0.12,s*0.06);ctx.lineTo(dx*s*0.24,s*0.22);ctx.lineTo(dx*s*0.12,s*0.22);ctx.closePath();ctx.fill();});const fp=0.7+Math.sin(t*6)*0.3;ctx.globalAlpha=fp;ctx.fillStyle='#FFD93D';ctx.beginPath();ctx.ellipse(0,s*0.38,s*0.1,s*0.16*fp,0,0,Math.PI*2);ctx.fill();ctx.restore();}
export function FeatureIcon3D({ type, color, hovered }) {
  const map={fast:drawBolt,privacy:drawLock,everywhere:drawPhone,signup:drawNoSignup,free:drawClock,improving:drawRocket};
  return <Icon2D draw={map[type]||drawBolt} size={56} hovered={hovered} color={color}/>;
}

// ── Audience Icons ────────────────────────────────────────
function drawPalette(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.sin(t*0.5)*0.08);if(hov)ctx.scale(1.07,1.07);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,0,s*0.35,s*0.3,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#060609';ctx.beginPath();ctx.ellipse(s*0.17,-s*0.05,s*0.09,s*0.07,0,0,Math.PI*2);ctx.fill();[['#FF6B6B',-0.1,0.12],['#FFD93D',0.1,0.12],['#6BCB77',0,0.2],['#4D96FF',-0.18,-0.06],['#C77DFF',0.18,-0.06]].forEach(([c,bx,by])=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(bx*s,by*s,s*0.07,0,Math.PI*2);ctx.fill();});ctx.restore();}
function drawCodeBrackets(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy+Math.sin(t*(hov?2:0.8))*s*0.04);ctx.strokeStyle=color;ctx.lineWidth=s*0.09;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(-s*0.08,-s*0.22);ctx.lineTo(-s*0.26,0);ctx.lineTo(-s*0.08,s*0.22);ctx.stroke();ctx.beginPath();ctx.moveTo(s*0.08,-s*0.22);ctx.lineTo(s*0.26,0);ctx.lineTo(s*0.08,s*0.22);ctx.stroke();ctx.strokeStyle='#4D96FF';ctx.beginPath();ctx.moveTo(s*0.08,-s*0.26);ctx.lineTo(-s*0.08,s*0.26);ctx.stroke();ctx.restore();}
function drawGradCap(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.fillStyle=color;ctx.save();ctx.rotate(Math.PI/4+Math.sin(t*0.4)*0.05);ctx.fillRect(-s*0.27,-s*0.27,s*0.34,s*0.34);ctx.restore();ctx.beginPath();ctx.roundRect(-s*0.13,-s*0.04,s*0.26,s*0.2,s*0.03);ctx.fill();ctx.fillStyle='#FFD93D';ctx.fillRect(s*0.18,-s*0.08,s*0.04,s*0.26);ctx.beginPath();ctx.arc(s*0.2,s*0.2,s*0.06,0,Math.PI*2);ctx.fill();ctx.restore();}
function drawBriefcase(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);const sc=1+Math.sin(t*(hov?2:0.8))*0.04;ctx.scale(sc,sc);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.3,-s*0.16,s*0.6,s*0.36,s*0.05);ctx.fill();ctx.strokeStyle=color;ctx.lineWidth=s*0.07;ctx.beginPath();ctx.arc(0,-s*0.16,s*0.14,Math.PI,0);ctx.stroke();ctx.fillStyle='#FFD93D';ctx.beginPath();ctx.roundRect(-s*0.07,-s*0.02,s*0.14,s*0.09,s*0.02);ctx.fill();ctx.restore();}
export function AudienceIcon3D({ type, color, hovered }) {
  const map={creators:drawPalette,developers:drawCodeBrackets,students:drawGradCap,freelancers:drawBriefcase};
  return <Icon2D draw={map[type]||drawPalette} size={64} hovered={hovered} color={color}/>;
}

// ── Support Icons ─────────────────────────────────────────
function drawEnvelope(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy+Math.sin(t*(hov?2:0.8))*s*0.04);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.32,-s*0.22,s*0.64,s*0.44,s*0.04);ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.25)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-s*0.32,-s*0.22);ctx.lineTo(0,s*0.06);ctx.lineTo(s*0.32,-s*0.22);ctx.stroke();ctx.restore();}
function drawBubble(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(-s*0.28,-s*0.28,s*0.5,s*0.36,s*0.1);ctx.fill();ctx.beginPath();ctx.moveTo(-s*0.2,s*0.08);ctx.lineTo(-s*0.3,s*0.24);ctx.lineTo(-s*0.08,s*0.08);ctx.closePath();ctx.fill();const p=0.6+Math.sin(t*2)*0.2;ctx.fillStyle='rgba(0,0,0,0.4)';[-s*0.1,0,s*0.1].forEach(x=>{ctx.beginPath();ctx.arc(x,-s*0.1,s*0.05*p,0,Math.PI*2);ctx.fill();});ctx.fillStyle='#4D96FF';ctx.globalAlpha=0.8;ctx.beginPath();ctx.roundRect(s*0.06,s*0.02,s*0.28,s*0.22,s*0.07);ctx.fill();ctx.restore();}
function drawBug(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,s*0.06,s*0.15,s*0.22,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(0,-s*0.2,s*0.11,0,Math.PI*2);ctx.fill();ctx.fillStyle='#FF4444';[[-s*0.05,-s*0.22],[s*0.05,-s*0.22]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,s*0.04,0,Math.PI*2);ctx.fill();});ctx.strokeStyle=color;ctx.lineWidth=1.8;const w=Math.sin(t*(hov?4:1.5))*0.3;[-s*0.06,s*0.04,s*0.14].forEach((y,i)=>{const wv=i%2===0?w:-w;ctx.beginPath();ctx.moveTo(-s*0.15,y);ctx.lineTo(-s*0.32+wv*s,y-wv*s*0.4);ctx.stroke();ctx.beginPath();ctx.moveTo(s*0.15,y);ctx.lineTo(s*0.32-wv*s,y-wv*s*0.4);ctx.stroke();});ctx.restore();}
function drawBulb(ctx,cx,cy,s,t,hov,color){ctx.save();ctx.translate(cx,cy);const gl=hov?0.4+Math.sin(t*3)*0.2:0.1;ctx.shadowColor=color;ctx.shadowBlur=hov?20:6;ctx.fillStyle=color;ctx.globalAlpha=0.9;ctx.beginPath();ctx.arc(0,-s*0.08,s*0.24,0,Math.PI*2);ctx.fill();ctx.globalAlpha=gl+0.2;ctx.fillStyle='white';ctx.beginPath();ctx.arc(-s*0.06,-s*0.14,s*0.09,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#888';ctx.fillRect(-s*0.14,s*0.16,s*0.28,s*0.08);ctx.fillRect(-s*0.11,s*0.24,s*0.22,s*0.07);ctx.restore();}
export function SupportIcon3D({ type, color, hovered }) {
  const map={email:drawEnvelope,community:drawBubble,bug:drawBug,feature:drawBulb};
  return <div style={{width:'36px',height:'36px',overflow:'hidden',flexShrink:0}}><Icon2D draw={map[type]||drawEnvelope} size={36} hovered={hovered} color={color}/></div>;
}
export function SharedRendererProvider({ children }) { return children; }