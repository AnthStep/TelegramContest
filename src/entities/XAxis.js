import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import Graph from './Graph';
import AppWrapper from '../singletons/AppWrapper';

export default class xAxis extends HTMLElementEntity {
	constructor(container, data, parentGraph = new Graph()) {
		super(container, data);
		this._parentGraph = parentGraph;
		this._setSizings();
		this._precisionDenominator = Math.log(2);
		this._precisionBarier = Math.log(4 / 3) / this._precisionDenominator;
		this._textMap = {};
	}

	_setSizings() {
		const container = this.getHTMLElement();
		container.height = container.offsetHeight * AppWrapper.QUALITY_MODIFIER;
		container.width = container.offsetWidth * AppWrapper.QUALITY_MODIFIER;
	}

	updateControlPosition() {
		const ctx = this.getHTMLElement().getContext('2d');
		const { width, height } = this.getHTMLElement();
		const { start, end } = this._parentGraph.getControlPostion();
		const data = this.getData();
		const frameWidth = end - start;
		const { maxPrecision, diff } = this._getPrecision(frameWidth);
		const minStep = 1 / (2 ** maxPrecision);
		const renderStart = start - start % minStep - minStep;
		const renderEnd = end - end % minStep + 2 * minStep;
		const trMod = 0.5;
		const isTransitionAnimation = diff > this._precisionBarier && diff < this._precisionBarier * (1 + trMod);
		const transitionAlpha = (diff - this._precisionBarier) / (this._precisionBarier * trMod);


		ctx.clearRect(0, 0, width, height);
		ctx.font = '24px Arial';
		ctx.fillStyle = AppWrapper.colors.axis.text;
		for (let cursor = renderStart; cursor <= renderEnd; cursor += minStep) {
			const dataIndex = Math.floor(data.length * cursor);
			const dataValue = data[dataIndex];
			const tickText = this._getText(dataValue);
			const positionCursor = ((cursor - start) / frameWidth) * width;
			if (cursor === 0) {
				ctx.textAlign = 'start';
			} else if (cursor === 1) {
				ctx.textAlign = 'end';
			} else {
				ctx.textAlign = 'center';
			}
			if (isTransitionAnimation && (cursor / minStep) % 2 === 1) {
				ctx.globalAlpha = transitionAlpha;
			}
			ctx.fillText(tickText, positionCursor, 30);
			ctx.globalAlpha = 1;
		}
	}

	_getPrecision(width = 3) {
		const precision = Math.log(4 / width) / this._precisionDenominator;
		const lessInteger = Math.floor(precision);
		const diff = precision - lessInteger;
		return {
			maxPrecision: diff >= this._precisionBarier ? lessInteger + 1 : lessInteger,
			diff
		};
	}

	_getText(v = 0, withDay = false) {
		if (this._textMap[v] && !withDay) {
			return this._textMap[v];
		} else {
			const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			const date = new Date(v);
			let text = monthNames[date.getMonth()] + ' ' + date.getDate();
			this._textMap[v] = text;
			if (withDay) {
				const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
				text = days[date.getDay()] + ', ' + text;
			}
			return text;
		}
	}

	getLabel(position) {
		const {start, end} = this._parentGraph.getControlPostion();
		const data = this.getData();
		const dLength = data.length  - 1;
		const minStep = 1/dLength;
		const minIdx = Math.round((start + (start%minStep && (minStep - start%minStep))) * dLength);
		const maxIdx = Math.round((end - end%minStep) * dLength);
		let positionIdx = Math.round(position * dLength);
		positionIdx = Math.min(Math.max(positionIdx, minIdx), maxIdx);
		const layerPosition = ((positionIdx * minStep) - start) / (end - start);
		return {
			value: data[positionIdx],
			text: this._getText(data[positionIdx], true),
			layerPosition,
			idx: positionIdx
		};
	}

	redrawColor() {
		this.updateControlPosition();
	}
}