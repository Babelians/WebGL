class Rect extends Entity{
    constructor(engine){
        super(engine);

        let rc = new RectComponent(this);
        rc.setSize(10, 100);
        rc.setColor(new Vec4(1,1,1,1));
    }
}