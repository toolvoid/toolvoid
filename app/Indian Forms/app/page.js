"use client";

import { useEffect } from 'react';
import FormPhotoCompressor from "../components/FormPhotoCompressor";
import { FORMS } from "../lib/formSpecs";

export default function HomePage() {
  useEffect(() => {
    const previousTheme = document.documentElement.dataset.appTheme;
    const previousBodyTheme = document.body.dataset.appTheme;

    document.documentElement.dataset.appTheme = 'light';
    document.body.dataset.appTheme = 'light';
    document.documentElement.style.colorScheme = 'light';
    document.body.style.background = '#f4f7fb';
    document.body.style.color = '#172033';

    return () => {
      if (previousTheme) {
        document.documentElement.dataset.appTheme = previousTheme;
      } else {
        delete document.documentElement.dataset.appTheme;
      }

      if (previousBodyTheme) {
        document.body.dataset.appTheme = previousBodyTheme;
      } else {
        delete document.body.dataset.appTheme;
      }

      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  const supportedForms = FORMS.map((form) => form.name).join(", ");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Indian Form Photo Compressor",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: "Browser-based photo and signature resizer for Indian application forms.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };

  return (
    <main className="indian-forms-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="hero">
        <div className="shell">
          <p className="hero-brand">FORMREADY INDIA</p>
          <h1>Photo & signature files, ready for your application.</h1>
          <p>Get the right dimensions and file size for popular Indian exams, government forms, banking applications, and IDs.</p>
          <a href="#photo-compressor" className="hero-cta">Prepare a photo</a>
        </div>
      </header>
      <div className="shell page-content">
        <FormPhotoCompressor />
        <section className="seo-section" aria-labelledby="how-it-works">
          <h2 id="how-it-works">How to resize a photo for Indian forms</h2>
          <ol>
            <li>Search and select your exam, job, banking, or ID form.</li>
            <li>Upload your photo or signature and review the original file details.</li>
            <li>Choose white-background removal only when the official notice asks for it.</li>
            <li>Download the prepared JPEG and confirm it against the current official notification.</li>
          </ol>
        </section>
        <section className="visual-band" aria-label="Form photo preparation benefits">
          <article className="visual-tile pixel-tile">
            <div className="pixel-frame"><i></i><i></i><i></i><b>200 × 230</b></div>
            <div><span className="eyebrow">Right fit</span><h2>Exact image dimensions</h2><p>Your file is cropped and resized to the selected preset.</p></div>
          </article>
          <article className="visual-tile size-tile">
            <div className="size-gauge"><b>20–50</b><span>KB target</span></div>
            <div><span className="eyebrow">Right size</span><h2>Smarter compression</h2><p>JPEG compression aims for the requested upload range.</p></div>
          </article>
          <article className="visual-tile privacy-tile">
            <div className="privacy-shape"><span>✓</span></div>
            <div><span className="eyebrow">Your privacy</span><h2>Processed locally</h2><p>Files remain in your browser instead of being uploaded to our server.</p></div>
          </article>
        </section>
        <section className="seo-section faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Frequently asked questions</h2>
          <details><summary>Are my photos uploaded to a server?</summary><p>No. Processing happens in your browser. Background removal downloads its free browser model when you choose that option.</p></details>
          <details><summary>Can I use this for NEET, JEE, SSC, UPSC, and banking forms?</summary><p>Yes. The tool includes common presets for these forms. Always check the notification for your current application cycle.</p></details>
          <details><summary>What happens after I upload a photo?</summary><p>You see the original file name and size, then a clear before-and-after result showing output pixels and file size before downloading.</p></details>
        </section>
        <section className="keyword-section" aria-label="Popular photo resize searches">
          <p><strong>Popular searches:</strong> Indian form photo compressor, photo resize for NEET UG, JEE Main photo size, SSC photo and signature resize, UPSC photo size, SBI PO photo resize, IBPS photo compressor, PAN card photo resize, passport size photo maker, Railway RRB photo size, Aadhaar photo update information, CUET photo resize, and online signature resize for government job applications.</p>
        </section>
        <section className="supported-forms" aria-labelledby="supported-forms-title">
          <h2 id="supported-forms-title">Supported Indian forms and exams</h2>
          <p>Our photo and signature presets cover {supportedForms}. Upload rules can vary by application cycle, so please verify the latest official notification before submitting your form.</p>
        </section>
      </div>
      <footer className="site-footer"><div className="shell">FormReady India · Requirements vary by notification; official portals remain the source of truth.</div></footer>
    </main>
  );
}
