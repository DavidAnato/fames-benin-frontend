import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {
      API_URL: 'https://api.famesbenin.org/',
      // API_URL: 'http://localhost:8000/',
      GOOGLE_CLIENT_ID: '490203159437-jdpgvk4mrkpmqfr8rvp9ud35170okoib.apps.googleusercontent.com',
      // redirectURI: 'https://davidanato.github.io/fames-benin-frontend/',
      redirectURI: 'https://www.famesbenin.org/'
    }
  }
})

// https://th.bing.com/th/id/OIP.rizp6SRCVB1Aru82df7GZgHaEo?rs=1&pid=ImgDetMain