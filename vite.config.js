import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  publicPath: `/CocktailsApp/`,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Правило для обработки изображений
    assetsInlineLimit: 0, // чтобы изображения не встраивались в код как Data URL
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]' // куда будут копироваться изображения
      }
    }
  }
});






