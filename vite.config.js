import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/v1': {
          target: env.VITE_BASE_URL || 'http://localhost:5001',
          changeOrigin: true,
        },
      },
    },
  }
})
