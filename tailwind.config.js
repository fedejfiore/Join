/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        'nav-footer': 'var(--nav-footer)',
        'bg-site': 'var(--bg-site)',
        'text-main': 'var(--text-main)',
        'text-sec': 'var(--text-sec)',
      },
    },
  },
  plugins: [],
}