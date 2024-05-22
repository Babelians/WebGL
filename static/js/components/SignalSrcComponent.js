class SignalSrcComponent extends Component{
    constructor(entity, no, onTime, offTime){
        super(entity);
        this.className = "SignalSrcComponent";
        this.no = no;
        this.onTime = onTime;
        this.offTime = offTime;
    }

    setOntime(onTime){
        this.onTime = onTime;
    }

    setOffTime(offTime){
        this.offTime = offTime;
    }
}