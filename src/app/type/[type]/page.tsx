import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllContent } from '@/lib/content';

const TYPE_MAP: Record<string, { label: string; icon: string; folder: string }> = {
  essays: { label: '글', icon: '✍️', folder: 'essays' },
  videos: { label: '영상', icon: '🎥', folder: 'videos' },
  travels: { label: '여행', icon: '✈️', folder: 'travels' },
  memos: { label: '메모', icon: '📝', folder: 'memos' },
  projects: { label: '프로젝트', icon: '🚀', folder: 'projects' },
  businesses: { label: '사업', icon: '🏢', folder: 'businesses' },
  decisions: { label: '의사결정', icon: '🎯', folder: 'decisions' },
  lessons: { label: '깨달음', icon: '💡', folder: 'lessons' },
  people: { label: '인물', icon: '👤', folder: 'people' },
};

export function generateStaticParams() {
  return Object.keys(TYPE_MAP).map(type => ({ type }));
}

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const meta = TYPE_MAP[type];
  if (!meta) notFound();

  const items = getAllContent().filter(c => c.folder === meta.folder);

  return (
    <main className="w-full px-16 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">
          {meta.icon} {meta.label}
        </h1>
        <p className="text-[var(--muted)] mt-2 text-sm">
          {items.length}개 콘텐츠
        </p>
      </header>

      {items.length === 0 ? (
        <div className="bg-[var(--card-gray)] rounded-md p-8 text-center text-[var(--muted)]">
          아직 콘텐츠가 없습니다.
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(c => (
            <Link
              key={c.id}
              href={`/${c.folder}/${c.id}`}
              className="block bg-[var(--card-gray)] rounded-md p-4 hover:opacity-80"
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
