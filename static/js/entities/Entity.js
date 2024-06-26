import { Vec3, Vec4 } from "../math.js";

export default class Entity{
    constructor(engine, updateOrder = 100){
        this.className = "Entity";
        
        this.updateOrder = updateOrder;

        engine.addEntity(this);

        this.engine = engine;
        this.components = [];
        this.position = new Vec3(0,0,0);
        this.scale = new Vec3(1,1,1);
        this.moveVector = new Vec3(0,0,0);
        this.visible = true;
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

    setDiffuse(colorVec){
        this.materialDiffuse = [
            colorVec.x,
            colorVec.y,
            colorVec.z,
            colorVec.w
        ];
    }

    getDiffuse(){
        return new Vec4(
            this.materialDiffuse[0],
            this.materialDiffuse[1],
            this.materialDiffuse[2],
            this.materialDiffuse[3]
        );
    }

    addComponent(component){
        this.components.push(component);
    }

    getComponents(){
        return this.components;
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
        this.position = Vec3.add(this.position, Vec3.scalerMul(deltaTime, this.moveVector));
    }
}