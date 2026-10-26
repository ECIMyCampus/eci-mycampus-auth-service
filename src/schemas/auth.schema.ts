import { z } from 'zod';

export const registerInputSchema = z.object({
  email: z
    .string()
    .email('Formato de correo electrónico no válido')
    .refine(
      (val) => val.endsWith('@mail.escuelaing.edu.co') || val.endsWith('@escuelaing.edu.co'),
      'El registro exige un correo institucional válido (@mail.escuelaing.edu.co o @escuelaing.edu.co)'
    ),
  password: z
    .string()
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  facultyId: z.string().uuid('Identificador de facultad no válido').optional(),
  academicProgram: z.string().optional(),
  interests: z.array(z.string()).default([]),
  habeasDataAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Debe aceptar la política de tratamiento de datos (Habeas Data)' }),
  }),
});

export const loginInputSchema = z.object({
  email: z.string().email('Formato de correo no válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const recoverPasswordInputSchema = z.object({
  email: z.string().email('Formato de correo no válido'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type RecoverPasswordInput = z.infer<typeof recoverPasswordInputSchema>;
