'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SIZES = [
  { label: 'India Passport',  w: 35, h: 45, cat: 'India',         color: '#00C9FF' },
  { label: 'India Visa',      w: 51, h: 51, cat: 'India',         color: '#4D96FF' },
  { label: 'India PAN Card',  w: 25, h: 35, cat: 'India',         color: '#6BCB77' },
  { label: 'India Aadhar',    w: 35, h: 35, cat: 'India',         color: '#FFD93D' },
  { label: 'US Passport',     w: 51, h: 51, cat: 'International', color: '#C77DFF' },
  { label: 'UK Passport',     w: 35, h: 45, cat: 'International', color: '#FF6B6B' },
  { label: 'EU Passport',     w: 35, h: 45, cat: 'International', color: '#FF9A3C' },
  { label: 'Schengen Visa',   w: 35, h: 45, cat: 'International', color: '#00FFB2' },
  { label: '2x2 inch',        w: 51, h: 51, cat: 'Standard',      color: '#FF4ECD' },
  { label: '3.5x4.5 cm',      w: 35, h: 45, cat: 'Standard',      color: '#A78BFA' },
  { label: '4x6 cm',          w: 40, h: 60, cat: 'Standard',      color: '#34D399' },
  { label: '1x1 inch',        w: 25, h: 25, cat: 'Standard',      color: '#F59E0B' },
];

const PAGE_SIZES = {
  'A4':     { w: 210, h: 297, label: 'A4 · 210×297mm' },
  '4x6':    { w: 102, h: 152, label: '4×6 inch Photo' },
  '5x7':    { w: 127, h: 178, label: '5×7 inch Photo' },
  'Letter': { w: 216, h: 279, label: 'Letter (US)' },
};

const BG_COLORS = [
  { label: 'White',      value: '#ffffff' },
  { label: 'Off-White',  value: '#f8f6f0' },
  { label: 'Light Blue', value: '#c8dff5' },
  { label: 'Sky Blue',   value: '#a8d4f5' },
  { label: 'Light Gray', value: '#e0e0e0' },
  { label: 'Cream',      value: '#fdf3e0' },
];

const DPI = 300;
const MM_PX = DPI / 25.4;
const PREV_W = 200;

