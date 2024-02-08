/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 0.2s ease-in-out'
      },
      keyframes: (theme) => ({
        fadeOut: {
          //@ts-ignore
          '0%': { opacity: theme('opacity.0') },
          //@ts-ignore
          '100%': { opacity: theme('opacity.100') }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
