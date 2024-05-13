class Ball extends Entity{
    constructor(engine){
        super(engine);


        let mc = new ModelComponent(this);
        mc.loadModel("../../static/models/ball.json");

        let gc = new GravityComponent(this);

        // 色をランダムに決める
        this.materialDiffuse = [
            Math.random(),
            Math.random(),
            Math.random(),
            1
        ];
    }

    
    update(deltaTime){
        super.update(deltaTime);
        // バウンド
        if(this.position.y < 0){
            this.moveVector.y *= -1;
            this.position.y = 0;
        }
    }
}