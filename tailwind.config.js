module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#18181b',
        },
        accent: {
          red: '#ff3b3f',
          blue: '#2563eb',
        },
        glass: 'rgba(255,255,255,0.15)',
        glassDark: 'rgba(24,24,27,0.25)',
      },
      boxShadow: {
        glow: '0 0 16px 2px #2563eb, 0 0 32px 4px #ff3b3f',
        glass: '0 4px 32px 0 rgba(31, 41, 55, 0.15)',
      },
      dropShadow: {
        glow: '0 0 6px #3b82f6', // 👈 Your new custom drop shadow
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #2563eb 0%, #ff3b3f 100%)',
        'glass-blur': 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(37,99,235,0.10) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
// tailwind.config.js
// Tailwind CSS configuration file
// This file is used to customize the Tailwind CSS framework for your project
// It includes custom colors, fonts, shadows, and background images
// The 'content' array specifies the files Tailwind should scan for class names
// The 'darkMode' option is set to 'class' to enable dark mode based on a class
// The 'theme' object extends the default Tailwind theme with custom values 