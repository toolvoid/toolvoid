import CapsuleManagerClient from '../capsule-manager-page/CapsuleManagerClient';
import ToolLandingDetails from '../../components/ToolLandingDetails';
import { createToolMetadata } from '../../lib/toolMetadata';

export const metadata = createToolMetadata('capsule-manager');

export default function CapsuleManagerPage() {
	return (
		<>
			<div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem 0' }}>
				<h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Capsule Manager for Saving AI Context</h1>
				<p style={{ color: '#6b6b85', lineHeight: 1.7, fontSize: '1rem' }}>
					Keep useful AI project context available between conversations. Save prompts, decisions, and working notes as named capsules, then search and restore the material when you return to a task. Capsules are stored locally in your browser.
				</p>
			</div>
			<CapsuleManagerClient />
			<ToolLandingDetails tool="capsule-manager" />
		</>
	);
}
