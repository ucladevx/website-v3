Potential fix according to chatgpt:


## vite.config.js
import { defineConfig } from "vite";
export default defineConfig({
  base: "website-v3",
});

## package.json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "predeploy": "npm run build && cp dist/index.html dist/404.html",
  "deploy": "gh-pages -b gh-pages -d dist"
}