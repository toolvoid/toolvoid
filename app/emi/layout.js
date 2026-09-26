import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function EmiLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="emi" /></>;
}