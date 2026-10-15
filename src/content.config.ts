import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const daily = defineCollection({
	loader: glob({ base: './src/content/daily', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(['AI', '科技', '智能家居']),
		sourceName: z.string().optional(),
		sourceUrl: z.string().optional(),
	}),
});

const cases = defineCollection({
	loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(['NAS', '电脑网络', '智能家居']),
	}),
});

export const collections = { blog, daily, cases };
