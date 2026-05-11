import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Domain = 'money' | 'time' | 'people' | 'body' | 'mind';
export type ContentType =
  | 'essay' | 'video' | 'travel' | 'memo'
  | 'project' | 'business' | 'decision' | 'lesson' | 'person' | 'book';

export type ReadStyle = '정독' | '속독' | '요약본';

export interface BookRead {
  date: string;
  style: ReadStyle;
  cho_seo?: boolean;
  notes?: string;
}

export interface ContentMeta {
  id: string;
  title: string;
  date: string;
  domain: Domain[];
  type: ContentType;
  status: 'active' | 'done' | 'dropped' | 'paused';
  stage?: 'planning' | 'building' | 'shipping' | 'maintaining';
  tags?: string[];
  related?: string[];
  people?: string[];
  location?: string;
  mood?: number;
  energy?: number;
  visibility: 'public' | 'private' | 'family';
  agi_summary: string;
  cause?: string;
  outcome?: string;
  confidence?: number;
  revised_from?: string;
  conflicting?: string[];
  // book-specific
  author?: string;
  genre?: string;
  importance?: number;
  reflections?: string;
  reads?: BookRead[];
  body: string;
  folder: string;
}

export function getById(id: string): ContentMeta | undefined {
  return getAllContent().find(c => c.id === id);
}

export function getPublicContent(): ContentMeta[] {
  return getAllContent().filter(c => c.visibility === 'public');
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export function getAllContent(): ContentMeta[] {
  const folders = fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  );

  const all: ContentMeta[] = [];
  for (const folder of folders) {
    const folderPath = path.join(CONTENT_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.mdx'));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(folderPath, file), 'utf-8');
      const { data, content } = matter(raw);
      const toDateStr = (v: unknown): string =>
        v instanceof Date ? v.toISOString().slice(0, 10) : String(v);
      const date = toDateStr(data.date);
      const reads = Array.isArray(data.reads)
        ? data.reads.map((r: BookRead & { date: unknown }) => ({
            ...r,
            date: toDateStr(r.date),
          }))
        : undefined;
      all.push({
        ...(data as Omit<ContentMeta, 'body' | 'folder' | 'date' | 'reads'>),
        date,
        reads,
        body: content,
        folder,
      });
    }
  }

  return all.sort((a, b) => b.date.localeCompare(a.date));
}

export function getByDomain(domain: Domain): ContentMeta[] {
  return getAllContent().filter(c => c.domain.includes(domain));
}

export function getByType(type: ContentType): ContentMeta[] {
  return getAllContent().filter(c => c.type === type);
}
