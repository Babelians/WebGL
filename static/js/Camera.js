class Camera{
    constructor(engine){
        this.engine = engine;
        this.position = new Vec3(0,0,0);
        this.moveVector = new Vec3(0,0,0);
        this.viewAngle = 45 * (Math.PI / 180);
    }

    updateProjectionMatrix(){
        let gl = this.engine.gl;
        const {width, height} = gl.canvas;
        mat4.perspective(this.engine.projectionMatrix, this.viewAngle, width / height, 0.0001, 10000);
        gl.uniformMatrix4fv(this.engine.program.uProjectionMatrix, false, this.engine.projectionMatrix);
    }

    update(deltaTime){
        this.updateProjectionMatrix();
        this.position = Vec3.add(this.position,
                                 Vec3.scalerMul(deltaTime, this.moveVector)
        );

        mat4.translate(this.engine.modelViewMatrix,
                       this.engine.modelViewMatrix,
                       [-this.position.x, -this.position.y, -this.position.z]
        ); 
    }
}