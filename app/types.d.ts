declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.webm' {
    const src: string;
    export default src;
}

// ShaderHub-style fragment shaders, imported as source text
declare module '*.frag' {
    const src: string;
    export default src;
}
