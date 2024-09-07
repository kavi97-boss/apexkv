import type { MDXComponents } from 'mdx/types';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		h1: ({ children }) => <h1 className={`text-4xl font-bold ${inter}`}>{children}</h1>,
	};
}
