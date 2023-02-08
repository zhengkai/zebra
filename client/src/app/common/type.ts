export const KeyName = {
	name: '书名',
	author: '作者',
	publisher: '出版社',
	lang: '语言',
	ext: '扩展名',
	isbn: 'ISBN',
	zlib_id: 'zLib ID',
	id: 'zLib ID',
	pages: '页码',
	filesize: '文件大小',
};

export interface IResultRow {
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
	idx: number; // 默认结果顺序
}

export interface ISearchArgs {
	name: string;
	author: string;
	lang: string;
	publisher: string;
	ext: string;
	isbn: string;
	id: string;
}

export type SearchKey = keyof ISearchArgs;
export const SearchKeyList: SearchKey[] = ['name', 'author', 'publisher', 'lang', 'ext', 'isbn', 'id'];

const keyBackend = {
	name: 'title',
	ext: 'extension',
	lang: 'language',
};

export class SearchArgs {

	name: string;
	author: string;
	lang: string;
	publisher: string;
	ext: string;
	isbn: string;
	id: string;

	constructor(a: ISearchArgs) {
		this.name = a.name;
		this.author = a.author;
		this.lang = a.lang;
		this.publisher = a.publisher;
		this.ext = a.ext;
		this.isbn = a.isbn;
		this.id = a.id;
	}

	includes(a: ISearchArgs) {
		for (const k of SearchKeyList) {
			if (!this[k].includes(a[k])) {
				return false;
			}
		}
		return true;
	}

	query(): string {
		if (this.id.length) {
			return this._buildKey(<SearchKey>'id');
		}
		return SearchKeyList.map(s => this._buildKey(s)).join('');
	}

	_buildKey(key: SearchKey): string {
		let s = this[key].replace(/"/g, '');
		if (key === 'id') {
			s = s.replace(/[^0-9]/g, '');
		} else if (key === 'ext') {
			s = s.replace(/\s+/g, '');
		}
		if (!s.length) {
			return '';
		}
		key = (keyBackend as any)[key] || key;
		return `${key}:${s} `;
	}
}
