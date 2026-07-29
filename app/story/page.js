import { createToolMetadata } from '../../lib/toolMetadata';
import { isMaintenanceMode } from '../../lib/maintenanceMode';
import StoryClient from './StoryClient';

const faqs = [
  ['What is an AI video script?', 'An AI video script is a production plan for a video, not simply a prose story. It pairs the spoken narration with scene-by-scene visual direction, so you know what needs to be generated, edited, or shown while the voiceover plays. Script Writer also creates caption timing so the finished video can stay accessible and easy to follow.'],
  ['Do I need coding or editing skills?', 'No. ToolVoid Script Writer is designed around a guided brief instead of technical prompts or code. You can choose the format, pace, point of view, visual style, and duration, then review and edit the resulting scene cards in plain language before taking the assets into the tools you already use.'],
  ['What AI tools does the output work with?', 'The narration export is ready to paste into AI voice tools such as ElevenLabs and similar text-to-speech services. Each visual prompt is deliberately standalone for AI image and video generators including Midjourney, Leonardo, Kling, Flow, and comparable tools. The caption download is a standard SRT file for most video editors and social platforms.'],
  ['How many scripts can I generate?', 'Script Writer shows your remaining daily free generations directly in the production brief. The allowance can change as ToolVoid updates available capacity, and the counter refreshes after each successful generation so you can see exactly what is left for the day.'],
  ['Can I edit the script after generating?', 'Yes. Every scene remains editable in the Script Writer canvas. Change the narration for your voiceover, refine the visual prompt for a particular generator, adjust the estimated duration, reorder scenes, remove a scene, or add a new one before exporting. Captions are derived from the current narration and scene timings.'],
  ['Is it free?', 'Yes. ToolVoid offers Script Writer with a daily free generation allowance. You can create, edit, and export narration scripts, visual prompts, and SRT captions without needing a paid production suite.'],
];

export const metadata = {
  ...createToolMetadata('story'),
  title: "Script Writer — AI Video Production Scripts | ToolVoid",
  description: "Create production-ready AI video scripts with editable narration, standalone visual prompts, and timed SRT captions for Shorts, Reels, and long-form video.",
  keywords: ["AI script writer", "AI video production script", "visual prompt generator", "video narration script", "SRT caption generator"],
  openGraph: {
    title: "Script Writer | ToolVoid",
    description: "Create AI-video production scripts with narration, scene visual prompts, and timed captions.",
    url: "https://toolvoid.com/story",
  },
}

export default function Page() {
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
  return <>
    <StoryClient maintenanceMode={isMaintenanceMode('story')} />
    <section className="sw-seo">
      <style>{seoStyles}</style>
      <div className="sw-seo-transition" aria-hidden="true" />
      <div className="sw-seo-shell">
        <section className="sw-seo-intro">
          <span>ABOUT TOOLVOID SCRIPT WRITER</span>
          <h2>What is Script Writer?</h2>
          <p>Script Writer is ToolVoid&apos;s AI video production workspace for turning an idea into a usable, scene-based plan. Instead of generating a block of prose, it creates the three layers an AI-video workflow actually needs: the exact narration for a voiceover, a detailed visual direction for every scene, and timed captions that match the spoken words.</p>
          <p>That structure gives creators a clear handoff between the writing stage and production. Use the narration with AI voiceover tools such as ElevenLabs or similar text-to-speech services, then take each standalone visual prompt into Midjourney, Leonardo, Kling, Flow, or another AI image and video generator. Every prompt is written to stand on its own, with direction for composition, lighting, colour, motion, background, and texture.</p>
          <p>ToolVoid Script Writer is built to make an AI-video project feel manageable from the first idea onward. The guided brief keeps the request focused, while the editable scene canvas lets you refine the voice, visuals, pacing, and order before exporting the pieces your production process needs.</p>
        </section>

        <section className="sw-seo-section" id="how-it-works">
          <div className="sw-seo-heading"><span>HOW IT WORKS</span><h2>From a brief to a production plan.</h2></div>
          <div className="sw-seo-steps">
            <article><b>01</b><h3>Set your brief and creative options</h3><p>Start with a short topic or premise, then select the format, target duration, speaking pace, narration point of view, language, and visual style. Script Writer uses these choices to create a consistent production direction without making you write a long technical prompt.</p></article>
            <article><b>02</b><h3>Generate the complete script once</h3><p>ToolVoid creates the full scene list in one structured generation. The result is planned as a complete video, with a hook, progression, and ending that fit your chosen length instead of a collection of disconnected scene ideas.</p></article>
            <article><b>03</b><h3>Review narration, visuals, and captions per scene</h3><p>Open the scene canvas to edit the exact voiceover line and the separate visual direction independently. Reorder scenes, change a duration, add a missing beat, or remove anything that does not support the final video. Captions always follow the current narration.</p></article>
            <article><b>04</b><h3>Export the format each tool needs</h3><p>Download a narration-only text script for your voice tool, numbered visual prompts for your image or video generator, and a timed SRT file for captions. Each export is intentionally separate, so your production assets are clean rather than mixed into one document.</p></article>
          </div>
        </section>

        <section className="sw-seo-section sw-seo-audience">
          <div className="sw-seo-heading"><span>WHO IT&apos;S FOR</span><h2>Built for the way modern creators produce.</h2></div>
          <div className="sw-seo-audience-grid">
            <article><h3>YouTube Shorts creators</h3><p>Plan quick, high-retention videos with a strong opening, controlled pace, and enough visual change to keep viewers moving through a Short, Reel, or TikTok.</p></article>
            <article><h3>Faceless channel creators</h3><p>Separate the voiceover from the visual instructions so you can build a repeatable workflow around TTS narration, stock footage, generated clips, and on-screen subtitles.</p></article>
            <article><h3>Educational content creators</h3><p>Turn a lesson, explainer, historical subject, or science topic into clear narration supported by visual scenes that help an audience understand and remember the point.</p></article>
            <article><h3>AI storytelling creators</h3><p>Develop atmospheric horror, comedy, drama, kids stories, documentaries, and cinematic concepts with visual continuity across every generated shot.</p></article>
          </div>
        </section>

        <section className="sw-seo-section sw-seo-faq">
          <div className="sw-seo-heading"><span>FAQ</span><h2>Questions about Script Writer.</h2></div>
          <div className="sw-seo-faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<i>+</i></summary><p>{answer}</p></details>)}</div>
        </section>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  </>;
}

