import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function DomainLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="domain" /></>;
}