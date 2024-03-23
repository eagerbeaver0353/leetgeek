import Head from 'next/head'
import {
  headerTitle as defaultTitle,
  description as defaultDescription,
  author as defaultAuthor,
  siteUrl as baseUrl,
  siteLogo,
} from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'

// types for frontmatters
export interface Props {
  title?: string
  meta_title?: string
  description?: string
  image?: string
  noindex?: boolean
  canonical?: string
}

export default function Metadata({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
}: Props) {
  const pathname = usePathname()
  const pf = 'Poppins:wght@400;500;600;700'
  const sf = 'Montserrat:wght@400;500;600;700'
  return (
    <Head>
      <meta name="theme-name" content="astro-boilerplate" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

      {/* <!-- google font css --> */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href={`https://fonts.googleapis.com/css2?family=${pf}${
          sf ? '&family=' + sf : ''
        }&display=swap`}
        rel="stylesheet"
      />
      {/* <!-- aos style link --> */}
      <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      {/* <!-- swiper link --> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css" />
      {/* <!-- responsive meta --> */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* <!-- title --> */}
      <title>{meta_title ? meta_title : title ? title : defaultTitle}</title>

      {/* <!-- canonical url --> */}
      {canonical && <link rel="canonical" href={canonical} item-prop="url" />}

      {/* <!-- noindex robots --> */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* <!-- meta-description --> */}
      <meta name="description" content={description ? description : defaultDescription} />

      {/* <!-- author from config.json --> */}
      <meta name="author" content={defaultAuthor} />

      {/* <!-- og-title --> */}
      <meta property="og:title" content={meta_title ? meta_title : title ? title : defaultTitle} />

      {/* <!-- og-description --> */}
      <meta property="og:description" content={description ? description : defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}/${pathname}`} />

      {/* <!-- twitter-title --> */}
      <meta name="twitter:title" content={meta_title ? meta_title : title ? title : defaultTitle} />

      {/* <!-- twitter-description --> */}
      <meta name="twitter:description" content={description ? description : defaultDescription} />

      {/* <!-- og-image --> */}
      <meta property="og:image" content={`${baseUrl}${image ? image : siteLogo}`} />

      {/* <!-- twitter-image --> */}
      <meta name="twitter:image" content={`${baseUrl}${image ? image : siteLogo}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
