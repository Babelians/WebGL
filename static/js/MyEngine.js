class MyEngine extends Engine{
    constructor(canvas){
        super(canvas);

        this.camara.moveVector = new Vec3(0,10000,0);
        this.camara.position = new Vec3(50,700 ,10000);
    }

    loadModels(){
        /*
        for(let i = 0; i < 1000; ++i){
            let ball = new Ball(this);
            ball.position = new Vec3(100 * (Math.random() - Math.random()),
                                     200 * Math.random(), 
                                    -50 - 80 * (Math.random() - Math.random())
            );
        }*/

        let mr = new MidiReader(this);
        mr.readMidi("../../static/media/midi/test.mid");
    }

    draw(){
        let gl = this.gl;

        const deltaTime = (Date.now() - this.prevTime) / 1000;


        const { width, height } = gl.canvas;

        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.identity(this.modelViewMatrix);
        this.camara.update(deltaTime);
  
        // We will start using the `try/catch` to capture any errors from our `draw` calls
        try {
            for(let entity of this.entities){
                entity.update(deltaTime);

                //if(!entity.modelLoading && entity.className === "Note")console.log(entity);

                let copyModelViewMat = mat4.create();
                mat4.copy(copyModelViewMat, this.modelViewMatrix);
                mat4.translate(copyModelViewMat,
                               copyModelViewMat,
                               [entity.position.x, entity.position.y, entity.position.z]
                );

                mat4.copy(this.normalMatrix, copyModelViewMat);
                mat4.invert(this.normalMatrix, this.normalMatrix);
                mat4.transpose(this.normalMatrix, this.normalMatrix);

                // set light
                gl.uniform4fv(this.program.uMaterialDiffuse, entity.materialDiffuse);
                gl.uniform4fv(this.program.uMaterialAmbient, entity.materialAmbient);
                gl.uniform4fv(this.program.uMaterialSpecular, entity.materialSpecular);
                gl.uniform1f(this.program.uShininess, entity.shininess);

                gl.uniformMatrix4fv(this.program.uModelViewMatrix, false, copyModelViewMat);
                gl.uniformMatrix4fv(this.program.uNormalMatrix, false, this.normalMatrix);
                // Bind
                gl.bindVertexArray(entity.vao);
                // Draw
                gl.drawElements(gl.TRIANGLES, entity.indices.length, gl.UNSIGNED_SHORT, 0);
        
                // Clean
                gl.bindVertexArray(null);
            }
        }
        // We catch the `error` and simply output to the screen for testing/debugging purposes
        catch (error) {
          console.error(error);
        }

        this.prevTime = Date.now();
    }
}