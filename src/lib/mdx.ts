import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { MDXPost, FrontMatter } from '../types/mdx.js'

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog')

export async function getAllPosts(): Promise<MDXPost[]> {
  const posts = fs.readdirSync(POSTS_PATH)
    .filter(path => /\.mdx?$/.test(path))
    .map(filePath => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath), 'utf8')
      const { content, data } = matter(source)
      const slug = filePath.replace(/\.mdx?$/, '')
      
      return {
        content,
        slug,
        ...data as FrontMatter
      }
    })
    .filter(post => process.env.NODE_ENV === 'development' || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getPostBySlug(slug: string): Promise<MDXPost | null> {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`)
    const source = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(source)

    return {
      content,
      slug,
      ...data as FrontMatter
    }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return null
  }
}