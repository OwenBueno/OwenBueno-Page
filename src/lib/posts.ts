import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the structure of a post's frontmatter and its slug
export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
    [key: string]: unknown; // Changed any to unknown
  };
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'thoughts');

export function getSortedPostsData(): Post[] {
  // Get file names under /src/content/thoughts
  let fileNames: string[] = [];
  try {
    if (fs.existsSync(postsDirectory)) {
      fileNames = fs.readdirSync(postsDirectory);
    }
  } catch (_error) {
    console.error("Error reading posts directory:", _error);
    return []; // Return empty if directory doesn't exist or is unreadable
  }
  
    const currentDate = new Date().toISOString().split('T')[0];
    const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".md" or ".mdx" from file name to get id
      const slug = fileName.replace(/\.(mdx|md)$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        frontmatter: {
          title: matterResult.data.title || 'Untitled',
          date: matterResult.data.date || currentDate,
          excerpt: matterResult.data.excerpt || '',
          tags: matterResult.data.tags || [],
          ...matterResult.data,
        },
        content: matterResult.content,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch {
    // If the directory doesn't exist, there are no slugs.
    return [];
  }
  return fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.(mdx|md)$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<Post | null> {
  const mdxFilePath = path.join(postsDirectory, `${slug}.mdx`);
  const mdFilePath = path.join(postsDirectory, `${slug}.md`);

  let filePath;
  let fileExists = false;

  if (fs.existsSync(mdxFilePath)) {
    filePath = mdxFilePath;
    fileExists = true;
  } else if (fs.existsSync(mdFilePath)) {
    filePath = mdFilePath;
    fileExists = true;
  }

  if (!fileExists || !filePath) {
    return null; // Or throw an error, or handle as a 404 in the page
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  return {
    slug,
    frontmatter: matterResult.data as Post['frontmatter'],
    content: matterResult.content,
  };
} 