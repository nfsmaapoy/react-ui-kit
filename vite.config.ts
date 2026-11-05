/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

const isStorybook = process.argv.some((arg) => arg.includes('storybook'));

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    command === 'build' && !isStorybook
      ? dts({
          include: ['src'],
          exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.stories.tsx', 'src/test'],
          tsconfigPath: './tsconfig.json',
          rollupTypes: true,
        })
      : null,
  ],
  build: {
    target: 'es2022',
    minify: false,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (source) =>
        source === 'react' ||
        source === 'react-dom' ||
        source === 'react/jsx-runtime' ||
        source.startsWith('@radix-ui/'),
      output: {
        assetFileNames: (info) =>
          info.names.some((name) => name.endsWith('.css')) ? 'styles.css' : 'assets/[name][extname]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
}));
