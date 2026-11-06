// Code highlighting theme for posts, in the site's purple/teal palette (a Shiki/TextMate theme)
const codeTheme = {
    name: 'cisdeli',
    type: 'dark',
    colors: {
        'editor.background': '#00000000',
        'editor.foreground': '#ddd6ea',
    },
    tokenColors: [
        { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#6c6585', fontStyle: 'italic' } },
        { scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.operator.new'], settings: { foreground: '#a985e8' } },
        { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#5ccbe0' } },
        { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#e9a2d0' } },
        { scope: ['entity.name.function', 'support.function', 'meta.function-call.generic'], settings: { foreground: '#c9b8fb' } },
        { scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: '#7fd6c4' } },
        { scope: ['variable.parameter'], settings: { foreground: '#efeaf8' } },
        { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#8e87a6' } },
    ],
};

export default codeTheme;
