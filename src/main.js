import onDocumentReady from "./initialize/onDocumentReady";
import createAppWrapper from "./initialize/createAppWrapper";
import appWrapper from "./singletons/appWrapper";
import loadData from "./dataHandling/loadData";
import Data from './chart_data.txt';

onDocumentReady(() => {
    const appWrapperElement = createAppWrapper();
    appWrapper.setElement(appWrapperElement);
    loadData('./chart_data.txt', (res) => {
        appWrapper.drawData(res);
    })
});