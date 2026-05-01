'use client'
import { useEffect } from 'react'

export default function InvoiceGenerator() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    script.onload = () => initApp()
    document.head.appendChild(script)
    return () => { try { document.head.removeChild(link) } catch{} }
  }, [])
  return (
    <div id="inv-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div id="inv-app">
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,height:'100vh',color:'rgba(255,255,255,.4)',fontSize:14}}>
          <div style={{width:20,height:20,border:'2px solid rgba(255,107,107,.2)',borderTopColor:'#FF6B6B',borderRadius:'50%',animation:'spin .8s linear infinite'}}/>
          Loading Invoice Studio…
        </div>
      </div>
    </div>
  )
}

const CSS = `
@keyframes spin{to{transform:rotate(360deg)}}
*{box-sizing:border-box;margin:0;padding:0}
#inv-root{font-family:'Inter',sans-serif;background:#0A0C14;color:#E8EBF4;min-height:100vh}
#inv-app{display:flex;flex-direction:column;min-height:100vh}
.inv-topbar{display:flex;align-items:center;justify-content:space-between;padding:0 20px;height:56px;background:#0D1020;border-bottom:1px solid rgba(255,255,255,.07);position:sticky;top:0;z-index:100}
.inv-logo{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px}
.inv-logo-badge{background:linear-gradient(135deg,#FF6B6B,#FF8E53);color:#fff;padding:3px 8px;border-radius:7px;font-size:12px;font-weight:700;box-shadow:0 3px 10px rgba(255,107,107,.35)}
.inv-topbar-actions{display:flex;gap:8px;align-items:center}
.inv-saved-badge{font-size:11px;color:#4ECDC4;display:flex;align-items:center;gap:4px;transition:opacity .3s}
.btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:600;border-radius:10px;transition:all .15s;display:inline-flex;align-items:center;gap:6px}
.btn-ghost{background:rgba(255,255,255,.05);color:rgba(255,255,255,.6);padding:7px 14px;font-size:12px;border:1px solid rgba(255,255,255,.1)}
.btn-ghost:hover{background:rgba(255,255,255,.09);color:#fff}
.btn-teal{background:rgba(78,205,196,.12);color:#4ECDC4;padding:7px 14px;font-size:12px;border:1px solid rgba(78,205,196,.25)}
.btn-teal:hover{background:rgba(78,205,196,.2)}
.btn-primary{background:linear-gradient(135deg,#FF6B6B,#FF8E53);color:#fff;padding:8px 18px;font-size:13px;box-shadow:0 3px 14px rgba(255,107,107,.35)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(255,107,107,.45)}
.btn-primary:disabled{opacity:.5;transform:none;cursor:default}
.btn-sm{padding:5px 10px!important;font-size:11px!important;border-radius:7px!important}
.inv-main{display:flex;flex:1;height:calc(100vh - 56px)}
.inv-editor{width:50%;overflow-y:auto;background:#0D1020;border-right:1px solid rgba(255,255,255,.07);scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent}
.inv-preview-panel{width:50%;overflow-y:auto;background:#090C18;display:flex;flex-direction:column}
.inv-section{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.06)}
.inv-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:14px;display:flex;align-items:center;gap:7px}
.inv-section-title::after{content:'';flex:1;height:1px;background:rgba(255,255,255,.06)}
.inv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.inv-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.inv-field{display:flex;flex-direction:column;gap:5px}
.inv-label{font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.38)}
.inv-input,.inv-select,.inv-textarea{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09);border-radius:9px;padding:9px 12px;font-size:13px;color:#E8EBF4;font-family:'Inter',sans-serif;outline:none;width:100%;transition:all .15s}
.inv-input:focus,.inv-select:focus,.inv-textarea:focus{border-color:#FF6B6B;background:rgba(255,107,107,.05);box-shadow:0 0 0 3px rgba(255,107,107,.1)}
.inv-textarea{resize:vertical;min-height:70px;line-height:1.5}
.inv-select option{background:#1A2235}
.inv-color-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:4px}
.inv-color-dot{width:22px;height:22px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .15s;flex-shrink:0}
.inv-color-dot:hover{transform:scale(1.2)}
.inv-color-dot.active{border-color:rgba(255,255,255,.7);transform:scale(1.1)}
.inv-color-picker{width:32px;height:32px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:none;cursor:pointer;padding:2px}
.inv-logo-upload{display:flex;align-items:center;gap:12px}
.inv-logo-preview{width:64px;height:64px;border-radius:10px;border:1px dashed rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;overflow:hidden;background:rgba(255,255,255,.03);cursor:pointer;font-size:22px;flex-shrink:0}
.inv-logo-preview img{width:100%;height:100%;object-fit:contain}
.inv-templates{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.inv-tmpl-btn{padding:10px 6px;border-radius:10px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);cursor:pointer;text-align:center;font-size:10px;font-weight:600;color:rgba(255,255,255,.45);font-family:'Inter',sans-serif;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:4px}
.inv-tmpl-btn .tmpl-icon{font-size:18px}
.inv-tmpl-btn.active{border-color:#FF6B6B;background:rgba(255,107,107,.1);color:#FF6B6B}
.inv-tmpl-btn:hover:not(.active){border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7)}
.inv-items-header-row{display:grid;gap:8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.3);padding:0 2px;margin-bottom:6px}
.inv-item-remove{background:none;border:none;color:rgba(239,68,68,.45);cursor:pointer;font-size:18px;padding:0 2px;transition:color .15s;flex-shrink:0}
.inv-item-remove:hover{color:#EF4444}
.inv-item-remove:disabled{opacity:.25;cursor:default}
.inv-add-item{width:100%;margin-top:4px;background:rgba(255,255,255,.03);border:1px dashed rgba(255,107,107,.25);color:#FF6B6B;border-radius:9px;padding:9px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s}
.inv-add-item:hover{background:rgba(255,107,107,.07);border-color:rgba(255,107,107,.5)}
.inv-totals{background:rgba(255,255,255,.03);border-radius:12px;padding:14px;margin-top:8px}
.inv-total-row{display:flex;justify-content:space-between;align-items:center;padding:5px 0;font-size:13px;color:rgba(255,255,255,.6);border-bottom:1px solid rgba(255,255,255,.05)}
.inv-total-row:last-child{border-bottom:none;font-size:15px;font-weight:700;color:#FF6B6B;padding-top:10px}
.inv-total-row.discount-row{color:#4ECDC4}
.inv-toggle{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.6);cursor:pointer}
.inv-toggle input[type=checkbox]{accent-color:#FF6B6B;width:15px;height:15px;cursor:pointer}
.inv-preview-toolbar{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:#0D1020;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0}
.inv-zoom-btns{display:flex;gap:4px}
.inv-zoom-btn{padding:4px 9px;border-radius:6px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.45);font-size:11px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s}
.inv-zoom-btn.active{background:#FF6B6B;border-color:#FF6B6B;color:#fff}
.inv-zoom-btn:hover:not(.active){color:#fff}
.inv-preview-canvas{flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:28px 20px;background:#090C18;background-image:radial-gradient(circle,rgba(255,255,255,.03) 1px,transparent 1px);background-size:20px 20px}
.inv-preview-scale{transform-origin:top center;transition:transform .2s}
.inv-toast{position:fixed;bottom:20px;right:20px;z-index:9999;background:#1A2235;border:1px solid rgba(255,255,255,.12);padding:11px 18px;border-radius:10px;font-size:13px;font-family:'Inter',sans-serif;box-shadow:0 8px 32px rgba(0,0,0,.5);display:flex;align-items:center;gap:8px;transform:translateY(80px);opacity:0;transition:all .3s cubic-bezier(.4,0,.2,1);pointer-events:none}
.inv-toast.show{transform:translateY(0);opacity:1}
.inv-toast-icon{color:#4ECDC4;font-size:15px}
.inv-doc{width:794px;min-height:1050px;background:#fff;font-family:'Inter',sans-serif;color:#1a1a2e;position:relative;overflow:hidden}
.inv-table{width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px}
.inv-table thead th{padding:10px 12px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em}
.inv-table tbody td{padding:12px 12px;border-bottom:1px solid #f0f0f0;vertical-align:top;word-break:break-word}
.inv-table tbody tr:last-child td{border-bottom:none}
.inv-summary{display:flex;justify-content:flex-end;margin-bottom:4px}
.inv-summary-box{width:260px}
.inv-summary-row{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;border-bottom:1px solid #f0f0f0}
.inv-summary-row:last-child{border-bottom:none;font-size:15px;font-weight:700;padding-top:10px}
.inv-summary-row .label{color:#666}
.inv-parties{display:flex;justify-content:space-between;gap:20px;margin-bottom:24px;font-size:13px}
.inv-party h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px}
.inv-party p{margin:2px 0;line-height:1.5;word-break:break-word}
.inv-party .party-name{font-size:14px;font-weight:700;color:#1a1a2e;margin-bottom:4px}
.inv-meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12px}
.inv-meta-row{display:flex;flex-direction:column}
.inv-meta-row .meta-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#999;margin-bottom:2px}
.inv-meta-row .meta-value{font-weight:600;color:#1a1a2e}
.inv-status{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
.inv-notes-section{margin-top:16px;padding-top:14px;border-top:1px solid #eee;font-size:12px;color:#555;line-height:1.7}
.inv-notes-section h5{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px}
.inv-qr-box{width:70px;height:70px;border:2px solid #eee;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#ccc;text-align:center;line-height:1.4;flex-shrink:0}
@media print{.inv-topbar,.inv-editor,.inv-preview-toolbar{display:none!important}.inv-preview-panel{width:100%;overflow:visible}.inv-preview-canvas{padding:0;background:white}.inv-preview-scale{transform:none!important}}
`

