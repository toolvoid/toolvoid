import OneBrainClient from '../one-brain-page/OneBrainClient';
import ToolLandingDetails from '../../components/ToolLandingDetails';
import { createToolMetadata } from '../../lib/toolMetadata';

export const metadata = createToolMetadata('one-brain');

export default function OneBrainPage() {
  return (
    <>
      <OneBrainClient />
      <ToolLandingDetails tool="one-brain" />
    </>
  );
}
