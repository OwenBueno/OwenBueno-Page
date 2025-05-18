import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Me | My Creative Blog',
  description: 'Learn more about the author of this blog.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}