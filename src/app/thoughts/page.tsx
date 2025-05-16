import Link from 'next/link';
import { getSortedPostsData, Post } from '@/lib/posts';
import { Metadata } from 'next';
import Card from '@/components/ui/Card';
import TagPill from '@/components/ui/TagPill';
import styles from './ThoughtsPage.module.css';

export const metadata: Metadata = {
  title: 'My Thoughts | My Creative Blog',
  description: 'A collection of articles and reflections.',
};

// Helper function to format date (optional, can be done inline or with a date library)
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default async function ThoughtsPage() {
  const allPosts = getSortedPostsData();

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h1 className={styles.heroTitle}>My Thoughts</h1>
        <p className={styles.heroSubtitle}>No thoughts published yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>My Thoughts</h1>
        <p className={styles.heroSubtitle}>
          A collection of articles, reflections, and ideas I&apos;m exploring.
        </p>
      </section>

      <section className={styles.postsSection}>
        {allPosts.map((post: Post) => (
          <Card key={post.slug} className={styles.postCard}>
            <header className={styles.postHeader}>
              <h2 className={styles.postTitle}>
                <Link href={`/thoughts/${post.slug}`} className={styles.postTitleLink}>
                  {post.frontmatter.title}
                </Link>
              </h2>
              <time dateTime={post.frontmatter.date} className={styles.postDate}>
                {formatDate(post.frontmatter.date)}
              </time>
            </header>
            <p className={styles.postExcerpt}>
              {post.frontmatter.excerpt}
            </p>
            <Link 
              href={`/thoughts/${post.slug}`} 
              className={styles.readMore}
            >
              Read more &rarr;
            </Link>
            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className={styles.tagsList}>
                {post.frontmatter.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            )}
          </Card>
        ))}
      </section>
    </div>
  );
} 