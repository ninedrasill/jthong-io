import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllContent, getById } from '@/lib/content';

const VALID_FOLDERS = new Set([
  'essays', 'videos', 'travels', 'memos',
  'projects', 'businesses', 'decisions', 'lessons', 'people',
]);

export function generateStaticParams() {
  return getAllContent()
    .filter(c => c.visibility === 'public')
    .map(c => ({ folder: c.folder, id: c.id }));
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ folder: string; id: string }>;
}) {
  const { folder, id } = await params;
  if (!VALID_FOLDERS.has(folder)) notFound();
  const item = getById(id);
  if (!item || item.folder !== folder || item.visibility !== 'public') notFound();

  return (
    <main className="w-full px-6 sm:px-12 lg:px-40 py-12">
      <div className="mb-6">
        <Link href={`/type/${folder}`} className="text-sm text-[var(--muted)] hover:opacity-80">
          ← {folder}
        </Link>
      </div>

      <header className="mb-8 pb-6 border-b border-[var(--border)]">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)] mb-3">
          <span>{item.date}</span>
          <span>·</span>
          <span>{item.type}</span>
          <span>·</span>
          <span>{item.domain.join(', ')}</span>
          {item.status && (<><span>·</span><span>{item.status}</span></>)}
          {item.confidence !== undefined && (
            <><span>·</span><span>신뢰도 {item.confidence}</span></>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-3">{item.title}</h1>
        <p className="text-sm text-[var(--muted)]">{item.agi_summary}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map(t => (
              <span key={t} className="text-xs bg-[var(--card-gray)] px-2 py-1 rounded">
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      <article className="text-[var(--foreground)] leading-relaxed space-y-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_code]:bg-[var(--card-gray)] [&_code]:px-1 [&_code]:rounded [&_a]:underline">
        <MDXRemote source={item.body} />
      </article>

      {(item.cause || item.outcome || item.related?.length || item.conflicting?.length) && (
        <section className="mt-12 pt-6 border-t border-[var(--border)] space-y-4 text-sm">
          {item.cause && (
            <div>
              <div className="text-xs uppercase text-[var(--muted)] mb-1">발단</div>
              <div>{item.cause}</div>
            </div>
          )}
          {item.outcome && (
            <div>
              <div className="text-xs uppercase text-[var(--muted)] mb-1">결과</div>
              <div>{item.outcome}</div>
            </div>
          )}
          {item.related && item.related.length > 0 && (
            <div>
              <div className="text-xs uppercase text-[var(--muted)] mb-1">관련</div>
              <ul className="space-y-1">
                {item.related.map(rid => (
                  <li key={rid}>
                    <code className="text-[var(--muted)]">{rid}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.conflicting && item.conflicting.length > 0 && (
            <div>
              <div className="text-xs uppercase text-[var(--muted)] mb-1">충돌</div>
              <ul className="space-y-1">
                {item.conflicting.map(cid => (
                  <li key={cid}>
                    <code className="text-[var(--muted)]">{cid}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
