import { Injectable } from '@angular/core';
import { BookSuggest } from './book-suggest';
import { SearchKeyList, SearchArgs } from './type';

@Injectable({
	providedIn: 'root',
})
export class SessionService {

	search: SearchArgs;

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

		for (const k of SearchKeyList) {
			d[k] = '' + (d?.[k] || '');
		}
		this.search = new SearchArgs(d);
	}

	save(a: SearchArgs) {
		this.search = a;
		const j = JSON.stringify(a);
		localStorage.setItem('session', j);
	}
}
