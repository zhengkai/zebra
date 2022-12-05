import { Component } from '@angular/core';
import { NavService } from '../common/nav.service';
import { SettingService } from './setting.service';
import { KeyName } from '../common/type';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styles: [
	],
})
export class SettingComponent {

	dlSite = 'https://cloudflare-ipfs.com/';

	keyName: any = KeyName;

	dlSiteSuggest = [
		'https://cloudflare-ipfs.com/',
		'https://dweb.link/',
		'https://ipfs.io/',
		'https://gateway.pinata.cloud/',
		'http://127.0.0.1:8080/',
	];

	constructor(
		public nav: NavService,
		public srv: SettingService,
	) {
		this.nav.go('setting');
	}
}
