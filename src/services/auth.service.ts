import { prisma } from '../lib/prisma';
import { hashPassword, verifyPassword } from '../lib/password';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';

export class AuthService {
  /**
   * Registra un nuevo usuario con correo institucional ECI y contraseña Argon2id
   */
  async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existing) {
      throw new Error('Ya existe una cuenta registrada con este correo electrónico institucional.');
    }

    const passwordHash = await hashPassword(input.password);

    const newUser = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        role: 'ESTUDIANTE',
        profile: {
          create: {
            fullName: input.fullName,
            facultyId: input.facultyId,
            academicProgram: input.academicProgram,
            interests: input.interests,
            habeasDataAcceptedAt: new Date(),
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      fullName: newUser.profile?.fullName,
      createdAt: newUser.createdAt,
    };
  }

  /**
   * Autentica credenciales y retorna los datos del usuario para firma de token
   */
  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: { profile: true },
    });

    if (!user || !user.isActive) {
      throw new Error('Credenciales inválidas o cuenta inactiva.');
    }

    const isValid = await verifyPassword(user.passwordHash, input.password);
    if (!isValid) {
      throw new Error('Credenciales inválidas o cuenta inactiva.');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.profile?.fullName || '',
      facultyId: user.profile?.facultyId || null,
      isAuthorizedOrganizer: user.profile?.isAuthorizedOrganizer || false,
    };
  }
}

export const authService = new AuthService();
