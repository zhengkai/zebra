import { Injectable } from '@angular/core';
import { SearchKey } from '../search/search.service';

@Injectable({
	providedIn: 'root',
})
export class SessionService {

	search = {
		name: '',
		author: '',
		lang: '',
		publisher: '',
		ext: '',
		isbn: '',
	};

	constructor() {
		let d: any = {};
		try {
			const j = localStorage.getItem('session');
			if (j) {
				d = JSON.parse(j);
			}
		} catch (x) {
			d = {};
		}

		for (const k of Object.keys(this.search)) {
			this.search[k as SearchKey] = '' + (d?.[k] || '');
		}
	}

	save(obj: any) {
		for (const k of Object.keys(this.search)) {
			this.search[k as SearchKey] = obj[k] || '';
		}
		const j = JSON.stringify(this.search);
		localStorage.setItem('session', j);
	}
}
