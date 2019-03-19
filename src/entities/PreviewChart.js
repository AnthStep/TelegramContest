import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import createPreviewChartLine from '../initialize/createChartLine';
import PreviewChartLine from './PreviewChartLine';
import AppWrapper from '../singletons/AppWrapper';

export default class PreviewChart extends HTMLElementEntity {

	constructor(container, chartLayer, controlLayer, data, parentGraph) {
		super(container, data);
		this._parentGraph = parentGraph;
		this._chartLayer = chartLayer;
		this._controlLayer = controlLayer;
		this.PADDING_MODIFIER = 0.3;
		this.controlPosition = { start: .5, end: .7 };
		this._controlFrameVerticalBorderWidth = .015;
		this._controlFrameHorizontalBorderWidth = .05;
		this._minFrameWidth = 0.15;
		this._chartLines = [];
	}

	_onInit() {
		this._initCharts();
		this.redraw();
		this._controlLayer.addEventListener('mousedown', this._mouseDown.bind(this));
		document.addEventListener('mouseup', this._mouseReleasedOverDocument.bind(this));
		document.addEventListener('mousemove', this._mouseMoveOverDocument.bind(this));
		document.addEventListener('contextmenu', this._mouseReleasedOverDocument.bind(this));
	}

	_initCharts() {
		const data = this.getData();
		this._chartLines = data.columns
			.filter(col => data.types[col[0]] === 'line')
			.map((col) => {
				const lineKey = col[0];
				const lineValues = col.slice(1);
				const lineColor = data.colors[lineKey];
				const lineLayer = createPreviewChartLine(this._chartLayer);
				return new PreviewChartLine(lineLayer, lineValues, lineKey, lineColor);
			});
		requestAnimationFrame(() => {
			const min = Math.min(...this._chartLines.map(line => line.min));
			const max = Math.max(...this._chartLines.map(line => line.max));
			this._chartLines.forEach((line) => line.drawChart(min, max));
		});
	}

	redraw() {
		this._defineSize();
		this._drawControl();
	}

	redrawCharts() {

	}

	_defineSize() {
		this._chartLayer.width = this._chartLayer.offsetWidth * AppWrapper.QUALITY_MODIFIER;
		this._chartLayer.height = this._chartLayer.offsetHeight * AppWrapper.QUALITY_MODIFIER;
		this._controlLayer.height = this._controlLayer.offsetHeight * AppWrapper.QUALITY_MODIFIER;
		this._controlLayer.width = this._controlLayer.offsetWidth * AppWrapper.QUALITY_MODIFIER;
	}

	_drawControl() {
		const ctx = this._controlLayer.getContext('2d');
		const layerHeight = this._controlLayer.height;
		const layerWidth = this._controlLayer.width;
		ctx.clearRect(0, 0, layerWidth, layerHeight);
		ctx.fillStyle = 'rgba(246, 249, 255, 0.8)';
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
		const offset = evt.offsetX * AppWrapper.QUALITY_MODIFIER / this._controlLayer.width;
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
			const offset = ((evt.clientX - this._controlLayer.getBoundingClientRect().left) * AppWrapper.QUALITY_MODIFIER / this._controlLayer.width) - this._stickOffset;
			if (this._frameStickedToMouse) {
				this._moveControlPosition(offset);
			} else if (this._leftBorderStickedToMouse) {
				this._moveLeftBorder(offset);
			} else if (this._rightBorderStickedToMouse) {
				this._moveRightBorder(offset);
			}
		}
	}

	toggleLine(key, state) {
		const activeLines = this._chartLines.filter(line => 
			(line.key !== key && line.displayed) || (line.key === key && state)
		);
		const min = Math.min(...activeLines.map(line => line.min));
		const max = Math.max(...activeLines.map(line => line.max));
		const toggledLine = this._chartLines.find(line => line.key === key);
		if (state) {
			toggledLine.toggleLine(state, min, max);
		} else {
			toggledLine.toggleLine(state);
		}
		this._chartLines
			.filter(line => line.key !== key && line.displayed)
			.forEach(line => line.changeLimits(min, max));
	}
}