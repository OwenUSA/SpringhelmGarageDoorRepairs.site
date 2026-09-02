import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Springhelm Garage Door Repairs',
  description: 'Garage door repair in Apex and the west Raleigh metro.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
