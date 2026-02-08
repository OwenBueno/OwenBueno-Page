import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectLink {
  href: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  techStack?: string[];
  links?: ProjectLink[];
  tags?: string[];
  imageUrl?: string;
  featured?: boolean;
  date?: string;
}

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getAllProjects(): Project[] {
  let fileNames: string[] = [];
  try {
    if (fs.existsSync(projectsDirectory)) {
      fileNames = fs.readdirSync(projectsDirectory);
    }
  } catch (_error) {
    console.error("Error reading projects directory:", _error);
    return [];
  }
  
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const data = matterResult.data;

      return {
        slug,
        name: data.title || '',
        description: data.excerpt || '',
        techStack: data.techStack || [],
        links: data.links || [],
        tags: data.tags || [],
        imageUrl: data.imageUrl || '',
        featured: data.featured || false,
        date: data.date || '',
      };
    });

  return allProjectsData.sort((a, b) => {
    if (a.date && b.date) {
      return a.date < b.date ? 1 : -1;
    }
    return 0;
  });
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(project => project.featured);
}
