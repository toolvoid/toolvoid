import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function ResumeLayout({ children }) {
  return (
    <>
      <div className="h-screen overflow-hidden">{children}</div>
      <ToolPageSupplement tool="resume" />
    </>
  );
}