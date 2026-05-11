import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  PenLine, Video, Plane, StickyNote, Rocket, Building2, Target, Lightbulb, User, BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { getAllContent } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

const TYPE_MAP: Record<string, { label: string; Icon: LucideIcon; folder: string }> = {
  essays: { label: '글', Icon: PenLine, folder: 'essays' },
  videos: { label: '영상', Icon: Video, folder: 'videos' },
  travels: { label: '여행', Icon: Plane, folder: 'travels' },
  memos: { label: '메모', Icon: StickyNote, folder: 'memos' },
  projects: { label: '프로젝트', Icon: Rocket, folder: 'projects' },
  businesses: { label: '사업', Icon: Building2, folder: 'businesses' },
  decisions: { label: '의사결정', Icon: Target, folder: 'decisions' },
  lessons: { label: '깨달음', Icon: Lightbulb, folder: 'lessons' },
  people: { label: '인물', Icon: User, folder: 'people' },
  books: { label: '책', Icon: BookOpen, folder: 'books' },
};

export function generateStaticParams() {
  return Object.keys(TYPE_MAP).map(type => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const meta = TYPE_MAP[type];
  if (!meta) return {};
  return {
    title: meta.label,
    description: `JT HONG의 ${meta.label} 콘텐츠 모음 — NINEDRASILL`,
    alternates: { canonical: `${SITE_URL}/type/${type}` },
    openGraph: {
      title: meta.label,
      description: `JT HONG의 ${meta.label} 콘텐츠`,
      url: `${SITE_URL}/type/${type}`,
    },
  };
}

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const meta = TYPE_MAP[type];
  if (!meta) notFound();

  const items = getAllContent().filter(c => c.folder === meta.folder && c.visibility === 'public');
  const Icon = meta.Icon;

  return (
    <main className="w-full px-6 sm:px-12 lg:px-60 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
      </div>

      <header className="mb-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Icon className="w-7 h-7 text-[var(--muted)]" strokeWidth={1.5} />
          {meta.label}
        </h1>
        <p className="text-[var(--muted)] mt-2 text-sm">
          {items.length}개 콘텐츠
        </p>
      </header>

      {items.length === 0 ? (
        <div className="p-8 text-center text-[var(--muted)]">
          아직 콘텐츠가 없습니다.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(c => (
            <Link
              key={c.id}
              href={`/${c.folder}/${c.id}`}
              className="block p-4 hover:opacity-70"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-1">
                <span>{c.date}</span>
                <span>·</span>
                <span>{c.domain.join(', ')}</span>
                {c.status && (<><span>·</span><span>{c.status}</span></>)}
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
