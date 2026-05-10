import Link from 'next/link';
import {
  Wallet, Clock, Users, HeartPulse, Brain,
  PenLine, Video, Plane, StickyNote, Rocket, Building2, Target, Lightbulb,
  ChevronRight,
} from 'lucide-react';
import { DomainCard } from '@/components/DomainCard';
import { getPublicContent } from '@/lib/content';

export default function Home() {
  const all = getPublicContent();
  const recent = all.slice(0, 4);

  const contentTypes = [
    { type: 'essays', label: '글', Icon: PenLine },
    { type: 'videos', label: '영상', Icon: Video },
    { type: 'travels', label: '여행', Icon: Plane },
    { type: 'memos', label: '메모', Icon: StickyNote },
    { type: 'projects', label: '프로젝트', Icon: Rocket },
    { type: 'businesses', label: '사업', Icon: Building2 },
    { type: 'decisions', label: '의사결정', Icon: Target },
    { type: 'lessons', label: '깨달음', Icon: Lightbulb },
  ] as const;

  return (
    <main className="w-full">
      <nav className="px-6 sm:px-12 lg:px-60 py-8">
        <h1
          className="text-2xl tracking-wide"
          style={{ fontFamily: "var(--font-poiret), sans-serif" }}
        >
          JT HONG
        </h1>
      </nav>

      <section className="min-h-[70vh] flex flex-col items-center justify-center px-8 text-center">
        <div className="text-xs tracking-[0.4em] text-[var(--muted)] mb-6">
          — NINEDRASILL GROUP —
        </div>
        <h2
          className="text-5xl md:text-6xl font-light leading-tight max-w-4xl"
          style={{ fontFamily: "var(--font-poiret), sans-serif" }}
        >
          harmonize life
        </h2>
      </section>

      <section className="px-6 sm:px-12 lg:px-60 pt-20 pb-10">
        <div className="flex items-center gap-6 mb-10">
          <span className="text-xs tracking-[0.3em] text-[var(--muted)] whitespace-nowrap">
            FIVE DOMAINS
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <DomainCard tone="yellow" icon={Wallet} title="돈" subtitle="MONEY"
            items={[{ label: '사업·투자' }, { label: 'EXIT 전략' }, { label: '자산·재무' }]}
            href="/domain/money" />
          <DomainCard tone="blue" icon={Clock} title="시간" subtitle="TIME"
            items={[{ label: '일정·습관' }, { label: '의사결정' }, { label: '자동화' }]}
            href="/domain/time" />
          <DomainCard tone="green" icon={Users} title="사람" subtitle="PEOPLE"
            items={[{ label: '가족' }, { label: '팀·파트너' }, { label: '인맥·고객' }]}
            href="/domain/people" />
          <DomainCard tone="pink" icon={HeartPulse} title="몸" subtitle="BODY"
            items={[{ label: '건강·운동' }, { label: '식단·수면' }, { label: '에너지' }]}
            href="/domain/body" />
          <DomainCard tone="purple" icon={Brain} title="정신" subtitle="MIND"
            items={[{ label: '사주·철학' }, { label: '통찰·감정' }, { label: '깨달음' }]}
            href="/domain/mind" />
        </div>
      </section>

      <section className="px-6 sm:px-12 lg:px-60 pt-20 pb-10">
        <div className="flex items-center gap-6 mb-10">
          <span className="text-xs tracking-[0.3em] text-[var(--muted)] whitespace-nowrap">
            CONTENT
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {contentTypes.map(c => (
            <Link key={c.type} href={`/type/${c.type}`}
              className="px-5 py-4 text-sm hover:opacity-70 flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-[var(--muted)]" strokeWidth={1.5} />
              <c.Icon className="w-4 h-4 text-[var(--muted)]" strokeWidth={1.5} />
              <span>{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 sm:px-12 lg:px-60 pt-20 pb-10">
        <div className="flex items-center gap-6 mb-10">
          <span className="text-xs tracking-[0.3em] text-[var(--muted)] whitespace-nowrap">
            COMPANIES
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">주식회사 화물인</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              종합화물운송회사
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">주식회사 화물인이사</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              AI 이사 플랫폼
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">NINEDRASILL GROUP PTE. LTD.</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              management company
            </p>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="px-6 sm:px-12 lg:px-60 pt-20 pb-10">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-xs tracking-[0.3em] text-[var(--muted)] whitespace-nowrap">
              RECENT
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="space-y-3">
            {recent.map(c => (
              <Link
                key={c.id}
                href={`/${c.folder}/${c.id}`}
                className="block p-5 hover:opacity-70"
              >
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
        </section>
      )}

      <footer className="mt-32 px-6 sm:px-12 lg:px-60 py-10 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-wrap items-center justify-between gap-4">
        <span>© 2026 NINEDRASILL GROUP PTE. LTD.</span>
        <div className="flex gap-4">
          <Link href="/family" className="hover:opacity-70">FAMILY</Link>
          <Link href="/private" className="hover:opacity-70">PRIVATE</Link>
        </div>
      </footer>
    </main>
  );
}
