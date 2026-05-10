export const SITE_URL = 'https://jthong.io';
export const SITE_NAME = 'JT HONG · NINEDRASILL';
export const SITE_DESCRIPTION =
  '홍진택의 개인 OS — 돈·시간·사람·몸·정신 5대 영역으로 정리한 사업과 인생의 기록. NINEDRASILL Group.';
export const SITE_LOCALE = 'ko_KR';
export const SITE_AUTHOR = 'JT Hong (홍진택)';

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