function initApp() {
  const root = document.getElementById('inv-app')
  if (!root) return

  const CURRENCIES = [
    {code:'INR',symbol:'₹'},{code:'USD',symbol:'$'},{code:'EUR',symbol:'€'},
    {code:'GBP',symbol:'£'},{code:'AED',symbol:'د.إ'},{code:'SGD',symbol:'S$'},
    {code:'JPY',symbol:'¥'},{code:'CAD',symbol:'C$'},{code:'AUD',symbol:'A$'},
  ]
  const STATUS_OPTS = [
    {val:'draft',label:'Draft',color:'#9CA3AF',bg:'rgba(156,163,175,.15)'},
    {val:'pending',label:'Pending',color:'#F59E0B',bg:'rgba(245,158,11,.15)'},
    {val:'paid',label:'Paid',color:'#10B981',bg:'rgba(16,185,129,.15)'},
    {val:'overdue',label:'Overdue',color:'#EF4444',bg:'rgba(239,68,68,.15)'},
    {val:'cancelled',label:'Cancelled',color:'#6B7280',bg:'rgba(107,114,128,.15)'},
  ]
  const ACCENTS = ['#FF6B6B','#4ECDC4','#3B82F6','#8B5CF6','#10B981','#F59E0B','#EC4899','#1E293B']

  function defaultState() {
    return {
      template:'modern', accentColor:'#FF6B6B',
      fromName:'',fromEmail:'',fromPhone:'',fromAddress:'',fromCity:'',fromGST:'',fromLogo:null,
      toName:'',toEmail:'',toPhone:'',toAddress:'',toCity:'',toGST:'',
      invoiceNo:'INV-'+new Date().getFullYear()+'-001',
      invoiceDate:new Date().toISOString().split('T')[0],
      dueDate:new Date(Date.now()+30*86400000).toISOString().split('T')[0],
      poNumber:'',paymentTerms:'Net 30',currency:'INR',currencySymbol:'₹',status:'draft',
      items:[{id:1,desc:'Professional Services',qty:1,rate:50000,tax:18}],
      showTax:true,showDiscount:false,discountType:'percent',discountValue:10,
      shipping:0,showShipping:false,roundOff:false,
      bankName:'',accountNo:'',ifsc:'',upiId:'',showBankDetails:true,
      notes:'Thank you for your business! Please make payment within the due date.',
      terms:'Late payments are subject to 2% monthly interest.',
      showNotes:true,showTerms:true,
    }
  }

  let state = (() => { try { return JSON.parse(localStorage.getItem('inv_state_v2')) || defaultState() } catch { return defaultState() } })()
  let zoom = 0.72
  let saveTimer = null

  function save() {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      localStorage.setItem('inv_state_v2', JSON.stringify(state))
      const el = document.getElementById('inv-saved')
      if (el) { el.style.opacity='1'; setTimeout(()=>el.style.opacity='0',2000) }
    }, 700)
  }

  function fmt(n) {
    return state.currencySymbol + '\u00a0' + Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})
  }

  function totals() {
    const sub = state.items.reduce((s,i)=>s+i.qty*i.rate,0)
    const tax = state.showTax ? state.items.reduce((s,i)=>s+i.qty*i.rate*i.tax/100,0) : 0
    const disc = state.showDiscount ? (state.discountType==='percent' ? sub*state.discountValue/100 : +state.discountValue) : 0
    const ship = state.showShipping ? (+state.shipping||0) : 0
    let total = sub+tax-disc+ship
    if (state.roundOff) total = Math.round(total)
    return {sub,tax,disc,ship,total}
  }

  function fmtDate(d) {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) } catch { return d }
  }

  // ── Build pieces ────────────────────────────────────────────────────────────
  function party(nm,em,ph,addr,city,gst,lbl) {
    return `<div class="inv-party">
      <h4>${lbl}</h4>
      <p class="party-name">${nm||'—'}</p>
      ${addr?`<p>${addr}</p>`:''}${city?`<p>${city}</p>`:''}
      ${em?`<p>${em}</p>`:''}${ph?`<p>${ph}</p>`:''}
      ${gst?`<p style="font-size:11px;color:#aaa;margin-top:2px">GST: ${gst}</p>`:''}
    </div>`
  }

  function table() {
    const T=totals()
    return `<table class="inv-table">
      <thead style="background:${state.accentColor}18">
        <tr>
          <th style="color:${state.accentColor};width:44%">#&nbsp;Description</th>
          <th style="color:${state.accentColor};text-align:center;width:10%">Qty</th>
          <th style="color:${state.accentColor};text-align:right;width:18%">Rate</th>
          ${state.showTax?`<th style="color:${state.accentColor};text-align:center;width:10%">Tax</th>`:''}
          <th style="color:${state.accentColor};text-align:right;width:18%">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${state.items.map((it,i)=>`<tr>
          <td><strong style="color:#1a1a2e">${it.desc||'—'}</strong></td>
          <td style="text-align:center;color:#555">${it.qty}</td>
          <td style="text-align:right;color:#555">${fmt(it.rate)}</td>
          ${state.showTax?`<td style="text-align:center;color:#555">${it.tax}%</td>`:''}
          <td style="text-align:right;font-weight:600">${fmt(it.qty*it.rate)}</td>
        </tr>`).join('')}
      </tbody>
    </table>`
  }

  function summary() {
    const T=totals()
    return `<div class="inv-summary"><div class="inv-summary-box">
      <div class="inv-summary-row"><span class="label">Subtotal</span><span>${fmt(T.sub)}</span></div>
      ${state.showTax?`<div class="inv-summary-row"><span class="label">Tax</span><span>${fmt(T.tax)}</span></div>`:''}
      ${state.showDiscount?`<div class="inv-summary-row" style="color:#10B981"><span class="label">Discount</span><span>– ${fmt(T.disc)}</span></div>`:''}
      ${state.showShipping?`<div class="inv-summary-row"><span class="label">Shipping</span><span>${fmt(T.ship)}</span></div>`:''}
      <div class="inv-summary-row" style="border-top:2px solid ${state.accentColor};margin-top:4px">
        <span style="font-weight:700;color:#1a1a2e">Total Due</span>
        <span style="color:${state.accentColor}">${fmt(T.total)}</span>
      </div>
    </div></div>`
  }

  function bank() {
    if (!state.showBankDetails||(!state.bankName&&!state.upiId)) return ''
    return `<div class="inv-notes-section" style="display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start">
      <div><h5>Payment Details</h5>
        ${state.bankName?`<p><strong>Bank:</strong> ${state.bankName}</p>`:''}
        ${state.accountNo?`<p><strong>A/C:</strong> ${state.accountNo}</p>`:''}
        ${state.ifsc?`<p><strong>IFSC:</strong> ${state.ifsc}</p>`:''}
        ${state.upiId?`<p><strong>UPI:</strong> ${state.upiId}</p>`:''}
      </div>
      ${state.upiId?`<div class="inv-qr-box">QR Code<br><span style="font-size:7px">${state.upiId}</span></div>`:''}
    </div>`
  }

  function notes() {
    return [
      state.showNotes&&state.notes?`<div class="inv-notes-section"><h5>Notes</h5><p>${state.notes}</p></div>`:'',
      state.showTerms&&state.terms?`<div class="inv-notes-section"><h5>Terms & Conditions</h5><p>${state.terms}</p></div>`:'',
    ].join('')
  }

  function statusBadge() {
    const s = STATUS_OPTS.find(x=>x.val===state.status)
    return s ? `<div class="inv-status" style="background:${s.bg};color:${s.color}">${s.label}</div>` : ''
  }

  function metaGrid() {
    return `<div class="inv-meta-grid" style="margin-top:10px">
      <div class="inv-meta-row"><span class="meta-label">Date</span><span class="meta-value">${fmtDate(state.invoiceDate)}</span></div>
      <div class="inv-meta-row"><span class="meta-label">Due</span><span class="meta-value" style="color:${state.accentColor}">${fmtDate(state.dueDate)}</span></div>
      ${state.paymentTerms?`<div class="inv-meta-row"><span class="meta-label">Terms</span><span class="meta-value">${state.paymentTerms}</span></div>`:''}
      ${state.poNumber?`<div class="inv-meta-row"><span class="meta-label">PO#</span><span class="meta-value">${state.poNumber}</span></div>`:''}
    </div>`
  }

  // ── Templates ───────────────────────────────────────────────────────────────
  function invoiceDoc() {
    if (state.template==='classic') return classicDoc()
    if (state.template==='minimal') return minimalDoc()
    if (state.template==='bold')    return boldDoc()
    return modernDoc()
  }

  function modernDoc() {
    return `<div class="inv-doc" id="inv-document">
      <div style="height:5px;background:linear-gradient(90deg,${state.accentColor},${state.accentColor}66)"></div>
      <div style="padding:32px 44px 24px;display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          ${state.fromLogo?`<img src="${state.fromLogo}" style="max-height:52px;max-width:150px;object-fit:contain;margin-bottom:10px;display:block">`:''}
          <div style="font-size:22px;font-weight:800;color:#1a1a2e;font-family:'Space Grotesk',sans-serif">${state.fromName||'Your Business'}</div>
          <div style="font-size:12px;color:#888;margin-top:2px;line-height:1.8">
            ${[state.fromEmail,state.fromPhone,state.fromAddress,state.fromCity].filter(Boolean).join(' &middot; ')}
          </div>
          ${state.fromGST?`<div style="font-size:11px;color:#aaa;margin-top:3px">GST: ${state.fromGST}</div>`:''}
        </div>
        <div style="text-align:right">
          <div style="font-size:34px;font-weight:900;color:${state.accentColor};font-family:'Space Grotesk',sans-serif;letter-spacing:-1px">INVOICE</div>
          <div style="font-size:14px;font-weight:600;color:#555">${state.invoiceNo}</div>
          ${statusBadge()}
          ${metaGrid()}
        </div>
      </div>
      <div style="padding:0 44px 24px">
        <div class="inv-parties">
          ${party(state.fromName,'','','','',' ','From')}
          <div style="width:1px;background:#eee;margin:0 4px"></div>
          ${party(state.toName,state.toEmail,state.toPhone,state.toAddress,state.toCity,state.toGST,'Bill To')}
        </div>
        ${table()}${summary()}${bank()}${notes()}
      </div>
      <div style="margin:16px 44px 0;padding:14px 0;border-top:1px solid #eee;display:flex;justify-content:space-between;font-size:11px;color:#ccc">
        <span>${state.fromName||''}</span><span>Thank you for your business!</span><span>Page 1</span>
      </div>
    </div>`
  }

  function classicDoc() {
    return `<div class="inv-doc" id="inv-document">
      <div style="padding:32px 44px 18px;border-bottom:3px solid ${state.accentColor};display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:14px">
          ${state.fromLogo?`<img src="${state.fromLogo}" style="max-height:46px;max-width:130px;object-fit:contain">`:''}
          <div>
            <div style="font-size:20px;font-weight:800;color:#1a1a2e;font-family:'Space Grotesk',sans-serif">${state.fromName||'Your Company'}</div>
            ${state.fromGST?`<div style="font-size:11px;color:#aaa">GST: ${state.fromGST}</div>`:''}
            <div style="font-size:11px;color:#888">${[state.fromEmail,state.fromPhone].filter(Boolean).join(' · ')}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:28px;font-weight:900;letter-spacing:3px;color:#1a1a2e;font-family:'Space Grotesk',sans-serif">INVOICE</div>
          <div style="font-size:13px;color:${state.accentColor};font-weight:700">${state.invoiceNo}</div>
          ${statusBadge()}
        </div>
      </div>
      <div style="padding:22px 44px">
        <div style="display:flex;justify-content:space-between;margin-bottom:22px;font-size:13px">
          <div>
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px">Bill To</div>
            <div style="font-weight:700;font-size:14px">${state.toName||'—'}</div>
            <div style="color:#555;line-height:1.7">${[state.toAddress,state.toCity,state.toEmail,state.toGST?`GST: ${state.toGST}`:''].filter(Boolean).join('<br>')}</div>
          </div>
          <table style="font-size:13px;border-collapse:collapse;text-align:right">
            <tr><td style="color:#888;padding:3px 0 3px 20px">Invoice Date</td><td style="font-weight:600;padding-left:12px">${fmtDate(state.invoiceDate)}</td></tr>
            <tr><td style="color:#888;padding:3px 0 3px 20px">Due Date</td><td style="font-weight:700;color:${state.accentColor};padding-left:12px">${fmtDate(state.dueDate)}</td></tr>
            ${state.paymentTerms?`<tr><td style="color:#888;padding:3px 0 3px 20px">Terms</td><td style="font-weight:600;padding-left:12px">${state.paymentTerms}</td></tr>`:''}
            ${state.poNumber?`<tr><td style="color:#888;padding:3px 0 3px 20px">PO#</td><td style="font-weight:600;padding-left:12px">${state.poNumber}</td></tr>`:''}
          </table>
        </div>
        ${table()}${summary()}${bank()}${notes()}
      </div>
      <div style="margin:0 44px;padding:12px 0;border-top:2px solid ${state.accentColor}22;font-size:11px;color:#bbb;text-align:center">
        ${state.fromName||'Your Business'} · ${state.fromEmail||''} · Generated by Invoice Studio
      </div>
    </div>`
  }

  function minimalDoc() {
    return `<div class="inv-doc" id="inv-document" style="font-family:'Helvetica Neue',Helvetica,sans-serif">
      <div style="padding:48px 56px 0">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px">
          <div>
            ${state.fromLogo?`<img src="${state.fromLogo}" style="max-height:40px;max-width:130px;object-fit:contain;margin-bottom:12px;display:block">`:''}
            <div style="font-size:16px;font-weight:700;color:#1a1a2e">${state.fromName||'Your Business'}</div>
            <div style="font-size:12px;color:#aaa;margin-top:3px;line-height:1.8">${[state.fromAddress,state.fromCity,state.fromEmail,state.fromPhone].filter(Boolean).join(' · ')}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;font-weight:700;letter-spacing:3px;color:#bbb;text-transform:uppercase">Invoice</div>
            <div style="font-size:30px;font-weight:300;color:#1a1a2e;letter-spacing:-1px">${state.invoiceNo}</div>
            ${statusBadge()}
          </div>
        </div>
        <div style="height:1px;background:#e8e8e8;margin-bottom:28px"></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:28px;font-size:13px">
          <div>
            <div style="font-size:10px;color:#bbb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">Billed To</div>
            <div style="font-weight:600;font-size:14px">${state.toName||'—'}</div>
            <div style="color:#888;line-height:1.7">${[state.toAddress,state.toCity,state.toEmail].filter(Boolean).join('<br>')}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:10px;color:#bbb;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">Details</div>
            <div style="color:#888;line-height:1.7">
              Issue: <strong style="color:#1a1a2e">${fmtDate(state.invoiceDate)}</strong><br>
              Due: <strong style="color:${state.accentColor}">${fmtDate(state.dueDate)}</strong><br>
              ${state.paymentTerms?`Terms: <strong style="color:#1a1a2e">${state.paymentTerms}</strong>`:''}
            </div>
          </div>
        </div>
      </div>
      <div style="padding:0 56px 40px">${table()}${summary()}<div style="height:1px;background:#e8e8e8;margin:16px 0"></div>${bank()}${notes()}</div>
    </div>`
  }

  function boldDoc() {
    const T=totals()
    return `<div class="inv-doc" id="inv-document">
      <div style="background:${state.accentColor};padding:28px 40px;display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          ${state.fromLogo?`<img src="${state.fromLogo}" style="max-height:48px;max-width:140px;object-fit:contain;margin-bottom:8px;display:block;filter:brightness(0) invert(1)">`:''}
          <div style="font-size:24px;font-weight:900;color:#fff;font-family:'Space Grotesk',sans-serif;letter-spacing:-1px">${state.fromName||'Your Business'}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.75);margin-top:4px;line-height:1.7">${[state.fromAddress,state.fromCity,state.fromEmail,state.fromPhone].filter(Boolean).join(' · ')}</div>
          ${state.fromGST?`<div style="font-size:11px;color:rgba(255,255,255,.6);margin-top:4px">GST: ${state.fromGST}</div>`:''}
        </div>
        <div style="text-align:right">
          <div style="font-size:52px;font-weight:900;color:rgba(255,255,255,.18);font-family:'Space Grotesk',sans-serif;line-height:1;letter-spacing:-3px">INV</div>
          <div style="font-size:18px;font-weight:700;color:#fff;margin-top:-6px">${state.invoiceNo}</div>
          <div class="inv-status" style="background:rgba(255,255,255,.2);color:#fff;margin-top:6px;display:inline-flex">${STATUS_OPTS.find(x=>x.val===state.status)?.label||state.status}</div>
        </div>
      </div>
      <div style="background:${state.accentColor}18;padding:12px 40px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px;border-bottom:2px solid ${state.accentColor}22">
        ${[['Invoice Date',fmtDate(state.invoiceDate)],['Due Date',fmtDate(state.dueDate)],['Terms',state.paymentTerms||'—'],['PO #',state.poNumber||'—']].map(([l,v])=>`<div><div style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#999">${l}</div><div style="font-size:12px;font-weight:700;color:#1a1a2e;margin-top:2px">${v}</div></div>`).join('')}
      </div>
      <div style="padding:20px 40px">
        <div style="display:flex;gap:16px;margin-bottom:22px">
          <div style="flex:1;background:${state.accentColor}0D;border-left:3px solid ${state.accentColor};padding:12px 14px;border-radius:0 8px 8px 0">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:${state.accentColor};margin-bottom:6px">From</div>
            <div style="font-weight:700;font-size:13px">${state.fromName||'—'}</div>
            <div style="font-size:12px;color:#666">${[state.fromAddress,state.fromCity].filter(Boolean).join(', ')}</div>
          </div>
          <div style="flex:1;background:#f8f8f8;border-left:3px solid #e0e0e0;padding:12px 14px;border-radius:0 8px 8px 0">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#999;margin-bottom:6px">Bill To</div>
            <div style="font-weight:700;font-size:13px">${state.toName||'—'}</div>
            <div style="font-size:12px;color:#666">${[state.toAddress,state.toCity,state.toEmail].filter(Boolean).join('<br>')}</div>
            ${state.toGST?`<div style="font-size:11px;color:#aaa;margin-top:2px">GST: ${state.toGST}</div>`:''}
          </div>
        </div>
        ${table()}${summary()}${bank()}${notes()}
      </div>
      <div style="background:${state.accentColor}0D;border-top:2px solid ${state.accentColor}22;padding:14px 40px;display:flex;justify-content:space-between;font-size:11px;color:#aaa">
        <span>${state.fromName||''} · ${state.fromEmail||''}</span>
        <span style="font-weight:700;color:${state.accentColor}">Total Due: ${fmt(T.total)}</span>
      </div>
    </div>`
  }

  // ── Build editor ────────────────────────────────────────────────────────────
  function T(x) { const T=totals(); return x(T) }

  function editorHTML() {
    const tot = totals()
    const cols = `2fr 0.7fr 1.1fr ${state.showTax?'0.8fr':''} 1fr 28px`
    return `
    <div class="inv-section">
      <div class="inv-section-title">🎨 Template & Accent</div>
      <div class="inv-templates">
        ${[['modern','Modern','◈'],['classic','Classic','▤'],['minimal','Minimal','▧'],['bold','Bold','◆']].map(([id,nm,ic])=>
          `<button class="inv-tmpl-btn ${state.template===id?'active':''}" data-tmpl="${id}"><span class="tmpl-icon">${ic}</span>${nm}</button>`
        ).join('')}
      </div>
      <div style="margin-top:12px">
        <div class="inv-label" style="margin-bottom:6px">Accent Color</div>
        <div class="inv-color-row">
          ${ACCENTS.map(c=>`<div class="inv-color-dot ${state.accentColor===c?'active':''}" data-color="${c}" style="background:${c}"></div>`).join('')}
          <input type="color" class="inv-color-picker" id="color-custom" value="${state.accentColor}">
        </div>
      </div>
    </div>

    <div class="inv-section">
      <div class="inv-section-title">🏢 Your Business</div>
      <div class="inv-logo-upload" style="margin-bottom:14px">
        <div class="inv-logo-preview" id="logo-preview">${state.fromLogo?`<img src="${state.fromLogo}" alt="">`:'🏷️'}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px">Company Logo</div>
          <div style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:8px">PNG, JPG · click to upload</div>
          <input type="file" id="logo-input" accept="image/*" style="display:none">
          <button class="btn btn-ghost btn-sm" id="logo-btn">Upload</button>
          ${state.fromLogo?`<button class="btn btn-sm" style="background:rgba(239,68,68,.1);color:#EF4444;border:1px solid rgba(239,68,68,.25);margin-left:6px" id="logo-rm">Remove</button>`:''}
        </div>
      </div>
      <div class="inv-grid2">
        <div class="inv-field"><label class="inv-label">Business Name</label><input class="inv-input" data-f="fromName" value="${state.fromName}" placeholder="Your Company Ltd"></div>
        <div class="inv-field"><label class="inv-label">Email</label><input class="inv-input" data-f="fromEmail" value="${state.fromEmail}" placeholder="hello@company.com"></div>
        <div class="inv-field"><label class="inv-label">Phone</label><input class="inv-input" data-f="fromPhone" value="${state.fromPhone}" placeholder="+91 98765 43210"></div>
        <div class="inv-field"><label class="inv-label">GST / Tax No.</label><input class="inv-input" data-f="fromGST" value="${state.fromGST}" placeholder="22AAAAA0000A1Z5"></div>
      </div>
      <div class="inv-field" style="margin-top:10px"><label class="inv-label">Address</label><input class="inv-input" data-f="fromAddress" value="${state.fromAddress}" placeholder="Street address"></div>
      <div class="inv-field" style="margin-top:10px"><label class="inv-label">City, State, Country</label><input class="inv-input" data-f="fromCity" value="${state.fromCity}" placeholder="Mumbai, Maharashtra, India"></div>
    </div>

    <div class="inv-section">
      <div class="inv-section-title">👤 Bill To (Client)</div>
      <div class="inv-grid2">
        <div class="inv-field"><label class="inv-label">Client Name</label><input class="inv-input" data-f="toName" value="${state.toName}" placeholder="Client Company Ltd"></div>
        <div class="inv-field"><label class="inv-label">Email</label><input class="inv-input" data-f="toEmail" value="${state.toEmail}" placeholder="billing@client.com"></div>
        <div class="inv-field"><label class="inv-label">Phone</label><input class="inv-input" data-f="toPhone" value="${state.toPhone}" placeholder="+91 12345 67890"></div>
        <div class="inv-field"><label class="inv-label">GST / Tax No.</label><input class="inv-input" data-f="toGST" value="${state.toGST}" placeholder="Client GST number"></div>
      </div>
      <div class="inv-field" style="margin-top:10px"><label class="inv-label">Address</label><input class="inv-input" data-f="toAddress" value="${state.toAddress}" placeholder="Client address"></div>
      <div class="inv-field" style="margin-top:10px"><label class="inv-label">City, State, Country</label><input class="inv-input" data-f="toCity" value="${state.toCity}" placeholder="Delhi, India"></div>
    </div>

    <div class="inv-section">
      <div class="inv-section-title">📋 Invoice Details</div>
      <div class="inv-grid2" style="margin-bottom:10px">
        <div class="inv-field"><label class="inv-label">Invoice Number</label><input class="inv-input" data-f="invoiceNo" value="${state.invoiceNo}" placeholder="INV-2024-001"></div>
        <div class="inv-field"><label class="inv-label">PO Number</label><input class="inv-input" data-f="poNumber" value="${state.poNumber}" placeholder="PO-12345"></div>
        <div class="inv-field"><label class="inv-label">Invoice Date</label><input class="inv-input" type="date" data-f="invoiceDate" value="${state.invoiceDate}"></div>
        <div class="inv-field"><label class="inv-label">Due Date</label><input class="inv-input" type="date" data-f="dueDate" value="${state.dueDate}"></div>
      </div>
      <div class="inv-grid3">
        <div class="inv-field"><label class="inv-label">Currency</label>
          <select class="inv-select" id="cur-sel">${CURRENCIES.map(c=>`<option value="${c.code}" ${state.currency===c.code?'selected':''}>${c.code} – ${c.symbol}</option>`).join('')}</select>
        </div>
        <div class="inv-field"><label class="inv-label">Payment Terms</label>
          <select class="inv-select" data-f="paymentTerms">${['Due on Receipt','Net 7','Net 15','Net 30','Net 45','Net 60'].map(t=>`<option ${state.paymentTerms===t?'selected':''}>${t}</option>`).join('')}</select>
        </div>
        <div class="inv-field"><label class="inv-label">Status</label>
          <select class="inv-select" data-f="status">${STATUS_OPTS.map(s=>`<option value="${s.val}" ${state.status===s.val?'selected':''}>${s.label}</option>`).join('')}</select>
        </div>
      </div>
    </div>

    <div class="inv-section">
      <div class="inv-section-title">📦 Line Items</div>
      <div style="display:grid;grid-template-columns:${cols};gap:8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:rgba(255,255,255,.3);padding:0 2px;margin-bottom:6px">
        <span>Description</span><span>Qty</span><span>Rate</span>${state.showTax?'<span>Tax%</span>':''}<span style="text-align:right">Amount</span><span></span>
      </div>
      <div id="items-wrap">
        ${state.items.map((it,i)=>`
          <div style="display:grid;grid-template-columns:${cols};gap:8px;margin-bottom:8px;align-items:center">
            <input class="inv-input" data-i="${i}" data-p="desc" value="${it.desc}" placeholder="Description" style="padding:8px 10px;font-size:12px">
            <input class="inv-input" data-i="${i}" data-p="qty" type="number" value="${it.qty}" min="0" style="padding:8px 10px;font-size:12px">
            <input class="inv-input" data-i="${i}" data-p="rate" type="number" value="${it.rate}" min="0" style="padding:8px 10px;font-size:12px">
            ${state.showTax?`<input class="inv-input" data-i="${i}" data-p="tax" type="number" value="${it.tax}" min="0" max="100" style="padding:8px 10px;font-size:12px">`:''}
            <div style="text-align:right;font-size:12px;font-weight:600;color:rgba(255,255,255,.7);white-space:nowrap">${fmt(it.qty*it.rate)}</div>
            <button class="inv-item-remove" data-rm="${i}" ${state.items.length===1?'disabled':''}>×</button>
          </div>`).join('')}
      </div>
      <button class="inv-add-item" id="add-item">+ Add Line Item</button>
      <div style="display:flex;gap:14px;margin-top:12px;flex-wrap:wrap">
        <label class="inv-toggle"><input type="checkbox" id="t-tax" ${state.showTax?'checked':''}>Tax</label>
        <label class="inv-toggle"><input type="checkbox" id="t-disc" ${state.showDiscount?'checked':''}>Discount</label>
        <label class="inv-toggle"><input type="checkbox" id="t-ship" ${state.showShipping?'checked':''}>Shipping</label>
        <label class="inv-toggle"><input type="checkbox" id="t-round" ${state.roundOff?'checked':''}>Round Off</label>
      </div>
      ${state.showDiscount?`<div style="display:flex;gap:8px;margin-top:10px;align-items:center"><span style="font-size:12px;color:rgba(255,255,255,.5);min-width:65px">Discount:</span><select class="inv-select" data-f="discountType" style="width:110px"><option value="percent" ${state.discountType==='percent'?'selected':''}>% Percent</option><option value="flat" ${state.discountType==='flat'?'selected':''}>Flat</option></select><input class="inv-input" data-f="discountValue" type="number" value="${state.discountValue}" style="width:90px"></div>`:''}
      ${state.showShipping?`<div style="display:flex;gap:8px;margin-top:10px;align-items:center"><span style="font-size:12px;color:rgba(255,255,255,.5);min-width:65px">Shipping:</span><input class="inv-input" data-f="shipping" type="number" value="${state.shipping}" style="width:130px"></div>`:''}
      <div class="inv-totals">
        <div class="inv-total-row"><span>Subtotal</span><span>${fmt(tot.sub)}</span></div>
        ${state.showTax?`<div class="inv-total-row"><span>Tax</span><span>${fmt(tot.tax)}</span></div>`:''}
        ${state.showDiscount?`<div class="inv-total-row discount-row"><span>Discount</span><span>– ${fmt(tot.disc)}</span></div>`:''}
        ${state.showShipping?`<div class="inv-total-row"><span>Shipping</span><span>${fmt(tot.ship)}</span></div>`:''}
        <div class="inv-total-row"><span>Total Due</span><span>${fmt(tot.total)}</span></div>
      </div>
    </div>

    <div class="inv-section">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div class="inv-section-title" style="margin-bottom:0">🏦 Bank Details</div>
        <label class="inv-toggle"><input type="checkbox" id="t-bank" ${state.showBankDetails?'checked':''}>Show</label>
      </div>
      ${state.showBankDetails?`<div class="inv-grid2">
        <div class="inv-field"><label class="inv-label">Bank Name</label><input class="inv-input" data-f="bankName" value="${state.bankName}" placeholder="HDFC Bank"></div>
        <div class="inv-field"><label class="inv-label">Account Number</label><input class="inv-input" data-f="accountNo" value="${state.accountNo}" placeholder="1234567890"></div>
        <div class="inv-field"><label class="inv-label">IFSC Code</label><input class="inv-input" data-f="ifsc" value="${state.ifsc}" placeholder="HDFC0001234"></div>
        <div class="inv-field"><label class="inv-label">UPI ID</label><input class="inv-input" data-f="upiId" value="${state.upiId}" placeholder="name@upi"></div>
      </div>`:''}
    </div>

    <div class="inv-section">
      <div class="inv-section-title">📝 Notes & Terms</div>
      <div style="display:flex;gap:14px;margin-bottom:12px;flex-wrap:wrap">
        <label class="inv-toggle"><input type="checkbox" id="t-notes" ${state.showNotes?'checked':''}>Notes</label>
        <label class="inv-toggle"><input type="checkbox" id="t-terms" ${state.showTerms?'checked':''}>Terms</label>
      </div>
      ${state.showNotes?`<div class="inv-field" style="margin-bottom:10px"><label class="inv-label">Notes</label><textarea class="inv-textarea" data-f="notes">${state.notes}</textarea></div>`:''}
      ${state.showTerms?`<div class="inv-field"><label class="inv-label">Terms & Conditions</label><textarea class="inv-textarea" data-f="terms">${state.terms}</textarea></div>`:''}
    </div>
    <div style="height:32px"></div>`
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  function render() {
    const scroll = document.querySelector('.inv-editor')?.scrollTop || 0
    root.innerHTML = `
      <div class="inv-topbar">
        <div class="inv-logo"><span class="inv-logo-badge">INV</span>Invoice Studio</div>
        <div class="inv-topbar-actions">
          <span class="inv-saved-badge" id="inv-saved" style="opacity:0">✓ Saved</span>
          <button class="btn btn-ghost" id="btn-new">+ New</button>
          <button class="btn btn-teal" id="btn-dup">⧉ Duplicate</button>
          <button class="btn btn-ghost" id="btn-json">JSON</button>
          <button class="btn btn-ghost" id="btn-print">🖨 Print</button>
          <button class="btn btn-primary" id="btn-pdf">⬇️ Export PDF</button>
        </div>
      </div>
      <div class="inv-main">
        <div class="inv-editor" id="editor-scroll">${editorHTML()}</div>
        <div class="inv-preview-panel">
          <div class="inv-preview-toolbar">
            <div style="font-size:11px;color:rgba(255,255,255,.35)">Live Preview</div>
            <div class="inv-zoom-btns">
              ${[0.5,0.65,0.72,0.85].map(z=>`<button class="inv-zoom-btn ${zoom===z?'active':''}" data-z="${z}">${Math.round(z*100)}%</button>`).join('')}
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,.35)">${state.invoiceNo}</div>
          </div>
          <div class="inv-preview-canvas">
            <div id="inv-scale" class="inv-preview-scale" style="transform:scale(${zoom})">${invoiceDoc()}</div>
          </div>
        </div>
      </div>
      <div class="inv-toast" id="inv-toast"><span class="inv-toast-icon">✓</span><span id="toast-msg">Saved</span></div>`

    requestAnimationFrame(() => { const ed = document.getElementById('editor-scroll'); if (ed) ed.scrollTop = scroll })
    bind()
  }

  function previewOnly() {
    const sc = document.getElementById('inv-scale')
    if (sc) sc.innerHTML = invoiceDoc()
  }

  // ── Bind ────────────────────────────────────────────────────────────────────
  function bind() {
    const G = id => document.getElementById(id)

    // State fields
    document.querySelectorAll('[data-f]').forEach(el => {
      el.addEventListener(el.tagName==='TEXTAREA'?'input':'change', e => {
        state[e.target.dataset.f] = e.target.value
        previewOnly(); save()
      })
      if (el.tagName==='INPUT') el.addEventListener('input', e => {
        state[e.target.dataset.f] = e.target.value
        previewOnly(); save()
      })
    })

    // Items
    document.querySelectorAll('[data-i]').forEach(el => {
      el.addEventListener('input', e => {
        const i=+e.target.dataset.i, p=e.target.dataset.p
        state.items[i][p] = p==='desc' ? e.target.value : +e.target.value
        previewOnly(); save()
        // Update amount display
        const rows = document.querySelectorAll('#items-wrap > div')
        if (rows[i]) {
          const amtEl = rows[i].querySelectorAll('div')[0]
          if (amtEl) amtEl.textContent = fmt(state.items[i].qty * state.items[i].rate)
        }
      })
    })
    document.querySelectorAll('[data-rm]').forEach(btn => {
      btn.addEventListener('click', e => {
        if (state.items.length > 1) { state.items.splice(+e.currentTarget.dataset.rm, 1); render(); save() }
      })
    })
    G('add-item')?.addEventListener('click', () => {
      state.items.push({id:Date.now(),desc:'',qty:1,rate:0,tax:18}); render(); save()
    })

    // Templates
    document.querySelectorAll('[data-tmpl]').forEach(b => b.addEventListener('click', e => {
      state.template = e.currentTarget.dataset.tmpl; render(); save()
    }))

    // Colors
    document.querySelectorAll('.inv-color-dot').forEach(d => d.addEventListener('click', e => {
      state.accentColor = e.currentTarget.dataset.color; render(); save()
    }))
    G('color-custom')?.addEventListener('input', e => { state.accentColor = e.target.value; previewOnly(); save() })

    // Currency
    G('cur-sel')?.addEventListener('change', e => {
      const c = CURRENCIES.find(x=>x.code===e.target.value)
      if (c) { state.currency=c.code; state.currencySymbol=c.symbol; previewOnly(); save() }
    })

    // Toggles
    [['t-tax','showTax'],['t-disc','showDiscount'],['t-ship','showShipping'],['t-round','roundOff'],['t-bank','showBankDetails'],['t-notes','showNotes'],['t-terms','showTerms']].forEach(([id,f]) => {
      G(id)?.addEventListener('change', e => { state[f]=e.target.checked; render(); save() })
    })

    // Logo
    G('logo-btn')?.addEventListener('click', () => G('logo-input')?.click())
    G('logo-preview')?.addEventListener('click', () => G('logo-input')?.click())
    G('logo-input')?.addEventListener('change', e => {
      const f=e.target.files[0]; if (!f) return
      const r=new FileReader(); r.onload=ev=>{state.fromLogo=ev.target.result;render();save()}; r.readAsDataURL(f)
    })
    G('logo-rm')?.addEventListener('click', () => { state.fromLogo=null; render(); save() })

    // Zoom
    document.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', e => {
      zoom = +e.currentTarget.dataset.z
      const sc = G('inv-scale'); if (sc) sc.style.transform = `scale(${zoom})`
      document.querySelectorAll('.inv-zoom-btn').forEach(x => x.classList.toggle('active', +x.dataset.z===zoom))
    }))

    // Toolbar
    G('btn-new')?.addEventListener('click', () => { if (confirm('New invoice? Current data is saved in browser.')) { state=defaultState(); render(); save() } })
    G('btn-dup')?.addEventListener('click', () => { state=JSON.parse(JSON.stringify(state)); state.invoiceNo+='(copy)'; render(); save(); toast('Duplicated!') })
    G('btn-json')?.addEventListener('click', () => {
      const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'})
      const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=`${state.invoiceNo||'invoice'}.json`; a.click()
    })
    G('btn-print')?.addEventListener('click', () => window.print())
    G('btn-pdf')?.addEventListener('click', exportPDF)
  }

  // ── Export PDF ──────────────────────────────────────────────────────────────
  async function exportPDF() {
    const btn = document.getElementById('btn-pdf')
    if (btn) { btn.disabled=true; btn.textContent='⏳ Exporting…' }
    try {
      const el = document.getElementById('inv-document')
      if (!el||!window.html2canvas) { alert('html2canvas not loaded yet. Please wait.'); return }

      // Load jsPDF
      let jsPDFCls
      if (window.jspdf?.jsPDF) { jsPDFCls = window.jspdf.jsPDF }
      else {
        await new Promise((res,rej) => {
          const s=document.createElement('script')
          s.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
          s.onload=res; s.onerror=rej; document.head.appendChild(s)
        })
        jsPDFCls = window.jspdf?.jsPDF
      }
      if (!jsPDFCls) { alert('jsPDF not loaded.'); return }

      // Clone at 1:1
      const wrap = document.createElement('div')
      wrap.style.cssText='position:absolute;top:0;left:-9999px;background:#fff;z-index:-1;width:794px'
      wrap.appendChild(el.cloneNode(true))
      document.body.appendChild(wrap)
      await new Promise(r=>setTimeout(r,200))

      const canvas = await window.html2canvas(wrap, {
        scale:2.5, useCORS:true, backgroundColor:'#ffffff', logging:false,
        width:794, height:wrap.scrollHeight, windowWidth:794,
      })
      document.body.removeChild(wrap)

      const pdf = new jsPDFCls({orientation:'portrait',unit:'mm',format:'a4'})
      const W=210, H=297
      const imgH = W*(canvas.height/canvas.width)
      if (imgH<=H) { pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,W,imgH) }
      else {
        const ppx=Math.floor(canvas.width*(H/W)); let y=0
        while(y<canvas.height) {
          if(y>0) pdf.addPage()
          const h=Math.min(ppx,canvas.height-y)
          const pg=document.createElement('canvas'); pg.width=canvas.width; pg.height=h
          pg.getContext('2d').drawImage(canvas,0,y,canvas.width,h,0,0,canvas.width,h)
          pdf.addImage(pg.toDataURL('image/png'),'PNG',0,0,W,h*W/canvas.width)
          y+=ppx
        }
      }
      pdf.save(`${state.invoiceNo||'invoice'}.pdf`)
      toast('PDF exported! ✓')
    } catch(err) { console.error(err); alert('PDF export failed. Try again.') }
    if (btn) { btn.disabled=false; btn.innerHTML='⬇️ Export PDF' }
  }

  let toastT = null
  function toast(msg) {
    const el=document.getElementById('inv-toast'), me=document.getElementById('toast-msg')
    if (!el||!me) return
    me.textContent=msg; el.classList.add('show')
    clearTimeout(toastT); toastT=setTimeout(()=>el.classList.remove('show'),2500)
  }

  render()
}