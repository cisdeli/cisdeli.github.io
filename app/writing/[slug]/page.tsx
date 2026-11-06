import type { Metadata } from 'next';
import Link from 'next/link';
import { getSlugs, getPost, formatDate } from '@/app/writing/posts';

type Params = { params: { slug: string } };

export function generateStaticParams() {
    return getSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { meta } = await getPost(params.slug);
    return {
        title: `${meta.title} · Pedro Cisdeli`,
        description: meta.summary,
        robots: meta.draft ? { index: false } : undefined,
    };
}

export default async function PostPage({ params }: Params) {
    const { Content, meta } = await getPost(params.slug);
    return (
        <article className="content post">
            <header className="post-head">
                <p className="section-label">
                    <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                </p>
                <h1 className="post-heading">{meta.title}</h1>
                <p className="section-intro">{meta.summary}</p>
                <span className="accent-line" />
            </header>
            <div className="post-body">
                <Content />
            </div>
            <footer className="post-foot">
                <Link href="/writing" className="cue-text post-back">All writing</Link>
            </footer>
        </article>
    );
}
