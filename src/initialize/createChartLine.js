export default function (chartsContainer) {
	const lineLayer = document.createElement('canvas');
	lineLayer.style.cssText = 'width: 100%; height: 100%; position: absolute; top: 0; left: 0';
	chartsContainer.append(lineLayer);
	return lineLayer;
}