class RectComponent extends Component{
    constructor(entity){
        super(entity);
        this.width = 0;
        this.height = 0;
    }

    setWidth(width){
        this.width = width;
    }

    setHeight(height){
        this.height = height;
    }

    update(){
        const ownerPos = this.owner.position;
        let vertices = [
            ownerPos.x - this.width / 2, ownerPos.y - this.height / 2, 0,
            ownerPos.x + this.width / 2, ownerPos.y - this.height / 2, 0,
            ownerPos.x - this.width / 2, ownerPos.y + this.height / 2, 0,
            ownerPos.x + this.width / 2, ownerPos.y + this.height / 2, 0
        ];
        this.owner.vertices = vertices;

        console.log("new vert",this.owner.vertices);
    }

    setSize(width, height){
        this.setWidth(width);
        this.setHeight(height);

        this.update();

        const indices = [0, 1, 2, 2, 1, 3];
        this.owner.indices = indices;
    }

    setColor(colorVec){
        let newColor = [];
        for(let i = 0; i < this.owner.vertices.length / 3; ++i){
            newColor.push(colorVec.x);
            newColor.push(colorVec.y);
            newColor.push(colorVec.z);
            newColor.push(colorVec.w);
        }
        this.owner.color = newColor;
    }
}