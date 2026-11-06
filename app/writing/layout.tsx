import SiteNav from '@/app/ui/siteNav';

export default function WritingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="page-backdrop" aria-hidden="true" />
            <SiteNav current="writing" />
            <main className="flex-1">{children}</main>
        </div>
    );
}
