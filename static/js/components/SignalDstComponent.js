import Component from "./Component.js";

export default class SignalDstComponent extends Component{
    constructor(entity, no){
        super(entity);
        this.className = "SignalDstComponent";
        this.no = no;
    }
}