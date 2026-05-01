export const metadata = {
  title: 'ToolSite - Privacy Policy',
};

export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', color: '#f8fafc', fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>Privacy Policy</h1>
      <p style={{ color: '#8b94a2', marginBottom: '40px', fontSize: '14px' }}>Last updated: May 2026</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>1. Information We Collect</h2>
      <p style={{ color: '#9aa4b2' }}>ToolSite does not require account creation. Most tools run entirely in your browser. We do not collect or store your files, inputs, or outputs on our servers.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>2. AI Tools</h2>
      <p style={{ color: '#9aa4b2' }}>AI-powered tools (Story Generator, Hashtag Generator, etc.) send your input to a third-party AI API to generate results. We do not store this data after the response is returned.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>3. Usage Data</h2>
      <p style={{ color: '#9aa4b2' }}>We may collect basic anonymous analytics such as page views and tool usage counts to improve the platform. No personally identifiable information is collected.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>4. Cookies</h2>
      <p style={{ color: '#9aa4b2' }}>We use minimal cookies only for rate limiting on AI tools (daily usage tracking via IP). No advertising or tracking cookies are used.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>5. Third-Party Services</h2>
      <p style={{ color: '#9aa4b2' }}>We use Google Fonts for typography and third-party AI APIs for AI tools. These services have their own privacy policies.</p>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '36px', marginBottom: '10px', color: '#00FFB2' }}>6. Contact</h2>
      <p style={{ color: '#9aa4b2' }}>For any privacy concerns, email us at <a href="mailto:0voidtool0@gmail.com" style={{ color: '#00FFB2' }}>0voidtool0@gmail.com</a></p>
    </div>
  );
}
