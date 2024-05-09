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

        /*
        this.vertices = [
            1.5, 0, 0,
            -1.5, 1, 0,
            -1.5, 0.809017, 0.587785,
            -1.5, 0.309017, 0.951057,
            -1.5, -0.309017, 0.951057,
            -1.5, -0.809017, 0.587785,
            -1.5, -1, 0,
            -1.5, -0.809017, -0.587785,
            -1.5, -0.309017, -0.951057,
            -1.5, 0.309017, -0.951057,
            -1.5, 0.809017, -0.587785
        ];

        this.indices = [
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7,
            0, 7, 8,
            0, 8, 9,
            0, 9, 10,
            0, 10, 1
        ];

        this.color = [];

        for(let i = 0; i < this.vertices.length / 3; ++i){
            this.color.push(1);
            this.color.push(0);
            this.color.push(0);
            this.color.push(1);
        }*/
    }
}
