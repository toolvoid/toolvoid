import BuilderClient from './BuilderClient';

export const metadata = {
  title: 'Start Building Your Website | ToolVoid Site Maker',
  description: 'Start building a responsive website in ToolVoid Site Maker. Add sections, edit content, arrange elements, and style every detail without code.',
  alternates: { canonical: 'https://toolvoid.com/site-maker/create' },
};

export default function CreateSitePage() {
  return <BuilderClient />;
}
