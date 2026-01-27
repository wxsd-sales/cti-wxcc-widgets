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
    host: true, // Allow access from any host (needed for web IDEs)
    // Allow requests from web IDE hosts
    allowedHosts: [
      '.csb.app',           // CodeSandbox
      '.gitpod.io',         // Gitpod
      '.github.dev',        // GitHub Codespaces
      '.githubpreview.dev', // GitHub Codespaces preview
      '.preview.app.github.dev', // GitHub Codespaces
      '.app.github.dev',    // GitHub Codespaces
      '.stackblitz.io',     // StackBlitz
      'localhost',          // Local development
    ],
  },
});
