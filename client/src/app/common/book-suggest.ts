const list = [
	'静静的顿河',
	'马丁·伊登',
	'卧底经济学',
	'皇帝新脑',
	'四世同堂',
	'元素的盛宴',
];

export const BookSuggest = {
	name: list[+Date.now() % list.length],
};
