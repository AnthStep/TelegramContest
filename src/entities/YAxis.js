import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class yAxis extends HTMLElementEntity {
	constructor(element, data, mainGraph) {
		super(element, data);
		this._parentGraph = mainGraph;
		this.axisesArr = [];
		this.getHTMLElement().width = this.getHTMLElement().offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this.getHTMLElement().height = this.getHTMLElement().offsetHeight * AppWrapper.QUALITY_MODIFIER;
	}

	updateLimits(min, max) {
		min = Math.max(min - Math.abs((max - min) * AppWrapper.MAIN_PADDING_MODIFIER), 0);
		max += Math.abs((max - min) * AppWrapper.MAIN_PADDING_MODIFIER);

		const axisConf = { min, max, opacity: 0, active: true};
		if (!this.axisesArr.length) {
			axisConf.opacity = 1;
			this._prevMin = min;
			this._prevMax = max;
			this.axisesArr.push(axisConf);
			this._drawAxis(axisConf);
			return;
		} else {
			const axisMatch = this.axisesArr.find(axis => axis.min === min && axis.max === max);
			this.axisesArr.forEach(axis => {
				axis.active = false;
			});
			if (axisMatch) {
				axisMatch.active = true;
			} else {
				this.axisesArr.push(axisConf);
			}
			this._runAnimation();
		}

	}

	_clearCanvas() {
		const ctx = this.getHTMLElement().getContext('2d');
		const {height, width} = this.getHTMLElement();
		ctx.clearRect(0,0, width, height);
	}

	_runAnimation() {
		if (this._animationLink) cancelAnimationFrame(this._animationLink);
		const activeAxis = this.axisesArr.find(axis => axis.active);
		const diffMin = activeAxis.min - this._prevMin;
		const diffMax = activeAxis.max - this._prevMax;
		const endFrameNo = 15;
		const drawFrame = (frameNo = 1) => {
			this._prevMin += diffMin/endFrameNo;
			this._prevMax += diffMax/endFrameNo;
			this._clearCanvas();
			this.axisesArr = this.axisesArr.filter((axis) => {
				if (axis.active && axis.opacity < 1) {
					axis.opacity = Math.min(axis.opacity + 1/endFrameNo, 1);
				} else if (!axis.active) {
					axis.opacity = Math.max(axis.opacity - 1/endFrameNo, 0);
				}
				
				if (axis.opacity > 0) {
					this._drawAxis(axis);
					return true;
				}

				return false;
			});
			this._animationLink = requestAnimationFrame(() => {
				if (frameNo < endFrameNo) drawFrame(++frameNo);
			});
		};
		drawFrame();
	}

	_drawAxis({min, max, opacity}) {
		const renderMin = this._prevMin;
		const renderMax = this._prevMax;
		const ctx = this.getHTMLElement().getContext('2d');
		ctx.font = 'lighter 26px sans-serif';
		ctx.textAlign ='left';
		ctx.fillStyle = AppWrapper.colors.axis.text;
		ctx.strokeStyle = AppWrapper.colors.axis.line;
		ctx.lineWidth = AppWrapper.QUALITY_MODIFIER * 1.5;
		max -= (max-min) * (0.2);
		const axisFrameHeight = max - min;
		const minStep = axisFrameHeight / 5;
		const renderFrameHeight = renderMax - renderMin;
		const {height, width} = this.getHTMLElement();
		const epsilon = 10**(-3);
		for (let pos = min; pos <= (max + epsilon); pos+=minStep) {
			if (pos >= (renderMin - epsilon) && pos < (renderMax + epsilon)) {
				ctx.globalAlpha = opacity;
				const canvasPosition = height * (1 - ((pos - renderMin) / renderFrameHeight));
				ctx.beginPath();
				ctx.moveTo(0, canvasPosition - 3);
				ctx.lineTo(width, canvasPosition - 3);
				ctx.stroke();
				ctx.fillText(this._getValue(pos), 0, canvasPosition - 10);
			}
		}
	}

	_getValue(value) {
		value = Math.round(value);
		if (value >= 10**3 && value < 10**6) {
			return Math.round(value / 10**2) / 10 + 'k';
		} else if (value >= 10**6) {
			return Math.round(value / 10**5) / 10 + 'm';
		} else {
			return value;
		}
	}

	redrawColor() {
		this._clearCanvas();
		this.axisesArr.forEach(axis => this._drawAxis(axis));
	}
}