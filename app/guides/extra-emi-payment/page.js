export const metadata = {
  title: 'Does Paying Extra Every Month Save Money on a Loan? | ToolVoid',
  description: 'A worked example showing how an extra Rs 1,000 or Rs 2,000 a month changes the loan term and total interest on a Rs 5,00,000 loan.',
  alternates: { canonical: 'https://toolvoid.com/guides/extra-emi-payment' },
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
  ['/guides/interest-rate-emi-change', 'How Much Does 1% Change Your EMI? A Worked Example'],
  ['/guides/home-loan-tenure-15-20-25-years', 'Home Loan of Rs 30 Lakh: 15, 20 or 25 Years?'],
  ['/guides/emi-calculation', 'How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan'],
];

export default function ExtraEmiPaymentGuidePage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <style>{`.content-link{color:#00ffb2;text-decoration:underline;text-underline-offset:3px}.content-link:hover{color:#8fe7c8;text-decoration-thickness:2px}.content-link:focus-visible{color:#8fe7c8;outline:2px solid #00FFB2;outline-offset:3px;border-radius:2px}`}</style>
        <h1 style={styles.h1}>Does Paying Extra Every Month Save Money on a Loan?</h1>
        <p style={styles.paragraph}>This guide uses one loan: Rs 5,00,000 at 8.5% a year for 5 years. With no extra payment, the EMI is Rs 10,258 and the total interest is Rs 1,15,496. Then we pay a little extra every month and see what changes. The numbers come from the ToolVoid EMI calculator.</p>

        <h2 style={styles.h2}>The idea</h2>
        <p style={styles.paragraph}>Interest is charged on the amount you still owe. When you pay extra, that money reduces the amount you owe. Next month's interest is then a little smaller, and the loan ends sooner.</p>

        <h2 style={styles.h2}>Same loan, three ways</h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead><tr><th style={styles.cell}></th><th style={styles.cell}>No extra</th><th style={styles.cell}>Extra Rs 1,000 a month</th><th style={styles.cell}>Extra Rs 2,000 a month</th></tr></thead>
            <tbody>
              <tr><td style={styles.cell}>Months to repay</td><td style={styles.cell}>60</td><td style={styles.cell}>54</td><td style={styles.cell}>49</td></tr>
              <tr><td style={styles.cell}>Total interest</td><td style={styles.cell}>Rs 1,15,496</td><td style={styles.cell}>Rs 1,02,497</td><td style={styles.cell}>Rs 92,174</td></tr>
              <tr><td style={styles.cell}>Total paid</td><td style={styles.cell}>Rs 6,15,496</td><td style={styles.cell}>Rs 6,02,497</td><td style={styles.cell}>Rs 5,92,174</td></tr>
              <tr><td style={styles.cell}>Interest saved</td><td style={styles.cell}>none</td><td style={styles.cell}>Rs 12,999</td><td style={styles.cell}>Rs 23,322</td></tr>
            </tbody>
          </table>
        </div>

        <h2 style={styles.h2}>What the numbers show</h2>
        <p style={styles.paragraph}>With Rs 1,000 extra a month, the loan ends 6 months earlier and you pay Rs 12,999 less interest. With Rs 2,000 extra a month, the loan ends 11 months earlier and you pay Rs 23,322 less interest. Doubling the extra amount does not exactly double the saving.</p>

        <h2 style={styles.h2}>Try it yourself</h2>
        <ol style={styles.list}>
          <li>Open the ToolVoid EMI calculator.</li>
          <li>Enter 500000 as the loan amount, 8.5 as the interest rate and 5 as the tenure in years.</li>
          <li>Type 1000 in the Extra EMI / month box.</li>
          <li>Read the total interest in the result panel, then try 2000.</li>
        </ol>

        <h2 style={styles.h2}>What this example does not include</h2>
        <p style={styles.paragraph}>Banks can have their own rules or charges for prepayment, and the rate on your loan may be different or may change. This example assumes the extra money is paid every month and goes toward the loan balance. Check your loan agreement before you pay extra.</p>

        <h2 style={styles.h2}>Related guides</h2>
        <ul style={styles.list}>{related.map(([href, title]) => <li key={href}><a className="content-link" href={href}>{title}</a></li>)}</ul>
      </article>
    </main>
  );
}
