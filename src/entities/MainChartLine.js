import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class MainChartLine extends HTMLElementEntity {
    
	constructor (container, data, key, color, mainGraph) {
		super(container, data);
		this.key = key;
		this._color = color;
		this._mainGraph = mainGraph;
		this.min = Math.min(...data);
		this.max = Math.max(...data);
		this.getHTMLElement().width = this.getHTMLElement().offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this.getHTMLElement().height = this.getHTMLElement().offsetHeight * AppWrapper.QUALITY_MODIFIER;
	}

	_onInit() {
		
	}

	drawChart(min, max, opacity, start, end) {
		this._lastMin = min;
		this._lastMax = max;
		const ctx = this.getHTMLElement().getContext('2d');
		const layerHeight = this.getHTMLElement().height;
		const layerWidth = this.getHTMLElement().width;
		const data = this.getData();
		const minStep = 1/(data.length - 1);
		const renderStart = start - start%minStep - minStep;
		const renderEnd = end - end%minStep + 2*minStep;
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

		for (let abstractPos = renderStart; abstractPos <= renderEnd; abstractPos += minStep) {
			const value = data[Math.round(abstractPos/minStep)];
			const cordY = ((value - min) / cordRange) * layerHeight;

			const cordX = ((abstractPos - start) / (end - start)) * layerWidth;
			if (abstractPos === renderStart) {
				ctx.moveTo(cordX, cordY);
			}
			ctx.lineTo(cordX, cordY);
		}
		ctx.stroke();
	}

}