import { Component } from '@angular/core';
import { NavService } from './nav.service';
import { SettingService } from '../setting/setting.service';

@Component({
	selector: 'app-root',
	templateUrl: './bootstrap.component.html',
	styles: [],
})
export class BootstrapComponent {
	title = 'SearchUI';

	constructor(
		public nav: NavService,
		public setting: SettingService,
	) {
	}
}
