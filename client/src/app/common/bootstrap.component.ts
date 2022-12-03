import { Component } from '@angular/core';
import { NavService } from './nav.service';

@Component({
	selector: 'app-root',
	templateUrl: './bootstrap.component.html',
	styles: [],
})
export class BootstrapComponent {
	title = 'SearchUI';

	constructor(
		public nav: NavService,
	) {
	}
}
