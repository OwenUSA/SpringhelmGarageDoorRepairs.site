// STUB: route placeholder. Content lands in the Prompt 6+7 build wave.
// Metadata is NOT stubbed and is NOT literal here — it is read from content/copy.ts.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';

const meta = copy.routes['/privacy'].meta;
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return <main data-route="/privacy">{/* privacy */}</main>;
}
