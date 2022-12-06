import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { NavService } from '../common/nav.service';
import { SettingService } from '../setting/setting.service';
import { HistoryService } from '../history/history.service';
import { IResultRow } from '../common/type';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styles: [
	],
})
export class SearchComponent {

	langOption = ['chinese', 'english'];
	extOption = ['epub', 'mobi', 'azw3', 'pdf', 'txt'];

	keyBackend = {
		name: 'title',
		ext: 'extension',
		lang: 'language',
	};

	lastResult = '';

	name = '';
	author = '';
	lang = '';
	publisher = '';
	ext = '';
	isbn = '';
	id = '';

	error = false;

	constructor(
		public srv: SearchService,
		public nav: NavService,
		public setting: SettingService,
		public history: HistoryService,
	) {
		this.nav.go('search');
	}

	search() {

		this.srv.Search(null);

		// console.log(args, query);

		// await new Promise((p) => setTimeout(p, 1000));
	}

	formatBytes(n: number) {
		if (n <= 0) {
			return '';
		}
		if (n < 1024) {
			return '1K';
		}

		const units = ['KB', 'MB', 'GB', 'TB'];
		let i = 0;

		for (; n >= 1024 && i < 4; i++) {
			n /= 1024;
		}

		return n.toFixed(1) + ' ' + units[i - 1];
	}

	buildLink(r: IResultRow) {

		const setting = this.setting.current['misc.dlSite'];
		const base = setting === 'ipfs://'
			? 'ipfs://'
			: setting.replace(/[/]+$/, '') + '/ipfs/';

		let name = r.name;
		if (name !== r.author && this.setting.current['fileName.author']) {
			name += '_' + r.author;
		}
		if (name !== r.publisher && this.setting.current['fileName.publisher']) {
			name += '_' + r.publisher;
		}
		if (this.setting.current['fileName.zlib_id']) {
			name += '_' + r.id;
		}
		name = name.replace(/(\.|,)/g, '').replace(/\s+/g, '_');

		const url = `${base}${r.ipfs_cid}?filename=${encodeURIComponent(name)}.${r.ext}`;

		return url;
	}
}
