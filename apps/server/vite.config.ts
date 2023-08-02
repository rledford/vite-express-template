import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig(() => ({
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: 'src/main.ts'
    })
  ],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: 'src/main.ts'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    reporters: ['verbose']
  }
}));
