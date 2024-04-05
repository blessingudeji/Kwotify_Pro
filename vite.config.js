import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  server: {
    port: 3000, 
  },
  build: {
    rollupOptions: {
      input: 'src/index.js' 
    }
  },
  plugins: [
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['tailwindcss'], 
  },
});
