/* eslint-disable */
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import Link from 'next/link';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, strikethrough, etc.)
import TagPill from '@/components/ui/TagPill';
import styles from './ThoughtPostPage.module.css';

interface ThoughtSlugParams {
  slug: string;
}

// Function to generate metadata for each post page
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | My Creative Blog`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: ['[Your Name]'], // Replace with your name
      tags: post.frontmatter.tags,
    },
  };
}

// Function to generate static paths for all posts
export async function generateStaticParams(): Promise<ThoughtSlugParams[]> {
  const paths = getAllPostSlugs();
  // Ensure the mapped result matches ThoughtSlugParams for { slug: string }
  return paths.map(p => ({ slug: p.params.slug })); 
}

// Helper function to format date
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default async function ThoughtPostPage({ params }: any) {
  const { slug } = params;
  const post = await getPostData(slug);

  if (!post) {
    notFound(); // Triggers the not-found page
  }

  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [], // Add any rehype plugins here if needed (e.g., for syntax highlighting)
  };

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {post.frontmatter.title}
        </h1>
        <time dateTime={post.frontmatter.date} className={styles.date}>
          {formatDate(post.frontmatter.date)}
        </time>
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className={styles.tagsList}>
            {post.frontmatter.tags.map((tag) => (
              <TagPill key={tag}>
                <Link href={`/tags/${tag}`}>#{tag}</Link>
              </TagPill>
            ))}
          </div>
        )}
      </header>

      {/* Apply prose styles for MDX content for better readability */}
      <div className={styles.proseContent}>
        <MDXRemote source={post.content} options={{ mdxOptions }} />
      </div>

      <div className={styles.backLinkWrapper}>
        <Link href="/thoughts" className={styles.backLink}>
          &larr; Back to all thoughts
        </Link>
      </div>
    </article>
  );
} 