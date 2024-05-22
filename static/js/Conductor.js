class Conductor{
    constructor(){
        this.quaterTimes = [];
        this.headerChunk = null;
    }

    calcTimeBasePerSecond(){
        return this.headerChunk.timeBase / (this.quaterTimes[0]/1000000);
    }
}