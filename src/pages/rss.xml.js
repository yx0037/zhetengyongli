import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const all = (await getCollection('briefing')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: all.map((e) => ({
			title: e.data.title,
			description: e.data.description,
			pubDate: e.data.pubDate,
			link: `/${e.data.section}/`,
		})),
	});
}
