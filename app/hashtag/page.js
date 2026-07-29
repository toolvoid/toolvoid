import { createToolMetadata } from '../../lib/toolMetadata';
import { isMaintenanceMode } from '../../lib/maintenanceMode';
import HashtagClient from './HashtagClient';

const baseMetadata = createToolMetadata('hashtag');

export const metadata = {
  ...baseMetadata,
  title: 'Free AI Hashtag Generator for Instagram, TikTok, YouTube & More — ToolVoid',
  description: 'Generate fresh, platform-specific hashtags for Instagram, TikTok, YouTube, LinkedIn, and X with AI. Create a polished hashtag set, copy it instantly, and publish with more confidence.',
  keywords: ['AI hashtag generator', 'hashtag generator free', 'Instagram hashtag generator', 'TikTok hashtag generator', 'YouTube hashtags'],
  alternates: { canonical: 'https://toolvoid.com/hashtag' },
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Free AI Hashtag Generator for Social Media — ToolVoid',
    description: 'Generate relevant hashtags for Instagram, TikTok, YouTube, LinkedIn, and X with one click using AI.',
    url: 'https://toolvoid.com/hashtag',
  },
};

export default function Page() {
  return (
    <>
      <HashtagClient maintenanceMode={isMaintenanceMode('hashtag')} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What does the hashtag generator do?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It turns a short topic or description into a fresh set of platform-specific hashtags that are easy to copy and use in captions, bios, and video descriptions.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the tool useful for Instagram and TikTok?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The generator produces tailored hashtag clusters for Instagram, TikTok, YouTube, LinkedIn, and X so you can match the way each platform surfaces content.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many hashtags does it generate?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Each run generates a balanced set of hashtags grouped by reach level, so you get a mix of broad, medium, and niche tags in one place.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
