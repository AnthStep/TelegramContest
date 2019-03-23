export default function (graphContainer) {
	const mainChartLayersContainer = document.createElement('div');
	mainChartLayersContainer.style.cssText = 'width: 100%; height: 360px; position: relative';
	graphContainer.append(mainChartLayersContainer);

	const xAxisLayer = document.createElement('canvas');
	xAxisLayer.style.cssText = 'width: 100%; height: 10%';
	const yAxisLayer = document.createElement('canvas');
	yAxisLayer.style.cssText = 'width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 1';
	const linesContainer = document.createElement('div');
	linesContainer.style.cssText = 'width: 100%; height: 90%; position: relative; z-index: 2';
	const selectorLayer = document.createElement('canvas');
	selectorLayer.style.cssText = 'width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 3';
	const selectorDescriptionLayer = document.createElement('div');
	selectorDescriptionLayer.style.cssText = 'width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 4';
	const selectorDetectionLayer = document.createElement('div');
	selectorDetectionLayer.style.cssText = 'width: 100%; height: 90%; top: 0; left: 0; position: absolute; z-index: 5';
	mainChartLayersContainer.append(yAxisLayer);
	mainChartLayersContainer.append(linesContainer);
	mainChartLayersContainer.append(xAxisLayer);
	mainChartLayersContainer.append(selectorLayer);
	mainChartLayersContainer.append(selectorDescriptionLayer);
	mainChartLayersContainer.append(selectorDetectionLayer);
	return {xAxisLayer, yAxisLayer, linesContainer, selectorLayer, selectorDescriptionLayer, selectorDetectionLayer};
}