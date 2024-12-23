import getWithMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'

const withMDX = getWithMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkReadingTime,
      remarkMDXReadingTime,
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
