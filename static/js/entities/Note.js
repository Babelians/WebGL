class Note extends Rect{
    constructor(engine, width, height, posVec, moveVec){
        super(engine);

        this.setSize(width, height);
        this.position = posVec;
        this.moveVector = moveVec;
    }
}