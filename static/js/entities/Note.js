class Note extends Rect{
    constructor(engine, track){
        super(engine);

        this.track = track;
        this.className = "Note";
        this.onTime = 0;
        this.offTime = 0;
        this.noteNo = 0;
        this.velocity = 0;

        this.modelLoading = true;

        this.scaringRate = 1/4000;
    }

    form(){
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

        this.engine.createSingleBuffer(this);
    }

    culcMoveVector(){
        return new Vec3(
            0,
            -this.scaringRate *
            this.track.conductor.headerChunk.timeBase /
            (this.track.conductor.quaterTimes[0]/1000000),
            0
        );
    }

    update(deltaTime){
        this.updateComponents(deltaTime);
        this.moveVector = this.culcMoveVector();
        this.position = Vec3.add(this.position, Vec3.scalerMul(deltaTime, this.moveVector));
    }
}