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

    readVarExpr(){
        let tmp = [];
        let next = false;
        do{
            let oneByte = this.read(1)[0];
            if(128<=oneByte){
                next = true;
                oneByte -= 128;
            }else{
                next = false;
            }

            tmp.push(oneByte);
        }while(next);

        let result = 0;
        for(let i = 0; i < tmp.length; ++i){
            result += tmp[i] * Math.pow(128, tmp.length -1 - i);
        }

        return result;
    }

    extractArr(arr){
        let result = 0;
        for(let i = 0; i < arr.length; ++i){
            result += arr[i] * Math.pow(256, arr.length -1 - i);
        }

        return result;
    }

    async readMidi(filePath){
        let tmp = await fetch(filePath);
        tmp = await tmp.blob();
        tmp = await tmp.arrayBuffer();
        this.view = new Uint8Array(tmp);

        this.headerChunk = {
            chunk : this.read(4),
            dataSize : this.extractArr(this.read(4)),
            format : this.extractArr(this.read(2)),
            trackCount : this.extractArr(this.read(2)),
            timeBase : this.extractArr(this.read(2))
        };

        let trackCount = this.headerChunk.trackCount;
        let timeBase = this.headerChunk.timeBase;

        for(let t = 0; t < trackCount; ++t){
            let track = new Track(this.engine);
            this.tracks.push(track);

            track.chunkType = this.read(4);
            track.dataSize = this.read(4);

            let pendingNotes = [];
            let timeSum = 0;
            let trackEnd = false;
            do{
                timeSum += this.readVarExpr();
                let firstByte = this.read(1)[0];
                let secondByte = this.read(1)[0];
                if(16*8 <= firstByte && firstByte <= 16*8 + 15){ // ノートオフ
                    let velocity = this.read(1)[0];
                    for(let i = 0; i < pendingNotes.length; ++i){
                        if(pendingNotes[i].noteNo == secondByte){
                            pendingNotes[i].offTime = timeSum;
                            track.addNote(pendingNotes[i]);
                            pendingNotes.slice(i,1);
                            break;
                        }
                    }
                }else if(16*9 <= firstByte && firstByte <= 16*9 + 15){ // ノートオン
                    let note = new Note(this.engine);
                    note.onTime = timeSum;
                    note.noteNo = secondByte;
                    note.velocity = this.read(1)[0];
                    pendingNotes.push(note);
                }else if(16*10 <= firstByte && firstByte <= 16*10 + 15){ // ポリフォニックキープレッシャー
                    let thirdByte = this.read(1)[0];
                }else if(16*11 <= firstByte && firstByte <= 16*11 + 15){ // コントロールチェンジ
                    let thirdByte = this.read(1)[0];
                }else if(16*14 <= firstByte && firstByte <= 16*14 + 15){
                    let thirdByte = this.read(1)[0];
                }else if(firstByte == 16*15+15){ //FF
                    let len = this.readVarExpr();
                    let data = this.read(len);

                    switch(secondByte){
                        case 16*2 + 15:
                            trackEnd = true;
                            break;
                    }
                }
            }while(!trackEnd);

            console.log("FIN");
        }
    }
}