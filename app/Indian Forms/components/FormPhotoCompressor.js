"use client";

import { useEffect, useState } from "react";
import { getFormById } from "../lib/formSpecs";
import { searchForms } from "../lib/searchForms";
import { processImageForSpec } from "../lib/imageProcessor";

function formatKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

function SpecText({ spec }) {
  if (!spec) return null;
  return <span>{spec.width} × {spec.height}px · {spec.minKB}–{spec.maxKB} KB · JPEG</span>;
}

export default function FormPhotoCompressor() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [signaturePreview, setSignaturePreview] = useState("");
  const [photoInfo, setPhotoInfo] = useState(null);
  const [signatureInfo, setSignatureInfo] = useState(null);
  const [results, setResults] = useState({});
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [removeBackground, setRemoveBackground] = useState(false);

  useEffect(() => setMatches(searchForms(query)), [query]);
  usePreview(photoFile, setPhotoPreview);
  usePreview(signatureFile, setSignaturePreview);

  function chooseForm(id) {
    const form = getFormById(id);
    setSelectedForm(form);
    setRemoveBackground(Boolean(form.spec.requiresWhiteBg));
    setPhotoFile(null); setSignatureFile(null); setPhotoInfo(null); setSignatureInfo(null);
    setQuery(""); setMatches([]); setResults({}); setError("");
  }

  async function processUploads() {
    if (!selectedForm || (!photoFile && !signatureFile)) return;
    setError(""); setIsProcessing(true);
    try {
      const nextResults = {};
      if (photoFile) nextResults.photo = { ...(await processImageForSpec(photoFile, selectedForm.spec, { removeBackground })), input: photoInfo, target: selectedForm.spec };
      if (signatureFile && selectedForm.signatureSpec) nextResults.signature = { ...(await processImageForSpec(signatureFile, selectedForm.signatureSpec)), input: signatureInfo, target: selectedForm.signatureSpec };
      setResults(nextResults);
    } catch (processingError) {
      setError(processingError.message || "Could not process this image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function download(result, name) {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedForm.id + "-" + name + ".jpg";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  const canUploadPhoto = selectedForm && selectedForm.photoUploadAvailable !== false;
  const canProcess = (canUploadPhoto && photoFile) || signatureFile;

  return (
    <section id="photo-compressor" className="tool-card">
      <div className="tool-heading">
        <span className="eyebrow">Private browser tool</span>
        <h1>Indian Form Photo Compressor</h1>
        <p>Prepare upload-ready photos and signatures for Indian forms in three simple steps.</p>
        <div className="trust-row" aria-label="Tool benefits">
          <span><b>110</b> form presets</span><span>No sign-up</span><span>Files stay private</span>
        </div>
        <div className="example-row"><span>Popular forms</span><button type="button" onClick={() => chooseForm("neet-ug")}>NEET UG</button><button type="button" onClick={() => chooseForm("pan-card")}>PAN Card</button><button type="button" onClick={() => chooseForm("sbi-po")}>SBI PO</button><button type="button" onClick={() => chooseForm("ssc-cgl")}>SSC CGL</button></div>
      </div>
      <div className="search-wrap">
        <label htmlFor="form-search"><span>01</span> Choose your form</label>
        <div className="search-input-wrap"><span aria-hidden="true">⌕</span><input id="form-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search NEET, SBI PO, PAN Card, SSC CGL…" autoComplete="off" /></div>
        {matches.length > 0 && <div className="search-results">{matches.map((form) => <button key={form.id} type="button" onClick={() => chooseForm(form.id)}><span>{form.name}</span><small>{form.category}</small></button>)}</div>}
      </div>

      {selectedForm && <div className="form-summary">
        <div><span className="eyebrow">Selected form</span><h2>{selectedForm.name}</h2></div>
        {selectedForm.photoUploadAvailable === false
          ? <p className="notice warning">{selectedForm.notice}</p>
          : <><p><strong>Photo:</strong> <SpecText spec={selectedForm.spec} /></p>{selectedForm.signatureSpec && <p><strong>Signature:</strong> <SpecText spec={selectedForm.signatureSpec} /></p>}</>}
        {selectedForm.notice && selectedForm.photoUploadAvailable !== false && <p className="notice">{selectedForm.notice}</p>}
        <p className="source-note">Requirements can change. Confirm the current official notification before submitting an application.</p>
      </div>}

      {selectedForm && canUploadPhoto && <div className="upload-section">
        <p className="step-label"><span>02</span> Upload your files</p>
        <div className="upload-grid">
        <UploadField label="Photo" file={photoFile} preview={photoPreview} onChange={(file) => { setPhotoFile(file); setPhotoInfo(file ? { name: file.name, bytes: file.size } : null); setResults({}); }} onImageLoad={(image) => setPhotoInfo((current) => current && { ...current, width: image.naturalWidth, height: image.naturalHeight })} />
        {selectedForm.signatureSpec && <UploadField label="Signature" file={signatureFile} preview={signaturePreview} onChange={(file) => { setSignatureFile(file); setSignatureInfo(file ? { name: file.name, bytes: file.size } : null); setResults({}); }} onImageLoad={(image) => setSignatureInfo((current) => current && { ...current, width: image.naturalWidth, height: image.naturalHeight })} />}
        </div>
      </div>}
      {selectedForm && canUploadPhoto && <label className="background-toggle"><input type="checkbox" checked={removeBackground} onChange={(event) => { setRemoveBackground(event.target.checked); setResults({}); }} /><span><strong>Remove background</strong><small>Replace the background with white before resizing. Use only when the form asks for a white background.</small></span></label>}
      {error && <p className="error-message" role="alert">{error}</p>}
      {selectedForm && canUploadPhoto && <button type="button" disabled={isProcessing || !canProcess} onClick={processUploads} className="primary-button"><span>{isProcessing ? "Preparing your files…" : "Prepare upload files"}</span><b aria-hidden="true">→</b></button>}

      {(results.photo || results.signature) && <div className="result-grid">{Object.entries(results).map(([name, result]) => <article key={name} className="result-card">
        <span className="success-badge">Ready to download</span><h3>{name === "photo" ? "Photo" : "Signature"} processed</h3>
        <p>{result.input?.width ? result.input.width + " × " + result.input.height + "px" : "Original dimensions"} · {result.input ? formatKB(result.input.bytes) : "original file"} → {result.target.width} × {result.target.height}px · {result.sizeKB.toFixed(1)} KB</p>
        {!result.inRange && <p className="range-note">Closest size possible; this image cannot reach the specified size range without reducing quality further.</p>}
        <button type="button" onClick={() => download(result, name)} className="secondary-button">Download JPEG</button>
      </article>)}</div>}
    </section>
  );
}

function usePreview(file, setPreview) {
  useEffect(() => {
    if (!file) { setPreview(""); return undefined; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, setPreview]);
}

function UploadField({ label, file, preview, onChange, onImageLoad }) {
  return <label className={"upload-field" + (file ? " uploaded" : "")}><span className="upload-icon" aria-hidden="true">{label === "Photo" ? "▣" : "✎"}</span><strong>{label}</strong><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => onChange(event.target.files[0] || null)} /><small>{file ? file.name + " · " + formatKB(file.size) : "JPEG, PNG, or WebP"}</small>{preview && <img src={preview} alt={label + " preview"} onLoad={(event) => onImageLoad(event.currentTarget)} />}</label>;
}
