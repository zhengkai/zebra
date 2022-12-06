import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../common/session.service';
import { SettingService } from '../setting/setting.service';
import { NavService } from '../common/nav.service';
import { HistoryService } from '../history/history.service';
import { SearchKey, SearchArgs, IResultRow } from '../common/type';

export interface Page {
	query: string;
	result: IResultRow[];
	error: boolean;
	done: boolean;
	cbList: (() => void)[];
}

@Injectable({
	providedIn: 'root',
})
export class SearchService {

	args: SearchArgs;

	baseURL = '/search?limit=100&query=';

	lastQuery = '';
	lastResult = '';

	error = false;

	cache: { [key: string]: Page } = {};
	result: IResultRow[] = [];

	constructor(
		public session: SessionService,
		public setting: SettingService,
		public nav: NavService,
		public history: HistoryService,
		private http: HttpClient,
	) {
		this.args = session.search;
		this.Search(null);
	}

	async Search(a: SearchArgs|null) {
		if (!a) {
			a = this.args;
		} else {
			this.args = new SearchArgs(a);
		}
		const query = a.query();
		this.error = false;
		if (this.setting.current['misc.rememberLastSearch']) {
			this.session.save(a);
		}
		this.nav.loading = true;

		const { ok, error, result } = await this._search(query);
		if (ok) {
			this.error = error;
			this.nav.loading = false;
		}
		if (!ok || this.lastResult === query) {
			return;
		}
		this.lastResult = query;
		this.result = result;
		if (result?.length) {
			this.history.save(a);
		}
	}

	async _search(query: string) {
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
		} else if (p.error && p.done) {
			p.done = false;
			this.fetch(p);
		}
		// await new Promise((p) => setTimeout(p, 1000));
		if (query === '') {
			p.done = true;
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
			error: p.error,
			result: p.result,
		};
	}

	fetch(p: Page) {
		const url = this.baseURL + encodeURIComponent(p.query);

		const end = () => {

			p.done = true;
			for (const cb of p.cbList) {
				cb();
			}
			p.cbList.length = 0;
		};

		this.http.get(url, {
			responseType: 'json',
		}).subscribe({
			next: (data: unknown) => {
				this.parseData(p, data);
				end();
			},
			error: () => {
				p.error = true;
				end();
			},
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
			const r = <IResultRow>{
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
			};

			if (r.ext.length) {
				// 去掉书名里多余的 .txt 之类的
				const kl: SearchKey[] = ['name', 'author', 'publisher'];
				for (const k of kl) {
					const v = r[k] as string;
					if (!v.endsWith('.' + r.ext)) {
						continue;
					}
					(r[k] as any) = '' + v.substring(0, v.length - 1 - r.ext.length);
				}
			}
			p.result.push(r);
		}
	}
}
