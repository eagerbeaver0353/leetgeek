import {
  defineDocumentType,
  ComputedFields,
  makeSource,
  defineNestedType,
} from 'contentlayer/source-files'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

export const Icon = defineNestedType(() => ({
  name: 'Icon',
  fields: {
    contacts: { type: 'json', required: true },
    socials: { type: 'json', required: true },
    skills: { type: 'json', required: true },
    others: { type: 'json', required: true },
  },
}))

const Skill = defineDocumentType(() => ({
  name: 'Skill',
  fields: {
    name: { type: 'string', required: true },
    items: { type: 'list', of: { type: 'string' }, default: [] },
    description: { type: 'string', default: '' },
  },
}))

const Experience = defineNestedType(() => ({
  name: 'Experience',
  fields: {
    role: { type: 'string', required: true },
    details: { type: 'list', of: { type: 'string' }, default: [] },
    skillsUsed: { type: 'list', of: { type: 'string', default: [] } },
    employer: { type: 'string', required: true },
    date: { type: 'string' },
    location: { type: 'string' },
  },
}))

const Testimonial = defineNestedType(() => ({
  name: 'Testimonial',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', default: '' },
    description: { type: 'string', default: '' },
    right_thumbnail: { type: 'string' },
    left_thumbnail: { type: 'string' },
    list: {
      type: 'list',
      of: defineDocumentType(() => ({
        name: 'TestimonialAuthor',
        fields: {
          author: { type: 'string', required: true },
          avatar: { type: 'string' },
          profession: { type: 'string', required: true },
          content: { type: 'string', required: true },
        },
      })),
    },
  },
}))

export const User = defineDocumentType(() => ({
  name: 'User',
  filePathPattern: 'users/**/*.md',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    photo: { type: 'string', required: true },
    role: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    contacts: { type: 'json', required: true, default: {} },
    skills: { type: 'json', default: {} },
    experiences: { type: 'list', of: Experience, default: [] },
    projects: { type: 'list', of: { type: 'string' }, default: [] },
    testimonials: { type: 'nested', of: Testimonial, required: true },
  },
}))

export const Metadata = defineDocumentType(() => ({
  name: 'Metadata',
  filePathPattern: 'metadata.md',
  contentType: 'mdx',
  fields: {
    userLabels: { type: 'json', required: true },
    icons: { type: 'nested', of: Icon, required: true },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors, User, Metadata, Skill],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
    createSearchIndex(allBlogs)
  },
})
