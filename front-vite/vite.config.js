import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Maitinimas/', // Sets the base path to /Maitinimas/
  server: {
    port: 7000, // You can change this to the desired port
  },
});
