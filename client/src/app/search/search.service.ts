import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type SearchKey = 'name' | 'author' | 'publisher' | 'lang' | 'ext' | 'isbn';

export interface Page {
	query: string;
	result: Row[];
	error: boolean;
	done: boolean;
	cbList: (() => void)[];
}

export interface Row {
    id: number;
    name: string;
    author: string;
    publisher: string;
    ext: string;
    filesize: number;
    lang: string;
    year: number;
    pages: number;
    isbn: string;
    ipfs_cid: string;
}

@Injectable({
	providedIn: 'root',
})
export class SearchService {

	baseURL = 'https://zlib.9farm.com/search?limit=100&query=';

	lastQuery = '';

	cache: { [key: string]: Page } = {};

	constructor(
		private http: HttpClient,
	) {
	}

	async Search(query: string) {
		this.lastQuery = query;

		let p = this.cache[query];
		if (!p) {
			p = <Page>{
				query,
				result: [],
				error: false,
				done: false,
				cbList: [],
			};
			this.fetch(p);
			this.cache[query] = p;
		}
		if (!p.done) {
			const a = new Promise((resolve) => {
				p.cbList.push(() => {
					resolve(null);
				});
			});
			await a;
		}
		return {
			ok: this.lastQuery === query,
			result: p.result,
		};
	}

	async fetch(p: Page) {
		const url = this.baseURL + encodeURIComponent(p.query);

		console.log('fetch url', url);

		this.http.get(url, {
			responseType: 'json',
		}).subscribe((data: any) => {
			this.parseData(p, data);
			p.done = true;
			for (const cb of p.cbList) {
				cb();
			}
			p.cbList.length = 0;
		});

	}

	parseData(p: Page, data: any) {
		const list = data?.books;
		if (!list) {
			p.error = true;
		}
		for (const row of list) {
			if (!row?.id) {
				continue;
			}
			p.result.push(<Row>{
				id: +row.id,
				name: '' + (row?.title || ''),
				author: '' + (row?.author || ''),
				publisher: '' + (row?.publisher || ''),
				ext: '' + (row?.extension || ''),
				filesize: +row?.filesize,
				lang: '' + (row?.language || ''),
				year: +row?.year,
				pages: +row?.pages,
				isbn: (row?.isbn || '').replace(/,/g, ', '),
				ipfs_cid: '' + (row?.ipfs_cid || ''),
			});
		}
	}
}
