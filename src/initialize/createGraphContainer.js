export default function (appContainer, index) {
	const graphContainer = document.createElement('div');
	graphContainer.id = `graph-container-${index}`;
	graphContainer.style.cssText = 'width: 450px;position: relative; max-width: 100%; padding: 10px; margin: 10px auto; box-sizing: border-box';
	appContainer.append(graphContainer);
	return graphContainer;
}