import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Match the quickstart webpack `resolve.fallback: { worker_threads: false }`
      worker_threads: fileURLToPath(
        new URL('./src/shims/emptyWorkerThreads.ts', import.meta.url)
      ),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
