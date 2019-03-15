import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';

export default class PreviewChart extends HTMLElementEntity {

	constructor(container, chartLayer, controlLayer, data, parentGraph) {
		super(container, data);
		this._parentGraph = parentGraph;
		this._chartLayer = chartLayer;
		this._controlLayer = controlLayer;
		this._qualityModifier = 2;
		this._paddingModifier = 0.3;
		this._lineWidth = this._qualityModifier * 1.5;
		this._controlPosition = { start: .5, end: .7 };
		this._controlFrameVerticalBorderWidth = .015;
		this._controlFrameHorizontalBorderWidth = .05;
		this._minFrameWidth = 0.15;
	}

	_onInit() {
		this.redraw();
		this._controlLayer.addEventListener('mousedown', this._mouseDown.bind(this));
		document.addEventListener('mouseup', this._mouseReleasedOverDocument.bind(this));
		document.addEventListener('mousemove', this._mouseMoveOverDocument.bind(this));
		document.addEventListener('contextmenu', this._mouseReleasedOverDocument.bind(this));
	}

	redraw() {
		this._defineSize();
		this._drawCharts();
		this._drawControl();
	}

	_defineSize() {
		this._chartLayer.width = this._chartLayer.offsetWidth * this._qualityModifier;
		this._chartLayer.height = this._chartLayer.offsetHeight * this._qualityModifier;
		this._controlLayer.height = this._controlLayer.offsetHeight * this._qualityModifier;
		this._controlLayer.width = this._controlLayer.offsetWidth * this._qualityModifier;
	}

	_drawCharts() {
		const data = this.getData();
		const columns = data.columns.filter(col => data.types[col[0]] === 'line');
		let { min, max } = columns.map(col => col.slice(1)).flat().reduce((acc, val, idx) => {
			return idx ? {
				min: Math.min(acc.min, val),
				max: Math.max(acc.max, val)
			} : { min: val, max: val };
		}, {});
		let cordRange = max - min;
		max += Math.abs(cordRange * this._paddingModifier);
		min -= Math.abs(cordRange * this._paddingModifier);
		cordRange = max - min;

		const ctx = this._chartLayer.getContext('2d');
		const layerHeight = this._chartLayer.height;
		const layerWidth = this._chartLayer.width;


		ctx.transform(1, 0, 0, -1, 0, layerHeight);
		ctx.lineWidth = this._lineWidth;
		ctx.lineJoin = 'round';

		ctx.clearRect(0, 0, layerWidth, layerHeight);

		columns.forEach(col => {
			ctx.beginPath();
			ctx.strokeStyle = data.colors[col[0]];
			col.splice(1).forEach((value, idx, valuesArr) => {
				const cordY = ((value - min) / cordRange) * layerHeight;
				const cordX = (idx / (valuesArr.length - 1)) * layerWidth;
				if (!idx) {
					ctx.moveTo(cordX, cordY);
				}
				ctx.lineTo(cordX, cordY);
			});
			ctx.stroke();
		});
	}

	_drawControl() {
		const ctx = this._controlLayer.getContext('2d');
		const layerHeight = this._controlLayer.height;
		const layerWidth = this._controlLayer.width;
		ctx.clearRect(0, 0, layerWidth, layerHeight);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(0, 0, layerWidth, layerHeight);

		const startX = this._controlPosition.start * layerWidth;
		const endX = this._controlPosition.end * layerWidth;
		const controlWidth = endX - startX;
		ctx.fillStyle = 'rgba(10, 10, 255, 0.1)';
		ctx.fillRect(startX, 0, controlWidth, layerHeight);
		ctx.clearRect(
			startX + layerWidth * this._controlFrameVerticalBorderWidth,
			layerHeight * this._controlFrameHorizontalBorderWidth,
			controlWidth - layerWidth * this._controlFrameVerticalBorderWidth * 2,
			layerHeight * (1 - this._controlFrameHorizontalBorderWidth * 2)
		);
	}

	_moveControlPosition(offset) {
		const { start, end } = this._controlPosition;
		const controlFrameWidth = end - start;
		const normalizedOffset = Math.max(Math.min(offset, 1 - controlFrameWidth / 2), controlFrameWidth / 2);
		this._controlPosition = {
			start: Math.max(normalizedOffset - controlFrameWidth / 2),
			end: Math.max(normalizedOffset + controlFrameWidth / 2)
		};
		this._drawControl();
	}

	_moveLeftBorder(offset) {
		const { end } = this._controlPosition;
		const normalizedStart = Math.max(Math.min(offset, end - this._minFrameWidth), 0);
		this._controlPosition.start = normalizedStart;
		this._drawControl();
	}

	_moveRightBorder(offset) {
		const { start } = this._controlPosition;
		const normalizedStart = Math.max(Math.min(offset, 1), start + this._minFrameWidth);
		this._controlPosition.end = normalizedStart;
		this._drawControl();
	}

	_mouseDown(evt) {
		const offset = evt.offsetX * this._qualityModifier / this._controlLayer.width;
		const { start, end } = this._controlPosition;
		const leftBorder = {
			start,
			end: start + this._controlFrameVerticalBorderWidth
		};
		const rightBorder = {
			start: end - this._controlFrameVerticalBorderWidth,
			end
		};

		if (offset <= leftBorder.end && offset >= leftBorder.start) {
			this._leftBorderStickedToMouse = true;
			this._stickOffset = offset - leftBorder.start;
		} else if (offset <= rightBorder.end && offset >= rightBorder.start) {
			this._rightBorderStickedToMouse = true;
			this._stickOffset = offset - rightBorder.end;
		} else {
			this._frameStickedToMouse = true;
			if (offset >= this._controlPosition.start && offset <= this._controlPosition.end) {
				this._stickOffset = offset - (end + start) / 2;
			} else {
				this._stickOffset = 0;
				if (offset > 0 && offset < 1) {
					this._moveControlPosition(offset);
				}
			}
		}
	}

	_mouseReleasedOverDocument() {
		this._frameStickedToMouse = false;
		this._leftBorderStickedToMouse = false;
		this._rightBorderStickedToMouse = false;
		this.stickOffset = 0;
	}

	_mouseMoveOverDocument(evt) {

		if (this._frameStickedToMouse || this._leftBorderStickedToMouse || this._rightBorderStickedToMouse) {
			const offset = ((evt.clientX - this._controlLayer.getBoundingClientRect().left) * this._qualityModifier / this._controlLayer.width) - this._stickOffset;
			if (this._frameStickedToMouse) {
				this._moveControlPosition(offset);
			} else if (this._leftBorderStickedToMouse) {
				this._moveLeftBorder(offset);
			} else if (this._rightBorderStickedToMouse) {
				this._moveRightBorder(offset);
			}
		}
	}

}