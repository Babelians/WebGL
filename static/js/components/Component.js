class Component{
    constructor(entity){
        this.owner = entity;
        this.owner.addComponent(this);
        this.cassName = "Component";
    }

    update(deltaTime){

    }

    updateVertices(){}
}