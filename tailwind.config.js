import animate from 'tailwindcss-animate';
import primeui from 'tailwindcss-primeui';

/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        danger: 'var(--color-danger)',
        background: 'var(--background-color)',
        text: 'var(--text-color)'
      }
    }
  },
  plugins: [animate, primeui]
};
