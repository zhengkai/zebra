import { Component } from '@angular/core';
import { NavService } from '../common/nav.service';

@Component({
	selector: 'app-bookmark',
	templateUrl: './bookmark.component.html',
	styles: [
	],
})
export class BookmarkComponent {

	constructor(
		public nav: NavService,
	) {
		this.nav.go('bookmark');
	}
}
