import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function PdfLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="pdf" /></>;
}