import { Component } from '@angular/core';

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

	name = '';
	author = '';
	lang = '';
	publisher = '';
	ext = '';
	isbn = '';
}
