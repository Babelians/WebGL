class Camera{
    constructor(engine){
        this.engine = engine;
        this.position = new Vec3(0,0,0);
        this.moveVector = new Vec3(0,0,0);
    }

    update(deltaTime){
        this.position = Vec3.add(this.position, 
                                 Vec3.scalerMul(deltaTime, this.moveVector)
        );

        mat4.translate(this.engine.modelViewMatrix,
                       this.engine.modelViewMatrix,
                       [-this.position.x, -this.position.y, this.position.z]
        ); 
    }
}