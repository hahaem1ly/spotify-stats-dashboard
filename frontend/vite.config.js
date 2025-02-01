import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Explicitly pass environment variables to the build process
    'process.env': process.env,
  },
  server: {
    // Optional: Enable open port and debug logs during development
    port: 3000,
    open: true,
  },
  build: {
    // Optional: Clear console logs from production builds
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
