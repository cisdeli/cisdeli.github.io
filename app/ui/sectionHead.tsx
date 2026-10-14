// Centered section opener: small label, large display title, one-line intro
const SectionHead = ({ label, title, intro }: { label: string; title: string; intro?: string }) => (
    <header className="section-head">
        <p className="section-label">{label}</p>
        <h2 className="section-heading">{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
        <span className="accent-line" />
    </header>
);

export default SectionHead;
