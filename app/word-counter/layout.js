import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function WordCounterLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="word-counter" /></>;
}