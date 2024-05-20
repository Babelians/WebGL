class Blackkey extends Pianokey{
    constructor(engine, noteNo){
        super(engine, noteNo);
        this.setSize(Blackkey.getWidth(), Blackkey.getHeight());

        this.setColor(new Vec4(0,1,0,1));
    }

    static getWidth(){
        return 0.009;
    }

    static getHeight(){
        return 0.095;
    }

    static getCrevice(){
        return 0.001;
    }
}