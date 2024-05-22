class Piano{
    constructor(engine){
        let processSignal = engine.getProcessSignal();

        this.keys = [];
        for(let noteNo = 21; noteNo <= 108; ++noteNo){
            if(Piano.isWhitekey(noteNo)){
                let whitekey = new Whitekey(engine, noteNo);
                let x = Piano.culcKeyPositionX(noteNo);
                let y = Whitekey.getPostionY();
                whitekey.position = new Vec3(x, y, 0);
                this.keys.push(whitekey);

                processSignal.addDst(whitekey);
            }else{
                let blackkey = new Blackkey(engine, noteNo);
                let x = Piano.culcKeyPositionX(noteNo);
                let y =  (Whitekey.getHeight() - Blackkey.getHeight()) / 2 + Whitekey.getPostionY();
                blackkey.position = new Vec3(x, y, 0);
                this.keys.push(blackkey);

                processSignal.addDst(blackkey);
            }
        }

        new PianoBackRect(engine);
    }

    static countWhiteKey(noteNo){
        let count = 0;
        for(let i = 21; i < noteNo; ++i){
            if(Piano.isWhitekey(i)){
                ++count;
            }
        }

        return count;
    }

    static culcKeyPositionX(noteNo){
        if(Piano.isWhitekey(noteNo)){
            let x =( Whitekey.getWidth() + Whitekey.getCrevice() ) * this.countWhiteKey(noteNo);
            return x;
        }else{
            let x = this.culcKeyPositionX(noteNo-1) + (Whitekey.getWidth() + Whitekey.getCrevice()) / 2;
            return x;
        }
    }

    static isWhitekey(noteNo){
        let mod = noteNo % 12;
        if(mod == 0 || mod == 2 || mod == 4 || mod == 5 || mod == 7 || mod == 9 || mod == 11){
            return true;
        }else{
            return false;
        }
    }
}