import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({

  build: {
    rollupOptions: {
      input: 'src/index.js' 
    }
  },

  plugins: [
    tailwindcss(),
  ],
});


