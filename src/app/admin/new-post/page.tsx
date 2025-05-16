'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from './actions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDebounce } from '@/lib/hooks';
import Button from '@/components/ui/Button';
import styles from './NewPostPage.module.css';

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [mdxInputBody, setMdxInputBody] = useState(
`## Your Section Title\n\nStart writing your MDX content here...\n\nUse **markdown**! You can also use inline \`<code>\` for small HTML examples, or full code blocks for larger ones.\n\n\javascript\n// You can include code blocks\nconsole.log('Hello, MDX!');\n\\n`);

  const debouncedMdxBody = useDebounce(mdxInputBody, 500);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set('content', mdxInputBody);

    const result = await createPost(formData);

    if (result.success && result.slug) {
      router.push('/admin/dashboard?postCreated=true');
    } else {
      setError(result.error || 'Failed to create post. Please try again.');
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create New Post</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <input id="title" name="title" type="text" required
                     className={styles.input}
                     disabled={isLoading} placeholder="Enter post title" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="tags" className={styles.label}>Tags (comma-separated)</label>
              <input id="tags" name="tags" type="text"
                     className={styles.input}
                     disabled={isLoading} placeholder="e.g., tech, creative, thoughts" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>Excerpt (Short Summary)</label>
            <textarea id="excerpt" name="excerpt" rows={3} required
                      className={styles.textarea}
                      disabled={isLoading} placeholder="A brief summary of the post"></textarea>
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label htmlFor="mdxContentBody" className={styles.label}>MDX Content Body</label>
              <p className={styles.helperText}>
                Write the main body of your MDX content. Frontmatter will be generated automatically.
              </p>
              <textarea
                id="mdxContentBody"
                name="content"
                rows={25}
                required
                className={styles.textarea + ' ' + styles.mdxTextarea}
                disabled={isLoading}
                placeholder="Write your MDX content body here..."
                value={mdxInputBody} 
                onChange={(e) => setMdxInputBody(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Live Preview</label>
              <p className={styles.helperText}>
                (Approximate preview of Markdown content)
              </p>
              <div className={styles.previewBox}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {debouncedMdxBody}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <Button type="button" onClick={() => router.back()} 
                    className={styles.cancelButton}
                    disabled={isLoading}>Cancel</Button>
            <Button type="submit"
                    className={styles.submitButton}
                    disabled={isLoading}>{isLoading ? 'Creating Post...' : 'Create Post'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}