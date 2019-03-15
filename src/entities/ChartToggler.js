import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';

export default class ChartToggler extends HTMLElementEntity {
    
	constructor (container, canvasLayer, data, effectCanvasLayer) {
		super(container, data);
		this._canvasLayer = canvasLayer;
		this._effectCanvasLayer = effectCanvasLayer;
		this._qualityModifier = 2;
	}

	_onInit() {
		this._canvasLayer.height = this._canvasLayer.offsetHeight * this._qualityModifier;
		this._canvasLayer.width = this._canvasLayer.offsetWidth * this._qualityModifier;
		this._effectCanvasLayer.height = this._effectCanvasLayer.offsetHeight * this._qualityModifier;
		this._effectCanvasLayer.width = this._effectCanvasLayer.offsetWidth * this._qualityModifier;

		this._drawCheckBox();
		this.getHTMLElement().addEventListener('mousedown', this._toggleClick.bind(this));
	}

	_drawCheckBox() {
		const ctx = this._canvasLayer.getContext('2d');
		const data = this.getData();
		const layerHeight = this._canvasLayer.height;
		const margin  = 6 * this._qualityModifier;
		const radius = layerHeight / 2 - margin;
		const centerX = radius + margin;
		const centerY = layerHeight / 2;
		const chbSize = 2 * this._qualityModifier;
		ctx.fillStyle = data.color;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI * 2);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.lineWidth = 2 * this._qualityModifier;


		ctx.moveTo(centerX - 2 * chbSize, centerY);
		ctx.lineTo(centerX - 0.5 * chbSize, centerY + 2 * chbSize);
		ctx.lineTo(centerX + 2.5 * chbSize, centerY - 1.5 * chbSize);
		ctx.stroke();
	}

	_toggleClick() {
		const ctx = this._effectCanvasLayer.getContext('2d');
		const layerHeight = this._effectCanvasLayer.height;
		const layerWidth = this._effectCanvasLayer.width;
		const margin  = 6 * this._qualityModifier;
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
}