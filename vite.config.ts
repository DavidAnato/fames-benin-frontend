import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/fames-benin-frontend/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {
      // API_URL: 'https://fames-backend.connect-me-app.com/',
      API_URL: 'http://localhost:8000/',
      GOOGLE_CLIENT_ID: '435871596858-5tvfi6mhvdr1i60ktgsjl67d6brclkl4.apps.googleusercontent.com',
      // redirectURI: 'https://davidanato.github.io/fames-benin-frontend/',
      redirectURI: 'http://localhost:3000/'
    }
  }
})

// https://th.bing.com/th/id/OIP.rizp6SRCVB1Aru82df7GZgHaEo?rs=1&pid=ImgDetMain