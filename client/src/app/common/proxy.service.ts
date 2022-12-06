import { Injectable } from '@angular/core';
import { SearchArgs } from './type';

@Injectable({
	providedIn: 'root',
})
export class ProxyService {

	saveHistory = (a: SearchArgs) => {
		console.log(a);
	};
}
