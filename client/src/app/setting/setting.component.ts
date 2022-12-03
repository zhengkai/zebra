import { Component } from '@angular/core';
import { NavService } from '../common/nav.service';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styles: [
	],
})
export class SettingComponent {

	dlSite = 'https://cloudflare-ipfs.com/';

	dlSiteSuggest = [
		'https://cloudflare-ipfs.com/',
		'https://dweb.link/',
		'https://ipfs.io/',
		'https://gateway.pinata.cloud/',
		'http://127.0.0.1:8080/',
	];

	constructor(
		public nav: NavService,
	) {
		this.nav.go('setting');
	}
}
