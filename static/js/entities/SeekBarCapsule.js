import Rect from "./Rect.js";
import SeekBar from "./SeekBar.js";
import { Vec3, Vec4 } from "../math.js";
import Piano from "./Piano.js";
import Whitekey from "./Whitekey.js";

export default class SeekBarCapsule extends Rect{
    constructor(engine, conductor, updateOrder=98){
        super(engine, updateOrder);
        this.height =0.04;
        this.position.y = 0.669;
        this.setPosition(
            Vec3.add( Piano.getPosition(), new Vec3(0, this.position.y, 0))
        );
        this.setSize(Piano.getWidth(), this.height);
        this.setDiffuse(new Vec4(0.9, 0.9, 0.9, 0.5));

        this.seekBar = new SeekBar(engine, conductor, this.position, updateOrder+1);
        this.seekBar.setHeight(this.height);
    }

    update(deltaTime){

    }
}