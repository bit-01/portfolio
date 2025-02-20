import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')

  return {
    base: env.VITE_ENV === 'prod' ? '/portfolio/' : '/',
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
      viteStaticCopy({
        targets: [
          {
            src: 'static/[!.]*',
            dest: './libs',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
