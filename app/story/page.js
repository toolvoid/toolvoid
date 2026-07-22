import { createToolMetadata } from '../../lib/toolMetadata';
import { isMaintenanceMode } from '../../lib/maintenanceMode';
import StoryClient from './StoryClient';

export const metadata = {
  title: "AI Script Generator Free Online — ToolVoid",
  description: "Generate timed AI video scripts with narration and visual directions. Perfect for YouTube, shorts, reels, documentaries, and creative video production.",
  keywords: ["AI script generator free online", "script generator", "AI video script writer", "video script maker", "AI storytelling", "video narration generator"],
  openGraph: {
    title: "AI Script Generator Free Online | ToolVoid",
    description: "Generate timed AI video scripts with narration and visual directions instantly.",
    url: "https://toolvoid.com/story",
  },
  ...createToolMetadata('story'),
}

export default function Page() {
  return <StoryClient maintenanceMode={isMaintenanceMode('story')} />;
}
