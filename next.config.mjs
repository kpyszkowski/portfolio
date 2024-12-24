import getWithMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'
import rehypePrettyCode from 'rehype-pretty-code'

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
}

const withMDX = getWithMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkReadingTime,
      remarkMDXReadingTime,
    ],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
