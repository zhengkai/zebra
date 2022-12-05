import { Component } from '@angular/core';
import { SearchKey, Row, SearchService } from './search.service';
import { NavService } from '../common/nav.service';
import { SessionService } from '../common/session.service';
import { SettingService } from '../setting/setting.service';

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

	result: Row[] = [];

	query = '';
	url = '';

	constructor(
		public srv: SearchService,
		public nav: NavService,
		public session: SessionService,
		public setting: SettingService,
	) {
		for (const [k, v] of Object.entries(session.search)) {
			this[k as SearchKey] = v;
		}
		this.doSearch();
		this.nav.go('search');
	}

	doSearch() {
		const query = this.buildSearch();
		this.search(query);
	}

	async search(query: string) {
		if (this.setting.current['misc.rememberLastSearch']) {
			this.session.save(this);
		}
		this.nav.loading = true;
		const { ok, result } = await this.srv.Search(query);
		if (ok) {
			this.nav.loading = false;
		}
		if (!ok || this.lastResult === query) {
			return;
		}
		this.lastResult = query;
		this.result = result;
	}

	buildSearch(): string {
		let query = '';
		for (const s of ['name', 'author', 'publisher', 'lang', 'ext', 'isbn']) {
			query += this.buildQuery(s as SearchKey);
		}
		return query;
	}

	buildQuery(key: SearchKey): string {
		const s = this[key]?.replace(/"/g, '') || '';
		if (!s.length) {
			return '';
		}
		key = (this.keyBackend as any)[key] || key;
		return `${key}:"${s}"`;
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

		const host = this.setting.current['misc.dlSite'].replace(/[/]+$/, '');

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

		const url = `${host}/ipfs/${r.ipfs_cid}?filename=${encodeURIComponent(name)}.${r.ext}`;

		return url;
	}
}
