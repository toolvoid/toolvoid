export const metadata = {
  title: 'Home Loan of Rs 30 Lakh: 15, 20 or 25 Years? | ToolVoid',
  description: 'Compare the EMI and total interest of a Rs 30 lakh loan at 8.5% over 15, 20 and 25 years.',
  alternates: { canonical: 'https://toolvoid.com/guides/home-loan-tenure-15-20-25-years' },
};

const styles = {
  main: { width: '100%', padding: '48px 0 64px' },
  article: { width: 'min(760px, calc(100% - 32px))', margin: '0 auto', fontSize: 16, lineHeight: 1.75, overflowWrap: 'break-word' },
  h1: { margin: '0 0 24px', color: '#f5f7fa', fontSize: 'clamp(2rem, 7vw, 3.2rem)', lineHeight: 1.12 },
  h2: { margin: '34px 0 12px', color: '#f5f7fa', fontSize: '1.55rem', lineHeight: 1.25 },
  paragraph: { margin: '0 0 16px', fontSize: 16, lineHeight: 1.75 },
  list: { margin: '0 0 16px', paddingLeft: 24, fontSize: 16, lineHeight: 1.75 },
  tableWrap: { width: '100%', maxWidth: '100%', margin: '18px 0 22px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  table: { width: '100%', minWidth: 560, borderCollapse: 'collapse', fontSize: 16 },
  cell: { padding: '10px 12px', border: '1px solid rgba(255,255,255,.18)', textAlign: 'left', verticalAlign: 'top' },
};

const related = [
  ['/guides/extra-emi-payment', 'Does Paying Extra Every Month Save Money on a Loan?'],
  ['/guides/interest-rate-emi-change', 'How Much Does 1% Change Your EMI? A Worked Example'],
  ['/guides/emi-calculation', 'How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan'],
];

export default function HomeLoanTenureGuidePage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <style>{`.content-link{color:#00ffb2;text-decoration:underline;text-underline-offset:3px}.content-link:hover{color:#8fe7c8;text-decoration-thickness:2px}.content-link:focus-visible{color:#8fe7c8;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
        <h1 style={styles.h1}>Home Loan of Rs 30 Lakh: 15, 20 or 25 Years?</h1>
        <p style={styles.paragraph}>When you take a home loan, the bank asks for the number of years. A longer loan has a smaller EMI, but it costs more in the end. This guide shows by how much. We use one loan, Rs 30,00,000 at 8.5% a year, and change only the number of years. The numbers come from the ToolVoid EMI calculator.</p>

        <h2 style={styles.h2}>Same loan, three tenures</h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead><tr><th style={styles.cell}>Tenure</th><th style={styles.cell}>Monthly EMI</th><th style={styles.cell}>Total interest</th><th style={styles.cell}>Total paid</th></tr></thead>
            <tbody>
              <tr><td style={styles.cell}>15 years (180 months)</td><td style={styles.cell}>Rs 29,542</td><td style={styles.cell}>Rs 23,17,594</td><td style={styles.cell}>Rs 53,17,594</td></tr>
              <tr><td style={styles.cell}>20 years (240 months)</td><td style={styles.cell}>Rs 26,035</td><td style={styles.cell}>Rs 32,48,327</td><td style={styles.cell}>Rs 62,48,327</td></tr>
              <tr><td style={styles.cell}>25 years (300 months)</td><td style={styles.cell}>Rs 24,157</td><td style={styles.cell}>Rs 42,47,044</td><td style={styles.cell}>Rs 72,47,044</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>What the numbers show</h2>
        <ul style={styles.list}>
          <li>Going from 15 to 20 years lowers the EMI by Rs 3,507 a month, but adds Rs 9,30,733 in interest.</li>
          <li>Going from 20 to 25 years lowers the EMI by only Rs 1,878 a month, but adds Rs 9,98,717 in interest.</li>
          <li>Between 15 and 25 years, the EMI is Rs 5,385 lower each month, and the total interest is Rs 19,29,450 higher.</li>
        </ul>
        <p style={styles.paragraph}>Each extra 5 years saves less on the monthly EMI and costs more in interest. One simple way to choose is to pick the shortest tenure whose EMI your monthly budget can carry.</p>

        <h2 style={styles.h2}>Try it yourself</h2>
        <ol style={styles.list}>
          <li>Open the ToolVoid EMI calculator.</li>
          <li>Enter 3000000 as the loan amount and 8.5 as the interest rate.</li>
          <li>Set the tenure to 15, 20 and 25 years, and read the EMI and total interest each time.</li>
        </ol>

        <h2 style={styles.h2}>What this example does not include</h2>
        <p style={styles.paragraph}>Banks may add a processing fee, insurance or other charges, and the rate on a home loan can change over time. Check your bank's offer letter for the real figures.</p>

        <h2 style={styles.h2}>Related guides</h2>
        <ul style={styles.list}>{related.map(([href, title]) => <li key={href}><a className="content-link" href={href}>{title}</a></li>)}</ul>
      </article>
    </main>
  );
}
