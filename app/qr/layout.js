import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function QrLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="qr" /></>;
}