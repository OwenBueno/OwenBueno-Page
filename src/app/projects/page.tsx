import { Metadata } from 'next';
import { getAllProjects } from '@/lib/projects';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'My Projects | Owen Bueno',
  description: 'A showcase of projects I have worked on, including personal, open source, and freelance work.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsPageClient projects={projects} />;
}
