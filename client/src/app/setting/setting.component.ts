import { Component } from '@angular/core';
import { NavService } from '../common/nav.service';
import { KeyName } from '../common/type';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styles: [
	],
})
export class SettingComponent {

	rememberLastSearch = false;
	dlLeftButton = false;

	searchCol = {
		lang: false,
		publisher: false,
		ext: false,
		isbn: false,
		zlib_id: false,
	};

	resultCol = {
		lang: false,
		publisher: false,
		ext: false,
		isbn: false,
		zlib_id: false,
		page: false,
	};

	fileName = {
		publisher: false,
		author: false,
	};

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
	) {
		this.nav.go('setting');
	}
}
