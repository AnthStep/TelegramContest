import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import AppWrapper from '../singletons/AppWrapper';

export default class ChartToggler extends HTMLElementEntity {
    
	constructor (container, canvasLayer, data, effectCanvasLayer, parentGraph) {
		super(container, data);
		this._canvasLayer = canvasLayer;
		this._effectCanvasLayer = effectCanvasLayer;
		this._toggled = true;
		this._animationInProgress = false;
		this._parentGraph = parentGraph;
		this._canvasLayer.height = this._canvasLayer.offsetHeight * AppWrapper.QUALITY_MODIFIER;
		this._canvasLayer.width = this._canvasLayer.offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this._effectCanvasLayer.height = this._effectCanvasLayer.offsetHeight * AppWrapper.QUALITY_MODIFIER;
		this._effectCanvasLayer.width = this._effectCanvasLayer.offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this._drawCheckBox(1);
		this.getHTMLElement().addEventListener('mousedown', this._toggleClick.bind(this));
	}

	_drawCheckBox(progress) {
		const ctx = this._canvasLayer.getContext('2d');
		const data = this.getData();
		const layerHeight = this._canvasLayer.height;
		const layerWidth = this._canvasLayer.width;
		const margin  = 6 * AppWrapper.QUALITY_MODIFIER;
		const radius = layerHeight / 2 - margin;
		const centerX = radius + margin;
		const centerY = layerHeight / 2;

		ctx.clearRect(0,0, layerHeight, layerWidth);
		this._drawCheckBoxCircle(ctx, centerX, centerY, data.color, radius, progress);
		this._drawCheckBoxIcon(ctx, centerX, centerY, progress);
	}

	_drawCheckBoxIcon(ctx, centerX, centerY, progress) {
		const chbSize = 2 * AppWrapper.QUALITY_MODIFIER * progress;
		const chbCenterX = centerX - 0.5 * chbSize;
		const chbCenterY = centerY + 2 * chbSize;
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.lineWidth = 2 * AppWrapper.QUALITY_MODIFIER;
		ctx.moveTo(chbCenterX - (1.5 * chbSize) * progress, chbCenterY - (2 * chbSize) * progress);
		ctx.lineTo(chbCenterX, chbCenterY);
		ctx.lineTo(chbCenterX + (3 * chbSize) * progress, chbCenterY - (3.5 * chbSize) * progress);
		ctx.stroke();
	}

	_drawCheckBoxCircle(ctx, centerX, centerY, color, radius, progress) {
		const innerRadius = radius * 0.85;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		ctx.arc(centerX, centerY, innerRadius * (1 - progress), 0, 2 * Math.PI * 2);
		ctx.fill();
	}

	_toggleClick() {
		const toggledLength = this._parentGraph.getTogglersList().filter(toggler => toggler.isToggled()).length;
		this._drawRipple();
		if (toggledLength < 2 && this._toggled) {
			return;
		}
		this._toggled = !this._toggled;
		if (!this._animationInProgress) {
			this._runAnimation();
		}
		this._parentGraph.chartToggled(this._data.key, this._toggled);
	}

	_drawRipple() {
		const ctx = this._effectCanvasLayer.getContext('2d');
		const layerHeight = this._effectCanvasLayer.height;
		const layerWidth = this._effectCanvasLayer.width;
		const margin  = 6 * AppWrapper.QUALITY_MODIFIER;
		let radius = layerHeight/2 - margin;
		const centerX = radius + margin;
		const centerY = layerHeight / 2;
		let frameCount = 20;
		ctx.fillStyle = 'blue';

		const drawFrame = (frame = 1) => {
			const progress = frame/frameCount;
			ctx.clearRect(0, 0, layerWidth, layerHeight);
			ctx.globalAlpha = 0.1 * (1 - progress);
			ctx.beginPath();
			ctx.fillStyle = 'blue';
			ctx.arc(centerX, centerY, radius * (1 + 6 * progress), 0, 2 * Math.PI * 2);
			ctx.fill();
			requestAnimationFrame(() => {
				frame <= frameCount ? drawFrame(++frame) : ctx.clearRect(0, 0, layerWidth, layerHeight);
			});
		};
		drawFrame();
	}

	_runAnimation() {
		let frameCount = 10;
		let startFrame = this._toggled ? 1 : frameCount;
		const drawFrame = (frame = startFrame) => {
			const progress = frame / frameCount;
			this._drawCheckBox(progress);
			requestAnimationFrame(() => {
				if (!this._toggled && frame > 1) {
					drawFrame(--frame);
				} else if (this._toggled && frame < frameCount) {
					drawFrame(++frame);
				}
			});
		};
		drawFrame();
		this._animationInProgress = false;
	}

	isToggled() {
		return this._toggled;
	}
}