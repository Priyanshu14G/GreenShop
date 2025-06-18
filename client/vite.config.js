import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    react({
      include: ['**/*.jsx', '**/*.js'], // Process both .js and .jsx as JSX
    }),
  ],server:{
    proxy:{
      '/api':{target: 'http://localhost:4000',
        changeOrigin:true,
        secure:false,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
})
