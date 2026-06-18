import { redirect } from 'next/navigation';

export const metadata = {
  title: "Free SEO Keyword Generator — ToolVoid",
  description: "Generate high-performing SEO keywords for free with our AI keyword generator. Find long-tail keywords, related terms, and search volume estimates to boost your rankings.",
  keywords: ["free SEO keyword generator", "keyword generator", "SEO keywords", "keyword research tool", "long tail keywords"],
  openGraph: {
    title: "Free SEO Keyword Generator | ToolVoid",
    description: "Generate high-performing SEO keywords for free. Find long-tail keywords and related terms.",
    url: "https://toolvoid.com/keyword",
  }
}

export default function Page() {
  redirect('/keyword-generator');
}
