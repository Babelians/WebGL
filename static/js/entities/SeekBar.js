import Rect from "./Rect.js";
import Whitekey from "./Whitekey.js";
import Piano from "./Piano.js";
import { Vec3, Vec4 } from "../math.js";

export default class SeekBar extends Rect{
    constructor(engine, conductor, posVec, updateOrder=99){
        super(engine, updateOrder);
        this.conductor = conductor;
        this.setPosition(posVec);
        this.setSize(1, 0.04);
        this.setDiffuse(new Vec4(0, 1, 0, 0.5));
    }

    culcScale(){
        let newX = 0;
        if(this.conductor.sumPlaySecond != 0 && this.getWidth() != 0){
            newX = (Piano.getWidth() * this.conductor.sumDeltaTime / this.conductor.sumPlaySecond) / this.getWidth();
        }

        return new Vec3(newX, 1, 1);
    }

    culcPosition(){
        let width = this.scale.x * this.getWidth();
        return new Vec3(width/2-Whitekey.getWidth() / 2, this.position.y, this.position.z);
    }

    update(deltaTime){
        super.update(deltaTime);
        this.scale = this.culcScale();
        if(Piano.getWidth() < this.scale.x * this.getWidth()){
            this.scale.x = Piano.getWidth() / this.getWidth();
        }

        this.setPosition(this.culcPosition());
    }
}