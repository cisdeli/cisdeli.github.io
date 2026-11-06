import type { MDXComponents } from 'mdx/types';

// Required by @next/mdx for the app router. Post styling lives in .post-body (global.css).
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // External links open in a new tab
        a: ({ href = '', ...props }) => /^https?:/.test(href)
            ? <a href={href} target="_blank" rel="noreferrer" {...props} />
            : <a href={href} {...props} />,
        ...components,
    };
}
