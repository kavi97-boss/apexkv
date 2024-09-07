import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const rootDir = path.join(process.cwd(), 'blog');

export type PostMetadata = {
	title?: string;
	summary?: string;
	image?: string;
	author?: string;
	publishedAt?: string;
	slug: string;
};
export type Post = {
	metadata: PostMetadata;
	content: string;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
	try {
		const filePath = path.join(rootDir, `${slug}.mdx`);
		const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

		const { data, content } = matter(fileContent);

		return { metadata: { ...data, slug }, content };
	} catch (err) {
		return null;
	}
}
