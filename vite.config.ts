import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import type { Plugin, HtmlTagDescriptor } from 'vite';

// Injects <link rel="preload"> for CSS and <link rel="modulepreload"> for the
// main JS entry into the built HTML so they download in parallel with the HTML
// instead of being discovered only after the HTML is parsed.
function preloadCriticalAssetsPlugin(): Plugin {
  return {
    name: 'preload-critical-assets',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const tags: HtmlTagDescriptor[] = [];

        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          // Preload the main CSS bundle
          if (fileName.startsWith('assets/index-') && fileName.endsWith('.css')) {
            tags.push({
              tag: 'link',
              attrs: { rel: 'preload', href: `/${fileName}`, as: 'style' },
              injectTo: 'head-prepend',
            });
          }
          // Modulepreload the main JS entry chunk
          if (
            chunk.type === 'chunk' &&
            (chunk as any).isEntry &&
            fileName.startsWith('assets/index-') &&
            fileName.endsWith('.js')
          ) {
            tags.push({
              tag: 'link',
              attrs: { rel: 'modulepreload', href: `/${fileName}`, crossorigin: '' },
              injectTo: 'head-prepend',
            });
          }
        }

        return { html, tags };
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
      preloadCriticalAssetsPlugin(),
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
