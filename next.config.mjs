import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true
  }
}

export default withMDX(nextConfig)