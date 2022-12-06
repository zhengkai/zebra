import { Injectable } from '@angular/core';
import { SearchKey } from '../search/search.service';
import { BookSuggest } from './book-suggest';
import { ISearchArgs } from './type';

@Injectable({
	providedIn: 'root',
})
export class SessionService {

	search = <ISearchArgs>{
		name: '',
		author: '',
		lang: '',
		publisher: '',
		ext: '',
		isbn: '',
	};

	constructor() {
		let d: any = {};
		let load = false;
		try {
			const j = localStorage.getItem('session');
			if (j) {
				d = JSON.parse(j);
				load = true;
			}
		} catch (x) {
		}
		if (!load) {
			d = BookSuggest;
		}

		for (const k of Object.keys(this.search)) {
			this.search[k as SearchKey] = '' + (d?.[k] || '');
		}
	}

	save(arg: ISearchArgs) {
		for (const s of Object.keys(this.search)) {
			const k = <SearchKey>s;
			this.search[k] = arg[k];
		}
		const j = JSON.stringify(this.search);
		localStorage.setItem('session', j);
	}
}
