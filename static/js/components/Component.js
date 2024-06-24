export default class Component{
    constructor(entity){
        this.owner = entity;
        this.owner.addComponent(this);
        this.className = "Component";
    }

    update(deltaTime){

    }

    updateVertices(){}
}