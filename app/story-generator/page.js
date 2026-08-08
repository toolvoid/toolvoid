import { permanentRedirect } from 'next/navigation';

// Preserve legacy links while keeping /story as the single live Script Writer route.
export default function LegacyStoryGeneratorPage() {
  permanentRedirect('/story');
}
