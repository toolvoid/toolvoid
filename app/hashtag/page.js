import { createToolMetadata } from '../../lib/toolMetadata';
import { isMaintenanceMode } from '../../lib/maintenanceMode';
import HashtagClient from './HashtagClient';

export const metadata = {
  title: "AI Hashtag Generator Instagram Free — ToolVoid",
  description: "Generate trending Instagram hashtags with AI for free. Get relevant, high-performing hashtags for your posts, reels, and stories to boost reach and engagement.",
  keywords: ["AI hashtag generator Instagram free", "hashtag generator", "Instagram hashtag maker", "trending hashtags", "AI hashtag suggestions"],
  openGraph: {
    title: "AI Hashtag Generator Instagram | ToolVoid",
    description: "Generate trending Instagram hashtags with AI for free to boost reach and engagement.",
    url: "https://toolvoid.com/hashtag",
  },
  ...createToolMetadata('hashtag'),
}

export default function Page() {
  return <HashtagClient maintenanceMode={isMaintenanceMode('hashtag')} />;
}
