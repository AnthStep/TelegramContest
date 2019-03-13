import Graph from '../entities/Graph';
import createGraphCanvas from '../initialize/createGraphCanvas';

class AppWrapper {

    constructor() {
        this._element = null;
        this._data = null;
        this._graphList = null;
    }

    setElement(node) {
        this._element = node;
    }

    getElement() {
        return this._element 
    }

    drawData(data) {
        this._data = data;
        this._graphList = data.map((graphData) => 
            new Graph(createGraphCanvas(this.getElement()), graphData)
        );
    }

    getData() {
        return this._data;
    }
}

export default new AppWrapper();