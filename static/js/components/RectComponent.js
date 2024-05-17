class RectComponent extends Component{
    constructor(entity){
        super(entity);
        this.width = 0;
        this.height = 0;

        const indices = [0, 1, 2, 2, 1, 3];
        this.owner.indices = indices;
    }

    setWidth(width){
        this.width = width;
    }

    setHeight(height){
        this.height = height;
    }

    updateVertices(){
        const ownerPos = this.owner.position;
        let vertices = [
            ownerPos.x - this.width / 2, ownerPos.y - this.height / 2, ownerPos.z,
            ownerPos.x + this.width / 2, ownerPos.y - this.height / 2, ownerPos.z,
            ownerPos.x - this.width / 2, ownerPos.y + this.height / 2, ownerPos.z,
            ownerPos.x + this.width / 2, ownerPos.y + this.height / 2, ownerPos.z
        ];
        this.owner.vertices = vertices;
    }

    update(){
    }

    setSize(width, height){
        this.width = width;
        this.height = height;
        this.updateVertices();
    }

    setColor(colorVec){
        let newColor = [];
        for(let i = 0; i < 4; ++i){
            newColor.push(colorVec.x);
            newColor.push(colorVec.y);
            newColor.push(colorVec.z);
            newColor.push(colorVec.w);
        }
        this.owner.color = newColor;
    }
}