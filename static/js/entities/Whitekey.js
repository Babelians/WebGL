class Whitekey extends Pianokey{
    constructor(engine, noteNo){
        super(engine, noteNo, 99);
        this.setSize(Whitekey.getWidth(), Whitekey.getHeight());
        this.crevice = Whitekey.getCrevice();
        this.setDiffuse(new Vec4(1,1,1,1));
    }

    getInitialColor(){
        return new Vec4(1,1,1,1);
    }

    static getPostionY(){
        return - this.getHeight() / 2;
    }

    static getWidth(){
        return 0.0225;
    }

    static getHeight(){
        return 0.150;
    }

    static getCrevice(){
        return 0.001;
    }
}