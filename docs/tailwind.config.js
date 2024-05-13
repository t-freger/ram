// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../docs/**/*.mdx'], // my markdown stuff is in ../docs, not /src
  darkMode: ['class', '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      colors: {
        // Light Theme
        'ram-primary': '#4250af',
        'ram-bg': 'white',
        'ram-fg': 'black',
        'ram-gray': '#F6F6F4',

        // Dark Theme
        'ram-dark-primary': '#adcbfa',
        'ram-dark-bg': 'black',
        'ram-dark-fg': '#e5e7eb',
        'ram-dark-gray': '#212121',
      },
      fontFamily: {
        'ram-title': ['Snowburst One', 'cursive'],
      },
    },
  },
  plugins: [],
};
