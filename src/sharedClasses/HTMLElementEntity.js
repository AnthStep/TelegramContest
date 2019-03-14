export default class {
	constructor(htmlElement, data) {
		this._element = htmlElement;
		this._data = data;
		requestAnimationFrame(this._onInit.bind(this));
	}

	getData() {
		return this._data;
	}

	getHTMLElement() {
		return this._element;
	}

	_onInit() {}
}