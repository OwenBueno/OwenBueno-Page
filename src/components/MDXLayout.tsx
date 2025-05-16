import type { MDXLayoutProps } from '../types/mdx.js'

export default function MDXLayout({ children, frontMatter }: MDXLayoutProps) {
  return (
    <article className="prose prose-slate dark:prose-invert mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-2">{frontMatter.title}</h1>
        <p className="text-slate-600 dark:text-slate-400">{frontMatter.description}</p>
        <time className="text-sm text-slate-500">
          {new Date(frontMatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {frontMatter.tags && (
          <div className="mt-4 flex gap-2">
            {frontMatter.tags.map(tag => (
              <span
                key={tag}
                className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-1 text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      {children}
    </article>
  )
}