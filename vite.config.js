import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'node:path'

export {}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // expose .env as process.env instead of import.meta.env
  // Reference: https://github.com/vitejs/vite/issues/1149#issuecomment-857686209
  let env = loadEnv(mode, process.cwd(), 'VITE_APP')

  // Optional: Populate NODE_ENV with the current mode (development/production)
  env.NODE_ENV = mode

  const envWithProcessPrefix = {
    'process.env': `${JSON.stringify(env)}`,
  }

  return {
    plugins: [react(), eslint()],
    define: envWithProcessPrefix,
    server: { host: '0.0.0.0', port: 3000 },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
  }
})
