// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// import fungsi defineConfig dari vite untuk konfigurasi
import { defineConfig } from 'vite'

// import plugin React agar Vite bisa membaca file .jsx
import react from '@vitejs/plugin-react'

// import plugin Tailwind untuk Vite
import tailwindcss from '@tailwindcss/vite'

// export konfigurasi utama Vite
export default defineConfig({
  plugins: [
    react(),        
    tailwindcss(),  
  ],
})