import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import type { PluginOption } from 'vite';
import { processClinicalHistoryAIRequest } from './apps/backend/src/routes/aiRoute.js';

function aiServerMiddlewarePlugin(): PluginOption {
  return {
    name: 'careconnect-ai-server-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url ? req.url.split('?')[0] : '';
        if ((rawUrl === '/api/ai/clinical-history' || rawUrl === '/api/ai/clinical-history/') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const env = loadEnv(server.config.mode, process.cwd(), '');
              if (env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
              if (env.AI_API_KEY) process.env.AI_API_KEY = env.AI_API_KEY;
              if (env.VITE_GEMINI_API_KEY) process.env.VITE_GEMINI_API_KEY = env.VITE_GEMINI_API_KEY;
              if (env.GOOGLE_API_KEY) process.env.GOOGLE_API_KEY = env.GOOGLE_API_KEY;

              const payload = JSON.parse(body || '{}');
              const aiResult = await processClinicalHistoryAIRequest(payload);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify(aiResult));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify({
                success: false,
                error: err?.message || 'Server error in AI middleware',
              }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aiServerMiddlewarePlugin()],
});
