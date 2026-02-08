import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import Link from 'next/link';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, strikethrough, etc.)
import TagPill from '@/components/ui/TagPill';
import styles from './ThoughtPostPage.module.css';
import ThoughtPostClient from './ThoughtPostClient';
import { formatDate } from '@/lib/utils';

interface ThoughtSlugParams {
  slug: string;
}

// Function to generate metadata for each post page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
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

export default async function ThoughtPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  const mdxOptions = {
    remarkPlugins: [remarkGfm],
  };

  return (
    <ThoughtPostClient>
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

        <div className={styles.proseContent}>
          <MDXRemote source={post.content} options={{ mdxOptions }} />
        </div>

        <div className={styles.backLinkWrapper}>
          <Link href="/thoughts" className={styles.backLink}>
            &larr; Back to all thoughts
          </Link>
        </div>
      </article>
    </ThoughtPostClient>
  );
}
