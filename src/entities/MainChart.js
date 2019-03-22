import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import createChartLine from '../initialize/createChartLine';
import MainChartLine from './MainChartLine';

export default class MainChart extends HTMLElementEntity {
    
	constructor (container, data, mainGraph) {
		super(container, data);
		this._mainGraph = mainGraph;
		this._firstDraw = true;
	}

	_onInit() {
		this._initCharts();
	}

	_initCharts() {
		const data = this.getData();
		this._chartLines = data.columns
			.filter(col => data.types[col[0]] === 'line')
			.map((col) => {
				const lineKey = col[0];
				const lineValues = col.slice(1);
				const lineColor = data.colors[lineKey];
				const lineLayer = createChartLine(this.getHTMLElement());
				return new MainChartLine(lineLayer, lineValues, lineKey, lineColor, this._mainGraph);
			});
	}

	_initDraw() {
		const {start, end} = this._mainGraph.getControlPostion();
		this._prevStart = start;
		this._prevEnd = end;
		this._prevMin = Math.min(...this._chartLines.map(line => line.getLimits(start, end).min));
		this._prevMax = Math.max(...this._chartLines.map(line => line.getLimits(start, end).max));
		this._chartLines.forEach((line) => line.drawChart(this._prevMin, this._prevMax, 1, start, end));
		if (this.limitsUpdated) this.limitsUpdated(this._prevMin, this._prevMax);
	}

	frameChanged() {
		if (this._firstDraw) {
			this._firstDraw = false;
			this._initDraw();
			return;
		}
		const {start, end} = this._mainGraph.getControlPostion();
		this._chartLines.forEach((line) => line.updatePosition(start, end));
		const enabledLines = this._chartLines.filter(line => line.enabled);
		const newMin = Math.min(...enabledLines.map(line => line.getLimits(start, end).min));
		const newMax = Math.max(...enabledLines.map(line => line.getLimits(start, end).max));
		if ((newMin !== this._prevMin) || (newMax !== this._prevMax)) {
			if (this._changeLimitTimeout) {
				clearTimeout(this._changeLimitTimeout);
			}
			this._prevMin = newMin;
			this._prevMax = newMax;
			this._changeLimitTimeout = setTimeout(() => {
				this._chartLines.forEach((line) => {
					line.updateLimits(this._prevMin, this._prevMax);
					line.redraw();
				});
				if (this.limitsUpdated) this.limitsUpdated(this._prevMin, this._prevMax);
			}, 50);
		}
	}

	toggleLine(key, state) {
		const {start, end} = this._mainGraph.getControlPostion();
		const toggledLine = this._chartLines.find(line => line.key === key);
		state ? toggledLine.showLine() : toggledLine.hideLine();
		const enabledLines = this._chartLines.filter(line => line.enabled);
		this._prevMin = Math.min(...enabledLines.map(line => line.getLimits(start, end).min));
		this._prevMax = Math.max(...enabledLines.map(line => line.getLimits(start, end).max));
		this._chartLines.forEach((line) => {
			line.updateLimits(this._prevMin, this._prevMax);
			line.redraw();
			if (this.limitsUpdated) this.limitsUpdated(this._prevMin, this._prevMax);
		});
	}

}