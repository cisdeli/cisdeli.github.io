import type { Metadata } from 'next';
import Link from 'next/link';
import SectionHead from '@/app/ui/sectionHead';
import { getPosts, formatDate } from '@/app/writing/posts';

export const metadata: Metadata = {
    title: 'Writing · Pedro Cisdeli',
    description: 'Notes and tutorials by Pedro Cisdeli.',
};

export default async function Writing() {
    const posts = await getPosts();
    return (
        <section className="content writing">
            <SectionHead label="Notes & tutorials" title="Writing" />
            {posts.length === 0 ? (
                <p className="item-text writing-empty">Nothing here yet.</p>
            ) : (
                <ul className="post-list">
                    {posts.map(p => (
                        <li key={p.slug}>
                            <Link href={`/writing/${p.slug}`} className="post-row">
                                <time className="post-date" dateTime={p.date}>
                                    {formatDate(p.date)}{p.draft && ' · draft'}
                                </time>
                                <span className="post-title">{p.title}</span>
                                <span className="post-summary">{p.summary}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
