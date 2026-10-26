import { FastifyInstance } from 'fastify';
import { authController } from '../controllers/auth.controller';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', authController.register.bind(authController));
  fastify.post('/login', authController.login.bind(authController));
}
