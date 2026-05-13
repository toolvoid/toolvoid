'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import MobileHome from '../components/MobileHome';
import ToolIcon3D, {
  AudienceIcon3D,
  FeatureIcon3D,
  SupportIcon3D,
  SharedRendererProvider,
} from '../components/ToolIcon3D';

const tools = [
  { name: 'Story Generator', desc: 'Generate cinematic stories & scripts with AI', href: '/story', tag: 'AI', delay: '.05s', color: '#A78BFA', featured: true },
  { name: 'Hashtag Generator', desc: 'Smart hashtags for Instagram, YouTube & Twitter', href: '/hashtag', tag: 'AI', delay: '.1s', color: '#FF6B6B' },
  { name: 'Image Generator', desc: 'Generate AI images from text prompts with daily free credits', href: '/imagegen', tag: 'AI', delay: '.15s', color: '#F59E0B' },
  { name: 'Keyword Generator', desc: 'Find best SEO keywords for your content instantly', href: '/keyword', tag: 'SEO', delay: '.2s', color: '#34D399' },
  { name: 'Image Toolkit', desc: 'Resize, compress & convert images in one place', href: '/image-tools', tag: 'Image', delay: '.25s', color: '#FFD93D' },
  { name: 'PDF to Image', desc: 'Extract high-quality images from any PDF file', href: '/pdf', tag: 'PDF', delay: '.3s', color: '#FF9A3C' },
  { name: 'Passport Photo', desc: 'Resize photos to passport size instantly free', href: '/passport', tag: 'Photo', delay: '.35s', color: '#60A5FA' },
  { name: 'QR Generator', desc: 'Generate QR codes for any URL or text instantly', href: '/qr', tag: 'Utility', delay: '.4s', color: '#00FFB2' },
  { name: 'Password Generator', desc: 'Generate strong, secure random passwords instantly', href: '/password', tag: 'Security', delay: '.45s', color: '#F472B6' },
  { name: 'Domain Checker', desc: 'Check domain availability across all extensions', href: '/domain', tag: 'Utility', delay: '.5s', color: '#00C9FF' },
  { name: 'Unit Converter', desc: 'Convert length, weight, temperature and more instantly', href: '/unit', tag: 'Utility', delay: '.55s', color: '#6BCB77' },
  { name: 'Base64 Encoder', desc: 'Encode and decode Base64 strings in one click', href: '/base64', tag: 'Dev', delay: '.6s', color: '#C77DFF' },
  { name: 'EMI Calculator', desc: 'Calculate loan EMI with interest & amortization chart', href: '/emi', tag: 'Finance', delay: '.65s', color: '#FB923C' },
  { name: 'Loan Eligibility', desc: 'Check home & personal loan eligibility instantly', href: '/loan', tag: 'Finance', delay: '.7s', color: '#E879F9' },
  { name: 'Invoice Generator', desc: 'Create professional invoices and download them as PDF free', href: '/invoice', tag: 'Business', delay: '.75s', color: '#38BDF8' },
  { name: 'Word Counter', desc: 'Count words, characters and estimate reading time instantly', href: '/word-counter', tag: 'Content', delay: '.8s', color: '#4D96FF' },
  { name: 'JSON Formatter', desc: 'Format, validate and beautify JSON instantly', href: '/json', tag: 'Dev', delay: '.85s', color: '#86EFAC' },
  { name: 'Text to Speech', desc: 'Convert text into natural voice instantly free', href: '/tts', tag: 'Voice', delay: '.9s', color: '#4D96FF' },
  { name: 'Video Converter', desc: 'Convert MP4, MOV, AVI and MKV for free', href: '/video', tag: 'Media', delay: '.95s', color: '#FF4ECD' },
  { name: 'Resume Builder', desc: 'Multiple templates, PDF export, quick browser workflow', href: '/resume', tag: 'Career', delay: '1s', color: '#FF6B6B' },
];

const audiences = [
  { title: 'Creators', desc: 'Stories, hashtags, AI images and export-ready assets in minutes.', color: '#00FFB2', type: 'creators' },
  { title: 'Developers', desc: 'Domain checker, QR, JSON-like utilities and quick browser workflows.', color: '#4D96FF', type: 'developers' },
  { title: 'Students', desc: 'Resume builder, PDF tools, word utilities and study-friendly helpers.', color: '#FFD93D', type: 'students' },
  { title: 'Freelancers', desc: 'Client-ready tools that save time with focused workflows.', color: '#C77DFF', type: 'freelancers' },
];

