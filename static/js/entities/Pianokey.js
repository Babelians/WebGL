class Pianokey extends Rect{
    constructor(engine, noteNo, updateOrder = 100){
        super(engine, updateOrder);
        this.noteNo = noteNo;
    }
}