const seoStyles = `
.sw-seo{--ink:#1c1930;--muted:#656176;--line:#e6e2ef;--violet:#7357ee;--violet-dark:#4c35c0;--lav:#f4f1ff;background:#fff;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}.sw-seo-transition{height:clamp(160px,20vw,300px);background:linear-gradient(180deg,#09090f 0%,#09090f 10%,#100f19 23%,#211c35 42%,#49425d 61%,#9791a6 78%,#e4e0e8 92%,#fff 100%)}.sw-seo-shell{max-width:1120px;margin:0 auto;padding:0 28px}.sw-seo-intro{max-width:810px;padding:108px 0}.sw-seo-intro>span,.sw-seo-heading>span{display:inline-block;color:var(--violet-dark);font-size:12px;font-weight:800;letter-spacing:.13em}.sw-seo h2{margin:14px 0 24px;font-size:clamp(38px,4.5vw,59px);line-height:1.02;letter-spacing:-.055em}.sw-seo-intro p{margin:0 0 18px;color:var(--muted);font-size:16px;line-height:1.78}.sw-seo-intro p:last-child{margin-bottom:0}.sw-seo-section{padding:108px 0;border-top:1px solid var(--line)}.sw-seo-heading{max-width:680px}.sw-seo-steps{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;margin-top:50px;border:1px solid var(--line);background:var(--line);box-shadow:0 18px 42px rgba(31,24,62,.05)}.sw-seo-steps article{min-height:246px;padding:30px 28px;background:#fff;transition:background .2s,transform .2s}.sw-seo-steps article:hover{position:relative;z-index:1;background:#fbfaff;transform:translateY(-2px)}.sw-seo-steps b{color:var(--violet);font-size:12px;font-weight:800;letter-spacing:.1em}.sw-seo h3{margin:26px 0 10px;font-size:19px;line-height:1.2;letter-spacing:-.03em}.sw-seo p{color:var(--muted);font-size:14px;line-height:1.72}.sw-seo-steps p,.sw-seo-audience-grid p,.sw-seo-faq-list p{margin:0}.sw-seo-audience{margin:0 -28px;padding-left:28px;padding-right:28px;border-top:0;background:linear-gradient(125deg,#fbfaff,#f0ecff)}.sw-seo-audience-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:50px}.sw-seo-audience-grid article{padding:26px 28px;border:1px solid #e1dbf5;border-radius:14px;background:rgba(255,255,255,.86);box-shadow:0 12px 30px rgba(82,59,155,.06);transition:transform .2s,border-color .2s,box-shadow .2s}.sw-seo-audience-grid article:hover{border-color:#cfc3fa;box-shadow:0 18px 34px rgba(82,59,155,.11);transform:translateY(-2px)}.sw-seo-audience-grid h3{margin:0 0 9px}.sw-seo-faq{display:grid;grid-template-columns:.75fr 1fr;gap:96px}.sw-seo-faq .sw-seo-heading h2{margin-bottom:0}.sw-seo-faq-list{border-top:1px solid var(--line)}.sw-seo-faq-list details{padding:0;border-bottom:1px solid var(--line);transition:background .2s}.sw-seo-faq-list details:hover{background:#faf9ff}.sw-seo-faq-list summary{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:22px 4px;cursor:pointer;list-style:none;font-size:16px;font-weight:750;transition:color .2s}.sw-seo-faq-list summary:hover{color:var(--violet-dark)}.sw-seo-faq-list summary::-webkit-details-marker{display:none}.sw-seo-faq-list summary i{display:grid;place-items:center;flex:0 0 auto;width:27px;height:27px;border-radius:8px;background:#f0edff;color:var(--violet);font-size:21px;font-style:normal;font-weight:400;line-height:1;transition:transform .2s,background .2s}.sw-seo-faq-list details[open] summary{color:var(--violet-dark)}.sw-seo-faq-list details[open] summary i{color:#fff;background:linear-gradient(135deg,var(--violet),var(--violet-dark));transform:rotate(45deg)}.sw-seo-faq-list p{max-width:620px;padding:0 4px 22px}@media(max-width:760px){.sw-seo-transition{height:145px}.sw-seo-shell{padding:0 20px}.sw-seo-intro,.sw-seo-section{padding:76px 0}.sw-seo-steps,.sw-seo-audience-grid,.sw-seo-faq{grid-template-columns:1fr}.sw-seo-faq{gap:38px}.sw-seo-audience{margin:0 -20px;padding-left:20px;padding-right:20px}.sw-seo h2{font-size:39px}.sw-seo-steps{margin-top:38px}.sw-seo-steps article{min-height:auto;padding:26px 22px}.sw-seo-audience-grid{margin-top:38px}.sw-seo-audience-grid article{padding:24px}.sw-seo-intro p{font-size:15px}}@media(prefers-reduced-motion:reduce){.sw-seo *{transition:none!important}}
`;
