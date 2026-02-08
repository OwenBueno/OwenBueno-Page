'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from './actions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDebounce } from '@/lib/hooks';
import Button from '@/components/ui/Button';
import styles from '../new-post/NewPostPage.module.css'; // Reusing styles

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [mdxInputBody, setMdxInputBody] = useState(`## Project Details\n\nWrite about your project here...`);
  const debouncedMdxBody = useDebounce(mdxInputBody, 500);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set('content', mdxInputBody);

    const result = await createProject(formData);

    if (result.success && result.slug) {
      router.push('/admin/dashboard?projectCreated=true');
    } else {
      setError(result.error || 'Failed to create project.');
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create New Project</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Project Title</label>
              <input id="title" name="title" type="text" required className={styles.input} disabled={isLoading} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="techStack" className={styles.label}>Tech Stack (comma-separated)</label>
              <input id="techStack" name="techStack" type="text" className={styles.input} disabled={isLoading} placeholder="e.g., Next.js, React, GSAP" />
            </div>
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label htmlFor="tags" className={styles.label}>Tags (comma-separated)</label>
              <input id="tags" name="tags" type="text" className={styles.input} disabled={isLoading} placeholder="e.g., Web, Design" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.label}>Image URL</label>
              <input id="imageUrl" name="imageUrl" type="text" className={styles.input} disabled={isLoading} placeholder="/images/projects/example.png" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="links" className={styles.label}>Links (label|href, label|href)</label>
            <input id="links" name="links" type="text" className={styles.input} disabled={isLoading} placeholder="GitHub|https://github.com..., Demo|https://..." />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="excerpt" className={styles.label}>Excerpt (Short Summary)</label>
            <textarea id="excerpt" name="excerpt" rows={2} required className={styles.textarea} disabled={isLoading}></textarea>
          </div>

          <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <input id="featured" name="featured" type="checkbox" className={styles.checkbox} disabled={isLoading} />
            <label htmlFor="featured" className={styles.label} style={{ marginBottom: 0 }}>Featured Project</label>
          </div>

          <div className={styles.gridRow}>
            <div className={styles.formGroup}>
              <label htmlFor="mdxContentBody" className={styles.label}>MDX Content Body</label>
              <textarea
                id="mdxContentBody"
                rows={15}
                required
                className={styles.textarea}
                disabled={isLoading}
                value={mdxInputBody} 
                onChange={(e) => setMdxInputBody(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Live Preview</label>
              <div className={styles.previewBox}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {debouncedMdxBody}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <Button type="button" onClick={() => router.back()} className={styles.cancelButton} disabled={isLoading}>Cancel</Button>
            <Button type="submit" className={styles.submitButton} disabled={isLoading}>{isLoading ? 'Creating Project...' : 'Create Project'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
