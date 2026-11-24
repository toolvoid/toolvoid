export const metadata = {
  title: 'How Much Does 1% Change Your EMI? Worked Example | ToolVoid',
  description: 'See how interest rates of 7.5%, 8.5%, 9.5% and 10.5% change the EMI and total interest on a Rs 5,00,000 loan over 5 years.',
  alternates: { canonical: 'https://toolvoid.com/guides/interest-rate-emi-change' },
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
  ['/guides/home-loan-tenure-15-20-25-years', 'Home Loan of Rs 30 Lakh: 15, 20 or 25 Years?'],
  ['/guides/emi-calculation', 'How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan'],
];

export default function InterestRateEmiChangeGuidePage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <style>{`.content-link{color:#00ffb2;text-decoration:underline;text-underline-offset:3px}.content-link:hover{color:#8fe7c8;text-decoration-thickness:2px}.content-link:focus-visible{color:#8fe7c8;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
        <h1 style={styles.h1}>How Much Does 1% Change Your EMI? A Worked Example</h1>
        <p style={styles.paragraph}>A small difference in the interest rate can look unimportant. This guide shows what it really does. We use one loan, Rs 5,00,000 for 5 years, and change only the interest rate. The numbers come from the ToolVoid EMI calculator.</p>

        <h2 style={styles.h2}>Same loan, four interest rates</h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead><tr><th style={styles.cell}>Interest rate</th><th style={styles.cell}>Monthly EMI</th><th style={styles.cell}>Total interest</th><th style={styles.cell}>Total paid</th></tr></thead>
            <tbody>
              <tr><td style={styles.cell}>7.5%</td><td style={styles.cell}>Rs 10,019</td><td style={styles.cell}>Rs 1,01,138</td><td style={styles.cell}>Rs 6,01,138</td></tr>
              <tr><td style={styles.cell}>8.5%</td><td style={styles.cell}>Rs 10,258</td><td style={styles.cell}>Rs 1,15,496</td><td style={styles.cell}>Rs 6,15,496</td></tr>
              <tr><td style={styles.cell}>9.5%</td><td style={styles.cell}>Rs 10,501</td><td style={styles.cell}>Rs 1,30,056</td><td style={styles.cell}>Rs 6,30,056</td></tr>
              <tr><td style={styles.cell}>10.5%</td><td style={styles.cell}>Rs 10,747</td><td style={styles.cell}>Rs 1,44,817</td><td style={styles.cell}>Rs 6,44,817</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>What the numbers show</h2>
        <ul style={styles.list}>
          <li>Each extra 1% adds about Rs 240 to Rs 250 to the monthly EMI.</li>
          <li>Each extra 1% adds about Rs 14,400 to Rs 14,800 to the total interest.</li>
          <li>From 8.5% to 9.5%, the EMI goes up by only Rs 243. Over 60 months, the total interest goes up by Rs 14,560.</li>
          <li>From 7.5% to 10.5%, the EMI is Rs 728 higher, and the total interest is Rs 43,679 higher.</li>
        </ul>
        <p style={styles.paragraph}>A monthly difference of a few hundred rupees looks small. Over the whole loan it adds up to a large amount. When you compare loan offers, compare the total interest and not only the monthly EMI.</p>

        <h2 style={styles.h2}>Try it yourself</h2>
        <ol style={styles.list}>
          <li>Open the ToolVoid EMI calculator.</li>
          <li>Enter 500000 as the loan amount and 5 as the tenure in years.</li>
          <li>Change the interest rate to 7.5, 8.5, 9.5 and 10.5, and read the EMI and total interest each time.</li>
        </ol>

        <h2 style={styles.h2}>What this example does not include</h2>
        <p style={styles.paragraph}>Banks may add a processing fee, insurance or other charges. The rate on your loan can also change over time. Use this example to understand how the rate affects the EMI, and check your bank's offer letter for the real figures.</p>

        <h2 style={styles.h2}>Related guides</h2>
        <ul style={styles.list}>{related.map(([href, title]) => <li key={href}><a className="content-link" href={href}>{title}</a></li>)}</ul>
      </article>
    </main>
  );
}
