class Component{
    constructor(entity){
        this.owner = entity;
        this.owner.addComponent(this);
    }

    update(){

    }

    updateVertices(){}
}