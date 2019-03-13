export default class {
    
    constructor (linkedCanvas, data) {
        this._linkedCanvas = linkedCanvas;
        this._data = data;
        this._onInit();
    }

    _onInit() {

    }

    getLinkedCanvas() {
        return this._linkedCanvas;
    }

}