class Note extends Rect{
    constructor(engine, track){
        super(engine,97);

        this.track = track;
        this.className = "Note";
        this.onTime = 0;
        this.offTime = 0;
        this.noteNo = 0;
        this.velocity = 0;

        this.modelLoading = true;

        this.scaringRate = 1/4000;

        this.signalSrc = null;
    }

    form(){
        this.signalSrc = new SignalSrcComponent(this, this.noteNo, this.onTime, this.offTime);
        let timeSub = this.offTime - this.onTime;
        let height = timeSub * this.scaringRate;

        let width = 0;
        if(Piano.isWhitekey(this.noteNo)){
            width = Whitekey.getWidth();
        }else{
            width = Blackkey.getWidth();
        }

        let x = Piano.culcKeyPositionX(this.noteNo);
        this.setSize(width, height);
        this.position = new Vec3(x, this.onTime * this.scaringRate + height / 2, 0);

        this.attachCrevice(); // ノート間の隙間を適用

        this.engine.createSingleBuffer(this);
    }

    attachCrevice(){ // サイズとポジションを設定した後に実行可能
        let height = this.getHeight() - Note.getCrevice();
        if(Note.getCrevice() < height){
            let width = this.getWidth();
            this.setSize(width, height);
            this.position.y -= Note.getCrevice() / 2;
        }
    }

    static getCrevice(){
        return 0.002;
    }

    culcMoveVector(){
        return new Vec3(
            0,
            -this.scaringRate *
            this.track.conductor.calcTimeBasePerSecond(),
            0
        );
    }

    update(deltaTime){
        this.updateComponents(deltaTime);
        this.moveVector = this.culcMoveVector();
        this.position = Vec3.add(this.position, Vec3.scalerMul(deltaTime, this.moveVector));
    }
}