'use client';

import { useEffect, useState } from 'react';
import SectionRenderer from '../../../../components/site-maker/SectionRenderer';

export default function SiteMakerSharedView({ params }) {
  const [project, setProject] = useState(null); const [error, setError] = useState('');
  useEffect(() => { Promise.resolve(params).then(({ projectId }) => fetch(`/api/site-maker-projects?id=${projectId}`).then((response) => response.json()).then((data) => response.ok ? setProject(data) : setError(data.error || 'Project unavailable.')).catch(() => setError('Project unavailable.'))); }, [params]);
  if (error) return <main style={{ padding: 48, fontFamily: 'system-ui' }}>{error}</main>;
  if (!project) return <main style={{ padding: 48, fontFamily: 'system-ui' }}>Loading site…</main>;
  return <main style={{ minHeight: '100vh', background: '#f8fafc' }}>{project.sections.filter((section) => !section.hidden).map((section) => <SectionRenderer key={section.id} section={section} mobileMode breakpoint="desktop" scale={1} />)}<footer style={{ padding: 24, textAlign: 'center', color: '#64748b', fontFamily: 'system-ui', fontSize: 13 }}>Made with ToolVoid Site Maker</footer></main>;
}
