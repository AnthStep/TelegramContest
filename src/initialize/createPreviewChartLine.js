export default function (previewChartsContainer) {
	const lineLayer = document.createElement('canvas');
	lineLayer.style.cssText = 'width: 100%; height: 100%; position: absolute; top: 0; left: 0';
	previewChartsContainer.append(lineLayer);
	return lineLayer;
}