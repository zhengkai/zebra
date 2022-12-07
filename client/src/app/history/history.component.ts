import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from '../common/nav.service';
import { HistoryService } from './history.service';
import { SearchService } from '../search/search.service';
import { SearchArgs, SearchKeyList, KeyName } from '../common/type';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styles: [
	],
})
export class HistoryComponent {

	constructor(
		public nav: NavService,
		public srv: HistoryService,
		public search: SearchService,
		private router: Router,
	) {
		this.nav.go('history');
	}

	text(a: SearchArgs) {
		return SearchKeyList.map((k) => {
			const s = a[k];
			if (!s.length) {
				return;
			}
			return `${KeyName[k]}：${a[k]}`;
		}).filter(s => !!s?.length).join(' ，');
	}

	go(a: SearchArgs) {
		window.scroll({
			top: 0,
			left: 0,
		});
		this.router.navigate(['/']).finally(() => {
			this.search.Search(a);
		});
	}
}
