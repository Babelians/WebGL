class Whitekey extends Pianokey{
    constructor(engine, noteNo){
        super(engine, noteNo, 99);
        this.setSize(Whitekey.getWidth(), Whitekey.getHeight());
        this.crevice = Whitekey.getCrevice();
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