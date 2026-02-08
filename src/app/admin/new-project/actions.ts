'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

interface CreateProjectResult {
  success: boolean;
  slug?: string;
  error?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export async function createProject(formData: FormData): Promise<CreateProjectResult> {
  try {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const techStackString = formData.get('techStack') as string;
    const tagsString = formData.get('tags') as string;
    const linksString = formData.get('links') as string; // Expecting format: label|href, label|href
    const featured = formData.get('featured') === 'on';
    const imageUrl = formData.get('imageUrl') as string;
    const bodyContent = formData.get('content') as string;

    if (!title || !excerpt || !bodyContent) {
      return { success: false, error: 'Title, Excerpt, and Content are required.' };
    }

    const slug = generateSlug(title);
    const currentDate = new Date().toISOString().split('T')[0];
    const techStack = techStackString ? techStackString.split(',').map(s => s.trim()).filter(Boolean) : [];
    const tags = tagsString ? tagsString.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    const links = linksString ? linksString.split(',').map(s => {
      const [label, href] = s.split('|').map(p => p.trim());
      return label && href ? { label, href } : null;
    }).filter(Boolean) : [];

    const frontmatter = {
      title,
      date: currentDate,
      excerpt,
      techStack,
      tags,
      links,
      featured,
      imageUrl,
    };

    if (!fs.existsSync(projectsDirectory)) {
      fs.mkdirSync(projectsDirectory, { recursive: true });
    }

    const filePath = path.join(projectsDirectory, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      return { success: false, error: 'A project with this title already exists.' };
    }

    const fileContent = matter.stringify(bodyContent, frontmatter);
    fs.writeFileSync(filePath, fileContent);

    revalidatePath('/projects');
    revalidatePath('/');

    return { success: true, slug };

  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project.' };
  }
}
