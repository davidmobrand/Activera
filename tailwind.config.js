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
        // Deep teal for primary brand elements
        act: {
          50: '#f2f5f5',
          100: '#e6ebeb',
          200: '#c1d1d1',
          300: '#9bb7b7',
          400: '#517d7d',
          500: '#264444',
          600: '#223d3d',
          700: '#1d3333',
          800: '#172929',
          900: '#132222',
        },
        // Muted sage green for secondary elements
        sage: {
          50: '#f5f7f5',
          100: '#ebefeb',
          200: '#cdd7cd',
          300: '#aebfae',
          400: '#728e72',
          500: '#355e35',
          600: '#305530',
          700: '#284728',
          800: '#203820',
          900: '#1a2e1a',
        },
        // Warm beige for backgrounds
        sand: {
          50: '#faf9f6',
          100: '#f5f3ed',
          200: '#e6e2d2',
          300: '#d7d1b7',
          400: '#baaf82',
          500: '#9c8d4d',
          600: '#8c7f45',
          700: '#756a3a',
          800: '#5e552e',
          900: '#4d4626',
        },
        // Off-white for text and borders
        cream: {
          50: '#fefefd',
          100: '#fcfcfa',
          200: '#f9f8f2',
          300: '#f5f4ea',
          400: '#eeebda',
          500: '#e7e2c9',
          600: '#d0cbb5',
          700: '#aea997',
          800: '#8b8779',
          900: '#726f63',
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
        'gradient-act': 'linear-gradient(to right bottom, rgb(242, 245, 245), rgb(155, 183, 183))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.act.700'),
            h1: {
              color: theme('colors.act.600'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.act.500'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.sage.500'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            strong: {
              color: theme('colors.act.600'),
            },
            a: {
              color: theme('colors.sage.600'),
              '&:hover': {
                color: theme('colors.sage.700'),
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