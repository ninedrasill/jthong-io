import { cookies } from 'next/headers';

export type AuthLevel = 'family' | 'private';

const COOKIE_NAMES: Record<AuthLevel, string> = {
  family: 'auth_family',
  private: 'auth_private',
};

const COOKIE_VALUES: Record<AuthLevel, string> = {
  family: 'ok',
  private: 'ok',
};

export async function isAuthorized(level: AuthLevel): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAMES[level])?.value === COOKIE_VALUES[level];
}

export async function canSee(visibility: 'public' | 'family' | 'private'): Promise<boolean> {
  if (visibility === 'public') return true;
  if (visibility === 'family') return (await isAuthorized('family')) || (await isAuthorized('private'));
  return await isAuthorized('private');
}

export function getEnvPassword(level: AuthLevel): string | undefined {
  return level === 'family' ? process.env.FAMILY_PASSWORD : process.env.PRIVATE_PASSWORD;
}

export async function setAuthCookie(level: AuthLevel) {
  const store = await cookies();
  store.set(COOKIE_NAMES[level], COOKIE_VALUES[level], {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}

export async function clearAuthCookie(level: AuthLevel) {
  const store = await cookies();
  store.delete(COOKIE_NAMES[level]);
}
