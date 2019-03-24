export default class {
	constructor(htmlElement, data) {
		this._element = htmlElement;
		this._data = data;
	}

	getData() {
		return this._data;
	}

	getHTMLElement() {
		return this._element;
	}
}