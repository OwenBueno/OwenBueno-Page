import { Metadata } from 'next';
import Link from 'next/link';
import styles from './ProjectsPage.module.css';
import TagPill from '@/components/ui/TagPill';
import { Github, ExternalLink } from 'lucide-react'; // Assuming you use lucide-react for icons

export const metadata: Metadata = {
  title: 'My Projects | Owen Bueno',
  description: 'A showcase of projects I have worked on, including personal, open source, and freelance work.',
};

interface ProjectLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface Project {
  slug: string;
  name: string;
  description: string;
  techStack?: string[];
  links?: ProjectLink[];
  tags?: string[];
  imageUrl?: string; // Optional image for the card
}

const projectsData: Project[] = [
  {
    slug: 'laneta-estudio',
    name: 'Laneta Estudio',
    description: 'A creative studio focused on web design, development, and branding. We help businesses build a strong online presence with beautiful and functional websites.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Contentful'],
    links: [
      { href: 'https://laneta.estudio', label: 'Visit Site', icon: <ExternalLink size={16} /> },
    ],
    tags: ['Web Development', 'Branding', 'UI/UX'],
    imageUrl: '/images/projects/laneta-placeholder.png', // Replace with actual image path
  },
  {
    slug: 'ai-saas-platform',
    name: 'AI-Powered SaaS Platform',
    description: 'A new venture building a SaaS platform that provides AI-powered assistants for companies and individuals to automate tasks and improve productivity.',
    techStack: ['Python', 'FastAPI', 'React', 'Next.js', 'LLMs', 'AWS'],
    links: [
      { href: '#', label: 'Coming Soon', icon: <ExternalLink size={16} /> }, // Update with actual link
    ],
    tags: ['SaaS', 'Artificial Intelligence', 'Productivity'],
  },
  {
    slug: 'personal-blog',
    name: 'This Personal Blog',
    description: 'My digital playground where I share thoughts, projects, and explorations. Built with Next.js and CSS Modules for a clean and fast experience.',
    techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'MDX'],
    links: [
      { href: 'https://github.com/OwenBueno/OwenBueno-Page', label: 'GitHub', icon: <Github size={16} /> },
    ],
    tags: ['Open Source', 'Web Development', 'Blogging'],
  },
  {
    slug: 'freelance-ecom',
    name: 'E-commerce Site for X',
    description: 'Developed a custom e-commerce platform for a local artisan, enabling them to sell their products online and reach a wider audience.',
    techStack: ['Shopify', 'Liquid', 'JavaScript', 'Headless CMS'],
    tags: ['E-commerce', 'Freelance', 'Web Design'],
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>My Projects</h1>
        <p className={styles.heroSubtitle}>
          A selection of projects I&apos;m proud to have worked on. From web applications to open source contributions and personal experiments.
        </p>
      </section>

      <section className={styles.projectsSection}>
        {projectsData.map((project) => (
          <article key={project.slug} className={styles.projectCard}>
            {/* Optional: Add an image here if project.imageUrl is present */}
            {/* Example: {project.imageUrl && <img src={project.imageUrl} alt={project.name} className={styles.projectImage} />} */}
            <header className={styles.projectHeader}>
              <h2 className={styles.projectName}>{project.name}</h2>
            </header>
            <p className={styles.projectDescription}>{project.description}</p>
            
            {project.techStack && project.techStack.length > 0 && (
              <div className={styles.techStack}>
                <h3 className={styles.techStackTitle}>Tech Stack</h3>
                <div className={styles.techList}>
                  {project.techStack.map((tech) => (
                    <TagPill key={tech} className={styles.techTag}>{tech}</TagPill>
                  ))}
                </div>
              </div>
            )}

            {project.tags && project.tags.length > 0 && (
              <div className={styles.tagsList}>
                {project.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            )}

            {project.links && project.links.length > 0 && (
              <div className={styles.projectLinks}>
                {project.links.map((link) => (
                  <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
} 