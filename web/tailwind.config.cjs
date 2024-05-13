/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme
        'ram-primary': 'rgb(var(--ram-primary) / <alpha-value>)',
        'ram-bg': 'rgb(var(--ram-bg) / <alpha-value>)',
        'ram-fg': 'rgb(var(--ram-fg) / <alpha-value>)',
        'ram-gray': 'rgb(var(--ram-gray) / <alpha-value>)',
        'ram-error': 'rgb(var(--ram-error) / <alpha-value>)',
        'ram-success': 'rgb(var(--ram-success) / <alpha-value>)',
        'ram-warning': 'rgb(var(--ram-warning) / <alpha-value>)',

        // Dark Theme
        'ram-dark-primary': 'rgb(var(--ram-dark-primary) / <alpha-value>)',
        'ram-dark-bg': 'rgb(var(--ram-dark-bg) / <alpha-value>)',
        'ram-dark-fg': 'rgb(var(--ram-dark-fg) / <alpha-value>)',
        'ram-dark-gray': 'rgb(var(--ram-dark-gray) / <alpha-value>)',
        'ram-dark-error': 'rgb(var(--ram-dark-error) / <alpha-value>)',
        'ram-dark-success': 'rgb(var(--ram-dark-success) / <alpha-value>)',
        'ram-dark-warning': 'rgb(var(--ram-dark-warning) / <alpha-value>)',
      },
      fontFamily: {
        'ram-title': ['Snowburst One', 'cursive'],
        'ram-mono': ['Overpass Mono', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
      },
      screens: {
        tall: { raw: '(min-height: 800px)' },
      },
    },
  },
};
