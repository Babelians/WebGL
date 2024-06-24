import Track from "./entities/Track.js";
import Note from "./entities/Note.js";
import { math } from "./math.js";

export default class MidiReader{
    constructor(engine){
        this.engine = engine;
        this.fr = new FileReader();
        this.view = null;

        this.pointer = 0;
        this.headerChunk = {};
        this.tracks = [];
        this.conductor = this.engine.conductor;
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

    extract8Arr(arr){
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
            dataSize : this.extract8Arr(this.read(4)),
            format : this.extract8Arr(this.read(2)),
            trackCount : this.extract8Arr(this.read(2)),
            timeBase : this.extract8Arr(this.read(2)) //1拍の分解能
        };

        this.conductor.headerChunk = this.headerChunk;

        let trackCount = this.headerChunk.trackCount;
        let timeBase = this.headerChunk.timeBase;

        let processSignal = this.engine.getProcessSignal();

        let trackFinalDeltatime = [];

        for(let t = 0; t < trackCount; ++t){
            let track = new Track(this.engine, this.conductor);
            this.tracks.push(track);

            track.chunkType = this.read(4);
            track.dataSize = this.read(4);

            let pendingNotes = [];
            let timeSum = 0;
            let trackEnd = false;
            do{
                let deltaTime = this.readVarExpr();
                timeSum += deltaTime;
                let firstByte = this.read(1)[0];
                let secondByte = this.read(1)[0];
                if(16*8 <= firstByte && firstByte <= 16*8 + 15){ // ノートオフ
                    let velocity = this.read(1)[0];
                    for(let i = 0; i < pendingNotes.length; ++i){
                        if(pendingNotes[i].noteNo == secondByte){
                            track.addNote(pendingNotes[i]);
                            pendingNotes[i].offTime = timeSum;
                            pendingNotes[i].modelLoading = false;
                            pendingNotes[i].form();
                            processSignal.addSrc(pendingNotes[i]); // 当たり判定シグナルに追加
                            pendingNotes.splice(i,1);
                            break;
                        }
                    }
                }else if(16*9 <= firstByte && firstByte <= 16*9 + 15){ // ノートオン
                    let note = new Note(this.engine, track);
                    note.modelLoading = true;
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
                        case 16*2 + 15: // トラック終端
                            trackEnd = true;
                            trackFinalDeltatime.push(timeSum);
                            break;
                        case 16*5 + 1: // テンポ情報 4分音符のマイクロ秒
                            let tempo = this.extract8Arr(data);
                            this.conductor.quaterTimes.push(tempo);
                            break;
                    }
                }
            }while(!trackEnd);
        }

        // 総再生時間の取得
        this.conductor.setSumPlayTime(math.max(trackFinalDeltatime.slice(1))); // コンダクタートラックを除いた
    }
}