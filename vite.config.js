import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url'; // Para manejar rutas de archivos

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configura un alias. Ahora puedes usar rutas absolutas 
      // comenzando con '@/' en lugar de rutas relativas como '../../../'
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});