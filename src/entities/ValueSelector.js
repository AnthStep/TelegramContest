/* eslint-disable indent */
import HTMLElementEntity from '../sharedClasses/HTMLElementEntity';

export default class ValueSelector extends HTMLElementEntity {
	constructor(layer, data, mainGraph, descriptionLayer, detectionLayer) {
		super(layer, data);
		this._mainGraph = mainGraph;
		this._descriptionLayer = descriptionLayer;
		this._detectionLayer = detectionLayer;
		layer.height = layer.offsetHeight;
		layer.width = layer.offsetWidth;
		this._detectionLayer.addEventListener('mousemove', this._onMouseMove.bind(this));
		this._detectionLayer.addEventListener('mouseout', this._onMouseOut.bind(this));
	}

	_onMouseMove({offsetX}) {
		const labels = this._getLabelsFromOffset(offsetX);
		this._redrawCursor(labels);
	}	

	_onMouseOut() {
		const ctx = this.getHTMLElement().getContext('2d');
		const {height, width} = this.getHTMLElement();
		ctx.clearRect(0,0, width, height);
		this._descriptionLayer.innerHTML = '';
	}

	_redrawCursor(xAxisLabel) {
		const ctx = this.getHTMLElement().getContext('2d');
		const data = this.getData();
		const {height, width} = this.getHTMLElement();
		const xPosition = xAxisLabel.layerPosition * width;
		const yAxisLabels = this._mainGraph._mainChart.getActiveLineValuesByIndex(xAxisLabel.idx);
		ctx.clearRect(0,0, width, height);
		ctx.strokeStyle = '#e0e6ea';
		ctx.beginPath();
		ctx.moveTo(xPosition, 0);
		ctx.lineTo(xPosition, height);
		ctx.stroke();
		yAxisLabels.forEach((yLabel) => {
			const yPosition = height * (1 - yLabel.layerPosition);
			const color = data.colors[yLabel.key];
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(xPosition, yPosition, 5, 0, 2 * Math.PI);
			ctx.fill();
			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.arc(xPosition, yPosition, 3, 0, 2 * Math.PI);
			ctx.fill();
		});
		this._descriptionLayer.innerHTML = '';
		const descriptionBlock = document.createElement('div');
		descriptionBlock.style.cssText = `
			position: absolute; 
			background: ${'white'}; 
			padding: 3px 12px;
			border: 1px solid ${'#eeeeee'};
			box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.15);
			top: 10px;
			white-space: nowrap;
			border-radius: 3px`;
		descriptionBlock.innerHTML = `
			<div style="font:14px Arial; font-weight: 500; margin-bottom: 6px">${xAxisLabel.text}</div>
			<div style="display: flex">
				${yAxisLabels.map(yLabel => {
					return `
						<div style="color: ${data.colors[yLabel.key]}; margin-right: 14px;">
							<div style="font: 16px Arial; font-weight: 700;">${this._mainGraph._yAxis._getValue(yLabel.value)}</div>
							<div style="font: 12px Arial; font-weight: 200;">${data.names[yLabel.key]}</div>
						</div>`;
				}).join('')}
			</div>`;
		this._descriptionLayer.append(descriptionBlock);
		const blockWidth = descriptionBlock.offsetWidth;
		let leftPosition = this._descriptionLayer.offsetWidth * xAxisLabel.layerPosition - blockWidth/2;
		leftPosition = Math.max(Math.min(leftPosition, this._descriptionLayer.offsetWidth - blockWidth), 0);
		descriptionBlock.style.left = leftPosition + 'px';
	}

	_getLabelsFromOffset(x) {
		const {start, end} = this._mainGraph.getControlPostion();
		const layerWidth = this.getHTMLElement().offsetWidth;
		const frameWidth = end - start;
		const graphPosition = ((x/layerWidth) * frameWidth) + start;
		return this._mainGraph.xAxis.getLabel(graphPosition);
	}
}