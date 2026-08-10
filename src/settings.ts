import { App, PluginSettingTab, Setting } from 'obsidian';
import MyPlugin from './main';

export interface DateNullableTimeSettings {
	nullifyMidnight: boolean;
	titleDateProps: string;
}

export const DEFAULT_SETTINGS: DateNullableTimeSettings = {
	nullifyMidnight: true,
	titleDateProps: '',
};

export class DateNullableTimeSettingsTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Nullify midnight')
			.setDesc('If timestamps at 00:00:00, remove the time portion of datetime properties.')
			.addToggle((toggle) => toggle
					.setTooltip('Leading whitespace: If the match needs to have whitespace (or a newline) in front of it.')
					.setValue(this.plugin.settings.nullifyMidnight)
					.onChange(async (value) => {
						this.plugin.settings.nullifyMidnight = value;
						await this.plugin.saveSettings();
					})
				)

		new Setting(containerEl)
			.setName('Title date properties')
			.setDesc('Comma separated names of properties that should auto change the date in the title.')
			.addText((text) =>
				text
					.setPlaceholder('Property keys')
					.setValue(this.plugin.settings.titleDateProps)
					.onChange(async (value) => {
						this.plugin.settings.titleDateProps = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
