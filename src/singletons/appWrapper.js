import Graph from '../entities/Graph';
import createGraphContainer from '../initialize/createGraphContainer';
import createStyleSwitcher from '../initialize/createStyleSwitcher';
import day from '../colors/day';
import night from '../colors/night';

class AppWrapper {

	constructor() {
		this._element = null;
		this._data = null;
		this._graphList = null;
		this.QUALITY_MODIFIER = 2;
		this.PREVIEW_PADDING_MODIFIER = 0.1;
		this.MAIN_PADDING_MODIFIER = 0.1;
		this.TICKS_COUNT = 5;
		this.colors = day;
	}

	setElement(node) {
		this._element = node;
	}

	drawData(data) {
		this._data = data;
		this._graphList = data.map((graphData,index) => 
			new Graph(createGraphContainer(this._element, index), graphData)
		);
		this._styleSwitcherContainer = createStyleSwitcher(this._element);
		this._styleSwitcherContainer.addEventListener('mousedown', this._switchColors.bind(this));
		this._updateStyleSwitcher();
	}

	_switchColors() {
		this.colors = this.colors === day ? night : day;
		this._updateStyleSwitcher();
		this._graphList.forEach(graph => graph.redrawColors());
	}

	getData() {
		return this._data;
	}

	_updateStyleSwitcher() {
		const text = this.colors === day ? 'Switch to Night Mode' : 'Switch to Day Mode';
		this._styleSwitcherContainer.innerHTML = text;
		this._styleSwitcherContainer.style.backgroundColor = this.colors.appWrapper.backgroundColor;
		this._styleSwitcherContainer.style.color = this.colors.colorSwitcher.textColor;
		this._element.style.backgroundColor = this.colors.appWrapper.backgroundColor;
	}
}

export default new AppWrapper();