import { Component } from '@angular/core';
import { Row, SearchService } from './search.service';

type searchKey = 'name' | 'author' | 'lang' | 'ext';

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
	) {
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
		for (const s of ['name', 'author', 'lang']) {
			query += this.buildQuery(s as searchKey);
		}
		console.log(query);
		return query;
	}

	buildQuery(key: searchKey): string {
		const s = this[key]?.replace(/"/, '') || '';
		if (!s.length) {
			return '';
		}
		key = (this.keyBackend as any)[key] || key;
		return `${key}:"${s}"`;
	}
}
