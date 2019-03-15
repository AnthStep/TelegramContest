export default function (togglersContainer, text) {
	const htmlContainer = document.createElement('div');
	htmlContainer
		.style
		.cssText = 'height: 35px; line-height: 35px; padding: 0 15px 0 35px; border: 1px solid #e8ecf0; border-radius: 17.5px; position: relative; display: inline-block; box-sizing: border-box; margin-right: 15px;color: #44484a; font-family: sans-serif; overflow: hidden';
	htmlContainer.innerText = text;
	const canvasLayer = document.createElement('canvas');
	const effectCanvasLayer = document.createElement('canvas');
	canvasLayer.style.cssText = 'height: 100%; width: 100%; top: 0; left: 0; position: absolute';
	effectCanvasLayer.style.cssText = 'height: 100%; width: 100%; top: 0; left: 0; position: absolute';
	togglersContainer.append(htmlContainer);
	htmlContainer.append(effectCanvasLayer);
	htmlContainer.append(canvasLayer);
	return {htmlContainer, canvasLayer, effectCanvasLayer};
}