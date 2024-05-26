class MidiLibrary extends Engine{
    constructor(canvas){
        super(canvas);

        this.camara.moveVector = new Vec3(0,0,0);
        this.camara.position = new Vec3(0.599, 0.232 ,0.926);

        this.conductor = new Conductor();

        this.processSignal = new ProcessSignal(this);


        this.clearColor = [0.9, 0.9, 0.9];
        this.lightColor = [1, 1, 1, 1];
        this.lightAmbient = [0.15, 0.15, 0.15, 15];
        this.lightSpecular = [1, 1, 1, 1];
        this.lightDirection = [-0.25, -0.25, -0.25];
    }

    getProcessSignal(){
        return this.processSignal;
    }

    loadModels(){
        let piano = new Piano(this);

        let mr = new MidiReader(this);
        mr.readMidi("../../static/media/midi/test2.mid");
    }

    run(){
        let gl = this.gl;
        const { width, height } = gl.canvas;
        gl.viewport(0, 0, width, height);
        mat4.identity(this.modelViewMatrix);
        this.camara.update(0);
        this.prevTime = Date.now();
        this.render();
    }

    render(){
        requestAnimationFrame(this.render.bind(this));
        this.draw();
    }

    draw(){
        let gl = this.gl;

        const deltaTime = (Date.now() - this.prevTime) / 1000;
        this.prevTime = Date.now();

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        this.processSignal.update(deltaTime);

        try {
            for(let entity of this.entities){
                entity.update(deltaTime);

                if(!entity.visible){
                    continue;
                }

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
    }
}