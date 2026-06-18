import { redirect } from 'next/navigation';

export const metadata = {
  title: "Free AI Image Generator Online — ToolVoid",
  description: "Generate stunning AI images online for free. Create unique artwork, illustrations, and photos from text descriptions using artificial intelligence. No sign-up needed.",
  keywords: ["free AI image generator online", "AI image generator", "text to image", "AI art generator", "generate images AI"],
  openGraph: {
    title: "Free AI Image Generator | ToolVoid",
    description: "Generate stunning AI images from text descriptions for free. Create unique artwork instantly.",
    url: "https://toolvoid.com/imagegen",
  }
}

export default function Page() {
  redirect('/image-generator');
}
