import { Metadata } from 'next';
import AndreaPageClient from './AndreaPageClient';

export const metadata: Metadata = {
  title: 'Andrea | Memorándum',
  description: 'Memorándum de Andrea. Un rincón para recordar lo que importa.',
};

export default function AndreaPage() {
  return <AndreaPageClient />;
}
