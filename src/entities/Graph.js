import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import PreviewChart from './PreviewChart';
import createPreviewChartLayers from '../initialize/createPreviewChartLayers';
import createToogglersContainer from '../initialize/createTogglersContainer';
import createToogglerElement from '../initialize/createTogglerElement';
import ChartToggler from './ChartToggler';

export default class Graph extends HTMLElementEntity {
    
	constructor (container, data) {
		super(container, data);
	}

	_onInit() {
		this._previewControlInit();
		this._togglersControlsInit();
	}
    
	_previewControlInit() {
		const {previewContainer, chartLayer, controlLayer} = createPreviewChartLayers(this.getHTMLElement());	
		this._previewChart = new PreviewChart(previewContainer, chartLayer, controlLayer, this.getData(), this);
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
			return new ChartToggler(htmlContainer, canvasLayer, togglerData, effectCanvasLayer);
		});
	}

}