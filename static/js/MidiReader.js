class MidiReader{
    constructor(){
        this.fr = new FileReader();
        this.arr = new Uint8Array();
    }

    async readMidi(filePath){
        let tmp = await fetch(filePath);
        tmp = await tmp.blob();
        this.arr = await tmp.arrayBuffer();
        await console.log(this.arr);
    }
}