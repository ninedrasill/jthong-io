import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllContent } from '@/lib/content';
import { isAuthorized, getEnvPassword, setAuthCookie, clearAuthCookie } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'PRIVATE',
  robots: { index: false, follow: false },
};

async function loginAction(formData: FormData) {
  'use server';
  const password = String(formData.get('password') ?? '');
  const expected = getEnvPassword('private');
  if (expected && password === expected) {
    await setAuthCookie('private');
    redirect('/private');
  }
  redirect('/private?error=1');
}

async function logoutAction() {
  'use server';
  await clearAuthCookie('private');
  redirect('/private');
}

export default async function PrivatePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const auth = await isAuthorized('private');

  if (!auth) {
    return (
      <main className="w-full px-6 sm:px-12 lg:px-40 py-12">
        <div className="mb-6">
          <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
        </div>
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">PRIVATE</h1>
          <p className="text-[var(--muted)] mt-2 text-sm">본인 전용 콘텐츠 — 비밀번호 입력</p>
        </header>
        <form action={loginAction} className="max-w-sm space-y-3">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            className="w-full bg-transparent border border-[var(--border)] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[var(--muted)]"
          />
          <button
            type="submit"
            className="w-full border border-[var(--border)] rounded-md px-4 py-3 text-sm hover:opacity-70"
          >
            입장
          </button>
          {sp.error && (
            <p className="text-sm text-red-400">비밀번호가 올바르지 않습니다.</p>
          )}
        </form>
      </main>
    );
  }

  const items = getAllContent().filter(c => c.visibility === 'private');

  return (
    <main className="w-full px-6 sm:px-12 lg:px-40 py-12">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
        <form action={logoutAction}>
          <button type="submit" className="text-sm text-[var(--muted)] hover:opacity-80">로그아웃</button>
        </form>
      </div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">PRIVATE</h1>
        <p className="text-[var(--muted)] mt-2 text-sm">{items.length}개 콘텐츠</p>
      </header>

      {items.length === 0 ? (
        <div className="p-8 text-center text-[var(--muted)]">아직 콘텐츠가 없습니다.</div>
      ) : (
        <div className="space-y-2">
          {items.map(c => (
            <Link key={c.id} href={`/${c.folder}/${c.id}`} className="block p-4 hover:opacity-70">
              <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-1">
                <span>{c.date}</span><span>·</span>
                <span>{c.type}</span><span>·</span>
                <span>{c.domain.join(', ')}</span>
              </div>
              <div className="font-medium">{c.title}</div>
              <p className="text-sm text-[var(--muted)] mt-1">{c.agi_summary}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
