import { redirect } from 'next/navigation';

export const metadata = {
  title: "AI Story Generator Free Online — ToolVoid",
  description: "Generate creative stories with AI for free. Create unique stories, tales, and narratives from any prompt. Perfect for writers, students, and creative storytelling.",
  keywords: ["AI story generator free online", "story generator", "AI story writer", "creative story maker", "AI storytelling"],
  openGraph: {
    title: "AI Story Generator Free Online | ToolVoid",
    description: "Generate creative stories with AI for free. Create unique tales from any prompt instantly.",
    url: "https://toolvoid.com/story",
  }
}

export default function Page() {
  redirect('/story-generator');
}
