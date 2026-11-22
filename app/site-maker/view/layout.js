export async function generateMetadata({ params }) {
  const { projectId } = await params;
  return {
    alternates: {
      canonical: `https://toolvoid.com/site-maker/view/${encodeURIComponent(projectId)}`,
    },
  };
}

export default function SiteMakerViewLayout({ children }) {
  return children;
}
