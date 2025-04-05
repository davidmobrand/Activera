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
        // Deep teal for primary brand elements (from brain icon)
        act: {
          50: '#e6f4f4',
          100: '#cce9e9',
          200: '#99d3d3',
          300: '#66bdbd',
          400: '#33a7a7',
          500: '#008080',  // Base teal
          600: '#006666',
          700: '#004d4d',
          800: '#003333',
          900: '#001a1a',
        },
        // Sage green for secondary elements (from leaf icon)
        sage: {
          50: '#f0f6f0',
          100: '#e1ede1',
          200: '#c3dbc3',
          300: '#a5c9a5',
          400: '#87b787',
          500: '#69a569',  // Base sage
          600: '#548454',
          700: '#3f633f',
          800: '#2a422a',
          900: '#152115',
        },
        // Warm sand for backgrounds (from image background)
        sand: {
          50: '#faf8f4',
          100: '#f5f1e9',
          200: '#ebe3d3',
          300: '#e1d5bd',
          400: '#d7c7a7',
          500: '#cdb991',  // Base sand
          600: '#a49474',
          700: '#7b6f57',
          800: '#524a3a',
          900: '#29251d',
        },
        // Off-white for text and borders
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#fbf7ef',
          300: '#f9f3e7',
          400: '#f7efdf',
          500: '#f5ebd7',  // Base cream
          600: '#c4bcac',
          700: '#938d81',
          800: '#625e56',
          900: '#312f2b',
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
        'gradient-act': 'linear-gradient(to right bottom, rgb(230, 244, 244), rgb(102, 189, 189))',
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
              color: theme('colors.sage.600'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            strong: {
              color: theme('colors.act.700'),
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