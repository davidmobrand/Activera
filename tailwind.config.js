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
        // Cool blue-grays for primary UI elements
        mindful: {
          50: '#f8f9fb',
          100: '#eef1f5',
          200: '#dce3eb',
          300: '#bbc7d5',
          400: '#94a5b8',
          500: '#718599',
          600: '#576a7d',
          700: '#485867',
          800: '#3d4a57',
          900: '#343f4a',
        },
        // Warm terracotta accents
        warmth: {
          50: '#fdf8f6',
          100: '#f7e9e5',
          200: '#efd3cb',
          300: '#e4b4a6',
          400: '#d68f7b',
          500: '#c76f57',
          600: '#b15642',
          700: '#934737',
          800: '#7a3c30',
          900: '#65332a',
        },
        // Muted sage and forest tones
        calm: {
          50: '#f6f8f7',
          100: '#e7ece9',
          200: '#d3dfd9',
          300: '#b4c7bc',
          400: '#8ea69a',
          500: '#6f8879',
          600: '#576c5e',
          700: '#48584d',
          800: '#3d4941',
          900: '#343c37',
        },
        // Neutral stone base
        stone: {
          50: '#fafaf9',
          100: '#f2f1ef',
          200: '#e5e4e1',
          300: '#d1cfc9',
          400: '#aeaba3',
          500: '#918e84',
          600: '#76736b',
          700: '#615f58',
          800: '#4f4d47',
          900: '#413f3b',
        },
        // Cool ocean blue accents
        ocean: {
          50: '#f5f9fb',
          100: '#e6f1f5',
          200: '#cce3eb',
          300: '#a3ccd9',
          400: '#73adc1',
          500: '#4d8fa6',
          600: '#3d7389',
          700: '#355f71',
          800: '#2f4f5d',
          900: '#2a424d',
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
        'gradient-mindful': 'linear-gradient(to right bottom, rgb(248, 249, 251), rgb(187, 199, 213))',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.stone.700'),
            h1: {
              color: theme('colors.ocean.700'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.ocean.600'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.ocean.500'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            strong: {
              color: theme('colors.mindful.700'),
            },
            a: {
              color: theme('colors.warmth.600'),
              '&:hover': {
                color: theme('colors.warmth.700'),
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