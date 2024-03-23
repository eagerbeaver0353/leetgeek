// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const defaultTheme = require('./data/theme.json')

let font_base = Number(defaultTheme.fonts.font_size.base.replace('px', ''))
let font_scale = Number(defaultTheme.fonts.font_size.scale)
let h6 = font_base / font_base
let h5 = h6 * font_scale
let h4 = h5 * font_scale
let h3 = h4 * font_scale
let h2 = h3 * font_scale
let h1 = h2 * font_scale
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType
if (defaultTheme.fonts.font_family.primary) {
  fontPrimary = defaultTheme.fonts.font_family.primary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;.]+/gi, '')
  console.log(fontPrimary)
  fontPrimaryType = defaultTheme.fonts.font_family.primary_type
}
if (defaultTheme.fonts.font_family.secondary) {
  fontSecondary = defaultTheme.fonts.font_family.secondary
    .replace(/\+/g, ' ')
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;.]+/gi, '')
  console.log(fontSecondary)
  fontSecondaryType = defaultTheme.fonts.font_family.secondary_type
}

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      // fontFamily: {
      //   sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      // },
      colors: {
        primary: defaultTheme.colors.theme_color.primary,
        secondary: defaultTheme.colors.theme_color.secondary,
        txt: defaultTheme.colors.text_color,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      container: {
        center: true,
        padding: '2rem',
        width: '100%',
      },
      fontSize: {
        base: font_base + 'px',
        h1: h1 + 'rem',
        'h1-md': h1 * 0.95 + 'rem',
        'h1-sm': h1 * 0.8 + 'rem',
        h2: h2 + 'rem',
        'h2-sm': h2 * 0.8 + 'rem',
        h3: h3 + 'rem',
        'h3-sm': h3 * 0.8 + 'rem',
        h4: h4 + 'rem',
        h5: h5 + 'rem',
        h6: h6 + 'rem',
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-bootstrap-grid')({ generateContainer: false }),
  ],
}