const features = [
  { t: 'Lightning Fast', d: 'Open a tool, drop your input and get results without setup screens.', color: '#00FFB2', type: 'fast' },
  { t: 'Privacy First', d: 'Many flows stay in-browser so your files remain on your device.', color: '#4D96FF', type: 'privacy' },
  { t: 'Works Everywhere', d: 'Desktop, tablet, or phone. No app download required.', color: '#C77DFF', type: 'everywhere' },
  { t: 'Fair Daily Access', d: 'AI tools include clear daily limits so everyone gets a smooth run.', color: '#FF6B6B', type: 'signup' },
  { t: 'Free Daily Credits', d: 'Core tools stay accessible, and AI tools include clear daily free usage.', color: '#FFD93D', type: 'free' },
  { t: 'Always Improving', d: 'New utilities and polish keep shipping as the toolset grows.', color: '#6BCB77', type: 'improving' },
];

const comparisons = [
  { feature: 'AI Access', us: 'Daily free credits', them: 'Usually paid plan' },
  { feature: 'Cost', us: 'Free daily limits', them: '₹500+/mo' },
  { feature: 'File Upload to Server', us: 'Often local', them: 'Usually required' },
  { feature: 'Works in Browser', us: 'Yes', them: 'Not always' },
  { feature: 'Instant Results', us: 'Built for speed', them: 'Depends on workflow' },
];

