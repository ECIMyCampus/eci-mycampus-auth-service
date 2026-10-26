import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === 'production') {
  console.error('[FATAL] JWT_SECRET es obligatorio en entorno de producción.');
  process.exit(1);
}

const server = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  },
});

server.register(cors, {
  origin: process.env.CORS_ORIGIN || true,
  credentials: true,
});

server.register(jwt, {
  secret: jwtSecret || 'dev_jwt_secret_key_for_eci_mycampus_local_only',
});

// Health check
server.get('/health', async () => {
  return { status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() };
});

// Registrar rutas del dominio de autenticación
server.register(authRoutes, { prefix: '/api/v1/auth' });

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 4001;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`[auth-service] Escuchando en http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
