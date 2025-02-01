import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Explicitly load .env files from the 'frontend' directory
  const env = loadEnv(mode, './frontend', '');

  return {
    plugins: [react()],
    define: {
      // Pass environment variables explicitly if needed
      'process.env': env,
    },
  };
});
