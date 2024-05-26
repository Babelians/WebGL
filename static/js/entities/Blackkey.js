class Blackkey extends Pianokey{
    constructor(engine, noteNo){
        super(engine, noteNo);
        this.setSize(Blackkey.getWidth(), Blackkey.getHeight());

        this.setDiffuse(new Vec4(0,0,0,1));
    }

    getInitialColor(){
        return new Vec4(0,0,0,1);
    }

    static getWidth(){
        return 0.014;
    }

    static getHeight(){
        return 0.095;
    }

    static getCrevice(){
        return 0.001;
    }
}