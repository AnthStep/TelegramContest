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
	mainChartLayersContainer.append(yAxisLayer);
	mainChartLayersContainer.append(linesContainer);
	mainChartLayersContainer.append(xAxisLayer);
	return {xAxisLayer, yAxisLayer, linesContainer};
}