const list = [
	'静静的顿河',
	'马丁·伊登',
	'卧底经济学',
	'皇帝新脑',
];

export const BookSuggest = {
	name: list[+Date.now() % list.length],
};
