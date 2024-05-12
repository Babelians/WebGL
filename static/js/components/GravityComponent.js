class GravityComponent extends Component{
    constructor(entity){
        super(entity);
    }

    static GRAVITY = 9.80665;

    update(deltaTime){
        this.owner.moveVector.y -= 2 * GravityComponent.GRAVITY * deltaTime/10;
    }
}