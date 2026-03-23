import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import type { Plugin } from 'vite';

// Inlines the main CSS bundle into a <style> tag and adds modulepreload for
// the main JS entry — eliminates the render-blocking CSS request entirely.
function inlineCriticalCssPlugin(): Plugin {
  return {
    name: 'inline-critical-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        let result = html;

        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          // Inline the main CSS bundle
          if (
            chunk.type === 'asset' &&
            fileName.startsWith('assets/index-') &&
            fileName.endsWith('.css')
          ) {
            const css = (chunk as any).source as string;
            // Replace the <link rel="stylesheet"> with an inline <style>
            // Match any link tag referencing this CSS file (handles leading / or ./)
            const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const linkRegex = new RegExp(`<link[^>]+href=["'][./]*${escaped}["'][^>]*/?>`);
            result = result.replace(linkRegex, `<style>${css}</style>`);
          }
          // Modulepreload the main JS entry chunk
          if (
            chunk.type === 'chunk' &&
            (chunk as any).isEntry &&
            fileName.startsWith('assets/index-') &&
            fileName.endsWith('.js')
          ) {
            result = result.replace(
              '</head>',
              `<link rel="modulepreload" href="/${fileName}" crossorigin></head>`
            );
          }
        }

        return result;
      },
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      inlineCriticalCssPlugin(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
      } : undefined,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            motion: ['motion/react'],
            icons: ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
      cssCodeSplit: true,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'motion/react', 'lucide-react'],
    },
  };
});
