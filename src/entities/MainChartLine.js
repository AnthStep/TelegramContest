import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class MainChartLine extends HTMLElementEntity {
    
	constructor (container, data, key, color, mainGraph) {
		super(container, data);
		this.key = key;
		this.enabled = true;
		this._color = color;
		this._mainGraph = mainGraph;
		this._lastOpacity = 1,
		this.min = Math.min(...data);
		this.max = Math.max(...data);
		this.getHTMLElement().width = this.getHTMLElement().offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this.getHTMLElement().height = this.getHTMLElement().offsetHeight * AppWrapper.QUALITY_MODIFIER;
	}

	_onInit() {
		
	}

	getLimits(start, end) {
		const data = this.getData();
		const minStep = 1/(data.length - 1);
		const firstIdx = Math.max(Math.round((start - start%minStep)/minStep), 0);
		const lastIdx = Math.min(Math.round((end - end%minStep + minStep)/minStep), data.length-1);
		let min = data[firstIdx];
		let max = data[firstIdx];
		for (let idx = firstIdx+1; idx <= lastIdx; idx++) {
			min = Math.min(min, data[idx]);
			max = Math.max(max, data[idx]);
		}
		return {min, max};
	}

	drawChart(min, max, opacity, start, end) {
		this._lastMin = min;
		this._lastMax = max;
		this._lastStart = start;
		this._lastEnd = end;
		this._lastOpacity = opacity;
		const ctx = this.getHTMLElement().getContext('2d');
		const layerHeight = this.getHTMLElement().height;
		const layerWidth = this.getHTMLElement().width;
		const data = this.getData();
		const minStep = 1/(data.length - 1);
		const renderStart = start - start%minStep;
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

	redraw() {
		this._runAnimation();
	}

	updateLimits(min, max) {
		this._newMin = min;
		this._newMax = max;
	}

	updatePosition(start, end) {
		this._lastStart = start;
		this._lastEnd = end;
		if (!this._animationLink) {
			this.drawChart(this._lastMin, this._lastMax, this._lastOpacity, start, end);
		}
	}

	hideLine() {
		this._newOpacity = 0;
		this.enabled = false;
	}

	showLine() {
		this._newOpacity = 1;
		this.enabled = true;
	}

	_runAnimation() {
		this._newMax = isNaN(this._newMax) ? this._lastMax : this._newMax;
		this._newMin = isNaN(this._newMin) ? this._lastMin : this._newMin;
		this._newOpacity = isNaN(this._newOpacity) ? this._lastOpacity : this._newOpacity;

		if (this._animationLink) {
			cancelAnimationFrame(this._animationLink);
		}
		this._animationInProgress = true;
		const minDiff = this._newMin - this._lastMin;
		const maxDiff = this._newMax - this._lastMax;
		const opacityDiff = this._newOpacity - this._lastOpacity;
		const endFrame = 10;
		const drawFrame = (frameNo = 1) => {
			const progress = 1 - (frameNo / endFrame);
			const min = this._newMin - minDiff * progress;
			const max = this._newMax - maxDiff * progress;
			const opacity = this._newOpacity - opacityDiff * progress;
			this.drawChart(min, max, opacity, this._lastStart, this._lastEnd);
			this._animationLink = requestAnimationFrame(() => {
				if (frameNo < endFrame) {
					drawFrame(++frameNo);
				} else {
					this._animationLink = null;
				}
			});
		};
		drawFrame();
	}

}