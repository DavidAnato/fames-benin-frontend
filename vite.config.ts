import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    'process.env': {
      API_URL: 'http://localhost:8000/'
    }
  }
})

// https://th.bing.com/th/id/OIP.rizp6SRCVB1Aru82df7GZgHaEo?rs=1&pid=ImgDetMain