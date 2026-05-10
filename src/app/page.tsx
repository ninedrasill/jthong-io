import Link from 'next/link';
import { DomainCard } from '@/components/DomainCard';
import { getAllContent } from '@/lib/content';

export default function Home() {
  const all = getAllContent();
  const recent = all.slice(0, 4);

  return (
    <main className="w-full px-16 py-12">
      <header className="mb-10">
        <h1 className="text-5xl font-bold tracking-wide" style={{ fontFamily: "var(--font-poiret), sans-serif" }}>JT HONG</h1>
      </header>

      <section className="mb-8 bg-[var(--card-red)] rounded-md p-5">
        <div className="flex items-center gap-2 mb-2">
          <span>🎯</span>
          <h2 className="font-semibold">목표</h2>
        </div>
        <ul className="space-y-1 text-sm">
          <li>• 1차 (2028): EXIT 시도, 300~500억 기준</li>
          <li>• 2차 (2030~2031): 유니콘 1조+ (Plan B)</li>
          <li>• 평생: 디지털 트윈 데이터 자산화</li>
        </ul>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <DomainCard tone="yellow" icon="💰" title="돈" subtitle="MONEY"
            items={[{ label: '사업·투자' }, { label: 'EXIT 전략' }, { label: '자산·재무' }]}
            href="/domain/money" />
          <DomainCard tone="blue" icon="⏱" title="시간" subtitle="TIME"
            items={[{ label: '일정·습관' }, { label: '의사결정' }, { label: '자동화' }]}
            href="/domain/time" />
          <DomainCard tone="green" icon="👥" title="사람" subtitle="PEOPLE"
            items={[{ label: '가족' }, { label: '팀·파트너' }, { label: '인맥·고객' }]}
            href="/domain/people" />
          <DomainCard tone="pink" icon="💪" title="몸" subtitle="BODY"
            items={[{ label: '건강·운동' }, { label: '식단·수면' }, { label: '에너지' }]}
            href="/domain/body" />
          <DomainCard tone="purple" icon="🧠" title="정신" subtitle="MIND"
            items={[{ label: '사주·철학' }, { label: '통찰·감정' }, { label: '깨달음' }]}
            href="/domain/mind" />
        </div>
      </section>

      <section className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { type: 'essays', label: '글', icon: '✍️' },
            { type: 'videos', label: '영상', icon: '🎥' },
            { type: 'travels', label: '여행', icon: '✈️' },
            { type: 'memos', label: '메모', icon: '📝' },
            { type: 'projects', label: '프로젝트', icon: '🚀' },
            { type: 'businesses', label: '사업', icon: '🏢' },
            { type: 'decisions', label: '의사결정', icon: '🎯' },
            { type: 'lessons', label: '깨달음', icon: '💡' },
          ].map(c => (
            <Link key={c.type} href={`/type/${c.type}`}
              className="bg-[var(--card-gray)] rounded-md px-4 py-3 text-sm hover:opacity-80 flex items-center gap-2">
              <span>➡️</span><span>{c.icon} {c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold mb-3 text-[var(--muted)] uppercase tracking-wider">
            최근
          </h2>
          <div className="space-y-2">
            {recent.map(c => (
              <Link
                key={c.id}
                href={`/${c.folder}/${c.id}`}
                className="block bg-[var(--card-gray)] rounded-md p-4 hover:opacity-80"
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

      <footer className="mt-16 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        © 2026 NINEDRASILL GROUP PTE. LTD.
      </footer>
    </main>
  );
}
