import { createToolMetadata } from '../../lib/toolMetadata';
import { isMaintenanceMode } from '../../lib/maintenanceMode';
import HashtagClient from './HashtagClient';

const baseMetadata = createToolMetadata('hashtag');

export const metadata = {
  ...baseMetadata,
  title: 'AI Hashtag Generator for Social Media | ToolVoid',
  description: 'Generate platform-specific hashtag suggestions for Instagram, TikTok, YouTube, LinkedIn, and X, then review and copy a set for your post caption.',
  keywords: ['AI hashtag generator', 'hashtag generator free', 'Instagram hashtag generator', 'TikTok hashtag generator', 'YouTube hashtags'],
  alternates: { canonical: 'https://toolvoid.com/hashtag' },
  openGraph: {
    ...baseMetadata.openGraph,
    title: 'Free AI Hashtag Generator for Social Media — ToolVoid',
    description: 'Generate relevant hashtags for Instagram, TikTok, YouTube, LinkedIn, and X with one click using AI.',
    url: 'https://toolvoid.com/hashtag',
  },
  title: 'AI Hashtag Generator for Social Media | ToolVoid',
};

export default function Page() {
  return (
    <>
      <HashtagClient maintenanceMode={isMaintenanceMode('hashtag')} />
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long can the topic be?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your topic can be up to 200 characters long.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where does my topic go?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your topic, platform, category and number of hashtags are sent to Google Gemini to create the hashtags. See the Privacy Policy for details.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which result counts can I choose?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can choose 15, 20 or 30 hashtags.',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
