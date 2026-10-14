// Same "scroll to the next section" cue as the hero's About link
const NextCue = ({ href, label }: { href: string; label: string }) => (
    <div className="content next-cue-row">
        <a href={href} className="cue-text scroll-cue">{label}</a>
    </div>
);

export default NextCue;
