export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#132f5f',
          navyDark: '#0e2447',
          navyMid: '#1c3f78',
          orange: '#f26522',
          orangeSoft: '#fdf1ea',
          green: '#1f9254',
          greenSoft: '#edf7f0',
          blueSoft: '#eef3fb',
          canvas: '#f7f9fc',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 24px -12px rgba(19, 47, 95, 0.25)',
        float: '0 18px 40px -20px rgba(19, 47, 95, 0.35)',
      },
    },
  },
}
