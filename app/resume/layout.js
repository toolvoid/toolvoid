export const metadata = {
  title: 'ResumeForge — Free Resume Builder | TooL Void',
  description: 'Build ATS-optimized resumes for free. 6 templates, PDF export.',
};

export default function ResumeLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden">
      {children}
    </div>
  );
}