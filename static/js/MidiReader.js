class MidiReader{
    constructor(engine){
        this.engine = engine;
        this.fr = new FileReader();
        this.view = null;

        this.pointer = 0;
        this.headerChunk = {};
        this.tracks = [];
    }

    read(step){
        let tmp = [];
        for(let i = 0; i < step; ++i){
            tmp.push(this.view[this.pointer++]);
        }
        return new Uint8Array(tmp);
    }



    async readMidi(filePath){
        let tmp = await fetch(filePath);
        tmp = await tmp.blob();
        tmp = await tmp.arrayBuffer();
        this.view = new Uint8Array(tmp);

        this.headerChunk = {
            chunk : this.read(4),
            dataSize : this.read(4),
            format : this.read(2),
            trackCount : this.read(2),
            timeBase : this.read(2)
        };

        let trackCount = this.headerChunk.trackCount;
        let timeBase = this.headerChunk.timeBase;

        do{
            
        }while(1);
    }
}