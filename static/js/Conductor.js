export default class Conductor{
    constructor(){
        this.quaterTimes = [];
        this.headerChunk = null;
        this.sumPlayDeltaTime = 0;
        this.sumPlaySecond = 0;
    }

    setSumPlayTime(sumPlayDeltaTime){
        this.sumPlayDeltaTime = sumPlayDeltaTime;
        this.sumPlaySecond = this.timeBaseToSecond(sumPlayDeltaTime);
    }

    calcTimeBasePerSecond(){
        return this.headerChunk.timeBase / (this.quaterTimes[0]/1000000);
    }

    secondToTimeBase(second){
        return second * this.headerChunk.timeBase / (this.quaterTimes[0]/1000000);
    }

    timeBaseToSecond(time){
        return time*(this.quaterTimes[0]/1000000) / this.headerChunk.timeBase;
    }
}