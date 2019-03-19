import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class MainChartLine extends HTMLElementEntity {
    
	constructor (container, data, key, color) {
		super(container, data);
		this.key = key;
		this._color = color;
	}

	_onInit() {
		const data = this.getData();
		this.min = Math.min(...data);
		this.max = Math.max(...data);
		this.getHTMLElement().width = this.getHTMLElement().offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this.getHTMLElement().height = this.getHTMLElement().offsetHeight * AppWrapper.QUALITY_MODIFIER;
	}

	drawChart(min, max, opacity = 1) {
		this._lastMin = min;
		this._lastMax = max;
		const ctx = this.getHTMLElement().getContext('2d');
		const layerHeight = this.getHTMLElement().height;
		const layerWidth = this.getHTMLElement().width;
		const data = this.getData();
		let cordRange = max - min;
		max += Math.abs(cordRange * AppWrapper.MAIN_PADDING_MODIFIER);
		min -= Math.abs(cordRange * AppWrapper.MAIN_PADDING_MODIFIER);
		cordRange = max - min;

		ctx.beginPath();
		ctx.resetTransform();
		ctx.transform(1, 0, 0, -1, 0, layerHeight);
		ctx.globalAlpha = opacity;
		ctx.lineWidth = AppWrapper.QUALITY_MODIFIER * 1;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = this._color;
		ctx.clearRect(0, 0, layerWidth, layerHeight);
		data.forEach((value, idx, valuesArr) => {
			const cordY = ((value - min) / cordRange) * layerHeight;
			const cordX = (idx / (valuesArr.length - 1)) * layerWidth;
			if (!idx) {
				ctx.moveTo(cordX, cordY);
			}
			ctx.lineTo(cordX, cordY);
		});
		ctx.stroke();
	}

}