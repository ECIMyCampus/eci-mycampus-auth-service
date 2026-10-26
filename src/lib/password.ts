import argon2 from 'argon2';

/**
 * Hashea una contraseña en texto plano utilizando el algoritmo Argon2id
 * conforme al estándar OWASP (RF-AUT-02)
 */
export async function hashPassword(plainText: string): Promise<string> {
  return await argon2.hash(plainText, {
    type: argon2.argon2id,
    memoryCost: 19456, // 19 MiB
    timeCost: 2,
    parallelism: 1,
  });
}

/**
 * Verifica si una contraseña coincide con el hash almacenado
 */
export async function verifyPassword(hash: string, plainText: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plainText);
  } catch {
    return false;
  }
}
