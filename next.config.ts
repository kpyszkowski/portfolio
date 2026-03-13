import getWithMDX from '@next/mdx'
import getWithSVGR from 'next-plugin-svgr'

import rehypeToc from '@stefanprobst/rehype-extract-toc'
import rehypeExtractToc from '@stefanprobst/rehype-extract-toc/mdx'
import rehypeExternalLinks, {
  type Options as RehypeExternalLinkOptions,
} from 'rehype-external-links'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import rehypeSlug from 'rehype-slug'

import remarkCallout, {
  type Options as RemarkCalloutOptions,
} from '@r4ai/remark-callout'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkReadingTime from 'remark-reading-time'
import remarkMDXReadingTime from 'remark-reading-time/mdx.js'
import remarkSectionize from 'remark-sectionize'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { NextConfig } from 'next'

const calloutOptions: RemarkCalloutOptions = {
  root: (callout) => ({
    tagName: 'callout',
    properties: {
      dataCallout: '',
      type: callout.type,
    },
  }),
  title: {
    tagName: 'span',
    properties: {},
  },
  body: {
    tagName: 'div',
    properties: {},
  },
}

const externalLinksOptions: RehypeExternalLinkOptions = {
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

const withSVGR = (nextConfig: NextConfig) =>
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
} satisfies NextConfig

export default withMDX(withSVGR(nextConfig))
