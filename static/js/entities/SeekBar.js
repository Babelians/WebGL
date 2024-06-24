import Rect from "./Rect.js";
import Piano from "./Piano.js";
import { Vec3, Vec4 } from "../math.js";

export default class SeekBar extends Rect{
    constructor(engine, conductor){
        super(engine, 98);
        this.conductor = conductor;
        this.setPosition(Vec3.add( Piano.getPosition(), new Vec3(0, 0.64, 0)));
        this.setSize(0.0001, 0.02);
        this.setDiffuse(new Vec4(0,1,0,1));
    }

    update(deltaTime){
        super.update(deltaTime);
        let addVec = Vec3.scalerMul(deltaTime, new Vec3(0.1, 0, 0));
        this.addSize(addVec);
        this.setPosition(
            Vec3.add(
                Vec3.scalerMul(0.5, addVec),
                this.position
            )
        );
    }
}