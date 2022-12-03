import { Component } from '@angular/core';
import { NavService } from '../common/nav.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styles: [
	],
})
export class HistoryComponent {

	constructor(
		public nav: NavService,
	) {
		this.nav.go('history');
	}
}
