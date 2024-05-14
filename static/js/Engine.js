class Engine
{
    constructor(canvas){
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2");

        this.camara = new Camera(this);

        this.program = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.vertexBuffer = null;
        this.indexBuffer = null;
        this.normBuffer = null;
        this.VAO = null;
        this.indices = null;
        this.modelViewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();
        this.normalMatrix = mat4.create();
        this.entities = [];

        this.clearColor = [0.9, 0.9, 0.9];
        this.lightColor = [1, 1, 1, 1];
        this.lightAmbient = [0.03, 0.03, 0.03, 1];
        this.lightSpecular = [1, 1, 1, 1];
        this.lightDirection = [-0.25, -0.25, -0.25];

        this.prevTime = 0;

        this.hoge = 0;
    }

    initialize(){
        let gl = this.gl;
        this.vertexShader = this.createShader("vs");
        this.fragmentShader = this.createShader("fs");
        this.createProgram(this.vertexShader, this.fragmentShader);

        this.loadModels();
    
        this.initBuffer();

        this.initLights();
    }

    run(){
        this.prevTime = Date.now();
        this.render();
    }

    render(){
        requestAnimationFrame(this.render.bind(this));
        this.draw();
    }

    addEntity(entity){
        this.entities.push(entity);
    }

    loadModels(){
        
    }

    createSingleBuffer(entity){
        let gl = this.gl;

        entity.vao = gl.createVertexArray();
        gl.bindVertexArray(entity.vao);

        // 頂点
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(entity.vertices), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.program.aVertexPosition);
        gl.vertexAttribPointer(this.program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);

        // 法線
        let norms = util.calcNormls(entity.vertices, entity.indices);
        this.normBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norms), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.program.aVertexNormal);
        gl.vertexAttribPointer(this.program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);

        // インデックス
        let ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(entity.indices), gl.STATIC_DRAW);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(entity.color), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(this.program.aVertexColor);
        gl.vertexAttribPointer(this.program.aVertexColor, 4, gl.FLOAT, false, 0, 0);

        //無効化
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    initBuffer(){
        let gl = this.gl;

        // TODO ModelComponentを持つEntityはすでにバインド済みだが、全部バインドさせている。
        for(let entity of this.entities){
            this.createSingleBuffer(entity);
        }
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

    initLights(){
        let gl = this.gl;

        gl.uniform4fv(this.program.uLightDiffuse, this.lightColor);
        gl.uniform4fv(this.program.uLightAmbient, this.lightAmbient);
        gl.uniform4fv(this.program.uLightSpecular, this.lightSpecular);
        gl.uniform3fv(this.program.uLightDirection, this.lightDirection);
        /*
        gl.uniform4fv(this.program.uMaterialDiffuse, this.materialDiffuse);
        gl.uniform4fv(this.program.uMaterialAmbient, this.materialAmbient);
        gl.uniform4fv(this.program.uMaterialSpecular, this.materialSpecular);
        gl.uniform1f(this.program.uShininess, this.shininess);*/
    }
    
    createProgram(vertexShader, fragmentShader){
        let gl = this.gl;

        gl.clearColor(0, 0, 0, 1);
        gl.clearDepth(100);
        gl.enable(gl.DEPTH_TEST);

        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if(!gl.getProgramParameter(this.program, gl.LINK_STATUS)){
            console.error('could not initialize shaders');
        }

        gl.useProgram(this.program);

        this.program.aVertexPosition   = gl.getAttribLocation(this.program, 'aVertexPosition');
        this.program.aVertexNormal     = gl.getAttribLocation(this.program, 'aVertexNormal');
        this.program.aVertexColor      = gl.getAttribLocation(this.program, 'aVertexColor');
        this.program.uProjectionMatrix = gl.getUniformLocation(this.program, 'uProjectionMatrix');
        this.program.uModelViewMatrix  = gl.getUniformLocation(this.program, 'uModelViewMatrix');
        this.program.uNormalMatrix     = gl.getUniformLocation(this.program, 'uNormalMatrix');
        this.program.uLightDirection   = gl.getUniformLocation(this.program, 'uLightDirection');
        this.program.uLightAmbient     = gl.getUniformLocation(this.program, 'uLightAmbient');
        this.program.uLightDiffuse     = gl.getUniformLocation(this.program, 'uLightDiffuse');
        this.program.uLightSpecular    = gl.getUniformLocation(this.program, 'uLightSpecular');
        this.program.uMaterialAmbient  = gl.getUniformLocation(this.program, 'uMaterialAmbient');
        this.program.uMaterialDiffuse  = gl.getUniformLocation(this.program, 'uMaterialDiffuse');
        this.program.uMaterialSpecular = gl.getUniformLocation(this.program, 'uMaterialSpecular');
        this.program.uShininess        = gl.getUniformLocation(this.program, 'uShininess');
    }
    
    createShader(id){
        let gl = this.gl;
        let shader = null;
        let scriptElement = document.getElementById(id);
        scriptElement.text = scriptElement.text.trim();
        switch(scriptElement.type){
            case "x-shader/x-vertex":
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;
            case "x-shader/x-fragment":
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
            default:
                return;
        }
        gl.shaderSource(shader, scriptElement.text);
        gl.compileShader(shader);
        if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else console.log(gl.getShaderInfoLog(shader));
    }
    
}