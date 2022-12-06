import { Injectable } from '@angular/core';
import { HistoryService } from '../history/history.service';

const d = Object.freeze({
	'misc.rememberLastSearch': true,
	'misc.dlLeftButton': navigator.userAgent.match(/iPhone|Android/i),
	'misc.dlSite': 'https://cloudflare-ipfs.com/',
	'misc.fixedWidth': true,
	'misc.history': true,
	'searchCol.author': true,
	'searchCol.lang': true,
	'searchCol.publisher': true,
	'searchCol.ext': true,
	'searchCol.isbn': true,
	'searchCol.zlib_id': false,
	'resultCol.author': true,
	'resultCol.lang': true,
	'resultCol.publisher': true,
	'resultCol.ext': true,
	'resultCol.isbn': true,
	'resultCol.filesize': true,
	'resultCol.pages': true,
	'resultCol.zlib_id': false,
	'fileName.publisher': false,
	'fileName.author': false,
	'fileName.zlib_id': false,
});

type settingKey = keyof typeof d;

@Injectable({
	providedIn: 'root',
})
export class SettingService {

	d: any = {};
	current: any = {};

	keyList: string[] = [];

	expandList: any = {};

	tmpData: any = {};

	constructor(
		public history: HistoryService,
	) {
		try {
			const j = localStorage.getItem('setting');
			if (j) {
				this.tmpData = JSON.parse(j);
			}
		} catch (x) {
			this.tmpData = {};
		}

		for (const s of Object.keys(d)) {
			const k = s as settingKey;
			let v = this.tmpData[k];
			if (v === undefined) {
				v = d[k];
			} else {
				this.d[k] = v;
			}
			this.current[k] = v;
		}
		this.keyList = Object.keys(d);
	}

	saveButtonDisabled(): boolean {
		if (!this.current['misc.dlSite']?.length) {
			return true;
		}
		for (const s of Object.keys(this.current)) {
			if (this.d[s as settingKey] !== this.current[s]) {
				return false;
			}
		}
		return true;
	}

	isNavButtonHide(key: string) {
		if (key === 'history') {
			return !this.current['misc.history'];
		}
		return false;
	}

	reset() {
		for (const s of Object.keys(d)) {
			this.current[s] = d[s as settingKey];
		}
	}

	save() {
		if (!this.current['misc.dlSite']) {
			this.current['misc.dlSite'] = d['misc.dlSite'];
		}
		for (const s of Object.keys(this.current)) {
			this.d[s as settingKey] = this.current[s];
		}
		if (!this.current['misc.rememberLastSearch']) {
			localStorage.removeItem('session');
		}
		if (!this.current['misc.history']) {
			this.history.clean();
		}
		localStorage.setItem('setting', JSON.stringify(this.current));
	}
}
