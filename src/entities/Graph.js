import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';
import PreviewChart from './PreviewChart';
import createPreviewChartLayers from '../initialize/createPreviewChartLayers';

export default class Graph extends HTMLElementEntity {
    
	constructor (container, data) {
		super(container, data);
	}

	_onInit() {
		const {previewContainer, chartLayer, controlLayer} = createPreviewChartLayers(this.getHTMLElement());	
		this._previewChart = new PreviewChart(previewContainer, chartLayer, controlLayer, this.getData(), this);
	}

}