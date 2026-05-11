import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { getAllContent } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '인생책',
  description: '진택님의 인생책 — importance 9~10점의 정신적 척추가 된 책들',
  alternates: { canonical: `${SITE_URL}/books/lifetime` },
  openGraph: {
    title: '인생책',
    description: '진택님의 인생책',
    url: `${SITE_URL}/books/lifetime`,
  },
};

export default function LifetimeBooksPage() {
  const items = getAllContent()
    .filter(c => c.folder === 'books' && c.visibility === 'public' && (c.importance ?? 0) >= 9)
    .sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0));

  return (
    <main className="w-full px-6 sm:px-12 lg:px-60 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
      </div>

      <header className="mb-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <BookOpen className="w-7 h-7 text-[var(--muted)]" strokeWidth={1.5} />
          인생책
        </h1>
        <p className="text-[var(--muted)] mt-2 text-sm">
          importance 9~10점 · {items.length}권
        </p>
      </header>

      {items.length === 0 ? (
        <div className="p-8 text-center text-[var(--muted)]">아직 등록된 인생책이 없습니다.</div>
      ) : (
        <div className="space-y-2">
          {items.map(c => (
            <Link key={c.id} href={`/books/${c.id}`} className="block p-4 hover:opacity-70">
              <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-1">
                <span>{c.importance}/10</span>
                {c.author && (<><span>·</span><span>{c.author}</span></>)}
                {c.genre && (<><span>·</span><span>{c.genre}</span></>)}
              </div>
              <div className="font-medium">{c.title}</div>
              {c.reflections && (
                <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">{c.reflections}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
