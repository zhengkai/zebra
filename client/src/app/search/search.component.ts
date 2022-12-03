import { Component } from '@angular/core';
import { Row, SearchService } from './search.service';
import { NavService } from '../common/nav.service';

type searchKey = 'name' | 'author' | 'publisher' | 'lang' | 'ext' | 'isbn';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styles: [
	],
})
export class SearchComponent {

	langOption = ['chinese', 'english'];
	extOption = ['epub', 'mobi', 'azw3', 'pdf'];
	option = 'abc';

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

	pageCache: { [key: string]: Promise<any[]> } = {};

	constructor(
		public srv: SearchService,
		public nav: NavService,
	) {
		this.name = '百年';
		this.doSearch();

		this.nav.go('search');
	}

	doSearch() {
		console.log(this.name, this.author, this.lang, this.publisher, this.ext, this.isbn);

		const query = this.buildSearch();

		(async () => {
			const { ok, result } = await this.srv.Search(query);
			if (!ok || this.lastResult === query) {
				return;
			}
			this.lastResult = query;
			this.result = result;
		})();

		// title:"自私"author:"道"publisher:"1"extension:"2"language:"3"isbn:"4"
	}

	showResult() {
		console.log();
	}

	buildSearch(): string {

		let query = '';
		for (const s of ['name', 'author', 'publisher', 'lang', 'ext', 'isbn']) {
			query += this.buildQuery(s as searchKey);
		}
		console.log(query);
		return query;
	}

	buildQuery(key: searchKey): string {
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

		const host = 'https://cloudflare-ipfs.com';

		const name = `${r.name}_${r.author}`.replace(/\s+/g, '_');
		console.log('name', name);

		const url = `${host}/ipfs/${r.ipfs_cid}?filename=${encodeURIComponent(name)}.${r.ext}`;

		return url;
	}
}
