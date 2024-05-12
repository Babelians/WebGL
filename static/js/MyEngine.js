class MyEngine extends Engine{
    constructor(canvas){
        super(canvas);
    }

    loadModels(){
        for(let i = 0; i < 1000; ++i){
            let ball = new Ball(this);
            ball.position = new Vec3(100 * (Math.random() - Math.random()),
                                     200 * Math.random(), 
                                    -50 - 80 * (Math.random() - Math.random())
            );
        }
    }
}