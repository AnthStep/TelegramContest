import Graph from '../entities/Graph';
import createGraphContainer from '../initialize/createGraphContainer';

class AppWrapper {

	constructor() {
		this._element = null;
		this._data = null;
		this._graphList = null;
	}

	setElement(node) {
		this._element = node;
	}

	getAppContainer() {
		return this._element;
	}

	drawData(data) {
		this._data = data;
		this._graphList = data.map((graphData,index) => 
			new Graph(createGraphContainer(this.getAppContainer(), index), graphData)
		);
	}

	getData() {
		return this._data;
	}
}

export default new AppWrapper();