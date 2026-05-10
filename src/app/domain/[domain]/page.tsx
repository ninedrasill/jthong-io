import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Wallet, Clock, Users, HeartPulse, Brain,
  type LucideIcon,
} from 'lucide-react';
import { getAllContent, type Domain } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

const DOMAIN_MAP: Record<string, { label: string; subtitle: string; Icon: LucideIcon; key: Domain }> = {
  money: { label: '돈', subtitle: 'MONEY', Icon: Wallet, key: 'money' },
  time: { label: '시간', subtitle: 'TIME', Icon: Clock, key: 'time' },
  people: { label: '사람', subtitle: 'PEOPLE', Icon: Users, key: 'people' },
  body: { label: '몸', subtitle: 'BODY', Icon: HeartPulse, key: 'body' },
  mind: { label: '정신', subtitle: 'MIND', Icon: Brain, key: 'mind' },
};

export function generateStaticParams() {
  return Object.keys(DOMAIN_MAP).map(domain => ({ domain }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const meta = DOMAIN_MAP[domain];
  if (!meta) return {};
  return {
    title: `${meta.label} (${meta.subtitle})`,
    description: `JT HONG의 ${meta.label} 영역 콘텐츠 — NINEDRASILL`,
    alternates: { canonical: `${SITE_URL}/domain/${domain}` },
    openGraph: {
      title: `${meta.label} / ${meta.subtitle}`,
      description: `JT HONG의 ${meta.label} 영역 콘텐츠`,
      url: `${SITE_URL}/domain/${domain}`,
    },
  };
}

export default async function DomainPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  const meta = DOMAIN_MAP[domain];
  if (!meta) notFound();

  const items = getAllContent().filter(c => c.domain.includes(meta.key) && c.visibility === 'public');
  const Icon = meta.Icon;

  return (
    <main className="w-full px-6 sm:px-12 lg:px-40 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-[var(--muted)] hover:opacity-80">← 홈</Link>
      </div>

      <header className="mb-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <Icon className="w-7 h-7 text-[var(--muted)]" strokeWidth={1.5} />
          {meta.label}
          <span className="text-base text-[var(--muted)] font-normal">/ {meta.subtitle}</span>
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
                <span>{c.type}</span>
                <span>·</span>
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
