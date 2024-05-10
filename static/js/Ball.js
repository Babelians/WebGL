class Ball extends Entity{
    constructor(engine){
        super(engine);


        let mc = new ModelComponent(this);
        mc.loadModel("../../static/models/ball.json");
    }
}