import fs from 'fs';
import path from 'path';

// Each post is app/writing/posts/<slug>.mdx and exports its details as `meta`.
// Drafts are still built (reachable by URL, not indexed) but left out of the listing.
export type PostMeta = {
    title: string;
    date: string; // YYYY-MM-DD
    summary: string;
    draft?: boolean;
};

export type Post = PostMeta & { slug: string };

const DIR = path.join(process.cwd(), 'app/writing/posts');

export function getSlugs() {
    return fs.readdirSync(DIR).filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
}

export async function getPost(slug: string) {
    const mod = await import(`./posts/${slug}.mdx`);
    return { Content: mod.default as React.ComponentType, meta: { ...(mod.meta as PostMeta), slug } };
}

// Newest first; drafts only show while developing
export async function getPosts(): Promise<Post[]> {
    const posts = await Promise.all(getSlugs().map(async s => (await getPost(s)).meta));
    return posts
        .filter(p => !p.draft || process.env.NODE_ENV === 'development')
        .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
