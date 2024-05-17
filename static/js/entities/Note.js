class Note extends Rect{
    constructor(engine){
        super(engine);

        this.className = "Note";
        this.onTime = 0;
        this.offTime = 0;
        this.noteNo = 0;
        this.velocity = 0;

        this.modelLoading = true;
    }

    form(){
        let timeSub = this.offTime - this.onTime;
        let height = timeSub / 100;
        let width = 10;
        this.setSize(width, height);
        this.position = new Vec3(this.noteNo*width,this.onTime, 0);

        this.engine.createSingleBuffer(this);
    }
}