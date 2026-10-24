# ECI-MyCampus — Microservicio de Identidad & Autenticación (Auth Service)

Microservicio responsable de la autenticación, emisión de tokens JWT, registro con validación de dominio institucional (`@mail.escuelaing.edu.co`) y gestión de roles RBAC.

## Tecnologías
* **Runtime:** Node.js / TypeScript
* **Framework HTTP:** Fastify (Ultrarrápido y liviano)
* **ORM:** Prisma ORM
* **Base de Datos:** PostgreSQL (`auth_schema`)
* **Cifrado:** Argon2
* **Tokens:** JWT con firma criptográfica

## Endpoints Principales
* `GET /health`: Comprobación de estado del servicio.
* `POST /api/v1/auth/register`: Registro de usuario institucional.
* `POST /api/v1/auth/login`: Autenticación y entrega de JWT.
* `GET /api/v1/auth/verify`: Verificación de validez de token para otros microservicios.

## Ejecución Local
```bash
npm install
npm run dev
```
Inicia en `http://localhost:4001`.
