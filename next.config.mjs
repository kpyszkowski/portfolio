import getWithMDX from '@next/mdx'
import getWithSVGR from 'next-plugin-svgr'

import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeSlug from 'rehype-slug'

import remarkCallout from '@r4ai/remark-callout'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'
import remarkSectionize from 'remark-sectionize'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

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

/** @type {import('rehype-external-links').Options} */
const externalLinksOptions = {
  target: '_blank',
  rel: ['noopener', 'noreferrer'],
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
      [rehypeExternalLinks, externalLinksOptions],
    ],
  },
})

const withSVGR = (nextConfig) =>
  getWithSVGR({
    ...nextConfig,
    svgrOptions: {
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    },
  })

initOpenNextCloudflareForDev()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
    unoptimized: process.env.NODE_ENV === 'development',
  },
  transpilePackages: ['shiki'],
  redirects() {
    return [
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/kamil-pyszkowski-8365071ba',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://www.github.com/kpyszkowski',
        permanent: true,
      },
    ]
  },
}

export default withMDX(withSVGR(nextConfig))
