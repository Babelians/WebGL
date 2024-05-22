class PianoBackRect extends Rect{
    constructor(engine){
        super(engine, 98);

        let width = (Whitekey.getWidth() + Whitekey.getCrevice())* 52 - Whitekey.getCrevice();
        let height = Whitekey.getHeight();

        this.setSize(width, height);

        this.setPosition( new Vec3(width/2 - Whitekey.getWidth()/2, Whitekey.getPostionY(), 0) );

        this.setColor(new Vec4(0,0,0,1));
    }
}