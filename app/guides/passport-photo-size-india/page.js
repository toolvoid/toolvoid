export const metadata = {
  title: 'Indian Passport Photo Size and Rules (4.5 x 3.5 cm) | ToolVoid',
  description: 'Official Indian passport photo size and rules from the Passport Seva booklet, and how to prepare the photo with the ToolVoid Passport Photo tool.',
  alternates: { canonical: 'https://toolvoid.com/guides/passport-photo-size-india' },
};

const styles = {
  main: { width: '100%', padding: '48px 0 64px' },
  article: {
    width: 'min(760px, calc(100% - 32px))',
    margin: '0 auto',
    fontSize: 16,
    lineHeight: 1.75,
    overflowWrap: 'break-word',
  },
  h1: {
    margin: '0 0 24px',
    color: '#f5f7fa',
    fontSize: 'clamp(2rem, 7vw, 3.2rem)',
    lineHeight: 1.12,
  },
  h2: { margin: '34px 0 12px', color: '#f5f7fa', fontSize: '1.55rem', lineHeight: 1.25 },
  paragraph: { margin: '0 0 16px', fontSize: 16, lineHeight: 1.75 },
  list: { margin: '0 0 16px', paddingLeft: 24, fontSize: 16, lineHeight: 1.75 },
  link: { color: '#00ffb2', textDecoration: 'underline', textUnderlineOffset: 3 },
};

export default function IndianPassportPhotoSizeGuidePage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <style>{`.content-link:hover{color:#8fe7c8!important;text-decoration-thickness:2px!important}.content-link:focus-visible{color:#8fe7c8!important;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
        <h1 style={styles.h1}>Indian Passport Photo Size and Rules (4.5 x 3.5 cm)</h1>
        <p style={styles.paragraph}>This guide lists the photo rules from the official Passport Seva instruction booklet for the passport application form. It also shows how to prepare your photo with the ToolVoid Passport Photo tool.</p>

        <h2 style={styles.h2}>What the official booklet says</h2>
        <ul style={styles.list}>
          <li>The photo size is 4.5 cm length x 3.5 cm width, in colour. The photo must not be smaller than the box on the form.</li>
          <li>Paste only one colour photograph. Black and white photographs are not accepted.</li>
          <li>The background must be plain white, and the dress should be in a dark colour.</li>
          <li>The photo should be printed on good quality photo paper. A photograph in computer print will not be accepted.</li>
          <li>Do not sign the photograph.</li>
          <li>Dark backgrounds, uniforms, and eyes hidden by coloured or dark glasses are not accepted.</li>
          <li>A photograph is not required for applications submitted at a Passport Seva Kendra (PSK) or a Post Office Passport Seva Kendra (POPSK). The photo rules apply to applications submitted at other collection centres: a District Passport Cell (DPC), an Authorized Speed Post Centre (SPC) or a Citizen Service Centre (CSC).</li>
        </ul>
        <p style={styles.paragraph}>The booklet does not give a pixel size, a file size in KB, or a file format. It also does not say whether you need to upload a photo for an online application. Check the Passport Seva website for the latest rules.</p>

        <h2 style={styles.h2}>The same size in millimetres</h2>
        <p style={styles.paragraph}>4.5 cm x 3.5 cm is the same as 45 mm x 35 mm. Written as width x height, that is 35 x 45 mm. The India Passport preset in the ToolVoid tool is 35 x 45 mm.</p>

        <h2 style={styles.h2}>How to prepare the photo with the ToolVoid tool</h2>
        <ol style={styles.list}>
          <li>Open the <a className="content-link" href="/passport" style={styles.link}>Passport Photo tool</a> and upload a front-facing photo (PNG, JPG or WEBP), or take a photo on your phone.</li>
          <li>Choose the India Passport preset (35 x 45 mm).</li>
          <li>Crop the photo using the face guide.</li>
          <li>Choose the white background. The tool also has a light blue option, but the booklet asks for a plain white background.</li>
          <li>Download the photo as a JPG or PNG file.</li>
        </ol>
        <p style={styles.paragraph}>The tool works in your browser, and your photo stays on your device.</p>

        <h2 style={styles.h2}>Printing the photo</h2>
        <p style={styles.paragraph}>The booklet asks for good quality photo paper and says a photograph in computer print will not be accepted. So take your file to a photo studio and print it there on photo paper. Do not print it on plain paper with a home or office printer.</p>

        <h2 style={styles.h2}>Check before you apply</h2>
        <ol style={styles.list}>
          <li>The photo is in colour, with a plain white background, and your eyes are clearly visible.</li>
          <li>You are wearing dark clothes, not a uniform.</li>
          <li>The printed photo is 4.5 cm x 3.5 cm.</li>
          <li>You have not signed the photo.</li>
          <li>The tool&apos;s presets are not an official approval, and the rules can change, so check the latest rules before you apply.</li>
        </ol>

        <h2 style={styles.h2}>Source and last verified</h2>
        <p style={styles.paragraph}>Last verified: 24 November 2026.</p>
        <p style={styles.paragraph}>Passport Seva, Instructions for filling of Passport Application Form and Supplementary Form (booklet V3.0), Section B, page 2: <a className="content-link" href="https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf" target="_blank" rel="noopener noreferrer" style={styles.link}>https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf</a></p>
        <p style={styles.paragraph}>For the latest rules, check <a className="content-link" href="https://www.passportindia.gov.in" target="_blank" rel="noopener noreferrer" style={styles.link}>https://www.passportindia.gov.in</a>.</p>
      </article>
    </main>
  );
}
