export const metadata = {
  title: 'ToolVoid Privacy Policy',
  description: 'Read how ToolVoid handles information, AI inputs, analytics, cookies, and advertising when you use the site.',
  alternates: { canonical: 'https://toolvoid.com/privacy' },
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', color: '#f8fafc', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
      <style>{`.content-link{color:#00FFB2;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}.content-link:hover{color:#8fe7c8;text-decoration-thickness:2px}.content-link:focus-visible{color:#8fe7c8;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ color: '#8b94a2', marginBottom: '40px', fontSize: '14px' }}>Last updated: 24 November 2026</p>

      <p style={{ color: '#9aa4b2' }}>This page explains what ToolVoid collects, what stays on your device, and which other services are involved. ToolVoid is run by Sparsh Pathak. You can reach me at <a className="content-link" href="mailto:hello@toolvoid.com">hello@toolvoid.com</a>.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>What stays on your device</h2>
      <p style={{ color: '#9aa4b2' }}>Most tools work in your browser. PDF, image, passport photo, Indian form photo, Base64 and JSON tools read your files in your browser. We do not upload those files to ToolVoid.</p>
      <p style={{ color: '#9aa4b2' }}>Some tools save your work in your browser&apos;s local storage so it is there when you come back. This can include JSON input, EMI and loan inputs, unit conversion history, hashtag and keyword history, generated images, password generator settings and history, invoice details (including bank or UPI details you type in), and resume details (including a photo). This data stays on your device. We cannot see it. You can remove it by clearing your browser&apos;s site data.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Signing in</h2>
      <p style={{ color: '#9aa4b2' }}>You can use most tools without signing in. Some AI tools ask you to sign in with Google so that daily limits can be applied. When you sign in, we receive your Google account ID, email address, name and profile picture. We use your email address to count how many times you used each AI tool each day. We do not keep a separate user database. Sign-in uses cookies from our sign-in system: a session cookie, a security (CSRF) cookie, a callback address cookie, and short-lived cookies used during sign-in.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Daily limits</h2>
      <p style={{ color: '#9aa4b2' }}>We keep a daily counter for each signed-in email address and tool. The counter holds a number and the date, not your prompts. It expires at midnight UTC.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>AI tools and other services that receive your input</h2>
      <p style={{ color: '#9aa4b2' }}>When you use an AI or lookup tool, the text you enter is sent to other companies so the tool can work.</p>
      <ul style={{ color: '#9aa4b2', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li>Hashtag generator: your topic, platform, category and number of hashtags are sent to Google Gemini.</li>
        <li>Keyword generator: your topic, content type, audience, country and seed phrase are sent to Groq.</li>
        <li>Script generator: your topic and story options are sent to Google Gemini and Groq.</li>
        <li>Image generator: your prompt and style choices are sent to Pollinations. Prompt improvement may use Google Gemini or Groq.</li>
        <li>Domain checker: the domain you enter is sent to Google DNS, WhoisJSON, crt.sh and the proxy services cors.isomorphic-git.org and r.jina.ai. The checker also contacts the domain itself.</li>
      </ul>
      <p style={{ color: '#9aa4b2' }}>We do not save your prompts or results in our database. These companies have their own privacy policies, and we do not control how long they keep your input. Do not enter personal or secret information into AI tools.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Site Maker</h2>
      <p style={{ color: '#9aa4b2' }}>If you use Site Maker, the project content you create (name and page sections) can be saved in our database (Supabase). Form submissions made on a Site Maker page are saved in the same database.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Cookies, analytics and ads</h2>
      <p style={{ color: '#9aa4b2' }}>ToolVoid uses Google Analytics to measure visits, Vercel Speed Insights to measure page speed, and Google AdSense to show ads. These services use cookies or similar technology.</p>
      <p style={{ color: '#9aa4b2' }}>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. Google&apos;s use of advertising cookies, including the DoubleClick cookie, enables it and its partners to serve ads to you based on your visit to this site and other sites on the internet.</p>
      <p style={{ color: '#9aa4b2' }}>You can opt out of personalised advertising by visiting Ads Settings: <a className="content-link" href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads</a>. You can also opt out of some third-party vendors&apos; use of cookies for personalised advertising by visiting <a className="content-link" href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">https://www.aboutads.info</a>.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Other resources</h2>
      <p style={{ color: '#9aa4b2' }}>Some pages load fonts, scripts or model files from other services such as Google Fonts, cdnjs and jsDelivr. These requests can show your IP address to those services.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Contact messages</h2>
      <p style={{ color: '#9aa4b2' }}>The contact form opens your own email app with your message ready to send to <a className="content-link" href="mailto:hello@toolvoid.com">hello@toolvoid.com</a>. We read only the messages you send us.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Hosting</h2>
      <p style={{ color: '#9aa4b2' }}>ToolVoid is hosted on Vercel. Vercel may keep standard server logs, such as IP address, browser and page requested.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Your choices</h2>
      <p style={{ color: '#9aa4b2' }}>You can clear your browser data, block cookies, sign out, or write to <a className="content-link" href="mailto:hello@toolvoid.com">hello@toolvoid.com</a> to ask about your data. If you are in the EU, UK or California, you may have the right to ask us to access or delete data we hold about you. We only hold your sign-in details and daily counters.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Children</h2>
      <p style={{ color: '#9aa4b2' }}>ToolVoid is not meant for children under 13, and we do not knowingly collect their data.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>Changes</h2>
      <p style={{ color: '#9aa4b2' }}>If we change this policy, we will update the date at the top.</p>
    </div>
  );
}
