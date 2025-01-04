import getWithMDX from '@next/mdx'
import remarkCallout from '@r4ai/remark-callout'
import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'
import remarkSectionize from 'remark-sectionize'

/** @type {import('@r4ai/remark-callout').Options} */
const calloutOptions = {
  root: (callout) => ({
    tagName: 'callout',
    properties: {
      dataCallout: '',
      type: callout.type,
    },
  }),
  title: {
    tagName: 'span',
  },
  body: {
    tagName: 'div',
  },
}

const withMDX = getWithMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkSectionize,
      remarkReadingTime,
      remarkMDXReadingTime,
      [remarkCallout, calloutOptions],
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
