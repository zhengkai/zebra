import { Injectable } from '@angular/core';
import { SearchArgs } from '../common/type';

@Injectable({
	providedIn: 'root',
})
export class HistoryService {

	list: SearchArgs[] = [];

	constructor() {
		try {
			const j = localStorage.getItem('history');
			if (j) {
				const list = JSON.parse(j);
				for (const a of list) {
					this.list.push(new SearchArgs(a));
				}
			}
		} catch (x) {
		}
	}

	save(a: SearchArgs) {
		this.tidy(a);
		if (this.list.length > 50) {
			this.list.length = 50;
		}
		this.store();
	}

	store() {
		localStorage.setItem('history', JSON.stringify(this.list));
	}

	del(a: SearchArgs) {
		const idx = this.list.indexOf(a);
		if (idx < 0) {
			return;
		}
		this.list.splice(idx, 1);
		this.store();
	}

	tidy(a: SearchArgs) {
		for (const i in this.list) {
			const o = this.list[i];
			if (o.includes(a)) {
				this.list.splice(+i, 1);
				this.list.unshift(o);
				return;
			}
		}

		this.list = this.list.filter((o) => {
			return !a.includes(o);
		});
		this.list.unshift(a);
	}

	clean() {
		this.list.length = 0;
		localStorage.removeItem('history');
	}
}
