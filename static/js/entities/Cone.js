class Cone extends Entity{
    constructor(engine){
        super(engine);

        let mc = new ModelComponent(this);
        mc.loadModel("../../static/models/cone1.json");

        this.color = [];

        for(let i = 0; i < this.vertices.length / 3; ++i){
            this.color.push(1);
            this.color.push(0);
            this.color.push(0);
            this.color.push(1);
        }
    }
}
