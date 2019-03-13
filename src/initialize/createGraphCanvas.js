export default function (appContainer) {
    const graphCanvas = document.createElement('canvas');
    appContainer.append(graphCanvas);
    return graphCanvas;
}