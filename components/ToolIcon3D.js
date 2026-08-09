'use client';
import { useEffect, useRef } from 'react';

// ── Color map for all tools ──
const TOOL_COLORS = {
  '/story':'#A78BFA','/story-generator':'#A78BFA','/hashtag':'#FF6B6B','/imagegen':'#F59E0B','/keyword':'#34D399',
  '/image-tools':'#FFD93D','/pdf':'#FF9A3C','/passport':'#60A5FA','/qr':'#00FFB2',
  '/password':'#F472B6','/domain':'#00C9FF','/unit':'#6BCB77','/base64':'#C77DFF',
  '/emi':'#FB923C','/loan':'#E879F9','/invoice':'#38BDF8','/word-counter':'#4D96FF',
  '/json':'#86EFAC','/tts':'#4D96FF','/video':'#FF4ECD','/resume':'#FF6B6B',
  '/capsule-manager':'#a78bfa',
  '/site-maker':'#22D3EE',
  '/resize':'#FFD93D','/compress':'#6BCB77','/convert':'#C77DFF',
};

// ── 2D Canvas drawing for each tool ──────────────────────
function drawToolIcon2D(ctx, href, cx, cy, s, t, hov, color) {
  ctx.save();
  ctx.translate(cx, cy);

  // Bob/float effect
  const bob = Math.sin(t * (hov ? 3 : 1.5)) * 2;
  ctx.translate(0, bob);

  // Slow 2D "pseudo-3D" skew on hover
  if (hov) {
    ctx.transform(1, Math.sin(t * 0.8) * 0.04, Math.sin(t * 0.6) * 0.06, 1, 0, 0);
  }

  ctx.shadowColor = color;
  ctx.shadowBlur = hov ? 18 : 8;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (href === '/qr') {
    [[-18,-18],[8,-18],[-18,8]].forEach(([x,y]) => {
      ctx.strokeRect(x,y,14,14);
      ctx.fillRect(x+4,y+4,6,6);
    });
    [[2,2],[10,2],[2,10],[18,18],[-2,18]].forEach(([x,y]) => ctx.fillRect(x,y,4,4));

  } else if (href === '/hashtag') {
    [-10,10].forEach(x => { ctx.beginPath(); ctx.moveTo(x,-18); ctx.lineTo(x-4,18); ctx.stroke(); });
    [-8,8].forEach(y => { ctx.beginPath(); ctx.moveTo(-18,y); ctx.lineTo(18,y-4); ctx.stroke(); });

  } else if (href === '/image-tools') {
    ctx.globalAlpha=0.35; ctx.strokeRect(-16,-12,26,20);
    ctx.globalAlpha=0.65; ctx.strokeRect(-10,-8,26,20);
    ctx.globalAlpha=1;    ctx.strokeRect(-4,-4,26,20);
    ctx.beginPath(); ctx.moveTo(-2,8); ctx.lineTo(4,2); ctx.lineTo(10,9); ctx.lineTo(14,5); ctx.lineTo(19,13); ctx.stroke();
    ctx.beginPath(); ctx.arc(14,0,3.5,0,Math.PI*2); ctx.fill();

  } else if (href === '/compress') {
    ctx.strokeRect(-16,-16,32,32);
    ctx.beginPath(); ctx.moveTo(0,-20); ctx.lineTo(0,20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6,-10); ctx.lineTo(0,-18); ctx.lineTo(6,-10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-6,10); ctx.lineTo(0,18); ctx.lineTo(6,10); ctx.stroke();

  } else if (href === '/tts') {
    ctx.beginPath(); ctx.roundRect(-9,-16,18,24,8); ctx.fill();
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(0,8); ctx.lineTo(0,18); ctx.stroke();
    [14,20].forEach(r => {
      ctx.beginPath(); ctx.arc(0,-4,r,-0.8,0.8); ctx.stroke();
      ctx.beginPath(); ctx.arc(0,-4,r,Math.PI-0.8,Math.PI+0.8); ctx.stroke();
    });

  } else if (href === '/pdf') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    [-8,-2,4,10].forEach(y => { ctx.beginPath(); ctx.moveTo(-8,y); ctx.lineTo(8,y); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(0,18); ctx.lineTo(0,26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5,22); ctx.lineTo(0,28); ctx.lineTo(5,22); ctx.stroke();

  } else if (href === '/domain') {
    ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0,0,18,8,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18,0); ctx.lineTo(18,0); ctx.stroke();
    ctx.beginPath(); ctx.arc(12,12,8,0,Math.PI*2); ctx.stroke();
    ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(18,18); ctx.lineTo(24,24); ctx.stroke();

  } else if (href === '/resume') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.fillRect(-10,-12,8,10);
    [-2,4,10].forEach(y => { ctx.beginPath(); ctx.moveTo(2,y-10); ctx.lineTo(10,y-10); ctx.stroke(); });
    [-4,2,8,14].forEach(y => { ctx.beginPath(); ctx.moveTo(-10,y-12); ctx.lineTo(10,y-12); ctx.stroke(); });

  } else if (href === '/capsule-manager') {
    ctx.lineWidth=2.8;
    ctx.beginPath(); ctx.roundRect(-20,-8,40,16,8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-8); ctx.lineTo(0,8); ctx.stroke();
    ctx.globalAlpha=0.45;
    ctx.beginPath(); ctx.roundRect(-12,-21,24,8,4); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-12,13,24,8,4); ctx.stroke();
    ctx.globalAlpha=1;
    ctx.fillStyle=color;
    ctx.beginPath(); ctx.arc(-9,0,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(9,0,3,0,Math.PI*2); ctx.fill();

  } else if (href === '/video') {
    ctx.beginPath(); ctx.arc(0,0,18,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4,-9); ctx.lineTo(11,0); ctx.lineTo(-4,9); ctx.closePath(); ctx.fill();

  } else if (href === '/story' || href === '/story-generator') {
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.roundRect(-18,-14,14,28,3); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(4,-14,14,28,3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0,-14); ctx.lineTo(0,14); ctx.stroke();
    // Star spark
    ctx.fillStyle='#ffffff'; ctx.globalAlpha=0.8;
    ctx.beginPath(); ctx.moveTo(14,-20); ctx.lineTo(16,-12); ctx.lineTo(24,-10); ctx.lineTo(16,-8); ctx.lineTo(14,0); ctx.lineTo(12,-8); ctx.lineTo(4,-10); ctx.lineTo(12,-12); ctx.closePath(); ctx.fill();
    ctx.globalAlpha=1; ctx.fillStyle=color;

  } else if (href === '/keyword') {
    ctx.beginPath(); ctx.arc(-4,-4,13,0,Math.PI*2); ctx.stroke();
    ctx.lineWidth=3.5; ctx.beginPath(); ctx.moveTo(6,6); ctx.lineTo(20,20); ctx.stroke();
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-9,-4); ctx.lineTo(1,-4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-4,-9); ctx.lineTo(-4,1); ctx.stroke();

  } else if (href === '/imagegen') {
    ctx.beginPath(); ctx.roundRect(-18,-18,36,36,6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-12,10); ctx.lineTo(-2,-2); ctx.lineTo(6,8); ctx.lineTo(12,-4); ctx.stroke();
    ctx.beginPath(); ctx.arc(8,-8,4.5,0,Math.PI*2); ctx.fill();
    // Sparkle
    ctx.lineWidth=1.5; ctx.fillStyle='#ffffff'; ctx.globalAlpha=0.6;
    ctx.beginPath(); ctx.moveTo(-14,-24); ctx.lineTo(-13,-20); ctx.lineTo(-10,-19); ctx.lineTo(-13,-18); ctx.lineTo(-14,-14); ctx.lineTo(-15,-18); ctx.lineTo(-18,-19); ctx.lineTo(-15,-20); ctx.closePath(); ctx.fill();
    ctx.globalAlpha=1; ctx.fillStyle=color;

  } else if (href === '/passport') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.beginPath(); ctx.arc(0,-4,6,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-8,4,16,10,4); ctx.stroke();
    [[-14,-18],[14,-18],[-14,18],[14,18]].forEach(([x,y]) => { ctx.fillRect(x-2,y-2,4,4); });

  } else if (href === '/password') {
    ctx.beginPath(); ctx.roundRect(-12,0,24,18,4); ctx.fill();
    ctx.lineWidth=3.5; ctx.beginPath(); ctx.arc(0,-2,10,Math.PI,0); ctx.stroke();
    ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.arc(0,10,3,0,Math.PI*2); ctx.fill();
    ctx.fillRect(-1.5,10,3,6);
    ctx.fillStyle=color;
    [-8,0,8].forEach(x => { ctx.beginPath(); ctx.arc(x,20,2.5,0,Math.PI*2); ctx.fill(); });

  } else if (href === '/unit') {
    ctx.beginPath(); ctx.roundRect(-18,-6,36,12,3); ctx.fill();
    ctx.fillStyle='rgba(0,0,0,0.3)';
    [-12,-6,0,6,12].forEach(x => { ctx.fillRect(x-0.5,-6,1,x===0?8:5); });
    ctx.fillStyle=color;
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-22,-14); ctx.lineTo(-18,-18); ctx.lineTo(-14,-14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(22,14); ctx.lineTo(18,18); ctx.lineTo(14,14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-18,-14); ctx.lineTo(18,14); ctx.stroke();

  } else if (href === '/base64') {
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-18,20); ctx.lineTo(-22,0); ctx.lineTo(-18,-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18,20); ctx.lineTo(22,0); ctx.lineTo(18,-20); ctx.stroke();
    [[-6,0],[0,0],[6,0],[-6,-10],[6,-10],[-6,10],[6,10]].forEach(([x,y]) => {
      ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2); ctx.fill();
    });

  } else if (href === '/emi') {
    ctx.beginPath(); ctx.roundRect(-16,-18,32,36,4); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-12,-14,24,10,2); ctx.stroke();
    [[14,0.1,-0.28],[17,0.17,-0.1],[14,0.14,0.08],[22,0.22,0.26]].forEach(([h,hh,x]) => {
      ctx.fillRect(x*10-5,4-h,10,h);
    });
    ctx.fillStyle='#22c55e';
    ctx.fillRect(12,4,10,22);

  } else if (href === '/loan') {
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-18,8); ctx.lineTo(0,-16); ctx.lineTo(18,8); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-12,8,24,12,2); ctx.stroke();
    ctx.beginPath(); ctx.roundRect(-4,8,8,12,2); ctx.stroke();
    ctx.fillStyle='#22c55e'; ctx.beginPath(); ctx.arc(14,-14,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.5; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(10,-14); ctx.lineTo(13,-11); ctx.lineTo(18,-17); ctx.stroke();
    ctx.globalAlpha=1;

  } else if (href === '/invoice') {
    ctx.beginPath(); ctx.roundRect(-14,-18,28,36,4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-18); ctx.lineTo(14,-10); ctx.lineTo(6,-10); ctx.closePath(); ctx.stroke();
    ctx.lineWidth=2;
    [-6,-1,6,12].forEach(y => { ctx.beginPath(); ctx.moveTo(-8,y); ctx.lineTo(8,y); ctx.stroke(); });
    ctx.fillStyle='#22c55e'; ctx.beginPath(); ctx.arc(-8,-10,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.globalAlpha=0.6;
    ctx.font='bold 6px sans-serif'; ctx.textAlign='center'; ctx.fillText('₹',-8,-8);
    ctx.globalAlpha=1;

  } else if (href === '/word-counter') {
    ctx.lineWidth=2.2;
    [-14,-7,0,7,14].forEach((y,i) => {
      const w=[24,20,22,18,14][i];
      ctx.beginPath(); ctx.moveTo(-w/2,y); ctx.lineTo(w/2,y); ctx.stroke();
    });
    ctx.fillStyle='#4D96FF'; ctx.beginPath(); ctx.arc(14,14,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#fff'; ctx.globalAlpha=0.85;
    ctx.font='bold 7px sans-serif'; ctx.textAlign='center'; ctx.fillText('Aa',14,17);
    ctx.globalAlpha=1;

  } else if (href === '/json') {
    ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(-16,-20); ctx.lineTo(-20,0); ctx.lineTo(-16,20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16,-20); ctx.lineTo(20,0); ctx.lineTo(16,20); ctx.stroke();
    [-6,0,6].forEach(y => { ctx.beginPath(); ctx.arc(0,y,2.5,0,Math.PI*2); ctx.fill(); });

  } else {
    // fallback
    ctx.beginPath(); ctx.arc(0,0,16,0,Math.PI*2); ctx.stroke();
    ctx.fillRect(-5,-5,10,10);
  }

  ctx.restore();
}

// ── Tool Icon Component (pure 2D, no WebGL) ──────────────
export default function ToolIcon3D({ href, hovered, mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(hovered);
  const mouseRef = useRef({ x: mouseX || 0, y: mouseY || 0 });

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);
  useEffect(() => { mouseRef.current = { x: mouseX || 0, y: mouseY || 0 }; }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const color = TOOL_COLORS[href] || '#00FFB2';
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 72 * dpr;
    canvas.height = 72 * dpr;
    canvas.style.width = '72px';
    canvas.style.height = '72px';
    ctx.scale(dpr, dpr);

    let t = 0;
    let raf = null;
    const loop = () => {
      t += 0.022;
      ctx.clearRect(0, 0, 72, 72);
      drawToolIcon2D(ctx, href, 36, 36, 72, t, hoveredRef.current, color);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [href]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block', borderRadius: '14px', width: '72px', height: '72px',
        transition: 'filter .3s',
        filter: hovered ? 'drop-shadow(0 0 14px rgba(255,255,255,0.35))' : 'none',
        pointerEvents: 'none', touchAction: 'none',
      }}
    />
  );
}

// ── Canvas 2D base ────────────────────────────────────────
function Icon2D({ draw, size, hovered, color }) {
  const ref = useRef(null);
  const state = useRef({ hovered: false, t: 0, raf: null });
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const currentState = state.current;
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    const loop = () => {
      currentState.t += 0.022;
      ctx.clearRect(0,0,size,size);
      draw(ctx,size/2,size/2,size,currentState.t,currentState.hovered,color);
      currentState.raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(currentState.raf);
  }, [color, draw, size]);
  useEffect(() => { state.current.hovered = hovered; }, [hovered]);
  return (
    <canvas ref={ref} width={size} height={size}
      style={{ display:'block', width:`${size}px`, height:`${size}px`, borderRadius:'12px',
        transition:'filter .3s', filter: hovered ? `drop-shadow(0 0 10px ${color}cc)` : 'none',
        pointerEvents:'none', touchAction:'none' }} />
  );
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

// SharedRendererProvider - kept as no-op for backward compatibility
export function SharedRendererProvider({ children }) { return children; }
