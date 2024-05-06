class Entity{
    constructor(engine){
        engine.addEntity(this);

        this.engine = engine;
        this.components = [];
        this.position = new Vec3(0,0,0);
        this.vertices = [];
        this.indices = [];
        this.color = [];
        this.vao = null;
        this.ibo = null;
    }

    addComponent(component){
        this.components.push(component);
    }

    setPosition(posVec){
        this.position = posVec;

        for(let component of this.components){
            component.update();
        }
    }

    getPosition(){return this.position;}

    getEngine(){return this.engine;}

    setVertices(vertices){this.vertices = vertices;}

    getVertices(){return this.vertices;}

    setIndices(indices){this.indices = indices;}

    getIndices(){return this.indices;}

    setColor(colorVec){ this.color = colorVec; }

    getColor(){return this.color;}

    setVao(vao){this.vao = vao;}

    getVao(){return this.vao;}

    setIbo(ibo){this.ibo = ibo;}

    getIbo(){return this.ibo;}

    update(){}
}