import ToolPageSupplement from '../../components/ToolPageSupplement';

export default function TextToSpeechLayout({ children }) {
  return <>{children}<ToolPageSupplement tool="tts" /></>;
}