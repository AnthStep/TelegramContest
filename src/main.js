import onDocumentReady from './initialize/onDocumentReady';
import createAppWrapper from './initialize/createAppWrapper';
import AppWrapper from './singletons/AppWrapper';
import loadData from './dataHandling/loadData';
// eslint-disable-next-line no-unused-vars
import Data from './chart_data.txt'; 

onDocumentReady(() => {
	const appWrapperElement = createAppWrapper();
	AppWrapper.setElement(appWrapperElement);
	loadData('./chart_data.txt', (res) => {
		AppWrapper.drawData(res);
	});
});