const supports = [
  { type: 'email', t: 'Email Support', d: 'Drop a message when something feels broken or confusing.', l: 'Email Us →', h: 'mailto:0voidtool0@gmail.com', color: '#00FFB2' },
  { type: 'community', t: 'Community', d: 'Share feedback, ideas, and common issues by email for now.', l: 'Join In →', h: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Community', color: '#4D96FF' },
  { type: 'bug', t: 'Bug Reports', d: 'Point out a broken flow and it gets fixed faster.', l: 'Report It →', h: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Bug%20Report', color: '#FF6B6B' },
  { type: 'feature', t: 'Feature Requests', d: 'Ask for the next utility you want to see shipped.', l: 'Suggest One →', h: 'mailto:0voidtool0@gmail.com?subject=Tool%20Void%20Feature%20Request', color: '#FFD93D' },
];

function AudienceCard({ a }) {
  return (
    <div className="aud-card reveal">
      <div className="aud-icon"><AudienceIcon3D type={a.type} color={a.color} /></div>
      <div className="aud-title" style={{ color: a.color }}>{a.title}</div>
      <div className="aud-desc">{a.desc}</div>
    </div>
  );
}

function FeatureCard({ f }) {
  return (
    <div className="fc reveal">
      <div className="fc-icon"><FeatureIcon3D type={f.type} color={f.color} /></div>
      <div className="fc-title" style={{ color: f.color }}>{f.t}</div>
      <div className="fc-desc">{f.d}</div>
    </div>
  );
}

function SupportCard({ s }) {
  return (
    <a href={s.h} className="sc2 reveal" style={{ textDecoration: 'none' }}>
      <div className="sc2-icon"><SupportIcon3D type={s.type} color={s.color} /></div>
      <div className="sct" style={{ color: s.color }}>{s.t}</div>
      <div className="scd">{s.d}</div>
      <div className="scl" style={{ color: s.color }}>{s.l}</div>
    </a>
  );
}

function ToolCard({ tool }) {
  const cardRef = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [iconMouse, setIconMouse] = useState({ x: 0, y: 0 });

  const onMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setRot({ x: -ny * 12, y: nx * 14 });
    setIconMouse({ x: nx, y: -ny });
  };

  return (
    <Link
      href={tool.href}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHovered(false); setIconMouse({ x: 0, y: 0 }); }}
      className={`tc reveal ${tool.featured ? 'tc-feat' : ''}`}
      style={{ transitionDelay: tool.delay }}
    >
      <div
        className="tc-inner"
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          borderColor: hovered ? `${tool.color}55` : tool.featured ? `${tool.color}33` : 'rgba(255,255,255,0.1)',
          boxShadow: hovered ? `0 22px 55px ${tool.color}25` : tool.featured ? `0 0 30px ${tool.color}14` : 'none',
          background: hovered ? 'rgba(255,255,255,0.08)' : tool.featured ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.045)',
        }}
      >
        <div className="tc-glow" style={{ background: `radial-gradient(circle at ${50 + (iconMouse.x * 22)}% ${50 - (iconMouse.y * 22)}%, ${tool.color}22, transparent 45%)`, opacity: hovered ? 1 : 0.55 }} />
        <div className="tct">{tool.tag}</div>
        <div className="tc-icon" style={{ transform: hovered ? 'translateZ(26px)' : 'translateZ(0px)' }}>
          <ToolIcon3D href={tool.href} color={tool.color} hovered={hovered} mouseX={iconMouse.x} mouseY={iconMouse.y} />
        </div>
        <div className="tc-copy" style={{ transform: hovered ? 'translateZ(18px)' : 'translateZ(0px)' }}>
          <div className="tch">{tool.name}</div>
          <div className="tcd">{tool.desc}</div>
          <div className="tca" style={{ color: tool.color }}>
            Open Tool <span className="tal" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('vis');
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));

    const onMouseMove = (event) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', onMouseMove);
    const onPageShow = (event) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener('pageshow', onPageShow);

    const onVisChange = () => {
      if (document.visibilityState === 'visible') {
        const canvas = document.getElementById('bgc');
        if (canvas && parseFloat(canvas.style.opacity || '0') < 0.5) {
          window.location.reload();
        }
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    const cursor = document.getElementById('cur');
    const ring = document.getElementById('cur-r');
    const prog = document.getElementById('prog');
    const nav = document.getElementById('nv');
    const sticky = document.getElementById('sticky-cta');
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    const onMouse = (event) => {
      cx = event.clientX;
      cy = event.clientY;
      if (cursor) {
        cursor.style.left = `${cx}px`;
        cursor.style.top = `${cy}px`;
      }
      document.documentElement.style.setProperty('--mx', `${cx}px`);
      document.documentElement.style.setProperty('--my', `${cy}px`);
    };
    document.addEventListener('mousemove', onMouse);
    let ringRaf = null;
    if (ring) {
      const tick = () => {
        rx += (cx - rx) * 0.1;
        ry += (cy - ry) * 0.1;
        ring.style.left = `${rx}px`;
        ring.style.top = `${ry}px`;
        ringRaf = requestAnimationFrame(tick);
      };
      tick();
    }

    const enter = () => document.body.classList.add('hov');
    const leave = () => document.body.classList.remove('hov');
    document.querySelectorAll('a,button,.fq').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
    document.querySelectorAll('.bp,.bg2,.nc').forEach((btn) => {
      btn.addEventListener('click', function (event) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,.22);transform:scale(0);animation:ripple .5s linear;left:${event.clientX - rect.left - 10}px;top:${event.clientY - rect.top - 10}px;width:20px;height:20px;pointer-events:none`;
        this.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 500);
      });
    });

    const onScroll = () => {
      if (prog) {
        const total = document.body.scrollHeight - window.innerHeight;
        prog.style.width = `${(window.scrollY / Math.max(total, 1)) * 100}%`;
      }
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
      if (sticky) {
        const show = window.scrollY > 500;
        sticky.style.opacity = show ? '1' : '0';
        sticky.style.pointerEvents = show ? 'all' : 'none';
      }
    };
    window.addEventListener('scroll', onScroll);

    const bgCanvas = document.getElementById('bgc');
    let animRafId = null;
    let bgRenderer = null;
    let bgCleanup = null;

    const initBG = () => {
      if (!bgCanvas) return null;
      if (bgRenderer) {
        try {
          bgRenderer.dispose();
        } catch {
          // noop
        }
        bgRenderer = null;
      }

      try {
        bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: true, alpha: true });
      } catch (error) {
        console.warn('Background WebGL init failed:', error);
        return null;
      }

      bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
      bgRenderer.toneMapping = THREE.NoToneMapping;

      bgCanvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        if (animRafId) {
          cancelAnimationFrame(animRafId);
          animRafId = null;
        }
        bgRenderer = null;
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 5000);
      camera.position.z = 70;

      const starCount = 6000;
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i += 1) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 150 + Math.random() * 1200;
        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);
        const warm = Math.random() > 0.35;
        if (warm) {
          starColors[i * 3] = 1;
          starColors[i * 3 + 1] = 0.87 + Math.random() * 0.1;
          starColors[i * 3 + 2] = Math.random() * 0.08;
        } else {
          const white = 0.4 + Math.random() * 0.6;
          starColors[i * 3] = white * 0.3;
          starColors[i * 3 + 1] = white * 0.4;
          starColors[i * 3 + 2] = white;
        }
      }
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
      const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ size: 1.2, vertexColors: true, transparent: true, opacity: 1.0 }));
      scene.add(stars);

      const orbGroup = new THREE.Group();
      orbGroup.position.set(0, 0, -120);
      scene.add(orbGroup);

      const wireframe = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(12, 1)),
        new THREE.LineBasicMaterial({ color: 0x00FFB2, transparent: true, opacity: 0.35 }),
      );
      orbGroup.add(wireframe);

      [[20, 0x00FFB2, 0.1, Math.PI / 3], [28, 0x4D96FF, 0.07, Math.PI / 5], [36, 0xC77DFF, 0.06, Math.PI / 7]].forEach(([radius, color, opacity, tilt]) => {
        const ringMesh = new THREE.Mesh(
          new THREE.TorusGeometry(radius, 0.08, 2, 100),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
        );
        ringMesh.rotation.x = tilt;
        orbGroup.add(ringMesh);
      });

      const dotObjs = [];
      [
        [20, 0x00FFB2, 0.5, 0.8, 0, Math.PI / 3],
        [20, 0x4D96FF, 0.4, 0.8, Math.PI, Math.PI / 3],
        [28, 0xC77DFF, 0.4, 0.5, 0, Math.PI / 5],
        [28, 0xFF6B6B, 0.35, 0.5, Math.PI * 1.3, Math.PI / 5],
        [36, 0xFFD93D, 0.32, 0.35, 0, Math.PI / 7],
        [36, 0xFF9A3C, 0.28, 0.35, Math.PI * 0.7, Math.PI / 7],
      ].forEach(([radius, color, size, speed, angle, tilt]) => {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
        orbGroup.add(dot);
        dotObjs.push({ mesh: dot, r: radius, speed, angle, tilt });
      });

      const shapes = [];
      [
        [new THREE.OctahedronGeometry(5, 0), 0xFFE500, 0.5, [-65, 18, -25]],
        [new THREE.IcosahedronGeometry(4, 0), 0x1a2050, 0.22, [58, -18, -12]],
        [new THREE.TetrahedronGeometry(3.5, 0), 0x101040, 0.16, [-28, -28, 8]],
        [new THREE.OctahedronGeometry(3, 0), 0xFFE500, 0.18, [75, 32, -35]],
        [new THREE.IcosahedronGeometry(2, 0), 0xFFE500, 0.12, [-80, -10, 10]],
        [new THREE.BoxGeometry(4, 4, 4), 0x4D96FF, 0.15, [40, 25, -20]],
      ].forEach(([geometry, color, opacity, position]) => {
        const mesh = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
        mesh.position.set(...position);
        scene.add(mesh);
        shapes.push(mesh);
      });

      function mkGrid(zStart, step, count, color, opacity) {
        const group = [];
        for (let i = 0; i < count; i += 1) {
          const gridGroup = new THREE.Group();
          const size = 220;
          const divisions = 24;
          const stepSize = size / divisions;
          const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
          for (let j = 0; j <= divisions; j += 1) {
            const x = j * stepSize - size / 2;
            gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, -100, 0), new THREE.Vector3(x, 100, 0)]), material));
            gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-100, x, 0), new THREE.Vector3(100, x, 0)]), material));
          }
          gridGroup.rotation.x = Math.PI / 2;
          gridGroup.position.y = -50;
          gridGroup.position.z = zStart - (i * step);
          scene.add(gridGroup);
          group.push(gridGroup);
        }
        return group;
      }

      const g1 = mkGrid(30, 32, 20, 0x0d0d1e, 0.55);
      const g2 = mkGrid(10, 64, 10, 0x131325, 0.32);
      const g3 = mkGrid(20, 100, 8, 0x0a0a18, 0.18);

      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      const light = new THREE.PointLight(0x00FFB2, 2.5, 200);
      light.position.set(0, 0, 30);
      scene.add(light);

      let mouseX = 0;
      let mouseY = 0;
      let scrollY = 0;
      let targetScrollY = 0;
      let time = 0;

      const onMouseBG = (event) => {
        mouseX = ((event.clientX / window.innerWidth) - 0.5) * 2;
        mouseY = ((event.clientY / window.innerHeight) - 0.5) * 2;
      };
      const onOrient = (event) => {
        if (event.gamma !== null && event.beta !== null) {
          mouseX = Math.max(-1, Math.min(1, (event.gamma || 0) / 30));
          mouseY = Math.max(-1, Math.min(1, ((event.beta || 0) - 20) / 40));
        }
      };
      const onScrollBG = () => {
        targetScrollY = window.scrollY;
      };
      document.addEventListener('mousemove', onMouseBG);
      window.addEventListener('deviceorientation', onOrient);
      window.addEventListener('scroll', onScrollBG);

      const animate = () => {
        if (!bgRenderer) {
          animRafId = null;
          return;
        }
        animRafId = requestAnimationFrame(animate);
        time += 0.002;
        scrollY += (targetScrollY - scrollY) * 0.04;
        const scrollRatio = scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

        stars.rotation.y = (time * 0.012) + (scrollRatio * 0.5);
        stars.rotation.x = (time * 0.005) + (scrollRatio * 0.2);
        stars.position.z += ((scrollRatio * 80) - stars.position.z) * 0.06;

        camera.position.x += ((mouseX * 8) - camera.position.x) * 0.032;
        camera.position.y += ((-mouseY * 8) - camera.position.y) * 0.032;
        camera.position.z = 70 - (scrollRatio * 180);
        camera.lookAt(0, 0, camera.position.z - 80);

        wireframe.rotation.x = time * 0.3;
        wireframe.rotation.y = time * 0.45;
        dotObjs.forEach((dot) => {
          dot.angle += dot.speed * 0.012;
          dot.mesh.position.x = Math.cos(dot.angle) * dot.r;
          dot.mesh.position.y = Math.sin(dot.angle) * dot.r * Math.cos(dot.tilt);
          dot.mesh.position.z = Math.sin(dot.angle) * dot.r * Math.sin(dot.tilt);
        });
        shapes.forEach((shape, index) => {
          shape.rotation.x = (time * (0.15 + (index * 0.04))) + (scrollRatio * 0.4);
          shape.rotation.y = (time * (0.1 + (index * 0.06))) + (scrollRatio * 0.3);
          shape.position.y += Math.sin(time * (0.3 + (index * 0.08))) * 0.018;
          shape.position.x += ((mouseX * 6) - shape.position.x) * 0.003;
        });

        light.position.x = mouseX * 40;
        light.position.y = mouseY * 40;

        const speed = 0.5 + (scrollRatio * 2.5);
        g1.forEach((grid) => {
          grid.position.z += speed;
          if (grid.position.z > 45) grid.position.z -= g1.length * 32;
        });
        g2.forEach((grid) => {
          grid.position.z += speed * 0.55;
          if (grid.position.z > 30) grid.position.z -= g2.length * 64;
        });
        g3.forEach((grid) => {
          grid.position.z += speed * 0.28;
          if (grid.position.z > 40) grid.position.z -= g3.length * 100;
        });

        try {
          bgRenderer.render(scene, camera);
        } catch {
          animRafId = null;
        }
      };
      animate();

      const onResize = () => {
        if (!bgRenderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      window.setTimeout(() => {
        const canvas = document.getElementById('bgc');
        if (canvas) canvas.style.opacity = '1';
      }, 150);

      return () => {
        document.removeEventListener('mousemove', onMouseBG);
        window.removeEventListener('deviceorientation', onOrient);
        window.removeEventListener('scroll', onScrollBG);
        window.removeEventListener('resize', onResize);
      };
    };

    bgCleanup = initBG();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisChange);
      document.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      if (ringRaf) cancelAnimationFrame(ringRaf);
      if (animRafId) cancelAnimationFrame(animRafId);
      if (bgRenderer) {
        try {
          bgRenderer.dispose();
        } catch {
          // noop
        }
      }
      if (bgCleanup) bgCleanup();
    };
  }, []);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
    :root{--bg:#060609;--line:rgba(255,255,255,.1);--muted:#8b94a2;--text:#f8fafc;--g:#00FFB2;--y:#FFE500;--mx:50vw;--my:50vh}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:'Inter',sans-serif}
    body{background:
      radial-gradient(circle at 10% 8%, rgba(0,255,178,.11), transparent 18%),
      radial-gradient(circle at 88% 12%, rgba(77,150,255,.13), transparent 18%),
      radial-gradient(circle at 50% 100%, rgba(199,125,255,.08), transparent 22%),
      linear-gradient(180deg,#050507 0%,#060609 34%,#0b1020 100%);
      overflow-x:hidden;
      cursor:none;
    }
    body.hov #cur{width:16px;height:16px}
    body.hov #cur-r{width:50px;height:50px;border-color:rgba(0,255,178,.65)}
    .desk{display:block}
    .mob{display:none}
    #cur{position:fixed;width:8px;height:8px;background:var(--g);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .15s,height .15s}
    #cur-r{position:fixed;width:30px;height:30px;border:1.5px solid rgba(0,255,178,.28);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .25s,height .25s,border-color .25s}
    @media(max-width:768px){body{cursor:auto}#cur,#cur-r{display:none}}
    #bgc{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;opacity:0;transition:opacity 2s ease}
    .bgfx{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
    .gridbg{position:absolute;inset:0;opacity:.18;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at center, black 40%, transparent 92%)}
    .orb{position:absolute;border-radius:999px;filter:blur(26px);opacity:.48;animation:drift 12s ease-in-out infinite}
    .orb.a{width:360px;height:360px;background:radial-gradient(circle,#00FFB233,transparent 68%);top:-70px;left:-60px}
    .orb.b{width:420px;height:420px;background:radial-gradient(circle,#4D96FF2c,transparent 68%);top:180px;right:-120px;animation-delay:2s}
    .orb.c{width:400px;height:400px;background:radial-gradient(circle,#FF6B6B26,transparent 68%);bottom:-120px;left:35%;animation-delay:4s}
    .noise{position:absolute;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
    .spotlight{position:fixed;inset:0;pointer-events:none;z-index:1;background:radial-gradient(500px circle at var(--mx,50vw) var(--my,50vh),rgba(0,255,178,0.055),transparent 65%)}
    @media(max-width:768px){.spotlight{display:none}}
    #prog{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--g),var(--y),#ff6b35);z-index:1000;width:0;box-shadow:0 0 18px rgba(245,230,66,.7)}
    #sticky-cta{position:fixed;bottom:22px;right:22px;z-index:500;opacity:0;transition:opacity .4s;pointer-events:none}
    #sticky-cta a{display:flex;align-items:center;gap:7px;background:var(--g);color:#000;padding:10px 20px;border-radius:999px;font-weight:700;font-size:12px;text-decoration:none;box-shadow:0 6px 24px rgba(0,255,178,.35);transition:transform .2s}
    #sticky-cta a:hover{transform:translateY(-2px)}
    @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    @keyframes drift{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(18px,-24px,0)}100%{transform:translate3d(0,0,0)}}
    @keyframes ripple{to{transform:scale(20);opacity:0}}
    .home{min-height:100vh;position:relative;background:transparent}
    .wrap{position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 24px 80px}
    .nav{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;height:76px;background:linear-gradient(180deg,rgba(6,6,9,.94),rgba(6,6,9,.78),transparent);backdrop-filter:blur(10px)}
    .nav.scrolled{background:rgba(6,6,9,.9);backdrop-filter:blur(28px);border-bottom:1px solid rgba(255,255,255,.04)}
    .logo{font-family:'Bebas Neue',sans-serif;font-size:34px;letter-spacing:1px;color:#fff;text-decoration:none}
    .logo em{color:var(--g);font-style:normal}
    .nav-right{display:flex;align-items:center;gap:14px}
    .nav-pill{padding:8px 14px;border-radius:999px;border:1px solid rgba(0,255,178,.24);background:rgba(0,255,178,.08);color:var(--g);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:700}
    .nav-link{color:#e5e7eb;font-size:14px;opacity:.86;text-decoration:none}
    .hero{padding:72px 0 36px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(420px,.95fr);gap:32px;align-items:center}
    .hero-copy{max-width:640px}
    .eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.42);margin-bottom:16px}
    .hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(72px,8vw,132px);line-height:.86;letter-spacing:1px;color:#fff;margin:0 0 18px}
    .hero-title .green{color:var(--g)}
    .hero-desc{font-size:18px;line-height:1.9;color:#9aa4b2;max-width:560px;margin-bottom:28px}
    .hero-actions{display:flex;gap:14px;flex-wrap:wrap}
    .cta{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:0 22px;border-radius:16px;font-size:14px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;text-decoration:none}
    .cta.primary{background:linear-gradient(135deg,var(--g),#7fffd8);color:#031611;box-shadow:0 10px 28px rgba(0,255,178,.14)}
    .cta.secondary{background:rgba(255,255,255,.05);border:1px solid var(--line);color:#fff}
    .hero-panel{display:grid;gap:14px}
    .hp-card{padding:20px;border-radius:22px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08)}
    .hp-top{display:flex;justify-content:space-between;gap:16px;align-items:center}
    .hp-title{font-size:22px;font-weight:700;color:#fff}
    .hp-copy{font-size:14px;line-height:1.8;color:#9aa4b2;margin-top:6px}
    .hp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
    .mini{padding:16px;border-radius:18px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.07)}
    .mini strong{display:block;font-size:28px;font-family:'Bebas Neue',sans-serif;color:#fff;line-height:1}
    .mini span{display:block;margin-top:6px;color:#8b94a2;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase}
    .section{padding:40px 0;scroll-margin-top:80px}
    .section-head{display:flex;justify-content:space-between;align-items:end;gap:18px;margin-bottom:22px}
    .section-copy{max-width:560px}
    .sh{font-family:'Bebas Neue',sans-serif;font-size:58px;line-height:.88;color:#fff;margin:0 0 8px;letter-spacing:1px}
    .sp{font-size:15px;line-height:1.8;color:#8b94a2}
    .tools-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
    .tc{display:block;perspective:1000px;text-decoration:none}
    .tc-inner{position:relative;height:100%;min-height:260px;border-radius:24px;padding:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(12px);transform-style:preserve-3d;transition:transform .12s,border-color .2s,box-shadow .2s,background .2s}
    .tc-feat .tc-inner{min-height:286px}
    .tc-glow{position:absolute;inset:0;border-radius:24px;pointer-events:none;transition:opacity .25s}
    .tct{display:inline-flex;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.06);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:#8b94a2}
    .tc-icon{position:relative;width:78px;height:78px;margin:18px 0 14px;transition:transform .18s}
    .tc-copy{transition:transform .18s}
    .tch{font-size:22px;font-weight:700;color:#fff;line-height:1.12;margin-bottom:8px}
    .tcd{font-size:14px;line-height:1.75;color:#8b94a2}
    .tca{margin-top:18px;display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:700}
    .tal{display:inline-block;width:18px;height:1px;background:currentColor}
    .aud-grid,.feature-grid,.support-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px}
    .feature-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    .support-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
    .aud-card,.fc,.sc2,.cmp-row{padding:22px;border-radius:22px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.08)}
    .aud-icon,.fc-icon,.sc2-icon{width:64px;height:64px;margin-bottom:16px}
    .aud-title,.fc-title,.sct{font-size:22px;font-weight:700;margin-bottom:8px}
    .aud-desc,.fc-desc,.scd{font-size:14px;line-height:1.8;color:#8b94a2}
    .scl{display:inline-block;margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
    .compare{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
    .cmp-row{padding:18px}
    .cmp-row strong{display:block;font-size:14px;color:#fff;margin-bottom:12px}
    .cmp-us{display:block;font-size:20px;font-weight:800;color:var(--g);margin-bottom:6px}
    .cmp-them{display:block;font-size:13px;color:#8b94a2}
    .cta-box{padding:32px;border-radius:28px;background:linear-gradient(135deg,rgba(0,255,178,.1),rgba(255,229,0,.03) 56%,rgba(77,150,255,.08));border:1px solid rgba(0,255,178,.18)}
    .cta-kicker{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(0,255,178,.76);margin-bottom:12px}
    .cta-title{font-family:'Bebas Neue',sans-serif;font-size:72px;line-height:.86;color:#fff;margin:0 0 12px}
    .cta-title span{color:var(--g)}
    .footer{padding:34px 0 24px;border-top:1px solid rgba(255,255,255,.06);margin-top:20px}
    .footer-top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px}
    .footer-legal{display:flex;gap:20px;flex-wrap:wrap;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.05);align-items:center;justify-content:space-between}
    .footer-legal-links{display:flex;gap:16px}
    .footer-legal a{color:#475569;text-decoration:none;font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.04em;transition:color .2s}
    .footer-legal a:hover{color:#94a3b8}
    .footer-legal-copy{font-size:12px;color:#334155;font-family:'JetBrains Mono',monospace}
    .footer-brand{font-family:'Bebas Neue',sans-serif;font-size:36px;color:#fff}
    .footer-brand em{color:var(--g);font-style:normal}
    .footer-copy{font-size:14px;line-height:1.8;color:#8b94a2;margin-top:8px}
    .footer-links{display:flex;gap:16px;flex-wrap:wrap;margin-top:18px}
    .footer-links a{color:#cbd5e1;text-decoration:none;font-size:14px}
    .reveal{opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
    .reveal.vis{opacity:1;transform:none}
    @media (max-width:1200px){
      .hero{grid-template-columns:minmax(0,1fr) minmax(360px,.92fr);gap:24px}
      .tools-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
      .aud-grid,.support-grid,.compare{grid-template-columns:repeat(2,minmax(0,1fr))}
      .feature-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    }
    @media (max-width:1024px){
      .wrap{padding:0 20px 72px}
      .nav{height:auto;padding:18px 0;align-items:flex-start}
      .nav-right{flex-wrap:wrap;justify-content:flex-end}
      .hero{padding:56px 0 28px;grid-template-columns:minmax(0,1fr)}
      .hero-copy,.section-copy{max-width:none}
      .hero-title{font-size:clamp(58px,10vw,96px)}
      .hero-desc{max-width:none;font-size:16px;line-height:1.75}
      .section{padding:32px 0}
      .sh{font-size:48px}
      .cta-title{font-size:56px}
    }
    @media (max-width:768px){
      .desk{display:none}
      .mob{display:block}
    }
    @media (max-width:640px){
      .nav-right{gap:10px}
      .nav-pill{display:none}
      .footer-legal{flex-direction:column;align-items:flex-start;gap:8px}
      .tools-grid,.aud-grid,.feature-grid,.support-grid,.compare,.hp-grid{grid-template-columns:minmax(0,1fr)}
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="mob">
        <MobileHome />
      </div>
      <div className="desk">
        <SharedRendererProvider>
          <div className="home">
            <div id="cur" />
            <div id="cur-r" />
            <div id="prog" />
            <canvas id="bgc" style={{ opacity: 0 }} />
            <div id="sticky-cta"><a href="#tools">Try Free Tools ⚡</a></div>
            <div className="bgfx">
              <div className="gridbg" />
              <div className="orb a" />
              <div className="orb b" />
              <div className="orb c" />
              <div className="noise" />
            </div>
            <div className="spotlight" />
            <div className="wrap">
              <nav id="nv" className="nav">
                <Link href="/" className="m-logo"><em>Tool</em> Void</Link>
                <div className="nav-right">
                  <div className="nav-pill">20 Free Tools</div>
                  <a className="nav-link" href="#tools">Tools</a>
                  <a className="nav-link" href="#features">Why Us</a>
                  <a className="nav-link" href="#support">Support</a>
                </div>
              </nav>

              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow">Daily AI Credits. Browser First.</div>
                  <h1 className="hero-title">Free Tools For <span className="green">Creators</span> And Builders</h1>
                  <p className="hero-desc">
                    TooL Void brings together fast, privacy-friendly utilities for content, PDFs, finance, media, and developer workflows.
                    Open a tool, drop your input, and get results without friction.
                  </p>
                  <div className="hero-actions">
                    <a href="#tools" className="cta primary">Explore Tools</a>
                    <a href="#compare" className="cta secondary">Why TooL Void</a>
                  </div>
                </div>

                <div className="hero-panel reveal vis">
                  <div className="hp-card">
                    <div className="hp-top">
                      <div>
                        <div className="hp-title">Instant Utility Stack</div>
                        <div className="hp-copy">AI, PDFs, image tools, JSON, QR, password generation, finance helpers and more in one clean browser workspace.</div>
                      </div>
                    </div>
                  </div>
                  <div className="hp-grid">
                    <div className="mini">
                      <strong>20</strong>
                      <span>Live Utilities</span>
                    </div>
                    <div className="mini">
                      <strong>₹0</strong>
                      <span>Free Forever</span>
                    </div>
                    <div className="mini">
                      <strong>Local</strong>
                      <span>Privacy Friendly</span>
                    </div>
                    <div className="mini">
                      <strong>Fast</strong>
                      <span>Built For Speed</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="section" id="tools">
                <div className="section-head">
                  <div className="section-copy">
                    <h2 className="sh">Popular Tools</h2>
                    <div className="sp">Launch the tools people keep coming back to, from AI workflows to PDF, image and developer utilities.</div>
                  </div>
                </div>
                <div className="tools-grid">
                  {tools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
                </div>
              </section>

              <section className="section">
                <div className="section-head">
                  <div className="section-copy">
                    <h2 className="sh">Built For Real People</h2>
                    <div className="sp">Every tool is designed to remove friction for everyday internet work.</div>
                  </div>
                </div>
                <div className="aud-grid">
                  {audiences.map((a) => <AudienceCard key={a.title} a={a} />)}
                </div>
              </section>

              <section className="section" id="features">
                <div className="section-head">
                  <div className="section-copy">
                    <h2 className="sh">Why TooL Void</h2>
                    <div className="sp">Fast loading, low friction, modern design and practical tools that feel useful on day one.</div>
                  </div>
                </div>
                <div className="feature-grid">
                  {features.map((f) => <FeatureCard key={f.t} f={f} />)}
                </div>
              </section>

              <section className="section" id="compare">
                <div className="section-head">
                  <div className="section-copy">
                    <h2 className="sh">Simple Comparison</h2>
                    <div className="sp">The difference is less about hype and more about actually getting work done quickly.</div>
                  </div>
                </div>
                <div className="compare">
                  {comparisons.map((c) => (
                    <div key={c.feature} className="cmp-row reveal">
                      <strong>{c.feature}</strong>
                      <span className="cmp-us">{c.us}</span>
                      <span className="cmp-them">{c.them}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="section" id="support">
                <div className="section-head">
                  <div className="section-copy">
                    <h2 className="sh">Support Paths</h2>
                    <div className="sp">If something breaks or feels missing, there should be a clean next step.</div>
                  </div>
                </div>
                <div className="support-grid">
                  {supports.map((s) => <SupportCard key={s.t} s={s} />)}
                </div>
              </section>

              <section className="section">
                <div className="cta-box reveal">
                  <div className="cta-kicker">Ready To Start?</div>
                  <h2 className="cta-title">Open A Tool And <span>Get Moving</span></h2>
                  <div className="sp">Fast browser tools, fair daily AI access, and no setup maze for everyday workflows.</div>
                  <div className="hero-actions" style={{ marginTop: 20 }}>
                    <a href="#tools" className="cta primary">Try Free Tools</a>
                    <Link href="/pdf" className="cta secondary">Open PDF Tool</Link>
                  </div>
                </div>
              </section>

              <footer className="footer reveal">
                <div className="footer-top">
                  <div className="footer-brand"><em>Tool</em>Void</div>
                </div>
                <div className="footer-copy">A growing set of free browser tools for creators, developers, students and freelancers.</div>
                <div className="footer-links">
                  <Link href="/story">Story</Link>
                  <Link href="/imagegen">Image Gen</Link>
                  <Link href="/pdf">PDF</Link>
                  <Link href="/qr">QR</Link>
                  <Link href="/json">JSON</Link>
                  <Link href="/resume">Resume</Link>
                </div>
                <div className="footer-legal">
                  <div className="footer-legal-links">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                  </div>
                  <div className="footer-legal-copy">© 2026 ToolVoid. All rights reserved.</div>
                </div>
              </footer>
            </div>
          </div>
        </SharedRendererProvider>
      </div>
    </>
  );
}
