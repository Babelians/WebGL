class Pianokey extends Rect{
    constructor(engine, noteNo, updateOrder = 100){
        super(engine, updateOrder);
        this.noteNo = noteNo;
        this.signalDst = new SignalDstComponent(this, noteNo);
    }
}