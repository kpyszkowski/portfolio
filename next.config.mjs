import getWithMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc/mdx'
import remarkSectionize from 'remark-sectionize'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'
import rehypeSlug from 'rehype-slug'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'

const withMDX = getWithMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkSectionize,
      remarkReadingTime,
      remarkMDXReadingTime,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeToc,
      rehypeExtractToc,
      rehypeMdxCodeProps,
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
}

export default withMDX(nextConfig)
