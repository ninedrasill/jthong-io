import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

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
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  items: { label: string; value?: string; href?: string }[];
  tone: Tone;
  href?: string;
}

export function DomainCard({ icon: Icon, title, subtitle, items, href }: Props) {
  const inner = (
    <div className="p-4 h-full transition-opacity hover:opacity-70">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-[var(--muted)]" strokeWidth={1.5} />
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

export { toneMap };
