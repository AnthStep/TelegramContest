export default function (appContainer, index) {
	const graphContainer = document.createElement('div');
	graphContainer.id = `graph-container-${index}`;
	graphContainer.style.cssText = 'width: 375px;position: relative';
	appContainer.append(graphContainer);
	return graphContainer;
}