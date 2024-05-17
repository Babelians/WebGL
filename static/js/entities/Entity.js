class Entity{
    constructor(engine){
        this.className = "Entity";
        
        engine.addEntity(this);

        this.engine = engine;
        this.components = [];
        this.position = new Vec3(0,0,0);
        this.moveVector = new Vec3(0,0,0);
        this.vertices = [];
        this.indices = [];
        this.color = []; //頂点色
        this.vao = null;
        this.modelLoading = false;

        // ライティングの変数
        this.materialDiffuse = [0, 0, 0, 1];
        this.materialAmbient = [1, 1, 1, 1];
        this.materialSpecular = [1, 1, 1, 1];
        this.shininess = 10;
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

    updateComponents(deltaTime){
        for(let comp of this.components){
            comp.update(deltaTime);
        }
    }

    update(deltaTime){
        this.updateComponents(deltaTime);
        this.position = Vec3.add(this.position, this.moveVector);
    }
}