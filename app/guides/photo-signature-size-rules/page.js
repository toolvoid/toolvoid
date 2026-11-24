export const metadata = {
  title: 'Photo & Signature Size Rules: SBI, IBPS, SSC, NEET, JEE | ToolVoid',
  description: 'Official photo, signature and thumb impression sizes for SBI PO, IBPS PO/MT, SSC CGL, NEET UG and JEE Main, with links to the official notices.',
  alternates: { canonical: 'https://toolvoid.com/guides/photo-signature-size-rules' },
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
  tableWrap: {
    width: '100%',
    maxWidth: '100%',
    margin: '18px 0 22px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: { width: '100%', minWidth: 540, borderCollapse: 'collapse', fontSize: 16 },
  cell: { padding: '10px 12px', border: '1px solid rgba(255,255,255,.18)', textAlign: 'left', verticalAlign: 'top' },
  sourceList: { margin: 0, paddingLeft: 24, fontSize: 16, lineHeight: 1.75 },
  sourceLink: { color: '#00ffb2', textDecoration: 'underline', textUnderlineOffset: 3 },
};

const tableHeader = (labels) => (
  <thead>
    <tr>{labels.map((label) => <th key={label} scope="col" style={styles.cell}>{label}</th>)}</tr>
  </thead>
);

const sources = [
  ['SBI PO 2026 notice, Annexure II', 'https://sbi.bank.in/csfile/18062026_1_Detailed_Adv.2026.pdf'],
  ['IBPS PO/MT CRP XVI notice, Annexure III', 'https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf'],
  ['SSC CGL 2026 notice, paragraphs 9.4 to 9.6', 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_cgl_2025.pdf'],
  ['NEET (UG) 2026 information bulletin, Chapter 3 (pages 14 to 18)', 'https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf'],
  ['JEE (Main) 2027 information bulletin, Step 2 (pages 8 and 9)', 'https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/10/202610241890224107.pdf'],
];

export default function PhotoSignatureSizeRulesPage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <style>{`.content-link:hover{color:#8fe7c8!important;text-decoration-thickness:2px!important}.content-link:focus-visible{color:#8fe7c8!important;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
        <h1 style={styles.h1}>Photo and Signature Size Rules for SBI PO, IBPS PO, SSC CGL, NEET and JEE Main</h1>
        <p style={styles.paragraph}>Online application forms can reject files that do not match the size and format rules. These rules come from each exam&apos;s official notice, and they are different for each exam. This guide lists the rules for five big exams, with links to the official notices.</p>

        <h2 style={styles.h2}>SBI PO and IBPS PO/MT</h2>
        <p style={styles.paragraph}>The SBI PO 2026 notice (dated 18 June 2026) and the IBPS PO/MT CRP XVI notice (registration 1 to 21 July 2026) give the same upload rules.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            {tableHeader(['Item', 'File size', 'Preferred size', 'Notes'])}
            <tbody>
              <tr><td style={styles.cell}>Photograph</td><td style={styles.cell}>20 to 50 KB</td><td style={styles.cell}>200 × 230 pixels (4.5 cm × 3.5 cm)</td><td style={styles.cell}>Recent colour passport-style photo on a light or white background. No caps or dark glasses.</td></tr>
              <tr><td style={styles.cell}>Signature</td><td style={styles.cell}>10 to 20 KB</td><td style={styles.cell}>140 × 60 pixels</td><td style={styles.cell}>Black ink on white paper. Not in capital letters.</td></tr>
              <tr><td style={styles.cell}>Left thumb impression</td><td style={styles.cell}>20 to 50 KB</td><td style={styles.cell}>240 × 240 pixels at 200 DPI (3 cm × 3 cm)</td><td style={styles.cell}>Black or blue ink on white paper.</td></tr>
              <tr><td style={styles.cell}>Handwritten declaration</td><td style={styles.cell}>50 to 100 KB</td><td style={styles.cell}>800 × 400 pixels at 200 DPI (10 cm × 5 cm)</td><td style={styles.cell}>In English, black ink, white paper, your own handwriting. Not in capital letters.</td></tr>
            </tbody>
          </table>
        </div>
        <ul style={styles.list}>
          <li>All files must be in JPG or JPEG format.</li>
          <li>Scan at a minimum of 200 DPI in true colour.</li>
          <li>Your photograph is also taken live with a webcam or mobile phone during registration.</li>
          <li>SBI says you can use your right thumb if you do not have a left thumb. IBPS has its own rule for this case, so read Annexure III of the IBPS notice.</li>
          <li>Upload each file in its own slot. SBI says a candidate who uploads files in the wrong slot will not be allowed to appear in the exam.</li>
        </ul>

        <h2 style={styles.h2}>SSC CGL 2026</h2>
        <p style={styles.paragraph}>The SSC CGL 2026 notice (uploaded on 21 May 2026) works differently for the photograph.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            {tableHeader(['Item', 'Rule'])}
            <tbody>
              <tr><td style={styles.cell}>Photograph</td><td style={styles.cell}>Taken live while you fill in the form. You do not upload a photo, and the notice gives no file size for it. Use good light and a plain background. Keep the camera at eye level and your whole face inside the marked area. No cap, mask or glasses.</td></tr>
              <tr><td style={styles.cell}>Signature</td><td style={styles.cell}>JPEG or JPG file, 10 to 20 KB, about 6.0 cm wide and 2.0 cm high.</td></tr>
            </tbody>
          </table>
        </div>
        <ul style={styles.list}>
          <li>You must not take a photo of an old photograph. The notice says such photos can be rejected.</li>
          <li>Applications with a blurred photograph, or a blurred or very small signature, are rejected.</li>
        </ul>

        <h2 style={styles.h2}>NEET UG 2026</h2>
        <p style={styles.paragraph}>These are the rules from the NEET (UG) 2026 information bulletin (exam on 3 May 2026). Check the new bulletin when NTA publishes the next one.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            {tableHeader(['Item', 'Format', 'File size', 'Notes'])}
            <tbody>
              <tr><td style={styles.cell}>Photograph</td><td style={styles.cell}>JPG/JPEG</td><td style={styles.cell}>10 to 200 KB</td><td style={styles.cell}>Colour or black and white. About 80% of the image must be your face. White background. Taken on or after 1 January 2026.</td></tr>
              <tr><td style={styles.cell}>Signature</td><td style={styles.cell}>JPG/JPEG</td><td style={styles.cell}>10 to 100 KB</td><td style={styles.cell}>The bulletin gives no pixel size.</td></tr>
              <tr><td style={styles.cell}>Left and right hand fingers and thumb impressions</td><td style={styles.cell}>JPG/JPEG</td><td style={styles.cell}>10 to 200 KB in one place, 50 to 300 KB in the checklist</td><td style={styles.cell}>The bulletin does not explain the difference, so check the exact limit on the upload screen.</td></tr>
            </tbody>
          </table>
        </div>
        <ul style={styles.list}>
          <li>The bulletin gives no pixel size or DPI for any of these files.</li>
          <li>You must also upload a live photograph when you fill in the form. Use a webcam, or scan the on-screen QR code with your phone.</li>
          <li>Use good light and a light-coloured background, and show your face without a mask.</li>
          <li>Polaroid and computer-generated photos are not accepted.</li>
          <li>Spectacles are allowed only if you use them regularly.</li>
          <li>The Class 10 certificate, the Class 10 marksheet and the category certificate go in as PDF files of 50 to 300 KB.</li>
          <li>The bulletin tells you to keep 4 to 6 postcard-size (4 × 6 inch) colour photographs. On exam day you must bring one postcard-size colour photograph with a white background, to paste on the proforma you download with your admit card.</li>
        </ul>

        <h2 style={styles.h2}>JEE Main 2027</h2>
        <p style={styles.paragraph}>The JEE (Main) 2027 information bulletin covers Session 1 (January 2027) and Session 2 (April 2027). It gives one set of upload rules for both sessions.</p>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            {tableHeader(['Item', 'Format', 'File size', 'Notes'])}
            <tbody>
              <tr><td style={styles.cell}>Photograph</td><td style={styles.cell}>JPG/JPEG</td><td style={styles.cell}>10 to 200 KB</td><td style={styles.cell}>In colour. About 80% of the image must be your face, including your ears, with no mask, against a white background.</td></tr>
              <tr><td style={styles.cell}>Signature</td><td style={styles.cell}>JPG/JPEG</td><td style={styles.cell}>10 to 100 KB</td><td style={styles.cell}>Must be clearly legible.</td></tr>
            </tbody>
          </table>
        </div>
        <ul style={styles.list}>
          <li>The bulletin gives no pixel size, cm size or DPI.</li>
          <li>The bulletin does not list a thumb impression upload.</li>
          <li>You must also upload a live photograph when you fill in the form. Use a webcam, or scan the QR code with your phone.</li>
          <li>The Class 10 or equivalent certificate or marksheet goes in as a PDF file of 50 to 300 KB.</li>
          <li>Bring two more passport-size photos like the one you uploaded, for the admit card and the attendance sheet. This is not an online upload.</li>
        </ul>

        <h2 style={styles.h2}>How to get your files to the right size</h2>
        <p style={styles.paragraph}>If your photo or signature is too big or too small, you can resize and compress it with the <a className="content-link" href="/indian-forms" style={styles.sourceLink}>ToolVoid Indian Forms tool</a>. After resizing, check the file size and format before you upload.</p>

        <h2 style={styles.h2}>Before you upload</h2>
        <ol style={styles.list}>
          <li>Open the official notice for your exam. The rules can change with every new notification.</li>
          <li>Check the size in KB and the format of each file.</li>
          <li>Make sure each image is clear and not smudged or blurred.</li>
          <li>Upload each file in the correct slot.</li>
          <li>Use the preview on the form to check everything before you submit.</li>
        </ol>

        <h2 style={styles.h2}>Sources and last verified</h2>
        <p style={styles.paragraph}>Last verified: 22 November 2026. Always check the official notice for the exam you are applying to.</p>
        <ul style={styles.sourceList}>
          {sources.map(([label, url]) => (
            <li key={url}><a className="content-link" href={url} target="_blank" rel="noopener noreferrer" style={styles.sourceLink}>{label}</a></li>
          ))}
        </ul>
      </article>
    </main>
  );
}
