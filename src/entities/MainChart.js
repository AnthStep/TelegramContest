import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import createChartLine from '../initialize/createChartLine';
import MainChartLine from './MainChartLine';

export default class MainChart extends HTMLElementEntity {
    
	constructor (container, data, mainGraph) {
		super(container, data);
		this._mainGraph = mainGraph;
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

	drawLines() {
		const {start, end} = this._mainGraph.getControlPostion();
		const min = Math.min(...this._chartLines.map(line => line.min));
		const max = Math.max(...this._chartLines.map(line => line.max));
		this._chartLines.forEach((line) => line.drawChart(min, max, 1, start, end));
	}

}