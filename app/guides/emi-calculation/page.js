import Image from 'next/image';

export const metadata = {
  title: 'How EMI Is Calculated: Worked Example | ToolVoid',
  description: 'Step-by-step EMI calculation for a Rs 5,00,000 loan at 8.5% over 5 years, with the formula, the month-1 split and a 3-year comparison.',
  alternates: { canonical: 'https://toolvoid.com/guides/emi-calculation' },
};

const styles = {
  main: {
    width: '100%',
    padding: '48px 0 64px',
  },
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
  h2: {
    margin: '34px 0 12px',
    color: '#f5f7fa',
    fontSize: '1.55rem',
    lineHeight: 1.25,
  },
  paragraph: {
    margin: '0 0 16px',
    fontSize: 16,
    lineHeight: 1.75,
  },
  list: {
    margin: '0 0 16px',
    paddingLeft: 24,
    fontSize: 16,
    lineHeight: 1.75,
  },
  link: {
    display: 'inline-block',
    margin: '0 0 18px',
    color: '#00ffb2',
    fontSize: 16,
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: '24px 0',
    borderRadius: 12,
  },
  tableWrap: {
    width: '100%',
    maxWidth: '100%',
    margin: '18px 0 22px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  table: {
    width: '100%',
    minWidth: 420,
    borderCollapse: 'collapse',
    fontSize: 16,
  },
  cell: {
    padding: '10px 12px',
    border: '1px solid rgba(255,255,255,.18)',
    textAlign: 'left',
  },
};

export default function EmiCalculationGuidePage() {
  return (
    <main style={styles.main}>
      <article style={styles.article}>
        <h1 style={styles.h1}>How EMI Is Calculated: A Worked Example for a Rs 5,00,000 Loan</h1>
        <p style={styles.paragraph}>When a bank tells you your EMI, you rarely know how they got that number. Here is the full calculation, step by step. We use one loan: Rs 5,00,000 at 8.5% per year for 5 years.</p>
        <a href="/emi" style={styles.link}>Try the EMI calculator</a>

        <h2 style={styles.h2}>The question</h2>
        <p style={styles.paragraph}>You borrow Rs 5,00,000 at 8.5% for 5 years. How much do you pay each month? And how much of the total is interest?</p>

        <h2 style={styles.h2}>The formula</h2>
        <p style={styles.paragraph}>EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)</p>
        <ul style={styles.list}>
          <li>P is the loan amount.</li>
          <li>r is the interest rate for one month. Take the yearly rate, divide by 12, then divide by 100.</li>
          <li>n is the number of monthly payments. Multiply the years by 12.</li>
        </ul>

        <h2 style={styles.h2}>Step by step</h2>
        <ol style={styles.list}>
          <li>P = 5,00,000.</li>
          <li>r = 8.5 ÷ 12 ÷ 100 = 0.0070833.</li>
          <li>n = 5 × 12 = 60.</li>
          <li>(1 + r)^n = (1.0070833)^60 = 1.5273.</li>
          <li>Top part: 5,00,000 × 0.0070833 × 1.5273 = about 5,409.</li>
          <li>Bottom part: 1.5273 − 1 = 0.5273.</li>
          <li>EMI = 5,409 ÷ 0.5273 = about Rs 10,258 per month.</li>
        </ol>
        <p style={styles.paragraph}>You pay this for 60 months, so the total is Rs 6,15,496. You borrowed Rs 5,00,000, so the interest is Rs 1,15,496.</p>
        <Image
          src="/guides/emi-example-5yr.png"
          alt="ToolVoid EMI calculator with Rs 5,00,000, 8.5% and 5 years entered, showing a monthly EMI of Rs 10,258"
          width={1372}
          height={520}
          sizes="(max-width: 792px) calc(100vw - 32px), 760px"
          style={styles.image}
        />

        <h2 style={styles.h2}>What your first payment is made of</h2>
        <p style={styles.paragraph}>In month 1 you owe interest on the full Rs 5,00,000. That is 5,00,000 × 0.0070833 = about Rs 3,542. The rest of your EMI, about Rs 6,717, reduces the loan. (The two numbers add up to Rs 10,258 apart from rounding.) In month 2 the loan is a little smaller, so the interest is a little smaller too, and more of your EMI goes to the loan. That is why early payments are mostly interest.</p>

        <h2 style={styles.h2}>Same loan, 3 years instead of 5</h2>
        <p style={styles.paragraph}>Now take 36 months instead of 60. The same formula gives an EMI of about Rs 15,784. The total paid is Rs 5,68,216, so the interest is Rs 68,216.</p>
        <Image
          src="/guides/emi-example-3yr.png"
          alt="ToolVoid EMI calculator with Rs 5,00,000, 8.5% and 3 years entered, showing a monthly EMI of Rs 15,784"
          width={1372}
          height={520}
          sizes="(max-width: 792px) calc(100vw - 32px), 760px"
          style={styles.image}
        />
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cell}></th>
                <th style={styles.cell}>5 years</th>
                <th style={styles.cell}>3 years</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.cell}>Monthly EMI</td>
                <td style={styles.cell}>Rs 10,258</td>
                <td style={styles.cell}>Rs 15,784</td>
              </tr>
              <tr>
                <td style={styles.cell}>Total interest</td>
                <td style={styles.cell}>Rs 1,15,496</td>
                <td style={styles.cell}>Rs 68,216</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={styles.paragraph}>The 3-year loan costs Rs 5,526 more each month, but you pay Rs 47,280 less in interest. Which one is better depends on how much EMI your monthly budget can handle.</p>

        <h2 style={styles.h2}>What this example does not include</h2>
        <p style={styles.paragraph}>Banks may charge a processing fee, insurance or other costs. The rate on your own loan may not be 8.5%, and it can change over time. Use this example to understand how an EMI works, and check your bank's offer letter for the real numbers.</p>

        <h2 style={styles.h2}>Try it yourself</h2>
        <p style={styles.paragraph}>Enter your own loan amount, interest rate and tenure in the ToolVoid EMI calculator. It shows your monthly payment and the full repayment schedule.</p>
        <a href="/emi" style={styles.link}>Try the EMI calculator</a>
      </article>
    </main>
  );
}
