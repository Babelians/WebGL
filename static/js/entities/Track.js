class Track extends Entity{
    constructor(engine, conductor, noteColor=new Vec4(0,1,0,1)){
        super(engine);

        this.notes = [];

        this.chunkType = [];
        this.dataSize = 0;
        this.conductor = conductor;

        this.noteColor = noteColor;
    }

    addNote(note){
        note.setColor(this.noteColor);
        this.notes.push(note);
    }
}