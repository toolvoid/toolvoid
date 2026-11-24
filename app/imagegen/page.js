import { createToolMetadata } from '../../lib/toolMetadata';
import ImageGeneratorClient from './ImageGeneratorClient';

export const metadata = {
  title: "AI Image Generator Online | ToolVoid",
  description: "Create an image from a text prompt, choose a visual style, mood, and aspect ratio, then review and download the generated result from your browser.",
  keywords: ["free AI image generator online", "AI image generator", "text to image", "AI art generator", "generate images AI"],
  openGraph: {
    title: "Free AI Image Generator | ToolVoid",
    description: "Generate AI images from text descriptions and create artwork from a written prompt.",
    url: "https://toolvoid.com/imagegen",
  },
  ...createToolMetadata('imagegen'),
  title: "AI Image Generator Online | ToolVoid",
  description: "Create an image from a text prompt, choose a visual style, mood, and aspect ratio, then review and download the generated result from your browser.",
}

export default function Page() {
  return <ImageGeneratorClient />;
}
