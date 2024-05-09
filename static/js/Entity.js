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
        this.modelLoading = false;
    }

    addComponent(component){
        this.components.push(component);
    }

    setPosition(posVec){
        this.position = posVec;

        for(let component of this.components){
            component.updateVertices();
        }
    }

    update(){}
}