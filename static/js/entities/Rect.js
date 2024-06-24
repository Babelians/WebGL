import Entity from "./Entity.js";
import RectComponent from "../components/RectComponent.js";
import { Vec3, Vec4 } from "../math.js";

export default class Rect extends Entity{
    constructor(engine, updateOrder = 100){
        super(engine, updateOrder);

        this.rc = new RectComponent(this);
        this.rc.setSize(10, 10);
        this.rc.setColor(new Vec4(0,0,0,1));
    }

    addSize(addVec){
        let width = this.getWidth();
        let height = this.getHeight();

        this.scale = new Vec3(
            (width*this.scale.x +addVec.x)/width,
            (height*this.scale.y+addVec.y)/height,
            1
        );
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

    updateVertices(){
        this.rc.updateVertices();
    }

    setWidth(width){
        this.rc.width = width;
    }

    getHeight(){
        return this.rc.height;
    }

    getWidth(){
        return this.rc.width;
    }
}