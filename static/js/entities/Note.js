class Note extends Rect{
    constructor(engine){
        super(engine);

        this.onTime = 0;
        this.offTime = 0;
        this.noteNo = 0;
        this.velocity = 0;
    }
}