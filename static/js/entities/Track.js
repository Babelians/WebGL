class Track extends Entity{
    constructor(engine, conductor){
        super(engine);

        this.notes = [];

        this.chunkType = [];
        this.dataSize = 0;
        this.conductor = conductor;
    }

    addNote(note){
        this.notes.push(note);
    }
}