export const newItem = (title: string, subtitle: string, text: string) => {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="text-left flex flex-col">
                    <text className="item-title">{title}</text>
                    <text className="section-subtitle">{subtitle}</text>
                    <p className="item-text">{text}</p>
                </div>
            </div>
        </div>
    );
}
