import { Component } from '@angular/core';
import { SearchKey, Row, SearchService } from './search.service';
import { NavService } from '../common/nav.service';
import { SessionService } from '../common/session.service';
import { SettingService } from '../setting/setting.service';
import { HistoryService } from '../history/history.service';
import { SearchArgs } from '../common/type';

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

	result: Row[] = [];

	constructor(
		public srv: SearchService,
		public nav: NavService,
		public session: SessionService,
		public setting: SettingService,
		public history: HistoryService,
	) {
		for (const [k, v] of Object.entries(session.search)) {
			this[k as SearchKey] = v;
		}
		this.doSearch();
		this.nav.go('search');
	}

	async doSearch() {

		const args = new SearchArgs(this);

		const query = args.query();
		this.error = false;
		if (this.setting.current['misc.rememberLastSearch']) {
			this.session.save(args);
		}
		this.nav.loading = true;

		// console.log(args, query);

		const { ok, error, result } = await this.srv.Search(query);
		// await new Promise((p) => setTimeout(p, 1000));
		if (ok) {
			this.error = error;
			this.nav.loading = false;
		}
		if (!ok || this.lastResult === query) {
			return;
		}
		this.lastResult = query;
		this.result = result;
		if (result?.length) {
			this.history.save(args);
		}
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

	buildLink(r: Row) {

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
