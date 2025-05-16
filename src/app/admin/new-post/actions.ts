'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { revalidatePath } from 'next/cache';

interface CreatePostResult {
  success: boolean;
  slug?: string;
  error?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

const postsDirectory = path.join(process.cwd(), 'src/content/thoughts');

export async function createPost(formData: FormData): Promise<CreatePostResult> {
  try {
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const tagsString = formData.get('tags') as string;
    const bodyContent = formData.get('content') as string; // This is the main MDX body from the textarea

    if (!title || !excerpt || !bodyContent) {
      return { success: false, error: 'Title, Excerpt, and Content are required.' };
    }

    const slug = generateSlug(title);
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const frontmatter = {
      title,
      date: currentDate,
      excerpt,
      tags,
    };

    // Ensure posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      return { success: false, error: 'A post with this title (and generated slug) already exists.' };
    }

    // Use gray-matter to stringify the frontmatter and content correctly
    const fileContent = matter.stringify(bodyContent, frontmatter);

    fs.writeFileSync(filePath, fileContent);

    // Revalidate paths to ensure the new post shows up without a manual rebuild
    revalidatePath('/thoughts');
    revalidatePath(`/thoughts/${slug}`);
    revalidatePath('/'); // Revalidate home page if it lists recent posts, for example

    return { success: true, slug };

  } catch (error) {
    console.error('Error creating post:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to create post: ${errorMessage}` };
  }
} 