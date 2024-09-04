import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry file for your library
      name: 'MyReactLib', // Global variable name in UMD builds
      fileName: (format) => `index.${format}.js` // Output file naming
    },
    rollupOptions: {
      // Ensure external dependencies are not bundled into the library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
