onload = function(){
    let canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 500;
    //let engine = new MyEngine(canvas);
    let engine = new MidiLibrary(canvas);
    engine.initialize();
    engine.run();
}