export default class ProcessSignal{
    constructor(engine){
        this.srcs = [];
        this.dsts = [];

        this.engine = engine;

        this.conductor = engine.conductor;

        this.timeSum = 0;
    }

    addSrc(entity){
        for(let c of entity.getComponents()){
            if(c.className == "SignalSrcComponent"){
                this.srcs.push(entity);
                break;
            }
        }
    }

    addDst(entity){
        for(let c of entity.components){
            if(c.className == "SignalDstComponent"){
                this.dsts.push(entity);
                break;
            }
        }
    }

    update(deltaTime){
        
        this.timeSum += deltaTime;
        let signaledEntity = [];
        for(let src of this.srcs){ //シグナル発令
            if(src.signalSrc.onTime <= this.conductor.secondToTimeBase(this.timeSum) &&
                this.conductor.secondToTimeBase(this.timeSum) <= src.signalSrc.offTime){
                signaledEntity.push(src);
            }
        }

        for(let dst of this.dsts){ // シグナルに対応した処理
            let isSignal = false;
            for(let sigEnt of signaledEntity){
                if(dst.signalDst.no == sigEnt.signalSrc.no){
                    isSignal = true;
                    let color = sigEnt.getDiffuse();
                    dst.setDiffuse(color);
                    break;
                }
            }

            if(!isSignal){
                dst.setDiffuse(dst.getInitialColor());
            }
            
        }
        
    }
}