import Link from 'next/link';

type Tone = 'red' | 'pink' | 'green' | 'yellow' | 'blue' | 'purple' | 'gray';

const toneMap: Record<Tone, string> = {
  red: 'bg-[var(--card-red)]',
  pink: 'bg-[var(--card-pink)]',
  green: 'bg-[var(--card-green)]',
  yellow: 'bg-[var(--card-yellow)]',
  blue: 'bg-[var(--card-blue)]',
  purple: 'bg-[var(--card-purple)]',
  gray: 'bg-[var(--card-gray)]',
};

interface Props {
  icon: string;
  title: string;
  subtitle?: string;
  items: { label: string; value?: string; href?: string }[];
  tone: Tone;
  href?: string;
}

export function DomainCard({ icon, title, subtitle, items, tone, href }: Props) {
  const inner = (
    <div className={`${toneMap[tone]} rounded-md p-4 h-full transition-opacity hover:opacity-90`}>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-base">{icon}</span>
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <span className="text-sm text-[var(--muted)]">/ {subtitle}</span>}
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[var(--muted)]">•</span>
            <span>
              {it.label}
              {it.value && <span className="text-[var(--muted)]"> / {it.value}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
