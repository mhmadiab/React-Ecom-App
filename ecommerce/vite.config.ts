import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@customeypes": path.resolve(__dirname, "./src/types"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@routes": path.resolve(__dirname, "./src/routes"),
            "@util": path.resolve(__dirname, "./src/util"),
            "@validations": path.resolve(__dirname, "src/validations")
    }
  },
  plugins: [react(), svgr()],
})
