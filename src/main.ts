import { Plugin } from 'obsidian';
import { DateNullableTimeSettings, DateNullableTimeSettingsTab, DEFAULT_SETTINGS } from './settings';

export default class DateNullableTime extends Plugin {
	settings!: DateNullableTimeSettings;

	async onload() {
		await this.loadSettings()

		this.addSettingTab(new DateNullableTimeSettingsTab(this.app, this));

		this.registerEvent(
			this.app.metadataCache.on("changed", async (file, data, cache) => {
				if (cache.frontmatter == null) return;
				for (const [key, value] of Object.entries(cache.frontmatter)) {
					if (typeof value !== 'string') return;
					if (value.match(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})$/)) {
						// If the value looks like an iso datetime, with only zeroes on the time part, this kicks in
						if (this.settings.nullifyMidnight && value.match(/^\d{4}-\d{2}-\d{2}T00:00:00$/)) {
							await this.app.fileManager.processFrontMatter(file, (frontmatter: Record<PropertyKey, unknown>) => {
								frontmatter[key] = value.substring(0, 10);
							});
						}

						if (key && this.settings.titleDateProps.split(',').contains(key)) {
							await this.app.fileManager.renameFile(file, file.path.replace(/\d{4}-\d{2}-\d{2}(?=[^/]*$)/, value.substring(0, 10)));
						}
					}
				}
			})
		);

		this.registerEvent(
			this.app.vault.on('rename', async (file, oldPath) => {
				// Add spaces before / after the ISO date if missing
				let newFilePath = file.path
					.replace(/([^/]*[^/ ])(\d{4}-\d{2}-\d{2}(?=[^/]*$))/, "$1 $2")
					.replace(/(\d{4}-\d{2}-\d{2})([^/ ][^/]*\.md$)/, "$1 $2");
				if (file.path !== newFilePath) {
					await this.app.fileManager.renameFile(file, newFilePath);
				}
            })
		)
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<DateNullableTimeSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
