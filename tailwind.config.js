const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1.1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }]
    },
    extend: {
      boxShadow: {
        'blackhole-md':
          '0 1px 6px 1px rgb(0 0 0 / 0.1), 0 0 4px -2px rgb(0 0 0 / 0.1)'
      },
      textColor: {
        muted: {
          DEFAULT: colors.neutral[400],
          light: colors.neutral[400],
          dark: colors.neutral[400]
        }
        // base: {
        //   DEFAULT: colors.yellow[800]
        // }
      },
      backgroundColor: {
        background: {
          DEFAULT: colors.neutral[50],
          light: colors.neutral[50],
          dark: colors.gray[900],
          secondary: colors.neutral[100]
        }
      },
      colors: {
        'secondary-gray': '#AAAAAA',
        primary: {
          ...colors.indigo,
          DEFAULT: colors.indigo[500],
          light: {
            ...colors.indigo,
            DEFAULT: colors.indigo[500]
          },
          dark: colors.white
        },
        secondary: {
          ...colors.slate,
          DEFAULT: colors.slate[800],
          light: {
            ...colors.slate,
            DEFAULT: colors.slate[800]
          },
          dark: {
            ...colors.indigo,
            DEFAULT: colors.indigo[500]
          }
        }
      },
      borderRadius: {
        '4xl': '2rem'
      },
      fontFamily: {
        sans: ['Barlow', ...defaultTheme.fontFamily.sans],
        display: ['Lexend', ...defaultTheme.fontFamily.sans]
      },
      maxWidth: {
        '2xl': '40rem'
      },
      backgroundImage: {
        blackhole: "url('./assets/Images/bg_bh.png')"
      },
      keyframes: {
        fadeIn: {
          '0%, 100%': { opacity: ' 0' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 2s cubic-bezier(0.39, 0.575, 0.565, 1) both'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => ({ 'animation-delay': value })
        },
        {
          values: theme('transitionDelay')
        }
      )
    })
  ],
  safelist: [
    'text-2xl',
    'text-3xl',
    {
      pattern: /gap-(1|2|3|4|5|6|7|8|9|10)/
    },
    {
      pattern: /col-span-(1|2|3|4|5|6|7|8|9|10|11|12)/,
      variants: ['sm', 'md', 'lg', 'xl']
    }
  ]
}
