import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const briefing = defineCollection({
	loader: glob({ base: './src/content/briefing', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		section: z.enum(['global', 'us', 'tech', 'ai']),
		issueTitle: z.string().optional(),
		issueDescription: z.string().optional(),
	}),
});

export const collections = { briefing };
