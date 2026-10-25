import {defineConfig} from 'vite';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  base:process.env.BASE_PATH || './',
  build:{
    target:'es2022',
    rollupOptions:{
      input:{main:resolve(root,'index.html'),archyar:resolve(root,'archyar.html'),catalog:resolve(root,'catalog.html'),timeline:resolve(root,'timeline.html')},
      output:{manualChunks:{three:['three']}}
    }
  }
});
