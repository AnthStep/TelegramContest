import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import PreviewChart from './PreviewChart';
import createPreviewChartLayers from '../initialize/createPreviewChartLayers';
import createToogglersContainer from '../initialize/createTogglersContainer';
import createToogglerElement from '../initialize/createTogglerElement';
import createMainChartLayers from '../initialize/createMainChartLayers';
import ChartToggler from './ChartToggler';
import MainChart from './MainChart';
import xAxis from './XAxis';
import yAxis from './YAxis';
import ValueSelector from './ValueSelector';

export default class Graph extends HTMLElementEntity {
    
	constructor (container, data) {
		super(container, data);
		this._mainChartWrapperInit();
		this._previewControlInit();
		this._togglersControlsInit();
	}

	_mainChartWrapperInit() {
		const data = this.getData();
		const {xAxisLayer, yAxisLayer, linesContainer, selectorLayer, selectorDescriptionLayer, selectorDetectionLayer} = createMainChartLayers(this.getHTMLElement());
		this._mainChart = new MainChart(linesContainer, this.getData(), this);
		const xAxisData = data.columns.find(col =>  data.types[col[0]] === 'x').slice(1);
		this.xAxis = new xAxis(xAxisLayer, xAxisData, this);
		this._yAxis = new yAxis(yAxisLayer, null, this);
		this._selectorLayer = new ValueSelector(selectorLayer, this.getData(), this, selectorDescriptionLayer, selectorDetectionLayer);
		this._mainChart.limitsUpdated = (min, max) => {
			this._yAxis.updateLimits(min, max);
		};
	}
    
	_previewControlInit() {
		const {previewContainer, chartLayer, controlLayer} = createPreviewChartLayers(this.getHTMLElement());	
		this._previewChart = new PreviewChart(previewContainer, chartLayer, controlLayer, this.getData(), this);
		this._previewChart.onControlChange = () => {
			this.xAxis.updateControlPosition();
			this._mainChart.frameChanged();
		};
		this._previewChart.onControlChange();
	}

	_togglersControlsInit() {
		const data = this.getData();
		this._togglersContainer = createToogglersContainer(this.getHTMLElement());
		this._togglersList = Object.keys(data.names).map(lineKey => {
			const togglerData = {
				key: lineKey,
				name: data.names[lineKey],
				color: data.colors[lineKey]
			};
			const { htmlContainer, canvasLayer, effectCanvasLayer } = createToogglerElement(this._togglersContainer, togglerData.name);
			return new ChartToggler(htmlContainer, canvasLayer, togglerData, effectCanvasLayer, this);
		});
	}

	getTogglersList() {
		return this._togglersList;
	}

	chartToggled(key, state) {
		this._previewChart.toggleLine(key, state);
		this._mainChart.toggleLine(key, state);
	}

	getControlPostion() {
		return this._previewChart.controlPosition;
	}

}