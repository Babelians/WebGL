class ModelComponent extends Component{
    constructor(entity){
        super(entity);
    }

    loadModel(filePath){
        return fetch(filePath)

        .then(res=>res.json())

        .then(data=>{
            this.owner.vertices = data.vertices;
            this.owner.indices = data.indices;
            // 色のデフォルト設定(青)
            for(let i = 0; i < this.owner.vertices.length/3; ++i){
                this.owner.color.push(0);
                this.owner.color.push(0);
                this.owner.color.push(1);
                this.owner.color.push(1);
            }
        })

        .catch((err) => console.error(err, ...arguments));
    }

    setColor(colorVec){
        newColor = [];
        for(let i = 0; i < this.owner.color.length/4; ++i){
            newColor.push(colorVec.x);
            newColor.push(colorVec.y);
            newColor.push(colorVec.z);
            newColor.push(colorVec.w);
        }

        this.owner.color = newColor;
    }

}