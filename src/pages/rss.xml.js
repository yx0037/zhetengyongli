import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const all = await getCollection('briefing');
	const byDate = new Map();
	for (const e of all) {
		const d = e.data.pubDate.toISOString().slice(0, 10);
		if (!byDate.has(d)) byDate.set(d, []);
		byDate.get(d).push(e);
	}
	const items = [...byDate.entries()]
		.sort((a, b) => b[0].localeCompare(a[0]))
		.map(([date, entries]) => ({
			title:
				entries.find((e) => e.data.issueTitle)?.data.issueTitle ??
				`X 每日简报 · ${date}`,
			description:
				entries.find((e) => e.data.issueDescription)?.data.issueDescription ??
				entries.map((e) => e.data.description).join(' '),
			pubDate: entries[0].data.pubDate,
			link: `/briefing/${date}/`,
		}));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
	});
}
