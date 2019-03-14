export default function (graphContainer) {
	const chartPreviewContainer = document.createElement('div');
	const chartLayer = document.createElement('canvas');
	const controlLayer = document.createElement('canvas');

	graphContainer.append(chartPreviewContainer);
	chartPreviewContainer.append(chartLayer, controlLayer);

	chartPreviewContainer.style.cssText = 'width: 100%; height: 10%; position: relative';
	chartLayer.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1';
	controlLayer.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 2';
	return {chartLayer, controlLayer};
}