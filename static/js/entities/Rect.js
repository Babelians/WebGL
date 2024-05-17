class Rect extends Entity{
    constructor(engine){
        super(engine);

        this.rc = new RectComponent(this);
        this.rc.setSize(10, 10);
        this.rc.setColor(new Vec4(1,1,1,1));
    }

    setColor(colorVec){
        this.rc.setColor(colorVec);
    }

    setSize(width, height){
        this.rc.setSize(width, height);
    }

    setHeight(height){
        this.rc.height = height;
    }

    setWidth(width){
        this.rc.width = width;
    }
}