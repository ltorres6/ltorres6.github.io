import { getCollection, type CollectionEntry } from 'astro:content';

export type Publication = CollectionEntry<'publications'>;

export const typeLabels: Record<Publication['data']['type'], string> = {
  journal: 'Journal article',
  conference: 'Conference',
  preprint: 'Preprint',
  thesis: 'Dissertation',
};

const typeRank = { journal: 0, preprint: 1, thesis: 2, conference: 3 };

/** Newest first; within a year, journal articles first, then most cited. */
export async function getPublications() {
  const pubs = await getCollection('publications');
  return pubs.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      typeRank[a.data.type] - typeRank[b.data.type] ||
      b.data.citations - a.data.citations,
  );
}

export function publicationStats(pubs: Publication[]) {
  const counts = pubs.map((p) => p.data.citations).sort((a, b) => b - a);
  const hIndex = counts.filter((c, i) => c >= i + 1).length;
  return {
    publications: pubs.length,
    citations: counts.reduce((s, c) => s + c, 0),
    hIndex,
    journal: pubs.filter((p) => p.data.type === 'journal').length,
  };
}

export const isLuis = (author: string) => /^Torres L/.test(author);

export const isFirstAuthor = (p: Publication) =>
  isLuis(p.data.authors[0]) || p.data.coFirst;

export const publicationUrl = (p: Publication) =>
  p.data.doi ? `https://doi.org/${p.data.doi}` : p.data.url;
