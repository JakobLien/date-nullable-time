import { Plugin } from 'obsidian';

export default class DateNullableTime extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.metadataCache.on("changed", async (file, data, cache) => {
				if (cache.frontmatter == null) return;
				for (const [key, value] of Object.entries(cache.frontmatter)) {
					// If the value looks like an iso datetime, with only zeroes on the time part, this kicks in
					if ((typeof value === 'string') && value.match(/^\d{4}-\d{2}-\d{2}T00:00:00$/)) {
						await this.app.fileManager.processFrontMatter(file, (frontmatter: Record<PropertyKey, unknown>) => {
							frontmatter[key] = value.substring(0, 10);
						});
					}
				}
			})
		);
	}

	onunload() {}
}
