import type { Metadata } from 'next';
import Redirect from '@/app/ui/redirect';

// Old route, kept so links to it land on the single-page site
export const metadata: Metadata = { robots: { index: false } };

export default function Page() {
    return <Redirect to="/#usp" />;
}
