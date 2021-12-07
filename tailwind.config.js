module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#001B29',
      gray: '#DCE5E2',
      blue: {
        light: '#9AD6EA',
        DEFAULT: '#74C6E2',
        darker: '#2487A8',
        darkest: '#00253A',
      },
      red: '#FF3A20',
      green: '#26C485',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
    }

  },
  variants: {
    extend: {
      textColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
