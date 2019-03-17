import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class PreviewChartLine extends HTMLElementEntity {
    
	constructor (container, data, key, color) {
		super(container, data);
		this.key = key;
		this._color = color;
		this.displayed = true;
		this._togglingAnimationInProcess = false;
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
		max += Math.abs(cordRange * AppWrapper.PREVIEW_PADDING_MODIFIER);
		min -= Math.abs(cordRange * AppWrapper.PREVIEW_PADDING_MODIFIER);
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

	toggleLine(state, min = this._lastMin, max = this._lastMax) {
		this.displayed = state;
		if (!this._togglingAnimationInProcess) {
			this._runToggleAnimation(min, max);
		}
	}

	_runToggleAnimation(min, max) {
		this._togglingAnimationInProcess = true;
		const frameCount = 10;
		const startFrame = this.displayed ? 1 : frameCount;
		const drawFrame = (frame = startFrame) => {
			const progress = frame/frameCount;
			this.drawChart(min, max, progress);
			requestAnimationFrame(() => {
				if (!this._togglingAnimationInProcess) {
					return;
				} else if (this.displayed && frame < frameCount) {
					drawFrame(++frame);
				} else if (!this.displayed && frame > 0) {
					drawFrame(--frame);
				} else {
					this._togglingAnimationInProcess = false;
				}
			});
		};
		drawFrame();
	}

	changeLimits(min, max) {
		if (this._changeLimitsAnimation) {
			cancelAnimationFrame(this._changeLimitsAnimation);
		}
		this._runChangeLimitsAnimation(min, max);
	}

	_runChangeLimitsAnimation(min, max) {
		const diffMin = min - this._lastMin;
		const diffMax = max - this._lastMax;
		const frameCount = 10;
		const drawFrame = (frame = 1) => {
			const progress = frame / frameCount;
			const animateMin = min - diffMin * (1 - progress);
			const animateMax = max - diffMax * (1 - progress);
			this.drawChart(animateMin, animateMax);
			this._changeLimitsAnimation = requestAnimationFrame(() => {
				if (frame < frameCount) {
					drawFrame(++frame);
				}
			});
		};
		drawFrame();
	}
}