export default function PassportPhoto() {
  const [image, setImage]             = useState(null);
  const [imgInfo, setImgInfo]         = useState(null);
  const [isDragging, setIsDragging]   = useState(false);
  const [activeSize, setActiveSize]   = useState(0);
  const [activeBg, setActiveBg]       = useState(0);
  const [activeTab, setActiveTab]     = useState('India');
  const [cropX, setCropX]             = useState(0);
  const [cropY, setCropY]             = useState(0);
  const [cropScale, setCropScale]     = useState(1);
  const [output, setOutput]           = useState(null);
  const [processing, setProcessing]   = useState(false);
  const [bgRemoving, setBgRemoving]   = useState(false);
  const [bgRemoved, setBgRemoved]     = useState(false);
  const [bgRemovedImg, setBgRemovedImg] = useState(null);
  const [pageSize, setPageSize]       = useState('A4');
  const [sheetCols, setSheetCols]     = useState(2);
  const [sheetRows, setSheetRows]     = useState(3);
  const [brightness, setBrightness]   = useState(100);
  const [contrast, setContrast]       = useState(100);
  const [saturation, setSaturation]   = useState(100);
  const [sharpness, setSharpness]     = useState(0);
  const [warmth, setWarmth]           = useState(0);
  const [exposure, setExposure]       = useState(0);

  const fileRef         = useRef(null);
  const outputCanvasRef = useRef(null);
  const previewRef      = useRef(null);
  const editorRef       = useRef(null);
  const isDraggingCrop  = useRef(false);
  const lastMouse       = useRef({ x: 0, y: 0 });

  const loadImage = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(url); setOutput(null); setBgRemoved(false); setBgRemovedImg(null);
      setImgInfo({ name: file.name, size: file.size, w: img.width, h: img.height, img });
      setCropX(0); setCropY(0); setCropScale(1);
    };
    img.src = url;
  };

  const onDrop = useCallback(e => { e.preventDefault(); setIsDragging(false); loadImage(e.dataTransfer.files[0]); }, []);

  const applySharpness = (ctx, w, h, amt) => {
    if (amt <= 0) return;
    const d = ctx.getImageData(0,0,w,h), data = d.data, f = amt/100*2.5;
    const copy = new Uint8ClampedArray(data), bl = new Uint8ClampedArray(data.length);
    for (let y=0;y<h;y++) for (let x=0;x<w;x++) {
      let r=0,g=0,b=0,c=0;
      for (let dy=-1;dy<=1;dy++) for (let dx=-1;dx<=1;dx++) {
        const nx=Math.min(Math.max(x+dx,0),w-1),ny=Math.min(Math.max(y+dy,0),h-1),i=(ny*w+nx)*4;
        r+=copy[i];g+=copy[i+1];b+=copy[i+2];c++;
      }
      const i=(y*w+x)*4; bl[i]=r/c;bl[i+1]=g/c;bl[i+2]=b/c;bl[i+3]=copy[i+3];
    }
    for (let i=0;i<data.length;i+=4) for (let c=0;c<3;c++)
      data[i+c]=Math.min(255,Math.max(0,copy[i+c]+(copy[i+c]-bl[i+c])*f));
    ctx.putImageData(d,0,0);
  };

  const getFilter = useCallback(() => {
    let f=`brightness(${brightness+exposure}%) contrast(${contrast}%) saturate(${saturation}%)`;
    if (warmth>0) f+=` sepia(${warmth*.3}%)`;
    return f;
  }, [brightness, contrast, exposure, saturation, warmth]);



  const drawToCanvas = useCallback((canvas, pw, ph, sx=1, sy=1) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,pw,ph);
    ctx.fillStyle = BG_COLORS[activeBg].value;
    ctx.fillRect(0,0,pw,ph);
    const src = bgRemoved && bgRemovedImg ? bgRemovedImg : imgInfo?.img;
    if (!src) return;
    const sw=imgInfo.w*cropScale*sx, sh=imgInfo.h*cropScale*sy;
    const dx=(pw-sw)/2+cropX*sx, dy=(ph-sh)/2+cropY*sy;
    ctx.filter = getFilter();
    ctx.drawImage(src,dx,dy,sw,sh);
    ctx.filter='none';
    if (sharpness>0) applySharpness(ctx,pw,ph,sharpness);
  }, [activeBg, bgRemoved, bgRemovedImg, cropScale, cropX, cropY, getFilter, imgInfo, sharpness]);

  const drawPreview = useCallback(() => {
    if (!imgInfo||!previewRef.current) return;
    const size=SIZES[activeSize], aspect=size.w/size.h;
    const pw=PREV_W, ph=Math.round(PREV_W/aspect);
    const canvas=previewRef.current;
    canvas.width=pw; canvas.height=ph;
    drawToCanvas(canvas,pw,ph);
  }, [activeSize, drawToCanvas, imgInfo]);

  useEffect(() => { drawPreview(); }, [drawPreview]);

  useEffect(() => {
    if (!imgInfo || typeof window === 'undefined' || window.innerWidth > 720) return;
    const frame = window.requestAnimationFrame(() => {
      editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [imgInfo]);

  // ✅ BG Removal with fallback
  const removeBackground = async () => {
    if (!imgInfo) return;
    setBgRemoving(true);
    const tryRemove = async (opts) => {
      const { removeBackground: rm } = await import('@imgly/background-removal');
      const blob = await fetch(image).then(r=>r.blob());
      const result = await rm(blob, { debug:false, ...opts });
      return result;
    };
    try {
      // Try local first
      let result;
      try { result = await tryRemove({ publicPath:'/bgremoval/' }); }
      catch { result = await tryRemove({}); } // fallback — no publicPath
      const url = URL.createObjectURL(result);
      const img = new Image();
      img.onload = () => { setBgRemovedImg(img); setBgRemoved(true); };
      img.src = url;
    } catch(e) {
      alert('BG removal failed.\n\nRun this in your terminal:\nmkdir -p public/bgremoval && cp node_modules/@imgly/background-removal/dist/* public/bgremoval/\n\nThen restart: npm run dev');
    } finally { setBgRemoving(false); }
  };

  const onMouseDown = e => { isDraggingCrop.current=true; lastMouse.current={x:e.clientX,y:e.clientY}; };
  const onMouseMove = e => {
    if (!isDraggingCrop.current) return;
    setCropX(v=>v+(e.clientX-lastMouse.current.x));
    setCropY(v=>v+(e.clientY-lastMouse.current.y));
    lastMouse.current={x:e.clientX,y:e.clientY};
  };
  const onMouseUp = () => { isDraggingCrop.current=false; };
  const onTouchStart = e => {
    const touch = e.touches?.[0];
    if (!touch) return;
    isDraggingCrop.current = true;
    lastMouse.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchMove = e => {
    const touch = e.touches?.[0];
    if (!touch || !isDraggingCrop.current) return;
    setCropX(v=>v+(touch.clientX-lastMouse.current.x));
    setCropY(v=>v+(touch.clientY-lastMouse.current.y));
    lastMouse.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = () => { isDraggingCrop.current = false; };

  const fitFrame = () => {
    if (!imgInfo) return;
    const sz=SIZES[activeSize], ph=Math.round(PREV_W/(sz.w/sz.h));
    setCropScale(Math.max(PREV_W/imgInfo.w,ph/imgInfo.h)*1.05);
    setCropX(0); setCropY(0);
  };

  const generate = () => {
    if (!imgInfo) return;
    setProcessing(true);
    setTimeout(() => {
      const size=SIZES[activeSize];
      const pw=Math.round(size.w*MM_PX), ph=Math.round(size.h*MM_PX);
      const canvas=outputCanvasRef.current;
      canvas.width=pw; canvas.height=ph;
      const prevH=Math.round(PREV_W/(size.w/size.h));
      drawToCanvas(canvas,pw,ph,pw/PREV_W,ph/prevH);
      setOutput({url:canvas.toDataURL('image/jpeg',.96),w:pw,h:ph,size});
      setProcessing(false);
    },80);
  };

  const downloadSingle = () => {
    if (!output) return;
    const a=document.createElement('a');
    a.href=output.url;
    a.download=`passport-${output.size.label.replace(/\s/g,'-')}.jpg`;
    a.click();
  };

  // ✅ Proper print sheet with page size + rows/cols
  const downloadSheet = () => {
    if (!output) return;
    const photoMM=SIZES[activeSize], page=PAGE_SIZES[pageSize];
    const gapMM=3, marginMM=5;
    const pageW=Math.round(page.w*MM_PX), pageH=Math.round(page.h*MM_PX);
    const photoW=Math.round(photoMM.w*MM_PX), photoH=Math.round(photoMM.h*MM_PX);
    const gap=Math.round(gapMM*MM_PX), margin=Math.round(marginMM*MM_PX);

    const c=document.createElement('canvas');
    c.width=pageW; c.height=pageH;
    const ctx=c.getContext('2d');
    ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,pageW,pageH);

    const img=new Image();
    img.onload=()=>{
      // Center grid on page
      const gridW=sheetCols*photoW+(sheetCols-1)*gap;
      const gridH=sheetRows*photoH+(sheetRows-1)*gap;
      const startX=Math.round((pageW-gridW)/2);
      const startY=Math.round((pageH-gridH)/2);

      for (let r=0;r<sheetRows;r++) {
        for (let cl=0;cl<sheetCols;cl++) {
          const x=startX+cl*(photoW+gap), y=startY+r*(photoH+gap);
          ctx.drawImage(img,x,y,photoW,photoH);

          // Trim marks
          ctx.strokeStyle='rgba(0,0,0,.3)'; ctx.lineWidth=1;
          const m=Math.round(5*MM_PX), s=Math.round(1.5*MM_PX);
          [[x,y,1,1],[x+photoW,y,1,1],[x,y+photoH,1,1],[x+photoW,y+photoH,1,1]].forEach(([cx,cy,dx,dy])=>{
            ctx.beginPath();ctx.moveTo(cx+dx*s,cy);ctx.lineTo(cx+dx*(s+m),cy);ctx.stroke();
            ctx.beginPath();ctx.moveTo(cx,cy+dy*s);ctx.lineTo(cx,cy+dy*(s+m));ctx.stroke();
          });
        }
      }

      // Footer info
      ctx.fillStyle='rgba(0,0,0,.18)';
      ctx.font=`${Math.round(5*MM_PX)}px sans-serif`;
      ctx.textAlign='center';
      ctx.fillText(`${photoMM.label} | ${sheetCols}×${sheetRows} photos | ${page.label} | 300 DPI | toolsite.com`,pageW/2,pageH-Math.round(2.5*MM_PX));

      const a=document.createElement('a');
      a.href=c.toDataURL('image/jpeg',.96);
      a.download=`passport-sheet-${photoMM.label.replace(/\s/g,'-')}-${sheetCols}x${sheetRows}-${pageSize}.jpg`;
      a.click();
    };
    img.src=output.url;
  };

  const fmt=b=>b<1024*1024?`${(b/1024).toFixed(0)}KB`:`${(b/1024/1024).toFixed(1)}MB`;
  const slBg=(v,mn,mx)=>`linear-gradient(to right,#00C9FF ${((v-mn)/(mx-mn))*100}%,rgba(255,255,255,.08) ${((v-mn)/(mx-mn))*100}%)`;
  const resetAdj=()=>{setBrightness(100);setContrast(100);setSaturation(100);setSharpness(0);setWarmth(0);setExposure(0);};
  const totalPhotos=sheetCols*sheetRows;

  return (
    <>
      <style precedence="default" href="toolsite-passport-styles">{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Manrope:wght@600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --cyan:#00FFB2;
          --blue:#1d72ff;
          --blue-2:#45a2ff;
          --violet:#C77DFF;
          --ink:#edf4ff;
          --muted:#7f95b2;
          --bg:#070d18;
          --bg-2:#0c1524;
          --card:rgba(255,255,255,.03);
          --line:rgba(69,162,255,.16);
        }
        html,body{background:var(--bg);color:var(--ink);font-family:'Sora',sans-serif;min-height:100vh;overflow-x:hidden}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.15}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes popIn{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.6}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes scanLine{0%{top:-4px}100%{top:110%}}
        @keyframes drift{0%{transform:translate3d(-3%,0,0) rotate(0deg)}50%{transform:translate3d(3%,-2%,0) rotate(8deg)}100%{transform:translate3d(-3%,0,0) rotate(0deg)}}
        @keyframes sweep{0%{transform:translateX(-12%) skewX(-12deg);opacity:.12}50%{opacity:.28}100%{transform:translateX(12%) skewX(-12deg);opacity:.12}}

        .page{min-height:100vh;background:
          radial-gradient(circle at 18% 18%,rgba(0,255,178,.08),transparent 26%),
          radial-gradient(circle at 82% 14%,rgba(77,150,255,.09),transparent 28%),
          radial-gradient(circle at 62% 78%,rgba(199,125,255,.07),transparent 30%),
          linear-gradient(180deg,#070d18 0%,#0b1422 100%);
          position:relative;overflow:hidden}
        .bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .g1{position:absolute;top:-15%;left:-8%;width:70%;height:70%;background:radial-gradient(ellipse,rgba(0,255,178,.12) 0%,transparent 62%);animation:pulse 9s ease-in-out infinite;border-radius:50%}
        .g2{position:absolute;bottom:-20%;right:-5%;width:65%;height:65%;background:radial-gradient(ellipse,rgba(77,150,255,.13) 0%,transparent 62%);animation:pulse 13s ease-in-out infinite 4s;border-radius:50%}
        .gbg{position:absolute;inset:0;background-image:linear-gradient(rgba(69,162,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(69,162,255,.03) 1px,transparent 1px);background-size:44px 44px}
        .aurora{position:absolute;inset:-10% -20%;background:
          radial-gradient(circle at 20% 30%,rgba(0,255,178,.1),transparent 24%),
          radial-gradient(circle at 72% 22%,rgba(77,150,255,.12),transparent 28%),
          radial-gradient(circle at 52% 76%,rgba(199,125,255,.1),transparent 26%);
          filter:blur(40px);mix-blend-mode:screen;animation:drift 18s ease-in-out infinite}
        .light-beam{position:absolute;top:-8%;bottom:-8%;left:18%;width:26%;background:linear-gradient(180deg,transparent,rgba(77,150,255,.06),rgba(0,255,178,.05),transparent);filter:blur(18px);transform:skewX(-12deg);animation:sweep 12s ease-in-out infinite}
        .particles{position:absolute;inset:0;background:
          radial-gradient(circle at 14% 28%,rgba(255,255,255,.32) 0 1px,transparent 2px),
          radial-gradient(circle at 72% 24%,rgba(0,255,178,.3) 0 1px,transparent 2px),
          radial-gradient(circle at 48% 68%,rgba(77,150,255,.28) 0 1px,transparent 2px),
          radial-gradient(circle at 84% 56%,rgba(199,125,255,.25) 0 1px,transparent 2px),
          radial-gradient(circle at 28% 78%,rgba(255,255,255,.22) 0 1px,transparent 2px);
          animation:float 12s ease-in-out infinite}
        .noise{position:absolute;inset:0;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

        nav{position:fixed;top:0;left:0;right:0;z-index:200;height:60px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;background:rgba(7,13,24,.88);backdrop-filter:blur(22px);border-bottom:1px solid var(--line)}
        .logo{font-family:'Manrope',sans-serif;font-size:22px;font-weight:800;letter-spacing:.01em;text-decoration:none;color:var(--ink)}
        .logo em{color:var(--blue);font-style:normal}
        .npill{background:rgba(29,114,255,.08);border:1px solid rgba(29,114,255,.18);color:var(--blue);padding:4px 16px;border-radius:999px;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700}
        .bk{display:flex;align-items:center;gap:6px;color:var(--muted);text-decoration:none;font-size:11px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;transition:color .2s;font-weight:600}
        .bk:hover{color:var(--ink)}

        .wrap{position:relative;z-index:1;padding:76px 20px 60px;max-width:1300px;margin:0 auto}
        .mobile-steps{display:none;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 14px}
        .mobile-step{padding:12px;border-radius:18px;background:rgba(255,255,255,.03);border:1px solid var(--line);box-shadow:0 12px 28px rgba(0,0,0,.18)}
        .mobile-step-no{font-size:10px;color:var(--blue);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:6px}
        .mobile-step-title{font-size:13px;color:var(--ink);font-family:'Manrope',sans-serif;font-weight:800;line-height:1.3}
        .mobile-step-copy{font-size:11px;color:var(--muted);line-height:1.55;margin-top:4px}
        .mobile-upload-bar{display:none;margin-bottom:14px;padding:15px;border-radius:22px;background:linear-gradient(135deg,rgba(29,114,255,.1),rgba(255,255,255,.03));border:1px solid var(--line);box-shadow:0 18px 44px rgba(0,0,0,.2)}
        .mobile-upload-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
        .mobile-upload-k{font-size:10px;color:var(--blue);font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;font-weight:700;margin-bottom:6px}
        .mobile-upload-title{font-size:20px;color:var(--ink);font-family:'Manrope',sans-serif;font-weight:800;line-height:1.2}
        .mobile-upload-badge{padding:7px 10px;border-radius:999px;background:rgba(29,114,255,.08);border:1px solid rgba(29,114,255,.14);font-size:10px;color:var(--blue);font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:700;white-space:nowrap}
        .mobile-upload-copy{font-size:13px;color:var(--muted);line-height:1.7}
        .mobile-upload-preview{display:flex;align-items:center;gap:12px;margin:12px 0;padding:10px;border-radius:18px;background:rgba(255,255,255,.025);border:1px solid var(--line)}
        .mobile-upload-thumb{width:62px;height:62px;border-radius:16px;overflow:hidden;flex-shrink:0;background:#101a2a;border:1px solid rgba(29,114,255,.12)}
        .mobile-upload-thumb img{width:100%;height:100%;object-fit:cover;display:block}
        .mobile-upload-preview-copy{min-width:0}
        .mobile-upload-preview-title{font-size:13px;color:var(--ink);font-family:'Manrope',sans-serif;font-weight:800;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .mobile-upload-preview-sub{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.05em;line-height:1.6}
        .mobile-upload-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
        .mobile-upload-btn{flex:1;border:none;border-radius:14px;padding:13px 16px;background:linear-gradient(135deg,#79b7ff,#1d72ff);color:#fff;font-size:12px;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:800;cursor:pointer;min-width:170px}
        .mobile-upload-meta{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em;line-height:1.5}

        .hero{text-align:center;margin-bottom:28px;opacity:0;animation:fadeUp .55s .04s both;position:relative}
        .htag{display:inline-flex;align-items:center;gap:8px;background:rgba(29,114,255,.06);border:1px solid rgba(29,114,255,.12);border-radius:999px;padding:5px 16px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--blue);letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px}
        .hdot{width:5px;height:5px;background:var(--blue);border-radius:50%;animation:blink 2s infinite}
        .htitle{font-family:'Manrope',sans-serif;font-size:clamp(50px,8vw,106px);line-height:.9;letter-spacing:-.05em;margin-bottom:10px;font-weight:800;background:linear-gradient(180deg,#ffffff 8%,#bdf6ff 48%,#45a2ff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 24px rgba(77,150,255,.08)}
        .htitle em{color:var(--blue);font-style:normal}
        .hsub{font-size:14px;color:var(--muted);max-width:500px;margin:0 auto;line-height:1.8}
        .hsub b{color:var(--ink);font-weight:700}
        .hero-row{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:18px}
        .hero-chip{padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.04);border:1px solid rgba(77,150,255,.14);font-size:11px;color:#d9e8ff;font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;font-weight:700;box-shadow:0 10px 26px rgba(0,0,0,.15)}

        .cols{display:grid;grid-template-columns:250px minmax(0,1fr) 280px;gap:12px;align-items:start}
        .main-stack{display:grid;gap:12px;align-items:start}
        @media(max-width:1180px){.cols{grid-template-columns:220px minmax(0,1fr) 240px}}
        @media(max-width:720px){.cols{grid-template-columns:1fr}}

        .card{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.025));backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:22px;padding:18px;position:relative;overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.04)}
        .card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(29,114,255,.18),transparent)}
        .card::after{content:'';position:absolute;inset:auto -40px -60px auto;width:120px;height:120px;background:radial-gradient(circle,rgba(77,150,255,.12),transparent 70%);pointer-events:none}
        .ch{display:flex;align-items:center;gap:9px;margin-bottom:14px}
        .ci{width:34px;height:34px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;box-shadow:0 10px 22px rgba(0,0,0,.18)}
        .ct{font-size:14px;font-weight:700;color:var(--ink);font-family:'Manrope',sans-serif}
        .cs{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;margin-top:2px}

        .drop{border:2px dashed rgba(69,162,255,.22);border-radius:18px;padding:34px 18px;text-align:center;cursor:pointer;transition:all .3s;background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(29,114,255,.025));position:relative}
        .drop::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at top,rgba(77,150,255,.08),transparent 55%);opacity:0;transition:opacity .3s}
        .drop.drag,.drop:hover{border-color:rgba(77,150,255,.55);background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(29,114,255,.06));transform:translateY(-2px);box-shadow:0 18px 34px rgba(29,114,255,.12)}
        .drop.drag::after,.drop:hover::after{opacity:1}
        .drop-ico{font-size:40px;margin-bottom:12px;display:block;transition:transform .3s,filter .3s;filter:drop-shadow(0 0 16px rgba(77,150,255,.18))}
        .drop:hover .drop-ico{transform:translateY(-5px) scale(1.08)}
        .drop-t{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:4px;font-family:'Manrope',sans-serif}
        .drop-s{font-size:12px;color:var(--muted);line-height:1.65}
        .drop-acc{color:var(--blue);font-weight:700}
        .or{margin:10px auto;display:flex;align-items:center;gap:8px;max-width:130px}
        .or::before,.or::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.05)}
        .or span{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.08em}
        .browse{background:linear-gradient(135deg,#79b7ff,#1d72ff);border:1px solid rgba(29,114,255,.24);color:#fff;padding:6px 16px;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;transition:all .2s}
        .browse:hover{filter:brightness(1.04)}

        .thumb{border-radius:14px;overflow:hidden;position:relative;cursor:pointer;background:#0a111d;height:138px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(77,150,255,.14);box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
        .thumb img{max-width:100%;max-height:120px;object-fit:contain;display:block;opacity:.85;transition:opacity .2s}
        .thumb:hover img{opacity:.35}
        .tov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;opacity:0;transition:opacity .2s}
        .thumb:hover .tov{opacity:1}
        .tov-l{font-size:11px;font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:white}

        .ibar{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
        .ist{background:rgba(29,114,255,.05);border:1px solid rgba(29,114,255,.14);border-radius:12px;padding:10px 11px;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
        .isn{font-family:'Manrope',sans-serif;font-size:16px;color:var(--blue);line-height:1.1;margin-bottom:2px;font-weight:800}
        .isl{font-size:9px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700}

        .bgrm{width:100%;border:none;border-radius:12px;padding:12px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:'Manrope',sans-serif;transition:all .25s;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:9px}
        .bgrm.idle{background:linear-gradient(135deg,rgba(199,125,255,.15),rgba(77,150,255,.1));border:1px solid rgba(199,125,255,.3);color:#C77DFF}
        .bgrm.idle:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(199,125,255,.15)}
        .bgrm.loading{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:var(--muted);cursor:not-allowed}
        .bgrm.done{background:linear-gradient(135deg,rgba(107,203,119,.14),rgba(0,255,178,.07));border:1px solid rgba(107,203,119,.28);color:#6BCB77}
        .scl{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#C77DFF,transparent);animation:scanLine 1.5s linear infinite;opacity:.7}
        .restore-btn,.ghost-action{width:100%;border:1px solid rgba(69,162,255,.14);border-radius:10px;padding:9px 10px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:rgba(255,255,255,.02);color:var(--muted);letter-spacing:.06em;text-transform:uppercase;text-align:center;transition:all .2s}
        .restore-btn:hover,.ghost-action:hover{color:var(--ink);border-color:rgba(69,162,255,.24);background:rgba(69,162,255,.05)}
        .tool-hint{font-size:11px;color:var(--muted);line-height:1.65;font-family:'JetBrains Mono',monospace}

        .bg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:10px}
        .bgo{border:2px solid rgba(69,162,255,.08);border-radius:11px;padding:6px;cursor:pointer;transition:all .2s;text-align:center;background:rgba(255,255,255,.02)}
        .bgo.on{border-color:var(--blue);box-shadow:0 0 0 1px rgba(69,162,255,.18),0 10px 22px rgba(29,114,255,.14);transform:translateY(-1px)}
        .bgo:hover:not(.on){border-color:rgba(69,162,255,.18);background:rgba(69,162,255,.04)}
        .bgo-sw{width:100%;height:24px;border-radius:6px;margin-bottom:4px;border:1px solid rgba(0,0,0,.08)}
        .bgo-l{font-size:9px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em;text-transform:uppercase;font-weight:700}
        .bgo.on .bgo-l{color:var(--blue)}

        .slbl{font-size:10px;font-family:'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;font-weight:700}
        .arow{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}
        .al{font-size:12px;color:#c6d4e6;font-weight:600;display:flex;align-items:center;gap:5px}
        .av{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;min-width:34px;text-align:right}
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:3px;border-radius:999px;outline:none;border:none;cursor:pointer;margin-bottom:9px}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--blue-2);cursor:pointer;box-shadow:0 0 8px rgba(69,162,255,.5);transition:transform .15s}
        input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.3)}
        .rst-btn{width:100%;border:1px solid rgba(69,162,255,.14);border-radius:10px;padding:8px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:rgba(255,255,255,.02);color:var(--muted);letter-spacing:.06em;text-transform:uppercase;text-align:center;transition:all .2s;margin-bottom:11px}
        .rst-btn:hover{color:var(--ink);border-color:rgba(69,162,255,.24)}

        /* ── CENTER ── */
        .pcard{background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.025));backdrop-filter:blur(18px);border:1px solid var(--line);border-radius:24px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 46px rgba(0,0,0,.26),inset 0 1px 0 rgba(255,255,255,.04)}
        .pcard::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(29,114,255,.18),transparent);z-index:1}
        .ptbar{padding:13px 16px;border-bottom:1px solid rgba(29,114,255,.08);display:flex;align-items:center;justify-content:space-between;background:rgba(4,10,20,.26);gap:10px}
        .ptbar-t{font-size:14px;font-weight:700;color:var(--ink);font-family:'Manrope',sans-serif}
        .ptbar-s{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.07em;text-transform:uppercase;margin-top:2px}

        .crop-body{flex:1;min-height:520px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:22px 18px;background:
          radial-gradient(circle at top,rgba(77,150,255,.08),transparent 30%),
          linear-gradient(180deg,#0a111d,#0d1728);position:relative;overflow:hidden}
        .crop-body::before{content:'';position:absolute;inset:0;background-image:radial-gradient(rgba(29,114,255,.065) 1px,transparent 1px);background-size:22px 22px;pointer-events:none}
        .crop-body::after{content:'';position:absolute;inset:auto 50% 40px 50%;width:180px;height:220px;transform:translateX(-50%);background:
          radial-gradient(circle at 50% 22%,rgba(255,255,255,.09) 0 26px,transparent 27px),
          radial-gradient(ellipse at 50% 72%,rgba(255,255,255,.07) 0 62px,transparent 64px);
          filter:blur(1px);opacity:.5;pointer-events:none}

        .frame-wrap{position:relative;cursor:move;user-select:none;flex-shrink:0;z-index:1}
        .prev-canvas{display:block;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 0 1px rgba(77,150,255,.16)}
        .frame-ui{position:absolute;inset:-4px;pointer-events:none}
        .corner{position:absolute;width:14px;height:14px;border-color:#00C9FF;border-style:solid;opacity:.9}
        .c-tl{top:0;left:0;border-width:2.5px 0 0 2.5px;border-radius:3px 0 0 0}
        .c-tr{top:0;right:0;border-width:2.5px 2.5px 0 0;border-radius:0 3px 0 0}
        .c-bl{bottom:0;left:0;border-width:0 0 2.5px 2.5px;border-radius:0 0 0 3px}
        .c-br{bottom:0;right:0;border-width:0 2.5px 2.5px 0;border-radius:0 0 3px 0}
        .thirds{position:absolute;inset:4px;pointer-events:none;background-image:linear-gradient(rgba(0,201,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,201,255,.1) 1px,transparent 1px);background-size:33.33% 33.33%}

        .hint{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
        .zoom-row{display:flex;align-items:center;gap:10px;width:100%;max-width:240px}
        .z-lbl{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
        .z-val{font-size:11px;color:var(--blue);font-family:'JetBrains Mono',monospace;font-weight:700;min-width:36px;text-align:right}
        .crop-ctrl{display:flex;gap:5px;width:100%}
        .cc{flex:1;border:1px solid rgba(29,114,255,.12);border-radius:8px;padding:7px;font-size:11px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:rgba(255,255,255,.03);color:var(--muted);letter-spacing:.04em;text-transform:uppercase;text-align:center;transition:all .2s}
        .cc:hover{color:var(--blue);border-color:rgba(29,114,255,.22);background:rgba(29,114,255,.04)}

        .empty{text-align:center;padding:40px;animation:float 4s ease-in-out infinite}
        .eico{font-size:52px;margin-bottom:14px;opacity:.1}
        .et{font-size:15px;font-weight:700;color:var(--ink);margin-bottom:5px;font-family:'Manrope',sans-serif}
        .es{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em}

        /* Output */
        .out-section{border-top:1px solid rgba(69,162,255,.12);background:linear-gradient(180deg,rgba(4,10,20,.26),rgba(69,162,255,.03))}
        .out-preview{padding:18px;display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap}
        .out-img-wrap{position:relative;flex-shrink:0}
        .out-img{display:block;border-radius:4px;box-shadow:0 12px 40px rgba(0,0,0,.6),0 0 0 1px rgba(69,162,255,.14);animation:popIn .4s cubic-bezier(.34,1.56,.64,1) both}
        .out-badge{position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:#6BCB77;color:#010f04;font-size:9px;font-family:'JetBrains Mono',monospace;font-weight:800;letter-spacing:.08em;padding:3px 10px;border-radius:999px;white-space:nowrap;text-transform:uppercase}
        .out-info{flex:1;min-width:160px}
        .out-title{font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px;font-family:'Manrope',sans-serif}
        .out-meta{font-size:12px;color:var(--muted);line-height:1.8}
        .out-meta b{color:var(--blue-2);font-weight:700;font-family:'JetBrains Mono',monospace}
        .dl-btns{display:flex;flex-direction:column;gap:7px;margin-top:10px}
        .dl-main{background:linear-gradient(135deg,#79b7ff,#1d72ff);color:#fff;border:none;border-radius:12px;padding:11px 16px;font-size:12px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:'Manrope',sans-serif;transition:all .22s;position:relative;overflow:hidden;display:flex;align-items:center;gap:7px}
        .dl-main::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);background-size:200%;animation:shimmer 2s ease-in-out infinite}
        .dl-main:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(29,114,255,.3)}
        .dl-sheet{background:rgba(69,162,255,.08);border:1px solid rgba(69,162,255,.22);color:var(--blue-2);border-radius:12px;padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:'Manrope',sans-serif;transition:all .22s;display:flex;align-items:center;gap:7px}
        .dl-sheet:hover{background:rgba(69,162,255,.14);transform:translateY(-2px)}

        /* Sheet layout preview */
        .sheet-layout{display:grid;gap:3px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:10px;margin-top:8px}
        .sheet-cell{background:rgba(0,201,255,.1);border:1px solid rgba(0,201,255,.22);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:10px;opacity:.8}

        .gen-btn{width:100%;background:linear-gradient(135deg,#79b7ff,#1d72ff);color:#fff;border:none;border-radius:13px;padding:13px;font-size:13px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;font-family:'Manrope',sans-serif;transition:all .25s;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 22px rgba(29,114,255,.18)}
        .gen-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);background-size:200%;animation:shimmer 2.2s ease-in-out infinite}
        .gen-btn:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(29,114,255,.3)}
        .gen-btn:disabled{opacity:.3;cursor:not-allowed;transform:none;box-shadow:none}
        .spin{animation:spin .8s linear infinite;display:inline-block}

        .tabrow{display:flex;gap:5px;margin-bottom:9px;flex-wrap:wrap}
        .tab{border:1px solid rgba(69,162,255,.12);border-radius:10px;padding:7px 12px;font-size:10px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-weight:700;background:rgba(255,255,255,.02);color:var(--muted);letter-spacing:.07em;text-transform:uppercase;transition:all .2s}
        .tab.on{background:rgba(69,162,255,.1);border-color:rgba(69,162,255,.28);color:var(--blue-2)}
        .tab:hover:not(.on){color:var(--ink);border-color:rgba(69,162,255,.18)}
        .pgrid{display:flex;flex-direction:column;gap:4px}
        .pst{border:1px solid rgba(69,162,255,.08);border-radius:14px;padding:12px 12px;cursor:pointer;transition:transform .2s,border-color .2s,background .2s,box-shadow .2s;background:linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.015));display:flex;align-items:center;justify-content:space-between}
        .pst:hover{background:rgba(69,162,255,.05);border-color:rgba(69,162,255,.22);transform:translateY(-2px);box-shadow:0 14px 28px rgba(0,0,0,.18)}
        .pst.on{transform:translateY(-2px);box-shadow:0 16px 30px rgba(29,114,255,.12)}
        .pst-l{display:flex;align-items:center;gap:8px}
        .pst-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
        .pst-name{font-size:13px;font-weight:700;color:var(--ink);line-height:1.2}
        .pst-dim{font-size:10px;font-family:'JetBrains Mono',monospace;opacity:.42;letter-spacing:.04em;margin-top:1px}
        .ready-pill{font-size:10px;font-family:'JetBrains Mono',monospace;font-weight:700;padding:3px 10px;border-radius:8px;letter-spacing:.07em;text-transform:uppercase;background:rgba(107,203,119,.15);color:#6BCB77;border:1px solid rgba(107,203,119,.25);white-space:nowrap}
        .section-footer{padding:14px 16px;border-top:1px solid rgba(69,162,255,.1);background:rgba(4,10,20,.18)}
        .section-footer.compact{padding:8px 14px;background:rgba(4,10,20,.12)}
        .page-btn{border:1px solid rgba(69,162,255,.14);border-radius:10px;padding:9px 11px;cursor:pointer;font-family:'Sora',sans-serif;font-weight:600;background:rgba(255,255,255,.02);color:var(--muted);font-size:13px;text-align:left;transition:all .2s;display:flex;justify-content:space-between;align-items:center}
        .page-btn.on{border-color:rgba(69,162,255,.35);background:rgba(69,162,255,.1);color:var(--blue-2)}
        .count-grid{display:flex;gap:6px}
        .mini-count-btn{flex:1;border:1px solid rgba(69,162,255,.14);border-radius:10px;padding:9px 4px;font-family:'Manrope',sans-serif;font-size:16px;font-weight:700;cursor:pointer;background:rgba(255,255,255,.02);color:var(--muted);transition:all .2s}
        .mini-count-btn.on{border-color:rgba(69,162,255,.35);background:rgba(69,162,255,.1);color:var(--blue-2)}
        .sheet-preview-box{background:rgba(255,255,255,.02);border:1px solid rgba(69,162,255,.12);border-radius:14px;padding:12px}
        .sheet-preview-title{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:7px}
        .sheet-preview-foot{font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.04em}
        .count-accent{color:var(--blue-2);font-weight:700}
        .sheet-layout-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px}
        .sheet-layout-badge{padding:5px 10px;border-radius:999px;background:rgba(69,162,255,.09);border:1px solid rgba(69,162,255,.18);font-size:10px;color:var(--blue-2);font-family:'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;font-weight:700;white-space:nowrap}
        .sheet-layout-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:12px}
        .sheet-layout-col-label{font-size:10px;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;font-weight:700}

        .tip{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
        .tip:last-child{margin-bottom:0}
        .ti{width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}
        .tt{font-size:12px;color:#6b7280;line-height:1.65;padding-top:3px}

        .a1{opacity:0;animation:fadeUp .5s .08s both}
        .a2{opacity:0;animation:fadeUp .5s .14s both}
        .a3{opacity:0;animation:fadeUp .5s .20s both}
        .a4{opacity:0;animation:fadeUp .5s .26s both}
        .a5{opacity:0;animation:fadeUp .5s .32s both}
        @media(max-width:720px){
          nav{padding:0 14px}
          .wrap{padding:72px 14px 42px}
          .mobile-steps{display:grid;grid-template-columns:repeat(3,minmax(110px,1fr));overflow-x:auto}
          .mobile-step{min-width:110px}
          .mobile-upload-bar{display:block}
          .hero{display:none}
          .main-stack{order:1}
          .left-rail{order:2;gap:8px}
          .right-rail{order:3;gap:8px}
          .pcard,.card{border-radius:20px}
          .crop-body{min-height:360px}
          .hero-row{gap:8px}
          .hero-chip{padding:9px 12px}
        }
      `}</style>

      <canvas ref={outputCanvasRef} style={{display:'none'}}/>

      <div className="page">
        <div className="bg"><div className="g1"/><div className="g2"/><div className="aurora"/><div className="light-beam"/><div className="gbg"/><div className="particles"/><div className="noise"/></div>

        <nav>
          <Link href="/" className="logo"><em>Tool</em>Site</Link>
          <span className="npill">Passport Photo</span>
          <Link href="/" className="bk">← All Tools</Link>
        </nav>

        <div className="wrap">
          <div className="mobile-steps">
            <div className="mobile-step">
              <div className="mobile-step-no">Step 01</div>
              <div className="mobile-step-title">Upload</div>
              <div className="mobile-step-copy">Pick your photo</div>
            </div>
            <div className="mobile-step">
              <div className="mobile-step-no">Step 02</div>
              <div className="mobile-step-title">Adjust</div>
              <div className="mobile-step-copy">Crop and correct</div>
            </div>
            <div className="mobile-step">
              <div className="mobile-step-no">Step 03</div>
              <div className="mobile-step-title">Export</div>
              <div className="mobile-step-copy">Generate and print</div>
            </div>
          </div>

          <div className="mobile-upload-bar">
            <div className="mobile-upload-top">
              <div>
                <div className="mobile-upload-k">Passport Tool</div>
                <div className="mobile-upload-title">{image ? 'Photo loaded, adjust and export' : 'Upload passport photo and start'}</div>
              </div>
              <div className="mobile-upload-badge">{image ? 'Ready' : 'Upload'}</div>
            </div>
            <div className="mobile-upload-copy">
              {imgInfo ? `${imgInfo.name} selected hai. Neeche crop, color aur print settings mil jayengi.` : 'Mobile pe sabse pehle upload, phir direct crop and export flow milega.'}
            </div>
            {imgInfo && (
              <div className="mobile-upload-preview">
                <div className="mobile-upload-thumb">
                  <Image src={bgRemoved && bgRemovedImg ? bgRemovedImg.src : image} alt="selected preview" width={240} height={320} unoptimized />
                </div>
                <div className="mobile-upload-preview-copy">
                  <div className="mobile-upload-preview-title">{imgInfo.name}</div>
                  <div className="mobile-upload-preview-sub">{imgInfo.w}×{imgInfo.h} • {fmt(imgInfo.size)} • 300 DPI out</div>
                </div>
              </div>
            )}
            <div className="mobile-upload-actions">
              <button className="mobile-upload-btn" onClick={() => fileRef.current?.click()}>
                {image ? 'Change Photo' : 'Choose Photo'}
              </button>
              <div className="mobile-upload-meta">
                {imgInfo ? `${SIZES[activeSize].label} • ${SIZES[activeSize].w}×${SIZES[activeSize].h}mm` : 'PNG, JPG, WEBP • White and blue passport workflow'}
              </div>
            </div>
          </div>

          <div className="hero">
            <div className="htag"><span className="hdot" /> Instant Passport Studio</div>
            <div className="htitle">Passport <em>Photo</em><br/>Made Easy</div>
            <p className="hsub">Remove BG · Fix lighting · Sharpen · Crop<br/><b>India/US/UK/EU</b> · Custom print sheets · Free</p>
            <div className="hero-row">
              <div className="hero-chip">Private Workflow</div>
              <div className="hero-chip">Print Ready Sheets</div>
              <div className="hero-chip">Official Sizes</div>
            </div>
          </div>

          <div className="cols">

            {/* ── LEFT ── */}
            <div className="left-rail" style={{display:'flex',flexDirection:'column',gap:'10px'}}>

              <div className="card a1">
                <div className="ch">
                  <div className="ci" style={{background:'rgba(0,201,255,.1)',border:'1px solid rgba(0,201,255,.22)'}}>📷</div>
                  <div><div className="ct">1. Upload Photo</div><div className="cs">PNG · JPG · WEBP</div></div>
                </div>
                {!image ? (
                  <div className={`drop ${isDragging?'drag':''}`}
                    onDragOver={e=>{e.preventDefault();setIsDragging(true)}}
                    onDragLeave={()=>setIsDragging(false)}
                    onDrop={onDrop}
                    onClick={()=>fileRef.current?.click()}>
                    <span className="drop-ico">🤳</span>
                    <div className="drop-t">Drop photo here</div>
                    <div className="drop-s">Front-facing photo<br/><span className="drop-acc">100% private</span></div>
                    <div className="or"><span>OR</span></div>
                    <button className="browse">Browse</button>
                  </div>
                ) : (
                  <div className="thumb" onClick={()=>fileRef.current?.click()}>
                    <Image src={bgRemoved&&bgRemovedImg?bgRemovedImg.src:image} alt="photo" width={240} height={320} unoptimized />
                    <div className="tov"><div style={{fontSize:'20px'}}>🔄</div><div className="tov-l">Change</div></div>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" style={{display:'none'}} onChange={e=>loadImage(e.target.files[0])}/>
                {imgInfo&&(
                  <div className="ibar">
                    <div className="ist"><div className="isn">{imgInfo.w}</div><div className="isl">Width</div></div>
                    <div className="ist"><div className="isn">{imgInfo.h}</div><div className="isl">Height</div></div>
                    <div className="ist"><div className="isn">{fmt(imgInfo.size)}</div><div className="isl">Size</div></div>
                    <div className="ist"><div className="isn">300</div><div className="isl">DPI Out</div></div>
                  </div>
                )}
              </div>

              {imgInfo&&(
                <div className="card a2">
                  <div className="ch">
                    <div className="ci" style={{background:'rgba(199,125,255,.1)',border:'1px solid rgba(199,125,255,.2)'}}>✂️</div>
                    <div><div className="ct">2. Remove Background</div><div className="cs">AI · Offline · Free</div></div>
                  </div>
                  <button className={`bgrm ${bgRemoving?'loading':bgRemoved?'done':'idle'}`}
                    onClick={!bgRemoved&&!bgRemoving?removeBackground:undefined} disabled={bgRemoving}>
                    {bgRemoving&&<div className="scl"/>}
                    {bgRemoving?<><span className="spin">⚙️</span>Processing AI...</>:
                     bgRemoved?<>✅ Background Removed</>:<>✂️ Remove Background</>}
                  </button>
                  {bgRemoved&&(
                    <button className="restore-btn" onClick={()=>{setBgRemoved(false);setBgRemovedImg(null);}}>↩ Restore Original</button>
                  )}
                  <div className="tool-hint">
                    {bgRemoved?'✅ BG removed! Select a color below.':'First run ~40MB download. Then instant & offline.'}
                  </div>
                </div>
              )}

              {imgInfo&&(
                <div className="card a2">
                  <div className="ch">
                    <div className="ci" style={{background:'rgba(0,255,178,.1)',border:'1px solid rgba(0,255,178,.18)'}}>🎨</div>
                    <div><div className="ct">3. Background Color</div><div className="cs">Official colors</div></div>
                  </div>
                  <div className="bg-grid">
                    {BG_COLORS.map((b,i)=>(
                      <div key={b.label} className={`bgo ${activeBg===i?'on':''}`} onClick={()=>setActiveBg(i)}>
                        <div className="bgo-sw" style={{background:b.value}}/>
                        <div className="bgo-l">{b.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── CENTER ── */}
            <div className="main-stack">
            <div className="pcard a3 center-rail" style={{position:'relative'}} ref={editorRef}>
              <div className="ptbar">
                <div>
                  <div className="ptbar-t">{imgInfo?`${SIZES[activeSize].label} · ${SIZES[activeSize].w}×${SIZES[activeSize].h}mm`:'Crop & Preview'}</div>
                  <div className="ptbar-s">{imgInfo?'Drag · Scroll to zoom':'Upload photo first'}</div>
                </div>
                {output&&<div className="ready-pill">✅ Ready</div>}
              </div>

              <div className="crop-body" onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                {!imgInfo ? (
                  <div className="empty">
                    <div className="eico">🪪</div>
                    <div className="et">No photo yet</div>
                    <div className="es">Upload from the left</div>
                  </div>
                ) : (
                  <>
                    <div className="frame-wrap"
                      onMouseDown={onMouseDown}
                      onTouchStart={onTouchStart}
                      onWheel={e=>{e.preventDefault();setCropScale(v=>Math.max(.05,Math.min(5,v-(e.deltaY>0?.07:-.07))));}}>
                      <canvas ref={previewRef} className="prev-canvas"/>
                      <div className="frame-ui">
                        <div className="corner c-tl"/><div className="corner c-tr"/>
                        <div className="corner c-bl"/><div className="corner c-br"/>
                        <div className="thirds"/>
                      </div>
                    </div>
                    <div className="hint">✋ Drag · 🖱️ Scroll to zoom</div>
                    <div className="zoom-row">
                      <span className="z-lbl">Zoom</span>
                      <input type="range" min="0.05" max="4" step="0.05" value={cropScale}
                        onChange={e=>setCropScale(+e.target.value)}
                        style={{flex:1,background:slBg(cropScale,.05,4)}}/>
                      <span className="z-val">{Math.round(cropScale*100)}%</span>
                    </div>
                    <div className="crop-ctrl">
                      <button className="cc" onClick={()=>{setCropX(0);setCropY(0);setCropScale(1);}}>🔄 Reset</button>
                      <button className="cc" onClick={fitFrame}>✨ Fit</button>
                      <button className="cc" onClick={()=>setCropScale(v=>Math.min(5,v+.12))}>🔍+</button>
                      <button className="cc" onClick={()=>setCropScale(v=>Math.max(.05,v-.12))}>🔍−</button>
                    </div>
                  </>
                )}
              </div>

              {/* Output preview + download */}
              {output&&(
                <div className="out-section">
                  <div className="out-preview">
                    <div className="out-img-wrap">
                      <div className="out-badge">Preview</div>
                      <Image className="out-img" src={output.url} alt="output" width={Math.min(100,Math.round(100*output.size.w/output.size.h))} height={130} unoptimized />
                    </div>
                    <div className="out-info">
                      <div className="out-title">Photo Ready! ✅</div>
                      <div className="out-meta">
                        <div>Photo: <b>{output.size.label}</b></div>
                        <div>Dims: <b>{output.w}×{output.h}px</b></div>
                        <div>Sheet: <b>{sheetCols}×{sheetRows} = {totalPhotos} photos</b></div>
                        <div>Paper: <b>{PAGE_SIZES[pageSize].label}</b></div>
                      </div>
                      <div className="dl-btns">
                        <button className="dl-main" onClick={downloadSingle}>↓ Single Photo (JPG)</button>
                        <button className="dl-sheet" onClick={downloadSheet}>🖨️ Print Sheet × {totalPhotos}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {output&&(
                <div className="section-footer compact">
                  <button onClick={()=>setOutput(null)} className="ghost-action">
                    🔄 Regenerate with New Settings
                  </button>
                </div>
              )}
            </div>

              {/* Adjustments */}
              {imgInfo&&(
                <div className="card a4">
                  <div className="ch">
                    <div className="ci" style={{background:'rgba(255,211,61,.1)',border:'1px solid rgba(255,211,61,.2)'}}>🎛️</div>
                    <div><div className="ct">4. Corrections</div><div className="cs">Live preview</div></div>
                  </div>
                  {[
                    {l:'Brightness',i:'☀️',v:brightness,s:setBrightness,mn:50,mx:160,d:100,u:'%'},
                    {l:'Contrast',  i:'◑', v:contrast,  s:setContrast,  mn:50,mx:160,d:100,u:'%'},
                    {l:'Saturation',i:'🎨',v:saturation,s:setSaturation,mn:0, mx:200,d:100,u:'%'},
                    {l:'Sharpness', i:'🔪',v:sharpness, s:setSharpness, mn:0, mx:100,d:0,  u:''},
                    {l:'Warmth',    i:'🌅',v:warmth,    s:setWarmth,    mn:0, mx:100,d:0,  u:''},
                    {l:'Exposure',  i:'💡',v:exposure,  s:setExposure,  mn:-40,mx:40,d:0,  u:''},
                  ].map(({l,i,v,s,mn,mx,d,u})=>(
                    <div key={l}>
                      <div className="arow">
                        <span className="al"><span style={{fontSize:'12px'}}>{i}</span>{l}</span>
                        <span className="av" style={{color:v===d?'#6f85a1':'#45a2ff'}}>{v>0&&l==='Exposure'?`+${v}`:v}{u}</span>
                      </div>
                      <input type="range" min={mn} max={mx} step={1} value={v}
                        onChange={e=>s(+e.target.value)}
                        style={{background:slBg(v,mn,mx)}}/>
                    </div>
                  ))}
                  <button className="rst-btn" onClick={resetAdj}>↩ Reset All</button>

                  {/* ── PRINT SETTINGS ── */}
                  <div className="slbl">Paper Size</div>
                  <div style={{display:'flex',flexDirection:'column',gap:'5px',marginBottom:'14px'}}>
                    {Object.entries(PAGE_SIZES).map(([k,v])=>(
                      <button key={k} onClick={()=>setPageSize(k)} className={`page-btn ${pageSize===k?'on':''}`}>
                        <span>{v.label}</span>
                        {pageSize===k&&<span style={{fontSize:'11px'}}>✓</span>}
                      </button>
                    ))}
                  </div>

                  <button className="gen-btn" onClick={generate} disabled={!imgInfo||processing}>
                    {processing?<><span className="spin">⚙️</span>...</>:'⚡ Generate Photo'}
                  </button>
                </div>
              )}
            </div>

            {/* ── RIGHT ── */}
            <div className="right-rail" style={{display:'flex',flexDirection:'column',gap:'10px'}}>

              {/* Sizes */}
              <div className="card a5">
                <div className="ch">
                  <div className="ci" style={{background:'rgba(0,201,255,.1)',border:'1px solid rgba(0,201,255,.2)'}}>📋</div>
                  <div><div className="ct">Photo Sizes</div><div className="cs">Country standards</div></div>
                </div>
                <div className="tabrow">
                  {['India','International','Standard'].map(t=>(
                    <button key={t} className={`tab ${activeTab===t?'on':''}`} onClick={()=>setActiveTab(t)}>{t}</button>
                  ))}
                </div>
                <div className="pgrid">
                  {SIZES.filter(sz=>sz.cat===activeTab).map(sz=>{
                    const gi=SIZES.indexOf(sz);
                    return (
                      <div key={sz.label} className={`pst ${activeSize===gi?'on':''}`}
                        style={activeSize===gi?{borderColor:`${sz.color}40`,background:`${sz.color}07`}:{}}
                        onClick={()=>setActiveSize(gi)}>
                        <div className="pst-l">
                          <div className="pst-dot" style={{background:sz.color}}/>
                          <div>
                            <div className="pst-name" style={activeSize===gi?{color:sz.color}:{}}>{sz.label}</div>
                            <div className="pst-dim">{sz.w}×{sz.h}mm</div>
                          </div>
                        </div>
                        {activeSize===gi&&<div style={{fontSize:'11px',color:sz.color}}>✓</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {imgInfo && (
                <div className="card a5">
                  <div className="ch">
                    <div className="ci" style={{background:'rgba(77,150,255,.1)',border:'1px solid rgba(77,150,255,.22)'}}>🧾</div>
                    <div><div className="ct">Sheet Preview</div><div className="cs">Print layout</div></div>
                  </div>
                  <div className="sheet-preview-box">
                    <div className="sheet-layout-head">
                      <div className="sheet-preview-title" style={{marginBottom:0}}>Layout Controls</div>
                      <div className="sheet-layout-badge">{totalPhotos} total photos</div>
                    </div>
                    <div className="sheet-layout-grid">
                      <div>
                        <div className="sheet-layout-col-label">Columns</div>
                        <div className="count-grid">
                          {[1,2,3,4].map(n=>(
                            <button key={n} onClick={()=>setSheetCols(n)} className={`mini-count-btn ${sheetCols===n?'on':''}`}>
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="sheet-layout-col-label">Rows</div>
                        <div className="count-grid">
                          {[1,2,3,4,5,6].map(n=>(
                            <button key={n} onClick={()=>setSheetRows(n)} className={`mini-count-btn ${sheetRows===n?'on':''}`}>
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="sheet-preview-title">Current Sheet</div>
                    <div style={{display:'grid',gridTemplateColumns:`repeat(${sheetCols},1fr)`,gap:'3px',marginBottom:'6px'}}>
                      {Array.from({length:sheetCols*sheetRows}).map((_,idx)=>(
                        <div key={idx} style={{
                          background:'rgba(0,201,255,.1)',
                          border:'1px solid rgba(0,201,255,.2)',
                          borderRadius:'3px',
                          aspectRatio:`${SIZES[activeSize].w}/${SIZES[activeSize].h}`,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:'10px',opacity:.8,
                        }}>👤</div>
                      ))}
                    </div>
                    <div className="sheet-preview-foot">
                      {sheetCols}×{sheetRows} = <span className="count-accent">{totalPhotos} photos</span> · {PAGE_SIZES[pageSize].label}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
