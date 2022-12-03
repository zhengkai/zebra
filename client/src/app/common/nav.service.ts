import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class NavService {

	list = [
		{
			key: 'search',
			name: '搜索',
			icon: 'search',
			path: '/',
		},
		{
			key: 'setting',
			name: '设置',
			icon: 'settings',
			path: '/setting',
		},
		{
			key: 'history',
			name: '历史',
			icon: 'history',
			path: '/history',
		},
		{
			key: 'bookmark',
			name: '书签',
			icon: 'bookmarks',
			path: '/bookmark',
		},
	];

	selectKey = 'search';

	loading = false;

	// constructor() { }

	go(key: string) {
		this.selectKey = key;
	}
}
