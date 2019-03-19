export default function (graphContainer) {
	const previewContainer = document.createElement('div');
	const chartLayer = document.createElement('div');
	const controlLayer = document.createElement('canvas');

	graphContainer.append(previewContainer);
	previewContainer.append(chartLayer, controlLayer);

	previewContainer.style.cssText = 'width: 100%; height: 40px; position: relative';
	chartLayer.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 1';
	controlLayer.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 2';
	return {previewContainer, chartLayer, controlLayer};
}