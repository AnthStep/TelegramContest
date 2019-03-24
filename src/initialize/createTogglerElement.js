import AppWrapper from '../singletons/AppWrapper';

export default function (togglersContainer, text) {
	const htmlContainer = document.createElement('div');
	htmlContainer
		.style
		.cssText = `
		padding: 10px;
		user-select: none; 
		-webkit-user-select: none; 
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		-webkit-tap-highlight-color: transparent;
		height: 45px;
		padding: 10px 15px 10px 50px; 
		border-radius: 22.5px; 
		position: relative; 
		display: inline-flex; 
		align-items: center;
		box-sizing: border-box; 
		margin-right: 15px;
		color: ${AppWrapper.colors.lineToggler.textColor}; 
		font-family: sans-serif; 
		overflow: hidden; 
		font-weight: 400;
		-webkit-box-shadow: inset 0px 0px 0px 1px ${AppWrapper.colors.lineToggler.borderColor};`;
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