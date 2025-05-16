import type { ReactNode } from 'react'

export interface FrontMatter {
  title: string
  description: string
  date: string
  tags?: string[]
  published?: boolean
  image?: string
}

export interface MDXPost extends FrontMatter {
  content: string
  slug: string
}

export interface MDXLayoutProps {
  children: ReactNode
  frontMatter: FrontMatter
}