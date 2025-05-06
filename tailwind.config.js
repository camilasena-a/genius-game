module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'genius-blue': '#00FFFF', // Ciano neon
        'genius-red': '#FF003C', // Vermelho neon
        'genius-yellow': '#FFD700', // Dourado neon
        'genius-green': '#39FF14', // Verde neon
        'genius-background': '#0D0221', // Roxo escuro profundo
        'genius-accent': '#FF00FF', // Magenta neon
        'genius-secondary': '#121212', // Preto para contraste
        'genius-highlight': '#8A2BE2', // Violeta neon
      },
      fontFamily: {
        'vt323': ['"VT323"', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00FFFF, 0 0 10px #00FFFF',
        'neon-red': '0 0 5px #FF003C, 0 0 10px #FF003C',
        'neon-yellow': '0 0 5px #FFD700, 0 0 10px #FFD700',
        'neon-green': '0 0 5px #39FF14, 0 0 10px #39FF14',
        'neon-magenta': '0 0 5px #FF00FF, 0 0 10px #FF00FF',
      },
    },
  },
  plugins: [],
} 