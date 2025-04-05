/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mindful: {
          50: '#f5f7f6',
          100: '#e6ede9',
          200: '#d1e0d8',
          300: '#afc8bd',
          400: '#86a89a',
          500: '#658b7d',
          600: '#507264',
          700: '#435c52',
          800: '#3a4c45',
          900: '#334039',
        },
        calm: {
          50: '#f6f8fa',
          100: '#edf1f5',
          200: '#dce5ed',
          300: '#c1d2e2',
          400: '#9db6d0',
          500: '#7c9bbc',
          600: '#6382a7',
          700: '#526b8c',
          800: '#465a74',
          900: '#3d4d61',
        },
        warmth: {
          50: '#fdf8f6',
          100: '#f9e8e2',
          200: '#f5d5c9',
          300: '#edb4a1',
          400: '#e28872',
          500: '#d66d54',
          600: '#c45642',
          700: '#a44537',
          800: '#873c32',
          900: '#70352d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-crimson-pro)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'soft': '0 2px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mindful': 'linear-gradient(to right bottom, rgb(245, 247, 246), rgb(175, 200, 189))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              color: theme('colors.mindful.800'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.mindful.700'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.mindful.600'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            strong: {
              color: theme('colors.mindful.800'),
            },
            a: {
              color: theme('colors.mindful.600'),
              '&:hover': {
                color: theme('colors.mindful.800'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 